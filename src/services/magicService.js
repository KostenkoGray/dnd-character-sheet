import { CLASSES } from "../data/classesData.js";
import {
  FULL_CASTER_SLOTS,
  HALF_CASTER_SLOTS,
  THIRD_CASTER_SLOTS,
  PACT_MAGIC_SLOTS
} from "../data/spellSlotsData.js";
import { getSpellById, getAllSpells } from "../data/spellsData.js";
import { getStatModifier } from "./characterCalculationsService.js";
import { getEffectiveAbilityScore } from "./inventoryService.js";
import { ensureCombatState } from "./combatStateService.js";

export const MAGIC_PREPARATION = {
  PREPARED: "prepared",
  KNOWN: "known"
};

const FULL_CASTER_SOURCE = "full";
const HALF_CASTER_SOURCE = "half";
const THIRD_CASTER_SOURCE = "third";
const PACT_MAGIC_SOURCE = "pact";

function getValueAtLevel(table, level) {
  const levels = Object.keys(table ?? {})
    .map(Number)
    .filter(value => value <= Number(level ?? 0))
    .sort((a, b) => a - b);

  return levels.length ? table[levels[levels.length - 1]] : null;
}

function getSpellcastingData(classEntry) {
  const classData = CLASSES[classEntry.classId];
  if (!classData) return null;

  if (classData.spellcasting) {
    return {
      classEntry,
      classData,
      spellcasting: classData.spellcasting,
      subclassData: null
    };
  }

  const subclassData = classEntry.subclassId
    ? classData.subclasses?.[classEntry.subclassId]
    : null;

  if (!subclassData?.spellcasting) return null;

  return {
    classEntry,
    classData,
    spellcasting: subclassData.spellcasting,
    subclassData
  };
}

export function getSpellcastingSources(character) {
  return (character.classes ?? [])
    .map(getSpellcastingData)
    .filter(Boolean);
}

function getClassSpellcastingKind(spellcasting) {
  if (spellcasting?.pactMagic) return PACT_MAGIC_SOURCE;
  if (spellcasting?.slotsTable === FULL_CASTER_SLOTS) return FULL_CASTER_SOURCE;
  if (spellcasting?.slotsTable === HALF_CASTER_SLOTS) return HALF_CASTER_SOURCE;
  if (spellcasting?.slotsTable === THIRD_CASTER_SLOTS) return THIRD_CASTER_SOURCE;
  return null;
}

function getOwnSpellLevelForSource(source) {
  const level = Number(source.classEntry.level ?? 0);
  const table = source.spellcasting?.slotsTable;

  if (source.spellcasting?.pactMagic) {
    const pact = table?.[level];
    return Number(pact?.level ?? 0);
  }

  const levels = table?.[level];
  if (!Array.isArray(levels)) return 0;

  return levels.length;
}

function getSpellKnownLimitForSource(source) {
  const table = source.spellcasting?.spellsKnown;
  if (!table) return null;
  return Number(getValueAtLevel(table, source.classEntry.level) ?? 0);
}

function getCantripsKnownLimitForSource(source) {
  const table = source.spellcasting?.cantripsKnown;
  if (!table) return null;
  return Number(getValueAtLevel(table, source.classEntry.level) ?? 0);
}

function getPreparedLimitForSource(character, source) {
  if (source.spellcasting?.preparation !== MAGIC_PREPARATION.PREPARED) {
    return null;
  }

  const ability = source.spellcasting.ability;
  const modifier = getStatModifier(
    getEffectiveAbilityScore(character, ability)
  );
  const divisor = Number(source.spellcasting.preparationLevelDivisor ?? 1);
  const classLevel = Number(source.classEntry.level ?? 0);

  return Math.max(1, Math.floor(classLevel / divisor) + modifier);
}

