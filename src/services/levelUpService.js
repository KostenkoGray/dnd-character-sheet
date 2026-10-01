import { CLASSES, CLASS_LEVEL_UP } from "../data/classesData.js";
import { getSpellSlotGroups } from "./magicService.js";
import { FEATURES } from "../data/featuresData.js";
import { FEATS } from "../data/featsData.js";
import { getSpellSlots } from "./characterCalculationsService.js";
import { addHitDieForClass, ensureHitDiceState } from "./hitDiceService.js";

function getResourceValue(resourceTable, classLevel) {
  const levels = Object.keys(resourceTable)
    .map(Number)
    .filter(Number.isFinite)
    .filter(level => level <= Number(classLevel))
    .sort((a, b) => a - b);

  return levels.length ? resourceTable[levels[levels.length - 1]] : null;
}

function getFirstSubclassLevel(classData) {
  const levels = Object.values(classData?.subclasses ?? {})
    .flatMap(subclass => Object.keys(subclass.featuresByLevel ?? {}).map(Number))
    .filter(Number.isFinite);

  return levels.length ? Math.min(...levels) : null;
}

function getSubclassOptions(classData) {
  return Object.values(classData?.subclasses ?? {}).map(subclass => ({
    id: subclass.id,
    name: subclass.name ?? subclass.ukr ?? subclass.id,
    ukr: subclass.ukr ?? subclass.name ?? subclass.id
  }));
}

function getResourceChanges(classData, currentLevel, nextLevel) {
  const changes = [];

  for (const [key, table] of Object.entries(classData?.resourcesByLevel ?? {})) {
    if (!table || typeof table !== "object" || Array.isArray(table)) continue;

    const before = getResourceValue(table, currentLevel);
    const after = getResourceValue(table, nextLevel);

    if (after == null || after === before) continue;

    changes.push({ key, before, after });
  }

  return changes;
}

export function getClassLevel(character, classId) {
  return character.classes.find(cls => cls.classId === classId)?.level ?? 0;
}

export function getNextCharacterLevel(character) {
  return character.classes.reduce(
    (sum, cls) => sum + Number(cls.level ?? 0),
    0
  ) + 1;
}

export function getAvailableClasses() {
  return Object.values(CLASSES);
}

export function getLevelUpOptions(character, classId, choices = {}) {
  const classData = CLASSES[classId];

  if (!classData) {
    throw new Error(`Невідомий клас: ${classId}`);
  }

  const currentClass = character.classes.find(cls => cls.classId === classId) ?? null;
  const currentLevel = Number(currentClass?.level ?? 0);
  const nextLevel = currentLevel + 1;
  const isNewClass = !currentClass;

  const selectedSubclassId =
    choices.subclassId ??
    currentClass?.subclassId ??
    null;

  const subclassOptions = getSubclassOptions(classData);
  const firstSubclassLevel = getFirstSubclassLevel(classData);

  const subclassRequired =
    subclassOptions.length > 0 &&
    !selectedSubclassId &&
    firstSubclassLevel !== null &&
    nextLevel >= firstSubclassLevel;

  const features = classData.featuresByLevel?.[nextLevel] ?? [];

  const subclass = selectedSubclassId
    ? classData.subclasses?.[selectedSubclassId]
    : null;

  const subclassFeatures = subclass
    ? (subclass.featuresByLevel?.[nextLevel] ?? [])
    : [];

  const featureDetails = [
    ...features.map(id => ({
      id,
      source: "class",
      data: FEATURES[id] ?? null
    })),
    ...subclassFeatures.map(id => ({
      id,
      source: "subclass",
      data: FEATURES[id] ?? null
    }))
  ];

  const asiLevels = CLASS_LEVEL_UP[classId]?.abilityScoreImprovementLevels ?? [];
  const abilityScoreImprovement = asiLevels.includes(nextLevel);

  const spellcastingBefore = getSpellSlotGroups(character);

  const previewClasses = currentClass
    ? character.classes.map(cls =>
        cls.classId === classId
          ? {
              ...cls,
              level: nextLevel,
              subclassId: selectedSubclassId ?? cls.subclassId ?? null
            }
          : { ...cls }
      )
    : [
        ...character.classes.map(cls => ({ ...cls })),
        {
          classId,
          level: 1,
          subclassId: selectedSubclassId ?? null
        }
      ];

  const previewCharacter = {
    ...character,
    classes: previewClasses
  };

  const spellcastingAfter = getSpellSlotGroups(previewCharacter);

  return {
    classId,
    currentLevel,
    nextLevel,
    isNewClass,
    totalLevelBefore: getNextCharacterLevel(character) - 1,
    totalLevelAfter: getNextCharacterLevel(character),
    features: featureDetails,
    abilityScoreImprovement,
    subclassRequired,
    subclassId: selectedSubclassId,
    subclassOptions,
    firstSubclassLevel,
    resourceChanges: getResourceChanges(classData, currentLevel, nextLevel),
    spellcastingBefore,
    spellcastingAfter
  };
}

