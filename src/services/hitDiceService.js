import { CLASSES } from "../data/classesData.js";
import { clamp, getHitDiceTotal } from "./characterCalculationsService.js";

function getClassHitDie(classId) {
  return Number(CLASSES[classId]?.hitDie ?? 0);
}

function getClassKey(classId) {
  return String(classId ?? "");
}

function getClassLevel(character, classId) {
  return Number(
    (character.classes ?? []).find(cls => cls.classId === classId)?.level ?? 0
  );
}

export function ensureHitDiceState(character) {
  character.combat ??= {};

  const classes = character.classes ?? [];
  const pools = character.combat.hitDiceByClass;

  if (!pools || typeof pools !== "object" || Array.isArray(pools)) {
    const total = getHitDiceTotal(character);
    const legacyAvailable = clamp(
      Number(character.combat.currentHitDice ?? total),
      0,
      total
    );

    character.combat.hitDiceByClass = {};

    for (const cls of classes) {
      character.combat.hitDiceByClass[getClassKey(cls.classId)] =
        Math.max(0, Number(cls.level ?? 0));
    }

    let toRemove = total - legacyAvailable;

    for (const cls of classes) {
      if (toRemove <= 0) break;

      const key = getClassKey(cls.classId);
      const available = Number(character.combat.hitDiceByClass[key] ?? 0);
      const removed = Math.min(available, toRemove);

      character.combat.hitDiceByClass[key] = available - removed;
      toRemove -= removed;
    }
  }

  const activeClassIds = new Set(
    classes.map(cls => getClassKey(cls.classId))
  );

  for (const classId of Object.keys(character.combat.hitDiceByClass)) {
    if (!activeClassIds.has(classId)) {
      delete character.combat.hitDiceByClass[classId];
    }
  }

  for (const cls of classes) {
    const key = getClassKey(cls.classId);
    const max = Math.max(0, Number(cls.level ?? 0));
    const current = Number(character.combat.hitDiceByClass[key]);

    character.combat.hitDiceByClass[key] = Number.isFinite(current)
      ? clamp(Math.floor(current), 0, max)
      : max;
  }

  const selectedClassId = getClassKey(
    character.combat.selectedHitDieClassId
  );

  const selectedExists = classes.some(
    cls => getClassKey(cls.classId) === selectedClassId
  );

  if (!selectedExists) {
    const firstAvailable = classes.find(cls =>
      Number(character.combat.hitDiceByClass[getClassKey(cls.classId)] ?? 0) > 0
    );

    character.combat.selectedHitDieClassId =
      getClassKey(firstAvailable?.classId ?? classes[0]?.classId ?? "");
  }
  const selectedType = Number(character.combat.selectedHitDieType);
  const validHitDieTypes = new Set(
    classes
      .map(cls => getClassHitDie(cls.classId))
      .filter(Number.isFinite)
      .filter(value => value > 0)
  );

  if (!validHitDieTypes.has(selectedType)) {
    const selectedPool = classes
      .map(cls => ({
        classId: getClassKey(cls.classId),
        hitDie: getClassHitDie(cls.classId),
        current: Number(
          character.combat.hitDiceByClass[getClassKey(cls.classId)] ?? 0
        )
      }))
      .find(pool => pool.current > 0 && pool.hitDie > 0)
      ?? classes
        .map(cls => ({
          classId: getClassKey(cls.classId),
          hitDie: getClassHitDie(cls.classId)
        }))
        .find(pool => pool.hitDie > 0);

    character.combat.selectedHitDieType = selectedPool?.hitDie ?? 0;
  }


  character.combat.currentHitDice = getAvailableHitDiceTotal(character);
}

export function getHitDicePools(character) {
  ensureHitDiceState(character);

  return (character.classes ?? [])
    .map(cls => {
      const classId = getClassKey(cls.classId);
      const max = Math.max(0, Number(cls.level ?? 0));
      const current = clamp(
        Number(character.combat.hitDiceByClass[classId] ?? 0),
        0,
        max
      );

      return {
        classId,
        className: CLASSES[classId]?.ukr ?? classId,
        hitDie: getClassHitDie(classId),
        current,
        max,
        level: max
      };
    })
    .filter(pool => pool.hitDie > 0 && pool.max > 0);
}

export function getAvailableHitDiceTotal(character) {
  ensureHitDiceStateWithoutTotalRecursion(character);
  return Object.values(character.combat?.hitDiceByClass ?? {})
    .reduce((sum, value) => sum + Math.max(0, Number(value ?? 0)), 0);
}

