import { PROFICIENCY } from "../data/rulesData.js";
import { CLASSES } from "../data/classesData.js";
import {
  getEquipmentBonuses,
  getEffectiveAbilityScore,
  getEquippedArmor,
  getEquippedShield
} from "./inventoryService.js";
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


export function getHitDiceTotal(character) {
  return (character.classes ?? []).reduce(
    (sum, cls) => sum + Number(cls.level ?? 0),
    0
  );
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
  const modifier = getStatModifier(
    getEffectiveAbilityScore(character, statKey)
  );
  const proficiencyBonus = getProficiencyBonus(character);
  const equipmentBonus = Number(
    getEquipmentBonuses(character).saveBonuses?.[statKey] ?? 0
  );

  const hasProficiency = character.classes.some(cls => {
    const classData = CLASSES[cls.classId];
    return classData?.savingThrows.includes(statKey);
  });

  return modifier +
    (hasProficiency ? proficiencyBonus : 0) +
    equipmentBonus;
}

export function getSkillBonus(character, skillKey, skillData) {
  const modifier = getStatModifier(
    getEffectiveAbilityScore(character, skillData.stat)
  );
  const proficiencyBonus = getProficiencyBonus(character);
  const equipment = getEquipmentBonuses(character);
  const characterProficiency = character.skills?.[skillKey];
  const itemProficiency = equipment.skillProficiencies?.[skillKey];
  const prof =
    characterProficiency && characterProficiency !== PROFICIENCY.NONE
      ? characterProficiency
      : itemProficiency ?? characterProficiency ?? PROFICIENCY.NONE;
  const flatBonus = Number(equipment.skillBonuses?.[skillKey] ?? 0);

  let bonus = modifier;

  switch (prof) {
    case PROFICIENCY.PROFICIENT:
      bonus += proficiencyBonus;
      break;
    case PROFICIENCY.EXPERTISE:
      bonus += proficiencyBonus * 2;
      break;
    case PROFICIENCY.HALF:
      bonus += Math.floor(proficiencyBonus / 2);
      break;
  }

  return bonus + flatBonus;
}

// ==================================================
// COMBAT
// ==================================================

export function getInitiative(character) {
  return getStatModifier(
    getEffectiveAbilityScore(character, "dexterity")
  ) + Number(getEquipmentBonuses(character).initiativeBonus ?? 0);
}

export function getArmorClass(character) {
  const armor = getEquippedArmor(character);
  const shield = getEquippedShield(character);

  const dexMod = getStatModifier(
    getEffectiveAbilityScore(character, "dexterity")
  );

  let ac;

  if (!armor) {
    const effectiveWisdom = getEffectiveAbilityScore(character, "wisdom");
    const effectiveConstitution = getEffectiveAbilityScore(character, "constitution");

    if (character.classes.some(c => c.classId === CLASSES.monk.id)) {
      ac = 10 + dexMod + getStatModifier(effectiveWisdom);
    } else if (character.classes.some(c => c.classId === CLASSES.barbarian.id)) {
      ac = 10 + dexMod + getStatModifier(effectiveConstitution);
    } else {
      ac = 10 + dexMod;
    }
  } else {
    ac = Number(armor.baseAC ?? 10);

    switch (armor.dexModifier) {
      case "full":
        ac += dexMod;
        break;

      case "max2":
        ac += Math.min(dexMod, 2);
        break;

      case "none":
      default:
        break;
    }
  }

  ac += Number(shield?.acBonus ?? 0);
  ac += Number(getEquipmentBonuses(character).acBonus ?? 0);

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

// ==================================================
// WEAPON CALCULATIONS
// ==================================================

export function getWeaponAbilityScore(character, weapon) {
  const strength = getEffectiveAbilityScore(character, "strength");
  const dexterity = getEffectiveAbilityScore(character, "dexterity");

  if (weapon?.properties?.includes("finesse")) {
    return Math.max(strength, dexterity);
  }

  return weapon?.type === "ranged" ? dexterity : strength;
}

export function getWeaponAttackBonus(character, weapon) {
  const abilityModifier = getStatModifier(
    getWeaponAbilityScore(character, weapon)
  );
  const proficiencyBonus = getProficiencyBonus(character);
  const itemBonus = Number(weapon?.effects?.attackBonus ?? 0);

  return abilityModifier + proficiencyBonus + itemBonus;
}

export function getWeaponDamageBonus(character, weapon) {
  const abilityModifier = getStatModifier(
    getWeaponAbilityScore(character, weapon)
  );
  const itemBonus = Number(weapon?.effects?.damageBonus ?? 0);

  return abilityModifier + itemBonus;
}