export function calculateRecommendedHpIncrease(character, classId) {
  const classData = CLASSES[classId];

  if (!classData?.hitDie) return 0;

  const hitDieAverage = Math.floor(classData.hitDie / 2) + 1;
  const constitutionModifier = Math.floor(
    (Number(character.stats?.constitution ?? 10) - 10) / 2
  );

  return Math.max(1, hitDieAverage + constitutionModifier);
}

function validateAbilityScoreImprovement(character, asi) {
  if (!asi || !["scores", "feat"].includes(asi.mode)) {
    throw new Error("Оберіть ASI або рису.");
  }

  if (asi.mode === "feat") {
    if (!asi.featId || !FEATS[asi.featId]) {
      throw new Error("Оберіть рису.");
    }

    return;
  }

  if (asi.scoreMode === "plus2") {
    const stat = asi.stat1;

    if (!stat || !Object.prototype.hasOwnProperty.call(character.stats ?? {}, stat)) {
      throw new Error("Оберіть характеристику для +2.");
    }

    if (Number(character.stats[stat]) > 18) {
      throw new Error("Для +2 ця характеристика має бути не вище 18.");
    }

    return;
  }

  if (asi.scoreMode === "split") {
    const first = asi.stat1;
    const second = asi.stat2;

    if (!first || !second) {
      throw new Error("Оберіть дві характеристики для +1 / +1.");
    }

    if (first === second) {
      throw new Error("Для +1 / +1 потрібно обрати дві різні характеристики.");
    }

    if (
      !Object.prototype.hasOwnProperty.call(character.stats ?? {}, first) ||
      !Object.prototype.hasOwnProperty.call(character.stats ?? {}, second)
    ) {
      throw new Error("Обрано невідому характеристику.");
    }

    if (Number(character.stats[first]) >= 20 || Number(character.stats[second]) >= 20) {
      throw new Error("Характеристику 20 не можна підвищити.");
    }

    return;
  }

  throw new Error("Оберіть спосіб розподілу ASI.");
}

function applyAbilityScoreImprovement(character, asi) {
  validateAbilityScoreImprovement(character, asi);

  if (asi.mode === "feat") {
    character.feats ??= [];

    character.feats.push({
      featId: asi.featId,
      classId: asi.classId,
      level: asi.level
    });

    return;
  }

  if (asi.scoreMode === "plus2") {
    character.stats[asi.stat1] = Math.min(
      20,
      Number(character.stats[asi.stat1]) + 2
    );
    return;
  }

  character.stats[asi.stat1] = Math.min(
    20,
    Number(character.stats[asi.stat1]) + 1
  );

  character.stats[asi.stat2] = Math.min(
    20,
    Number(character.stats[asi.stat2]) + 1
  );
}

export function previewLevelUp(character, classId, hpIncrease = 0, choices = {}) {
  const result = getLevelUpOptions(character, classId, choices);

  if (result.totalLevelAfter > 20) {
    throw new Error("Загальний рівень персонажа не може перевищувати 20.");
  }

  if (result.subclassRequired && !choices.subclassId) {
    throw new Error("Оберіть підклас.");
  }

  if (result.abilityScoreImprovement) {
    validateAbilityScoreImprovement(character, choices.asi);
  }

  const nextClasses = character.classes.some(cls => cls.classId === classId)
    ? character.classes.map(cls =>
        cls.classId === classId
          ? {
              ...cls,
              level: result.nextLevel,
              subclassId: choices.subclassId ?? cls.subclassId ?? null
            }
          : { ...cls }
      )
    : [
        ...character.classes.map(cls => ({ ...cls })),
        {
          classId,
          level: 1,
          subclassId: choices.subclassId ?? null
        }
      ];

  const nextCharacter = {
    ...character,
    classes: nextClasses,
    maxHp: Number(character.maxHp ?? 0) +
      Math.max(0, Math.floor(Number(hpIncrease ?? 0)))
  };

  return {
    ...result,
    nextCharacter,
    hitDiceTotal: nextClasses.reduce(
      (sum, cls) => sum + Number(cls.level ?? 0),
      0
    )
  };
}

export function applyLevelUp(character, classId, hpIncrease, choices = {}) {
  const preview = previewLevelUp(character, classId, hpIncrease, choices);

  character.classes = preview.nextCharacter.classes;
  character.maxHp = preview.nextCharacter.maxHp;

  if (character.combat) {
    ensureHitDiceState(character);
    addHitDieForClass(character, classId);
  }

  if (preview.abilityScoreImprovement) {
    applyAbilityScoreImprovement(character, {
      ...choices.asi,
      classId,
      level: preview.nextLevel
    });
  }

  if (character.combat) {
    character.combat.currentHp = Math.min(
      Number(character.combat.currentHp ?? character.maxHp),
      character.maxHp
    );
    character.combat.currentHitDice = preview.hitDiceTotal;
  }

  return preview;
}