function getAvailableSourcesForSpell(character, spell) {
  return getSpellcastingSources(character).filter(source => {
    const spellListClassId =
      source.spellcasting?.spellListClassId ?? source.classEntry.classId;

    const classAllowed = Array.isArray(spell.classes) &&
      spell.classes.includes(spellListClassId);

    const subclassAllowed = Array.isArray(spell.subclasses) &&
      spell.subclasses.some(access =>
        access.classId === source.classEntry.classId &&
        access.subclassId === source.classEntry.subclassId
      );

    if (!classAllowed && !subclassAllowed) return false;

    if (spell.level > getOwnSpellLevelForSource(source)) {
      return false;
    }

    const allowedSchools = source.spellcasting?.allowedSpellSchools;
    const unrestrictedLevels = source.spellcasting?.unrestrictedSpellLevels ?? [];
    const classLevel = Number(source.classEntry.level ?? 0);

    if (
      spell.level > 0 &&
      Array.isArray(allowedSchools) &&
      allowedSchools.length &&
      !unrestrictedLevels.includes(classLevel) &&
      !allowedSchools.includes(spell.school)
    ) {
      return false;
    }

    return true;
  });
}

export function getAvailableSpells(character) {
  return getAllSpells()
    .map(spell => ({
      spell,
      sources: getAvailableSourcesForSpell(character, spell)
    }))
    .filter(entry => entry.sources.length);
}

export function ensureMagicState(character) {
  character.magic ??= {};
  character.magic.spells ??= [];

  if (!Array.isArray(character.magic.spells)) {
    character.magic.spells = [];
  }

  const normalized = character.magic.spells
    .map(rawEntry => {
      const raw =
        rawEntry &&
        typeof rawEntry === "object" &&
        !Array.isArray(rawEntry)
          ? rawEntry
          : {
              spellId: typeof rawEntry === "string" ? rawEntry : "",
              sourceClassId: "",
              prepared: false
            };

      const legacySourceClassIds = Array.from(new Set([
        ...(Array.isArray(raw.sourceClassIds) ? raw.sourceClassIds : []),
        raw.sourceClassId
      ].filter(Boolean)));

      const legacyPreparedSourceClassIds = Array.from(new Set([
        ...(Array.isArray(raw.preparedSourceClassIds)
          ? raw.preparedSourceClassIds
          : [])
      ].filter(Boolean)));

      const sourceClassId =
        raw.sourceClassId ||
        legacySourceClassIds[0] ||
        legacyPreparedSourceClassIds[0] ||
        "";

      const prepared =
        Boolean(raw.prepared) ||
        legacyPreparedSourceClassIds.includes(sourceClassId);

      return {
        spellId: raw.spellId ?? "",
        sourceClassId,
        sourceClassIds: sourceClassId ? [sourceClassId] : [],
        preparedSourceClassIds:
          prepared && sourceClassId ? [sourceClassId] : []
      };
    })
    .filter(entry => Boolean(getSpellById(entry.spellId)));

  // Один spell = одна картка. Класи-джерела об'єднуються без дублювання.
  const unique = new Map();

  for (const entry of normalized) {
    const existing = unique.get(entry.spellId);

    if (!existing) {
      unique.set(entry.spellId, {
        ...entry,
        sourceClassIds: [...entry.sourceClassIds],
        preparedSourceClassIds: [...entry.preparedSourceClassIds]
      });
      continue;
    }

    if (
      !existing.preparedSourceClassIds.length &&
      entry.preparedSourceClassIds.includes(existing.sourceClassId)
    ) {
      existing.preparedSourceClassIds = [existing.sourceClassId];
    }
  }

  character.magic.spells = [...unique.values()];

  // Після зміни мультикласу відновлюємо актуальне джерело
  // для старих записів, у яких sourceClassId був порожнім або застарілим.
  for (const entry of character.magic.spells) {
    const spell = getSpellById(entry.spellId);
    if (!spell) continue;

    const availableSources = getAvailableSourcesForSpell(character, spell);
    const availableIds = availableSources.map(
      source => source.classEntry.classId
    );

    entry.sourceClassIds = entry.sourceClassIds.filter(
      id => availableIds.includes(id)
    );

    if (!entry.sourceClassIds.length && availableIds.length) {
      entry.sourceClassIds = [availableIds[0]];
    }

    entry.sourceClassId = entry.sourceClassIds[0] ?? "";

    entry.preparedSourceClassIds = entry.preparedSourceClassIds.filter(id => {
      const source = availableSources.find(
        item => item.classEntry.classId === id
      );

      return Boolean(
        source &&
        entry.sourceClassIds.includes(id) &&
        source.spellcasting?.preparation === MAGIC_PREPARATION.PREPARED
      );
    });
  }

  return character.magic.spells;
}

