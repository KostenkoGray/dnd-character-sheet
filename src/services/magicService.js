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

  character.magic.spells = character.magic.spells
    .map(rawEntry => {
      const entry = (
        rawEntry &&
        typeof rawEntry === "object" &&
        !Array.isArray(rawEntry)
      )
        ? rawEntry
        : {
            spellId: typeof rawEntry === "string" ? rawEntry : "",
            sourceClassId: "",
            prepared: false
          };

      entry.spellId = entry.spellId ?? "";
      entry.sourceClassId = entry.sourceClassId ?? "";
      entry.prepared = Boolean(entry.prepared);

      return entry;
    })
    .filter(entry => Boolean(getSpellById(entry.spellId)));

  const sources = getSpellcastingSources(character);

  for (const entry of character.magic.spells) {
    if (entry.sourceClassId) continue;

    const spell = getSpellById(entry.spellId);
    if (!spell) continue;

    const availableSources = getAvailableSourcesForSpell(character, spell);

    const exactClass = availableSources.find(source =>
      source.classEntry.classId === entry.sourceClassId
    );

    const fallbackSource = availableSources[0];

    if (exactClass) {
      entry.sourceClassId = exactClass.classEntry.classId;
    } else if (fallbackSource) {
      entry.sourceClassId = fallbackSource.classEntry.classId;
    }
  }

  // Keep source ids valid after multiclass/class changes.
  for (const entry of character.magic.spells) {
    if (!entry.sourceClassId) continue;

    const sourceStillExists = sources.some(source =>
      source.classEntry.classId === entry.sourceClassId
    );

    if (!sourceStillExists) {
      entry.sourceClassId = "";
      entry.prepared = false;
    }
  }

  return character.magic.spells;
}

export function getKnownSpellEntries(character) {
  const state = ensureMagicState(character);

  return state
    .map(entry => {
      const spell = getSpellById(entry.spellId);
      if (!spell) return null;

      return {
        ...spell,
        sourceClassId: entry.sourceClassId,
        prepared: Boolean(entry.prepared)
      };
    })
    .filter(Boolean);
}

export function getKnownSpells(character) {
  return getKnownSpellEntries(character);
}

export function getPreparedSpells(character) {
  return getKnownSpellEntries(character).filter(spell =>
    spell.level > 0 && spell.prepared
  );
}

function countKnownForSource(character, sourceClassId, level = null) {
  return getKnownSpellEntries(character).filter(spell => {
    if (spell.sourceClassId !== sourceClassId) return false;
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
      spell.sourceClassId === source.classEntry.classId && spell.prepared
    ).length,
    preparedLimit: getPreparedLimitForSource(character, source)
  }));
}

export function addSpellToCharacter(character, spellId, sourceClassId = "") {
  const spell = getSpellById(spellId);
  if (!spell) return { ok: false, message: "Заклинання не знайдено в каталозі." };

  ensureMagicState(character);

  const availableSources = getAvailableSourcesForSpell(character, spell);
  if (!availableSources.length) {
    return { ok: false, message: "Персонажу недоступне це заклинання на поточному рівні." };
  }

  const source = sourceClassId
    ? availableSources.find(item =>
        item.classEntry.classId === sourceClassId
      )
    : availableSources.length === 1
      ? availableSources[0]
      : null;

  if (!source) {
    return {
      ok: false,
      message: "Оберіть клас, для якого додається це заклинання."
    };
  }

  if (character.magic.spells.some(entry =>
    entry.spellId === spellId &&
    entry.sourceClassId === source.classEntry.classId
  )) {
    return { ok: false, message: "Це заклинання вже додане для цього класу." };
  }

  if (spell.level === 0) {
    const limit = getCantripsKnownLimitForSource(source);
    if (limit !== null &&
        countKnownForSource(character, source.classEntry.classId, 0) >= limit) {
      return {
        ok: false,
        message: `Для ${source.classData.ukr} уже вибрано максимальну кількість заговорів (${limit}).`
      };
    }
  } else {
    const limit = getSpellKnownLimitForSource(source);
    const knownLevelled = countKnownForSource(
      character,
      source.classEntry.classId,
      null
    ) - countKnownForSource(
      character,
      source.classEntry.classId,
      0
    );

    if (limit !== null && knownLevelled >= limit) {
      return {
        ok: false,
        message: `Для ${source.classData.ukr} уже вибрано максимальну кількість відомих заклинань (${limit}).`
      };
    }
  }

  const entry = {
    spellId,
    sourceClassId: source.classEntry.classId,
    prepared: false
  };

  character.magic.spells.push(entry);

  return { ok: true, entry, spell };
}

export function toggleSpellPrepared(character, spellId) {
  ensureMagicState(character);

  const entry = character.magic.spells.find(item => item.spellId === spellId);
  if (!entry) {
    return { ok: false, message: "Заклинання не знайдено серед відомих." };
  }

  const spell = getSpellById(spellId);
  if (spell?.level === 0) {
    return {
      ok: false,
      message: "Замови не потребують підготовки."
    };
  }

  if (entry.prepared) {
    entry.prepared = false;
    return { ok: true, prepared: false };
  }

  let source = getSpellcastingSources(character).find(item =>
    item.classEntry.classId === entry.sourceClassId
  );

  if (!source) {
    const fallback = getAvailableSourcesForSpell(character, spell)[0];
    if (fallback) {
      entry.sourceClassId = fallback.classEntry.classId;
      source = fallback;
    }
  }

  if (!source) {
    return { ok: false, message: "Не знайдено клас, який надав це заклинання." };
  }

  const limit = getPreparedLimitForSource(character, source);
  if (limit !== null) {
    const currentPrepared = getKnownSpellEntries(character).filter(item =>
      item.sourceClassId === source.classEntry.classId && item.prepared
    ).length;

    if (currentPrepared >= limit) {
      return {
        ok: false,
        message: `${source.classData.ukr}: ліміт підготовлених заклинань — ${limit}.`
      };
    }
  }

  entry.prepared = true;
  return { ok: true, prepared: true };
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