function ensureHitDiceStateWithoutTotalRecursion(character) {
  character.combat ??= {};

  const classes = character.classes ?? [];
  if (!character.combat.hitDiceByClass || typeof character.combat.hitDiceByClass !== "object") {
    character.combat.hitDiceByClass = {};
    for (const cls of classes) {
      character.combat.hitDiceByClass[getClassKey(cls.classId)] =
        Math.max(0, Number(cls.level ?? 0));
    }
  }
}

export function getHitDiceTypePools(character) {
  const pools = getHitDicePools(character);
  const grouped = new Map();

  for (const pool of pools) {
    if (!grouped.has(pool.hitDie)) {
      grouped.set(pool.hitDie, {
        hitDie: pool.hitDie,
        current: 0,
        max: 0,
        classIds: [],
        classNames: []
      });
    }

    const group = grouped.get(pool.hitDie);
    group.current += pool.current;
    group.max += pool.max;
    group.classIds.push(pool.classId);
    group.classNames.push(pool.className);
  }

  return [...grouped.values()].sort((a, b) => a.hitDie - b.hitDie);
}

export function getSelectedHitDicePool(character) {
  const pools = getHitDicePools(character);
  const selectedId = getClassKey(character.combat?.selectedHitDieClassId);

  return (
    pools.find(pool => pool.classId === selectedId) ??
    pools.find(pool => pool.current > 0) ??
    pools[0] ??
    null
  );
}

export function getSelectedHitDieTypePool(character) {
  ensureHitDiceState(character);

  const types = getHitDiceTypePools(character);
  if (!types.length) return null;

  const selectedType = Number(character.combat.selectedHitDieType);
  const selected = types.find(pool => pool.hitDie === selectedType);

  return selected ?? types.find(pool => pool.current > 0) ?? types[0];
}

export function cycleSelectedHitDie(character, direction) {
  ensureHitDiceState(character);

  const types = getHitDiceTypePools(character);
  if (!types.length) return null;

  const currentType = Number(character.combat.selectedHitDieType);
  let index = types.findIndex(pool => pool.hitDie === currentType);

  if (index < 0) index = 0;

  index = (index + Number(direction)) % types.length;
  if (index < 0) index += types.length;

  const selected = types[index];
  character.combat.selectedHitDieType = selected.hitDie;

  const selectedClass = getHitDicePools(character).find(
    pool => pool.hitDie === selected.hitDie && pool.current > 0
  ) ?? getHitDicePools(character).find(
    pool => pool.hitDie === selected.hitDie
  );

  if (selectedClass) {
    character.combat.selectedHitDieClassId = selectedClass.classId;
  }

  return selected;
}

export function getSelectedHitDie(character) {
  return getSelectedHitDicePool(character)?.hitDie ?? 0;
}

export function adjustSelectedHitDie(character, delta) {
  ensureHitDiceState(character);

  const pool = getSelectedHitDicePool(character);
  if (!pool) return null;

  const next = clamp(
    Number(character.combat.hitDiceByClass[pool.classId] ?? 0) +
      Number(delta ?? 0),
    0,
    pool.max
  );

  character.combat.hitDiceByClass[pool.classId] = next;
  character.combat.currentHitDice = getAvailableHitDiceTotal(character);

  return {
    ...pool,
    current: next
  };
}

export function addHitDieForClass(character, classId) {
  ensureHitDiceState(character);

  const key = getClassKey(classId);
  const max = getClassLevel(character, key);

  if (!max || !getClassHitDie(key)) return null;

  const current = Number(character.combat.hitDiceByClass[key] ?? 0);
  character.combat.hitDiceByClass[key] = clamp(current + 1, 0, max);
  character.combat.selectedHitDieClassId = key;
  character.combat.selectedHitDieType = getClassHitDie(key);
  character.combat.currentHitDice = getAvailableHitDiceTotal(character);

  return getSelectedHitDicePool(character);
}

export function spendHitDice(character, spentByClass = {}) {
  ensureHitDiceState(character);

  const spent = {};

  for (const pool of getHitDicePools(character)) {
    const requested = Math.max(
      0,
      Math.floor(Number(spentByClass[pool.classId] ?? 0))
    );
    const actual = Math.min(
      requested,
      Number(character.combat.hitDiceByClass[pool.classId] ?? 0)
    );

    if (actual > 0) {
      character.combat.hitDiceByClass[pool.classId] -= actual;
      spent[pool.classId] = actual;
    }
  }

  character.combat.currentHitDice = getAvailableHitDiceTotal(character);

  return spent;
}

export function restoreAllHitDice(character) {
  ensureHitDiceState(character);

  for (const cls of character.classes ?? []) {
    character.combat.hitDiceByClass[getClassKey(cls.classId)] =
      Math.max(0, Number(cls.level ?? 0));
  }

  character.combat.currentHitDice = getAvailableHitDiceTotal(character);
}