export function getKnownSpellEntries(character) {
  const state = ensureMagicState(character);

  return state
    .map(entry => {
      const spell = getSpellById(entry.spellId);
      if (!spell) return null;

      const sourceClassIds = [...entry.sourceClassIds];
      const preparedSourceClassIds = [...entry.preparedSourceClassIds];
      const sources = getSpellcastingSources(character).filter(source =>
        sourceClassIds.includes(source.classEntry.classId)
      );

      return {
        ...spell,
        sourceClassIds,
        preparedSourceClassIds,
        sourceClassId: entry.sourceClassId ?? sourceClassIds[0] ?? "",
        sources,
        prepared: preparedSourceClassIds.length > 0
      };
    })
    .filter(Boolean);
}

export function getKnownSpells(character) {
  return getKnownSpellEntries(character);
}

export function getKnownSpellsForSource(character, sourceClassId) {
  const normalizedSourceId = String(sourceClassId ?? "");

  return getKnownSpellEntries(character).filter(spell =>
    String(spell.sourceClassId ?? "") === normalizedSourceId
  );
}

export function getPreparedSpells(character) {
  return getKnownSpellEntries(character).filter(spell =>
    spell.level > 0 && spell.prepared
  );
}

function countKnownForSource(character, sourceClassId, level = null) {
  const normalizedSourceId = String(sourceClassId ?? "");

  return getKnownSpellEntries(character).filter(spell => {
    if (String(spell.sourceClassId ?? "") !== normalizedSourceId) return false;
    return level === null || spell.level === level;
  }).length;
}

export function getSpellLimits(character) {
  return getSpellcastingSources(character).map(source => ({
    classId: source.classEntry.classId,
    className: source.classData.ukr,
    level: source.classEntry.level,
    preparation: source.spellcasting.preparation,
    known: countKnownForSource(character, source.classEntry.classId)
      - countKnownForSource(character, source.classEntry.classId, 0),
    knownLimit: getSpellKnownLimitForSource(source),
    cantripsKnown: countKnownForSource(character, source.classEntry.classId, 0),
    cantripsLimit: getCantripsKnownLimitForSource(source),
    prepared: getKnownSpellEntries(character).filter(spell =>
      spell.preparedSourceClassIds.includes(source.classEntry.classId)
    ).length,
    preparedLimit: getPreparedLimitForSource(character, source)
  }));
}

function getSourceKnownCapacity(character, source, spell) {
  if (spell.level === 0) {
    const limit = getCantripsKnownLimitForSource(source);
    return limit === null ||
      countKnownForSource(character, source.classEntry.classId, 0) < limit;
  }

  const limit = getSpellKnownLimitForSource(source);
  if (limit === null) return true;

  const knownLevelled =
    countKnownForSource(character, source.classEntry.classId) -
    countKnownForSource(character, source.classEntry.classId, 0);

  return knownLevelled < limit;
}

