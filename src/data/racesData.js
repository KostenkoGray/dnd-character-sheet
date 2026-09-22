import { SIZES, LANGUAGES, DAMAGE_TYPES, TOOLS } from "./rulesData.js";
import { WEAPONS } from "./weaponsData.js";
import { ARMOR_PROFICIENCIES } from "./armorData.js";

// ==================================================
// DRAGONBORN — DRACONIC ANCESTRY
// ==================================================

export const DRACONIC_ANCESTRY = {
  black: { name: "Black", damageType: DAMAGE_TYPES.ACID },
  blue: { name: "Blue", damageType: DAMAGE_TYPES.LIGHTNING },
  brass: { name: "Brass", damageType: DAMAGE_TYPES.FIRE },
  bronze: { name: "Bronze", damageType: DAMAGE_TYPES.LIGHTNING },
  copper: { name: "Copper", damageType: DAMAGE_TYPES.ACID },
  gold: { name: "Gold", damageType: DAMAGE_TYPES.FIRE },
  green: { name: "Green", damageType: DAMAGE_TYPES.POISON },
  red: { name: "Red", damageType: DAMAGE_TYPES.FIRE },
  silver: { name: "Silver", damageType: DAMAGE_TYPES.COLD },
  white: { name: "White", damageType: DAMAGE_TYPES.COLD }
};

// ==================================================
// PHB 2014 RACES
// ==================================================

export const RACES = {

  dwarf: {
    id: "dwarf",
    name: "Dwarf",
    ukr: "Дворф",

    size: SIZES.MEDIUM,
    speed: 25,
    darkvision: 60,

    abilityScoreIncrease: {
      constitution: 2
    },

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.DWARVISH
    ],

    weaponProficiencies: [
      WEAPONS.battleaxe,
      WEAPONS.handaxe,
      WEAPONS.lightHammer,
      WEAPONS.warhammer
    ],

    toolProficienciesChoice: {
      count: 1,
      options: [
        TOOLS.SMITHS_TOOLS,
        TOOLS.BREWERS_SUPPLIES,
        TOOLS.MASONS_TOOLS
      ]
    },

    subraces: {
      hillDwarf: {
        id: "hillDwarf",
        name: "Hill Dwarf",
        ukr: "Пагорбовий дворф"
      },

      mountainDwarf: {
        id: "mountainDwarf",
        name: "Mountain Dwarf",
        ukr: "Гірський дворф",

        armorProficiencies: [
          ARMOR_PROFICIENCIES.LIGHT,
          ARMOR_PROFICIENCIES.MEDIUM
        ]
      }
    }
  },

  elf: {
    id: "elf",
    name: "Elf",
    ukr: "Ельф",

    size: SIZES.MEDIUM,
    speed: 30,
    darkvision: 60,

    abilityScoreIncrease: {
      dexterity: 2
    },

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.ELVISH
    ],

    skillProficiencies: [
      "perception"
    ],

    subraces: {
      highElf: {
        id: "highElf",
        name: "High Elf",
        ukr: "Високий ельф"
      },

      woodElf: {
        id: "woodElf",
        name: "Wood Elf",
        ukr: "Лісовий ельф"
      },

      drow: {
        id: "drow",
        name: "Drow",
        ukr: "Дроу"
      }
    }
  },

  halfling: {
    id: "halfling",
    name: "Halfling",
    ukr: "Галфлінг",

    size: SIZES.SMALL,
    speed: 25,

    abilityScoreIncrease: {
      dexterity: 2
    },

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.HALFLING
    ],

    subraces: {
      lightfoot: {
        id: "lightfoot",
        name: "Lightfoot",
        ukr: "Легконогий"
      },

      stout: {
        id: "stout",
        name: "Stout",
        ukr: "Кремезний"
      }
    }
  },

  human: {
    id: "human",
    name: "Human",
    ukr: "Людина",

    size: SIZES.MEDIUM,
    speed: 30,

    languages: [
      LANGUAGES.COMMON
    ]
  },

  dragonborn: {
    id: "dragonborn",
    name: "Dragonborn",
    ukr: "Драконороджений",

    size: SIZES.MEDIUM,
    speed: 30,

    abilityScoreIncrease: {
      strength: 2,
      charisma: 1
    },

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.DRACONIC
    ],

    choices: {
      draconicAncestry: true
    }
  },

  gnome: {
    id: "gnome",
    name: "Gnome",
    ukr: "Гном",

    size: SIZES.SMALL,
    speed: 25,
    darkvision: 60,

    abilityScoreIncrease: {
      intelligence: 2
    },

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.GNOMISH
    ],

    subraces: {
      forestGnome: {
        id: "forestGnome",
        name: "Forest Gnome",
        ukr: "Лісовий гном"
      },

      rockGnome: {
        id: "rockGnome",
        name: "Rock Gnome",
        ukr: "Скельний гном"
      }
    }
  },

  halfElf: {
    id: "halfElf",
    name: "Half-Elf",
    ukr: "Напівельф",

    size: SIZES.MEDIUM,
    speed: 30,
    darkvision: 60,

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.ELVISH
    ]
  },

  halfOrc: {
    id: "halfOrc",
    name: "Half-Orc",
    ukr: "Напіворк",

    size: SIZES.MEDIUM,
    speed: 30,
    darkvision: 60,

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.ORC
    ]
  },

  tiefling: {
    id: "tiefling",
    name: "Tiefling",
    ukr: "Тіфлінг",

    size: SIZES.MEDIUM,
    speed: 30,
    darkvision: 60,

    languages: [
      LANGUAGES.COMMON,
      LANGUAGES.INFERNAL
    ]
  }

};