import { CLASSES, CLASS_LEVEL_UP } from "../data/classesData.js";
import { FEATURES } from "../data/featuresData.js";
import { getSpellSlots } from "./characterCalculationsService.js";

export function getClassLevel(character, classId) {
  return character.classes.find(cls => cls.classId === classId)?.level ?? 0;
}

export function getNextCharacterLevel(character) {
  return character.classes.reduce((sum, cls) => sum + Number(cls.level ?? 0), 0) + 1;
}

export function getAvailableClasses() {
  return Object.values(CLASSES);
}

export function getLevelUpOptions(character, classId) {
  const classData = CLASSES[classId];

  if (!classData) {
    throw new Error(`Невідомий клас: ${classId}`);
  }

  const currentLevel = getClassLevel(character, classId);
  const nextLevel = currentLevel + 1;

  const features = classData.featuresByLevel?.[nextLevel] ?? [];

  let subclassFeatures = [];
  const currentClass = character.classes.find(cls => cls.classId === classId);
  const subclass = currentClass?.subclassId
    ? classData.subclasses?.[currentClass.subclassId]
    : null;

  if (subclass) {
    subclassFeatures = subclass.featuresByLevel?.[nextLevel] ?? [];
  }

  const featureDetails = [...features, ...subclassFeatures].map(id => ({
    id,
    data: FEATURES[id] ?? null
  }));

  const asiLevels = CLASS_LEVEL_UP[classId]?.abilityScoreImprovementLevels ?? [];
  const abilityScoreImprovement = asiLevels.includes(nextLevel);

  const spellcastingBefore = getSpellSlots(character);
  const previewClasses = character.classes.map(cls =>
    cls.classId === classId ? { ...cls, level: nextLevel } : cls
  );
  const previewCharacter = { ...character, classes: previewClasses };
  const spellcastingAfter = getSpellSlots(previewCharacter);

  return {
    classId,
    currentLevel,
    nextLevel,
    features: featureDetails,
    abilityScoreImprovement,
    spellcastingBefore,
    spellcastingAfter,
    subclassRequired: false
  };
}

export function calculateRecommendedHpIncrease(character, classId) {
  const classData = CLASSES[classId];
  if (!classData?.hitDie) return 0;

  return Math.floor(classData.hitDie / 2) + 1;
}

export function previewLevelUp(character, classId, hpIncrease) {
  const result = getLevelUpOptions(character, classId);

  const nextClasses = character.classes.some(cls => cls.classId === classId)
    ? character.classes.map(cls =>
        cls.classId === classId ? { ...cls, level: result.nextLevel } : cls
      )
    : [...character.classes, { classId, level: 1, subclassId: null }];

  const nextCharacter = {
    ...character,
    classes: nextClasses,
    maxHp: Number(character.maxHp ?? 0) + Number(hpIncrease ?? 0)
  };

  return {
    ...result,
    nextCharacter,
    hitDiceTotal: nextClasses.reduce((sum, cls) => sum + Number(cls.level ?? 0), 0)
  };
}

export function applyLevelUp(character, classId, hpIncrease) {
  const preview = previewLevelUp(character, classId, hpIncrease);
  character.classes = preview.nextCharacter.classes;
  character.maxHp = preview.nextCharacter.maxHp;

  if (character.combat) {
    character.combat.currentHp = Math.min(
      Number(character.combat.currentHp ?? character.maxHp),
      character.maxHp
    );
    character.combat.currentHitDice = preview.hitDiceTotal;
  }

  return preview;
}