export function addSpellToCharacter(character, spellId, sourceClassId = "") {
  const spell = getSpellById(spellId);
  if (!spell) {
    return {
      ok: false,
      message: "Заклинання не знайдено в каталозі."
    };
  }

  ensureMagicState(character);

  const availableSources = getAvailableSourcesForSpell(character, spell);
  if (!availableSources.length) {
    return {
      ok: false,
      message: "Персонажу недоступне це заклинання на поточному рівні."
    };
  }

  const existing = character.magic.spells.find(
    entry => entry.spellId === spellId
  );

  if (existing) {
    return {
      ok: false,
      message: "Це заклинання вже відоме персонажу."
    };
  }

  const source = sourceClassId
    ? availableSources.find(item =>
        item.classEntry.classId === sourceClassId
      )
    : availableSources.find(item =>
        getSourceKnownCapacity(character, item, spell)
      );

  if (!source) {
    return {
      ok: false,
      message: "Не знайдено доступного класу-джерела для цього заклинання."
    };
  }

  const entry = {
    spellId,
    sourceClassId: source.classEntry.classId,
    sourceClassIds: [source.classEntry.classId],
    preparedSourceClassIds: []
  };

  character.magic.spells.push(entry);

  return { ok: true, entry, spell };
}

export function toggleSpellPrepared(character, spellId, sourceClassId = "") {
  ensureMagicState(character);

  let entry = character.magic.spells.find(
    item => item.spellId === spellId
  );

  if (!entry) {
    return {
      ok: false,
      message: "Заклинання не знайдено серед відомих."
    };
  }

  const spell = getSpellById(spellId);
  if (spell?.level === 0) {
    return {
      ok: false,
      message: "Замови не потребують підготовки."
    };
  }

  const availableSources = getAvailableSourcesForSpell(character, spell);
  const preparedSources = availableSources.filter(source =>
    source.spellcasting?.preparation === MAGIC_PREPARATION.PREPARED
  );

  const source = preparedSources.find(item =>
    item.classEntry.classId === (sourceClassId || entry.sourceClassId)
  ) ?? preparedSources.find(item =>
    entry.sourceClassIds.includes(item.classEntry.classId)
  );

  if (!source) {
    return {
      ok: false,
      message: "Жоден доступний клас цього заклинання не використовує підготовку заклять."
    };
  }

  const classId = source.classEntry.classId;

  if (!entry.sourceClassIds.includes(classId)) {
    if (!getSourceKnownCapacity(character, source, spell)) {
      return {
        ok: false,
        message: "Для " + source.classData.ukr + " вже досягнуто ліміту відомих заклинань."
      };
    }

    const freshEntry = character.magic.spells.find(
      item => item.spellId === spellId
    );

    if (!freshEntry) {
      return {
        ok: false,
        message: "Не вдалося оновити джерело заклинання."
      };
    }

    entry = freshEntry;
    entry.sourceClassIds.push(classId);
  }

  const preparedIds = new Set(entry.preparedSourceClassIds);

  if (preparedIds.has(classId)) {
    preparedIds.delete(classId);
    entry.preparedSourceClassIds = [...preparedIds];
    return {
      ok: true,
      prepared: entry.preparedSourceClassIds.length > 0,
      sourceClassId: classId
    };
  }

  const limit = getPreparedLimitForSource(character, source);
  if (limit !== null) {
    const currentPrepared = getKnownSpellEntries(character).filter(item =>
      item.preparedSourceClassIds.includes(classId)
    ).length;

    const freshPreparedEntry = character.magic.spells.find(
      item => item.spellId === spellId
    );

    if (!freshPreparedEntry) {
      return {
        ok: false,
        message: "Не вдалося оновити стан підготовки заклинання."
      };
    }

    entry = freshPreparedEntry;

    if (currentPrepared >= limit) {
      return {
        ok: false,
        message: source.classData.ukr + ": ліміт підготовлених заклинань — " + limit + "."
      };
    }
  }

  preparedIds.add(classId);
  entry.preparedSourceClassIds = [...preparedIds];

  return {
    ok: true,
    prepared: true,
    sourceClassId: classId
  };
}
export function removeSpellFromCharacter(character, spellId) {
  ensureMagicState(character);

  const index = character.magic.spells.findIndex(entry => entry.spellId === spellId);
  if (index === -1) {
    return { ok: false, message: "Заклинання не знайдено." };
  }

  character.magic.spells.splice(index, 1);
  return { ok: true };
}

