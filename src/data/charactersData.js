import { PROFICIENCY } from "./rulesData.js";
import { RACES } from "./racesData.js";
import { CLASSES } from "./classesData.js";
import { WEAPONS } from "./weaponsData.js";
import { ARMOR } from "./armorData.js";

// ==================================================
// CHARACTERS
// ==================================================

export let characters = [

  {
    id: 1,
    name: "Severus Grey",

    race: {
      race: RACES.human,
      subrace: null
    },

    classes: [
      {
        classId: CLASSES.warlock.id,
        level: 7,
        subclassId: "fiend"
      }
    ],

    stats: {
      strength: 16,
      dexterity: 14,
      constitution: 15,
      intelligence: 10,
      wisdom: 12,
      charisma: 18
    },

    maxHp: 45,

    armor: ARMOR.leather,

    weapons: [
      WEAPONS.dagger
    ],

    skills: {
      stealth: PROFICIENCY.EXPERTISE,
      arcana: PROFICIENCY.PROFICIENT,
      perception: PROFICIENCY.PROFICIENT,
      deception: PROFICIENCY.PROFICIENT
    },

    combat: {
      currentHp: 45,
      tempHp: 0,
      usedHitDice: 0,
      deathSaves: {
        success: 0,
        fail: 0
      },
      inspiration: false
    }
  },

  {
    id: 2,
    name: "Monty",

    race: {
      race: RACES.elf,
      subrace: RACES.elf.subraces.highElf
    },

    classes: [
      {
        classId: CLASSES.monk.id,
        level: 3,
        subclassId: "shadow"
      }
    ],

    stats: {
      strength: 10,
      dexterity: 18,
      constitution: 14,
      intelligence: 12,
      wisdom: 16,
      charisma: 8
    },

    maxHp: 24,

    armor: null,

    weapons: [
      WEAPONS.quarterstaff,
      WEAPONS.dagger
    ],

    skills: {
      stealth: PROFICIENCY.PROFICIENT,
      acrobatics: PROFICIENCY.PROFICIENT,
      perception: PROFICIENCY.PROFICIENT
    },

    combat: {
      currentHp: 24,
      tempHp: 0,
      usedHitDice: 0,
      deathSaves: {
        success: 0,
        fail: 0
      },
      inspiration: false
    }
  },

  {
    id: 3,
    name: "Ian",

    race: {
      race: RACES.elf,
      subrace: RACES.elf.subraces.drow
    },

    classes: [
      {
        classId: CLASSES.rogue.id,
        level: 2,
        subclassId: null
      }
    ],

    stats: {
      strength: 8,
      dexterity: 18,
      constitution: 13,
      intelligence: 14,
      wisdom: 12,
      charisma: 14
    },

    maxHp: 17,

    armor: ARMOR.leather,

    weapons: [
      WEAPONS.shortsword,
      WEAPONS.dagger
    ],

    skills: {
      stealth: PROFICIENCY.EXPERTISE,
      sleightOfHand: PROFICIENCY.PROFICIENT,
      deception: PROFICIENCY.PROFICIENT,
      investigation: PROFICIENCY.PROFICIENT
    },

    combat: {
      currentHp: 17,
      tempHp: 0,
      usedHitDice: 0,
      deathSaves: {
        success: 0,
        fail: 0
      },
      inspiration: false
    }
  }

];

// ==================================================
// CHARACTERS API
// ==================================================

export function getCharacters() {
  return characters;
}

export function getCharacterById(id) {
  return characters.find(character => character.id === id);
}

export function addCharacter(character) {
  characters.push(character);
}

export function updateCharacter(updatedCharacter) {
  const index = characters.findIndex(c => c.id === updatedCharacter.id);

  if (index !== -1) {
    characters[index] = updatedCharacter;
  }
}

export function removeCharacter(id) {
  characters = characters.filter(c => c.id !== id);
}

export function generateCharacterId() {
  return characters.length === 0
    ? 1
    : Math.max(...characters.map(c => c.id)) + 1;
}