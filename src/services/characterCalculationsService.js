import { PROFICIENCY } from "../data/rulesData.js";
import { CLASSES } from "../data/classesData.js";
import {
  FULL_CASTER_SLOTS,
  HALF_CASTER_SLOTS,
  THIRD_CASTER_SLOTS,
  PACT_MAGIC_SLOTS
} from "../data/spellSlotsData.js";

// ==================================================
// BASIC CALCULATIONS
// ==================================================

export function getStatModifier(score) {
  return Math.floor((score - 10) / 2);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getCharacterLevel(character) {
  return character.classes.reduce((sum, cls) => sum + cls.level, 0);
}

export function getProficiencyBonus(character) {
  const level = getCharacterLevel(character);

  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

// ==================================================
// SAVES & SKILLS
// ==================================================

export function getSaveBonus(character, statKey) {
  const modifier = getStatModifier(character.stats[statKey]);
  const proficiencyBonus = getProficiencyBonus(character);

  const hasProficiency = character.classes.some(cls => {
    const classData = CLASSES[cls.classId];
    return classData?.savingThrows.includes(statKey);
  });

  return modifier + (hasProficiency ? proficiencyBonus : 0);
}

export function getSkillBonus(character, skillKey, skillData) {
  const modifier = getStatModifier(character.stats[skillData.stat]);
  const proficiencyBonus = getProficiencyBonus(character);

  const prof = character.skills?.[skillKey] ?? PROFICIENCY.NONE;

  switch (prof) {
    case PROFICIENCY.PROFICIENT:
      return modifier + proficiencyBonus;
    case PROFICIENCY.EXPERTISE:
      return modifier + proficiencyBonus * 2;
    case PROFICIENCY.HALF:
      return modifier + Math.floor(proficiencyBonus / 2);
    default:
      return modifier;
  }
}

// ==================================================
// COMBAT
// ==================================================

export function getInitiative(character) {
  return getStatModifier(character.stats.dexterity);
}

export function getArmorClass(character) {
  const dexMod = getStatModifier(character.stats.dexterity);

  // Без броні
  if (!character.armor) {
    if (character.classes.some(c => c.classId === CLASSES.monk.id)) {
      return 10 + dexMod + getStatModifier(character.stats.wisdom);
    }

    if (character.classes.some(c => c.classId === CLASSES.barbarian.id)) {
      return 10 + dexMod + getStatModifier(character.stats.constitution);
    }

    return 10 + dexMod;
  }

  let ac = character.armor.baseAC;

  switch (character.armor.dexModifier) {
    case "full":
      ac += dexMod;
      break;

    case "max2":
      ac += Math.min(dexMod, 2);
      break;

    case "none":
      break;
  }

  return ac;
}

// ==================================================
// HIT POINTS
// ==================================================

export function getMaxHp(character) {
  return character.maxHp;
}

// ==================================================
// SPELL SLOTS
// ==================================================

export function getSpellSlots(character) {
  const caster = character.classes.find(cls => {
    const classData = CLASSES[cls.classId];
    return classData?.spellcasting;
  });

  if (!caster) return null;

  const classData = CLASSES[caster.classId];
  const table = classData.spellcasting.slotsTable;

  if (table === FULL_CASTER_SLOTS) return FULL_CASTER_SLOTS[caster.level];
  if (table === HALF_CASTER_SLOTS) return HALF_CASTER_SLOTS[caster.level];
  if (table === THIRD_CASTER_SLOTS) return THIRD_CASTER_SLOTS[caster.level];
  if (table === PACT_MAGIC_SLOTS) return PACT_MAGIC_SLOTS[caster.level];

  return null;
}

// ==================================================
// PASSIVE SKILLS
// ==================================================

export function getPassivePerception(character) {
  return (
    10 +
    getSkillBonus(character, "perception", {
      stat: "wisdom"
    })
  );
}