export function getSpellSlotGroups(character) {
  const sources = getSpellcastingSources(character);
  const normalSources = sources.filter(source =>
    getClassSpellcastingKind(source.spellcasting) !== PACT_MAGIC_SOURCE
  );
  const pactSources = sources.filter(source =>
    getClassSpellcastingKind(source.spellcasting) === PACT_MAGIC_SOURCE
  );

  const casterLevel = Math.min(20, normalSources.reduce((sum, source) => {
    const kind = getClassSpellcastingKind(source.spellcasting);
    const level = Number(source.classEntry.level ?? 0);

    if (kind === FULL_CASTER_SOURCE) return sum + level;
    if (kind === HALF_CASTER_SOURCE) return sum + Math.floor(level / 2);
    if (kind === THIRD_CASTER_SOURCE) return sum + Math.floor(level / 3);
    return sum;
  }, 0));

  const normalMax = casterLevel > 0
    ? (FULL_CASTER_SLOTS[casterLevel] ?? [])
    : [];

  const currentNormal = character.combat?.currentSpellSlots ?? {};
  const normal = normalMax.map((max, index) => {
    const level = index + 1;
    const current = Math.min(
      max,
      Math.max(0, Number(currentNormal[level] ?? max))
    );

    return { level, max, current };
  });

  const pact = pactSources.map(source => {
    const level = Number(source.classEntry.level ?? 0);
    const pactTable = source.spellcasting.slotsTable?.[level];
    const max = Number(pactTable?.slots ?? 0);
    const slotLevel = Number(pactTable?.level ?? 0);
    const current = Math.min(
      max,
      Math.max(0, Number(character.combat?.currentPactMagicSlots ?? max))
    );

    return {
      classId: source.classEntry.classId,
      className: source.classData.ukr,
      level: slotLevel,
      max,
      current
    };
  });

  return { normal, pact };
}

export function getTotalSpellSlots(character) {
  const groups = getSpellSlotGroups(character);
  return groups.normal.reduce((sum, slot) => sum + slot.max, 0) +
    groups.pact.reduce((sum, slot) => sum + slot.max, 0);
}

export function getAvailableSpellSlots(character) {
  const groups = getSpellSlotGroups(character);
  return groups.normal.reduce((sum, slot) => sum + slot.current, 0) +
    groups.pact.reduce((sum, slot) => sum + slot.current, 0);
}

export function ensureSpellSlotState(character) {
  ensureCombatState(character);

  const groups = getSpellSlotGroups(character);
  character.combat.currentSpellSlots ??= {};

  for (const slot of groups.normal) {
    const current = Number(
      character.combat.currentSpellSlots[slot.level] ?? slot.max
    );

    character.combat.currentSpellSlots[slot.level] = Math.min(
      slot.max,
      Math.max(0, current)
    );
  }

  const validLevels = new Set(groups.normal.map(slot => String(slot.level)));
  for (const key of Object.keys(character.combat.currentSpellSlots)) {
    if (!validLevels.has(String(key))) {
      delete character.combat.currentSpellSlots[key];
    }
  }

  const pact = groups.pact[0];

  if (!pact) {
    delete character.combat.currentPactMagicSlots;
    delete character.combat.pactMagicSlotLevel;
    return;
  }

  const currentPact = Number(
    character.combat.currentPactMagicSlots ?? pact.max
  );

  character.combat.currentPactMagicSlots = Math.min(
    pact.max,
    Math.max(0, currentPact)
  );
  character.combat.pactMagicSlotLevel = pact.level;
}

export function setSpellSlotCount(character, level, count, pactMagic = false) {
  ensureSpellSlotState(character);

  const groups = getSpellSlotGroups(character);
  const numericLevel = Number(level);
  const target = Math.max(0, Math.floor(Number(count ?? 0)));

  if (pactMagic) {
    const pact = groups.pact[0];
    if (!pact || pact.level !== numericLevel) {
      return { ok: false, message: "Комірка Pact Magic не знайдена." };
    }

    character.combat.currentPactMagicSlots = Math.min(pact.max, target);
    return { ok: true, current: character.combat.currentPactMagicSlots };
  }

  const slot = groups.normal.find(item => item.level === numericLevel);
  if (!slot) {
    return { ok: false, message: "Комірка цього рівня не знайдена." };
  }

  const key = String(numericLevel);
  character.combat.currentSpellSlots[key] = Math.min(slot.max, target);

  return { ok: true, current: character.combat.currentSpellSlots[key] };
}

export function toggleSpellSlotDot(character, level, index, pactMagic = false) {
  ensureSpellSlotState(character);

  const numericLevel = Number(level);
  const numericIndex = Number(index);
  if (!Number.isInteger(numericIndex) || numericIndex < 0) {
    return { ok: false, message: "Некоректна комірка." };
  }

  const groups = getSpellSlotGroups(character);
  const slot = pactMagic
    ? groups.pact.find(item => item.level === numericLevel)
    : groups.normal.find(item => item.level === numericLevel);

  if (!slot || numericIndex >= slot.max) {
    return { ok: false, message: "Комірка не знайдена." };
  }

  const current = pactMagic
    ? Number(character.combat.currentPactMagicSlots ?? slot.max)
    : Number(character.combat.currentSpellSlots?.[String(numericLevel)] ?? slot.max);

  const next = current === numericIndex + 1
    ? numericIndex
    : numericIndex + 1;

  return setSpellSlotCount(character, numericLevel, next, pactMagic);
}

export function spendSpellSlot(character, level, pactMagic = false) {
  ensureSpellSlotState(character);

  if (pactMagic) {
    const current = Number(character.combat.currentPactMagicSlots ?? 0);
    if (current <= 0) {
      return { ok: false, message: "Немає доступних Pact Magic комірок." };
    }

    character.combat.currentPactMagicSlots = current - 1;
    return { ok: true };
  }

  const key = String(level);
  const current = Number(character.combat.currentSpellSlots?.[key] ?? 0);
  if (current <= 0) {
    return { ok: false, message: "Немає доступних комірок цього рівня." };
  }

  character.combat.currentSpellSlots[key] = current - 1;
  return { ok: true };
}

export function restoreSpellSlot(character, level, pactMagic = false) {
  ensureSpellSlotState(character);

  if (pactMagic) {
    const max = getSpellSlotGroups(character).pact[0]?.max ?? 0;
    const current = Number(character.combat.currentPactMagicSlots ?? 0);
    character.combat.currentPactMagicSlots = Math.min(max, current + 1);
    return { ok: true };
  }

  const key = String(level);
  const max = getSpellSlotGroups(character).normal.find(
    slot => slot.level === Number(level)
  )?.max ?? 0;
  const current = Number(character.combat.currentSpellSlots?.[key] ?? 0);
  character.combat.currentSpellSlots[key] = Math.min(max, current + 1);
  return { ok: true };
}

export function restoreSpellSlotsOnLongRest(character) {
  ensureSpellSlotState(character);

  const groups = getSpellSlotGroups(character);

  character.combat.currentSpellSlots = Object.fromEntries(
    groups.normal.map(slot => [slot.level, slot.max])
  );

  if (groups.pact.length) {
    character.combat.currentPactMagicSlots = groups.pact[0].max;
    character.combat.pactMagicSlotLevel = groups.pact[0].level;
  }
}
