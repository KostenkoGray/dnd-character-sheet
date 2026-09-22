import { WEAPONS, WEAPON_PROFICIENCIES } from "./weaponsData.js";
import { ARMOR_PROFICIENCIES } from "./armorData.js";
import {
  FULL_CASTER_SLOTS,
  HALF_CASTER_SLOTS,
  THIRD_CASTER_SLOTS,
  PACT_MAGIC_SLOTS
} from "./spellSlotsData.js";

export const CLASSES = {

  // ==================================================
  // BARBARIAN
  // ==================================================

  barbarian: {
    id: "barbarian",
    name: "Barbarian",
    ukr: "Варвар",

    hitDie: 12,

    savingThrows: ["strength", "constitution"],

    weaponProficiencies: [
      WEAPON_PROFICIENCIES.SIMPLE,
      WEAPON_PROFICIENCIES.MARTIAL
    ],

    armorProficiencies: [
      ARMOR_PROFICIENCIES.LIGHT,
      ARMOR_PROFICIENCIES.MEDIUM,
      ARMOR_PROFICIENCIES.SHIELD
    ],

    toolProficiencies: [],

    skillChoices: {
      count: 2,
      options: [
        "animalHandling",
        "athletics",
        "intimidation",
        "nature",
        "perception",
        "survival"
      ]
    },

    // =========================================
    // ПРОГРЕСІЯ РЕСУРСІВ
    // Зберігаємо тільки рівні, де значення змінюється.
    // =========================================

    resourcesByLevel: {
      rage: {
        1: 2,
        3: 3,
        6: 4,
        12: 5,
        17: 6,
        20: -1 // Необмежена Rage.
      },

      rageDamageBonus: {
        1: 2,
        9: 3,
        16: 4
      },

      brutalCriticalDice: {
        9: 1,
        13: 2,
        17: 3
      }
    },

    // =========================================
    // ФІЧІ КЛАСУ
    // Тільки рівні, де персонаж отримує нову фічу.
    // =========================================

    featuresByLevel: {
      1: ["rage", "unarmoredDefenseBarbarian"],
      2: ["recklessAttack", "dangerSense"],
      5: ["extraAttack", "fastMovement"],
      7: ["feralInstinct"],
      9: ["brutalCritical"],
      11: ["relentlessRage"],
      15: ["persistentRage"],
      18: ["indomitableMight"],
      20: ["primalChampion"]
    },

    // =========================================
    // АРХЕТИПИ (PHB 2014)
    // =========================================

    subclasses: {

      berserker: {
        id: "berserker",
        name: "Path of the Berserker",
        ukr: "Шлях Берсерка",

        featuresByLevel: {
          3: ["frenzy"],
          6: ["mindlessRage"],
          10: ["intimidatingPresence"],
          14: ["retaliation"]
        }
      },

      totemWarrior: {
        id: "totemWarrior",
        name: "Path of the Totem Warrior",
        ukr: "Шлях Воїна Тотема",

        featuresByLevel: {
          3: ["spiritSeeker", "totemSpiritChoice"],
          6: ["aspectOfTheBeast"],
          10: ["spiritWalker"],
          14: ["totemicAttunement"]
        }
      }

    }
  },
// ==================================================
// BARD
// ==================================================

bard: {
  id: "bard",
  name: "Bard",
  ukr: "Бард",

  hitDie: 8,

  savingThrows: ["dexterity", "charisma"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT
  ],

  toolProficiencies: {
    count: 3,
    options: ["musicalInstrument"] // будь-які 3 музичні інструменти
  },

  skillChoices: {
    count: 3,
    options: "any" // будь-які 3 навички
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
    ability: "charisma",
    preparation: "known",
    ritualCasting: true,

    slotsTable: FULL_CASTER_SLOTS,
    
    cantripsKnown: {
      1: 2,
      4: 3,
      10: 4
    }
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {

    bardicInspiration: {
      1: 2,
      5: 3,
      10: 4,
      15: 5
    },

    bardicInspirationDie: {
      1: "d6",
      5: "d8",
      10: "d10",
      15: "d12"
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["bardicInspiration", "spellcasting"],
    2: ["jackOfAllTrades", "songOfRest"],
    3: ["expertise"],
    5: ["fontOfInspiration"],
    10: ["expertise", "magicalSecrets"],
    18: ["magicalSecrets"],
    20: ["superiorInspiration"]
  },

  // =========================================
  // АРХЕТИПИ PHB 2014
  // =========================================

  subclasses: {

    lore: {
      id: "lore",
      name: "College of Lore",
      ukr: "Колегія Знань",

      featuresByLevel: {
        3: ["bonusProficiencies", "cuttingWords"],
        6: ["additionalMagicalSecrets"],
        14: ["peerlessSkill"]
      }
    },

    valor: {
      id: "valor",
      name: "College of Valor",
      ukr: "Колегія Доблесті",

      featuresByLevel: {
        3: ["combatInspiration", "valorBonusProficiencies"],
        6: ["extraAttack"],
        14: ["battleMagic"]
      }
    }

  }
},
// ==================================================
// CLERIC
// ==================================================

cleric: {
  id: "cleric",
  name: "Cleric",
  ukr: "Жрець",

  hitDie: 8,

  savingThrows: [
    "wisdom",
    "charisma"
  ],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT,
    ARMOR_PROFICIENCIES.MEDIUM,
    ARMOR_PROFICIENCIES.SHIELD
  ],

  toolProficiencies: [],

  skillChoices: {
    count: 2,
    options: [
      "history",
      "insight",
      "medicine",
      "persuasion",
      "religion"
    ]
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
    ability: "wisdom",
    preparation: "prepared",
    ritualCasting: true,

slotsTable: FULL_CASTER_SLOTS,
    
    cantripsKnown: {
      1: 3,
      4: 4,
      10: 5
    }
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {
    channelDivinity: {
      2: 1,
      6: 2,
      18: 3
    },

    destroyUndeadCR: {
      5: "1/2",
      8: 1,
      11: 2,
      14: 3,
      17: 4
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["spellcasting", "divineDomain"],
    2: ["channelDivinity", "turnUndead"],
    5: ["destroyUndead"],
    8: ["divineDomainFeature"],
    10: ["divineIntervention"],
    17: ["divineDomainFeature"],
    20: ["improvedDivineIntervention"]
  },

  // =========================================
  // ДОМЕНИ PHB 2014
  // =========================================

  subclasses: {

    knowledge: {
      id: "knowledge",
      name: "Knowledge Domain",
      ukr: "Домен Знання",

      featuresByLevel: {
        1: ["blessingsOfKnowledge"],
        2: ["knowledgeOfTheAges"],
        6: ["readThoughts"],
        8: ["potentSpellcasting"],
        17: ["visionsOfThePast"]
      }
    },

    life: {
      id: "life",
      name: "Life Domain",
      ukr: "Домен Життя",

      featuresByLevel: {
        1: ["discipleOfLife"],
        2: ["preserveLife"],
        6: ["blessedHealer"],
        8: ["divineStrike"],
        17: ["supremeHealing"]
      }
    },

    light: {
      id: "light",
      name: "Light Domain",
      ukr: "Домен Світла",

      featuresByLevel: {
        1: ["wardingFlare"],
        2: ["radianceOfTheDawn"],
        6: ["improvedWardingFlare"],
        8: ["potentSpellcasting"],
        17: ["coronaOfLight"]
      }
    },

    nature: {
      id: "nature",
      name: "Nature Domain",
      ukr: "Домен Природи",

      featuresByLevel: {
        1: ["acolyteOfNature"],
        2: ["charmAnimalsAndPlants"],
        6: ["dampenElements"],
        8: ["divineStrike"],
        17: ["masterOfNature"]
      }
    },

    tempest: {
      id: "tempest",
      name: "Tempest Domain",
      ukr: "Домен Бурі",

      featuresByLevel: {
        1: ["wrathOfTheStorm"],
        2: ["destructiveWrath"],
        6: ["thunderboltStrike"],
        8: ["divineStrike"],
        17: ["stormborn"]
      }
    },

    trickery: {
      id: "trickery",
      name: "Trickery Domain",
      ukr: "Домен Обману",

      featuresByLevel: {
        1: ["blessingOfTheTrickster"],
        2: ["invokeDuplicity"],
        6: ["cloakOfShadows"],
        8: ["divineStrike"],
        17: ["improvedDuplicity"]
      }
    },

    war: {
      id: "war",
      name: "War Domain",
      ukr: "Домен Війни",

      featuresByLevel: {
        1: ["warPriest"],
        2: ["guidedStrike"],
        6: ["warGodsBlessing"],
        8: ["divineStrike"],
        17: ["avatarOfBattle"]
      }
    }

  }
},
  // ==================================================
// DRUID
// ==================================================

druid: {
  id: "druid",
  name: "Druid",
  ukr: "Друїд",

  hitDie: 8,

  savingThrows: [
    "intelligence",
    "wisdom"
  ],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE,
  WEAPONS.scimitar
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT,
    ARMOR_PROFICIENCIES.MEDIUM,
    ARMOR_PROFICIENCIES.SHIELD
  ],

  toolProficiencies: [
    "herbalismKit"
  ],

  skillChoices: {
    count: 2,
    options: [
      "arcana",
      "animalHandling",
      "insight",
      "medicine",
      "nature",
      "perception",
      "religion",
      "survival"
    ]
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
    ability: "wisdom",
    preparation: "prepared",
    ritualCasting: true,

slotsTable: FULL_CASTER_SLOTS,
    
    cantripsKnown: {
      1: 2,
      4: 3,
      10: 4
    }
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {
    wildShape: {
      2: 2
    },

    wildShapeCR: {
      2: "1/4",
      4: "1/2",
      8: 1
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["druidic", "spellcasting"],
    2: ["wildShape", "druidCircle"],
    18: ["timelessBody", "beastSpells"],
    20: ["archdruid"]
  },

  // =========================================
  // КОЛА ДРУЇДА PHB 2014
  // =========================================

  subclasses: {

    land: {
      id: "land",
      name: "Circle of the Land",
      ukr: "Коло Землі",

      featuresByLevel: {
        2: ["bonusCantrip", "naturalRecovery"],
        6: ["landsStride"],
        10: ["naturesWard"],
        14: ["naturesSanctuary"]
      }
    },

    moon: {
      id: "moon",
      name: "Circle of the Moon",
      ukr: "Коло Місяця",

      featuresByLevel: {
        2: ["combatWildShape", "circleForms"],
        6: ["primalStrike"],
        10: ["elementalWildShape"],
        14: ["thousandForms"]
      }
    }

  }
},
  // ==================================================
// FIGHTER
// ==================================================

fighter: {
  id: "fighter",
  name: "Fighter",
  ukr: "Боєць",

  hitDie: 10,

  savingThrows: [
    "strength",
    "constitution"
  ],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE,
    WEAPON_PROFICIENCIES.MARTIAL
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT,
    ARMOR_PROFICIENCIES.MEDIUM,
    ARMOR_PROFICIENCIES.HEAVY,
    ARMOR_PROFICIENCIES.SHIELD
  ],

  toolProficiencies: [],

  skillChoices: {
    count: 2,
    options: [
      "acrobatics",
      "animalHandling",
      "athletics",
      "history",
      "insight",
      "intimidation",
      "perception",
      "survival"
    ]
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {

    secondWind: {
      1: 1
    },

    actionSurge: {
      2: 1,
      17: 2
    },

    indomitable: {
      9: 1,
      13: 2,
      17: 3
    },

    extraAttacks: {
      5: 2,
      11: 3,
      20: 4
    }

  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["fightingStyle", "secondWind"],
    2: ["actionSurge"],
    3: ["martialArchetype"],
    5: ["extraAttack"],
    9: ["indomitable"],
    11: ["extraAttack"],
    20: ["extraAttack"]
  },

  // =========================================
  // АРХЕТИПИ PHB 2014
  // =========================================

  subclasses: {

    champion: {
      id: "champion",
      name: "Champion",
      ukr: "Чемпіон",

      featuresByLevel: {
        3: ["improvedCritical"],
        7: ["remarkableAthlete"],
        10: ["additionalFightingStyle"],
        15: ["superiorCritical"],
        18: ["survivor"]
      }
    },

    battleMaster: {
      id: "battleMaster",
      name: "Battle Master",
      ukr: "Майстер бою",

      featuresByLevel: {
        3: ["combatSuperiority", "studentOfWar"],
        7: ["knowYourEnemy"],
        10: ["improvedCombatSuperiority"],
        15: ["relentlessBattleMaster"]
      }
    },

    eldritchKnight: {
      id: "eldritchKnight",
      name: "Eldritch Knight",
      ukr: "Містичний лицар",

      spellcasting: {
    ability: "intelligence",
    preparation: "known",
    ritualCasting: false,
    slotsTable: THIRD_CASTER_SLOTS
      },
      
      featuresByLevel: {
        3: ["weaponBond", "eldritchKnightSpellcasting"],
        7: ["warMagic"],
        10: ["eldritchStrike"],
        15: ["arcaneCharge"],
        18: ["improvedWarMagic"]
      }
    }

  }
},
  // ==================================================
// MONK
// ==================================================

monk: {
  id: "monk",
  name: "Monk",
  ukr: "Монах",

  hitDie: 8,

  savingThrows: ["strength", "dexterity"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE,
  WEAPONS.shortsword
  ],

  armorProficiencies: [],

  toolProficiencies: {
    count: 1,
    options: ["artisanTools", "musicalInstrument"]
  },

  skillChoices: {
    count: 2,
    options: [
      "acrobatics",
      "athletics",
      "history",
      "insight",
      "religion",
      "stealth"
    ]
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {

    ki: {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      19: 19,
      20: 20
    },

    martialArtsDie: {
      1: "d4",
      5: "d6",
      11: "d8",
      17: "d10"
    },

    unarmoredMovement: {
      2: 10,
      6: 15,
      10: 20,
      14: 25,
      18: 30
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["martialArts", "unarmoredDefenseMonk"],
    2: ["ki", "unarmoredMovement"],
    3: ["monasticTradition", "deflectMissiles"],
    4: ["slowFall"],
    5: ["extraAttack", "stunningStrike"],
    6: ["kiEmpoweredStrikes"],
    7: ["evasion", "stillnessOfMind"],
    10: ["purityOfBody"],
    13: ["tongueOfTheSunAndMoon"],
    14: ["diamondSoul"],
    15: ["timelessBodyMonk"],
    18: ["emptyBody"],
    20: ["perfectSelf"]
  },

  // =========================================
  // АРХЕТИПИ PHB 2014
  // =========================================

  subclasses: {

    openHand: {
      id: "openHand",
      name: "Way of the Open Hand",
      ukr: "Шлях Відкритої Долоні",

      featuresByLevel: {
        3: ["openHandTechnique"],
        6: ["wholenessOfBody"],
        11: ["tranquility"],
        17: ["quiveringPalm"]
      }
    },

    shadow: {
      id: "shadow",
      name: "Way of Shadow",
      ukr: "Шлях Тіні",

      featuresByLevel: {
        3: ["shadowArts"],
        6: ["shadowStep"],
        11: ["cloakOfShadows"],
        17: ["opportunist"]
      }
    },

    fourElements: {
      id: "fourElements",
      name: "Way of the Four Elements",
      ukr: "Шлях Чотирьох Стихій",

      featuresByLevel: {
        3: ["discipleOfTheElements"],
        6: ["elementalAttunement"],
        11: ["additionalElementalDiscipline"],
        17: ["masterElementalDiscipline"]
      }
    }
  }
},
  // ==================================================
// PALADIN
// ==================================================

paladin: {
  id: "paladin",
  name: "Paladin",
  ukr: "Паладин",

  hitDie: 10,

  savingThrows: ["wisdom", "charisma"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE,
    WEAPON_PROFICIENCIES.MARTIAL
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT,
    ARMOR_PROFICIENCIES.MEDIUM,
    ARMOR_PROFICIENCIES.HEAVY,
    ARMOR_PROFICIENCIES.SHIELD
  ],

  toolProficiencies: [],

  skillChoices: {
    count: 2,
    options: [
      "athletics",
      "insight",
      "intimidation",
      "medicine",
      "persuasion",
      "religion"
    ]
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
  ability: "charisma",
  preparation: "prepared",
  ritualCasting: false,

  slotsTable: HALF_CASTER_SLOTS
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {
    layOnHands: {
      1: 5, 2: 10, 3: 15, 4: 20, 5: 25,
      6: 30, 7: 35, 8: 40, 9: 45, 10: 50,
      11: 55, 12: 60, 13: 65, 14: 70, 15: 75,
      16: 80, 17: 85, 18: 90, 19: 95, 20: 100
    },

    channelDivinity: {
      3: 1
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["divineSense", "layOnHands"],
    2: ["fightingStyle", "spellcasting", "divineSmite"],
    3: ["divineHealth", "sacredOath", "channelDivinity"],
    5: ["extraAttack"],
    6: ["auraOfProtection"],
    10: ["auraOfCourage"],
    11: ["improvedDivineSmite"],
    14: ["cleansingTouch"]
  },

  // =========================================
  // КЛЯТВИ PHB 2014
  // =========================================

  subclasses: {

    devotion: {
      id: "devotion",
      name: "Oath of Devotion",
      ukr: "Клятва Відданості",

      featuresByLevel: {
        3: ["sacredWeapon", "turnTheUnholy"],
        7: ["auraOfDevotion"],
        15: ["purityOfSpirit"],
        20: ["holyNimbus"]
      }
    },

    ancients: {
      id: "ancients",
      name: "Oath of the Ancients",
      ukr: "Клятва Прадавніх",

      featuresByLevel: {
        3: ["naturesWrath", "turnTheFaithless"],
        7: ["auraOfWarding"],
        15: ["undyingSentinel"],
        20: ["elderChampion"]
      }
    },

    vengeance: {
      id: "vengeance",
      name: "Oath of Vengeance",
      ukr: "Клятва Помсти",

      featuresByLevel: {
        3: ["abjureEnemy", "vowOfEnmity"],
        7: ["relentlessAvenger"],
        15: ["soulOfVengeance"],
        20: ["avengingAngel"]
      }
    }

  }
},
  // ==================================================
// RANGER
// ==================================================

ranger: {
  id: "ranger",
  name: "Ranger",
  ukr: "Следопит",

  hitDie: 10,

  savingThrows: [
    "strength",
    "dexterity"
  ],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE,
    WEAPON_PROFICIENCIES.MARTIAL
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT,
    ARMOR_PROFICIENCIES.MEDIUM,
    ARMOR_PROFICIENCIES.SHIELD
  ],

  toolProficiencies: [],

  skillChoices: {
    count: 3,
    options: [
      "animalHandling",
      "athletics",
      "insight",
      "investigation",
      "nature",
      "perception",
      "stealth",
      "survival"
    ]
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
  ability: "wisdom",
  preparation: "prepared",
  ritualCasting: false,

  slotsTable: HALF_CASTER_SLOTS
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["favoredEnemy", "naturalExplorer"],
    2: ["fightingStyle", "spellcasting"],
    3: ["rangerArchetype", "primevalAwareness"],
    5: ["extraAttack"],
    8: ["landsStride"],
    10: ["hideInPlainSight"],
    14: ["vanish"],
    18: ["feralSenses"],
    20: ["foeSlayer"]
  },

  // =========================================
  // АРХЕТИПИ PHB 2014
  // =========================================

  subclasses: {

    hunter: {
      id: "hunter",
      name: "Hunter",
      ukr: "Мисливець",

      featuresByLevel: {
        3: ["huntersPreyChoice"],
        7: ["defensiveTacticsChoice"],
        11: ["multiattackChoice"],
        15: ["superiorHuntersDefenseChoice"]
      }
    },

    beastMaster: {
      id: "beastMaster",
      name: "Beast Master",
      ukr: "Повелитель Звіра",

      featuresByLevel: {
        3: ["rangersCompanion"],
        7: ["exceptionalTraining"],
        11: ["bestialFury"],
        15: ["shareSpells"]
      }
    }

  }
},
  // ==================================================
// ROGUE
// ==================================================

rogue: {
  id: "rogue",
  name: "Rogue",
  ukr: "Розбійник",

  hitDie: 8,

  savingThrows: ["dexterity", "intelligence"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE,
  WEAPONS.handCrossbow,
  WEAPONS.longsword,
  WEAPONS.rapier,
  WEAPONS.shortsword
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT
  ],

  toolProficiencies: [
    "thievesTools"
  ],

  skillChoices: {
    count: 4,
    options: [
      "acrobatics", "athletics", "deception", "insight",
      "intimidation", "investigation", "perception",
      "performance", "persuasion", "sleightOfHand",
      "stealth", "survival"
    ]
  },

  // =========================================
  // ПРОГРЕСІЯ
  // =========================================

  resourcesByLevel: {

    sneakAttackDice: {
      1:"1d6", 3:"2d6", 5:"3d6", 7:"4d6", 9:"5d6",
      11:"6d6", 13:"7d6", 15:"8d6", 17:"9d6", 19:"10d6"
    }

  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["expertise", "sneakAttack", "thievesCant"],
    2: ["cunningAction"],
    3: ["roguishArchetype"],
    5: ["uncannyDodge"],
    6: ["expertise"],
    7: ["evasion"],
    11: ["reliableTalent"],
    14: ["blindsense"],
    15: ["slipperyMind"],
    18: ["elusive"],
    20: ["strokeOfLuck"]
  },

  // =========================================
  // АРХЕТИПИ PHB 2014
  // =========================================

  subclasses: {

    thief: {
      id: "thief",
      name: "Thief",
      ukr: "Злодій",

      featuresByLevel: {
        3: ["fastHands", "secondStoryWork"],
        9: ["supremeSneak"],
        13: ["useMagicDevice"],
        17: ["thiefsReflexes"]
      }
    },

    assassin: {
      id: "assassin",
      name: "Assassin",
      ukr: "Вбивця",

      featuresByLevel: {
        3: ["assassinate"],
        9: ["infiltrationExpertise"],
        13: ["impostor"],
        17: ["deathStrike"]
      }
    },

    arcaneTrickster: {
      id: "arcaneTrickster",
      name: "Arcane Trickster",
      ukr: "Містичний шахрай",

spellcasting: {
    ability: "intelligence",
    preparation: "known",
    ritualCasting: false,
    slotsTable: THIRD_CASTER_SLOTS
},

      featuresByLevel: {
        3: ["arcaneTricksterSpellcasting", "mageHandLegerdemain"],
        9: ["magicalAmbush"],
        13: ["versatileTrickster"],
        17: ["spellThief"]
      }
    }

  }
},
  // ==================================================
// SORCERER
// ==================================================

sorcerer: {
  id: "sorcerer",
  name: "Sorcerer",
  ukr: "Чаклун",

  hitDie: 6,

  savingThrows: ["constitution", "charisma"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE
  ],

  armorProficiencies: [],

  toolProficiencies: [],

  skillChoices: {
    count: 2,
    options: [
      "arcana",
      "deception",
      "insight",
      "intimidation",
      "persuasion",
      "religion"
    ]
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
    ability: "charisma",
    preparation: "known",
    ritualCasting: false,

    slotsTable: FULL_CASTER_SLOTS,

    cantripsKnown: {
      1: 4,
      4: 5,
      10: 6
    }
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {
    sorceryPoints: {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      19: 19,
      20: 20
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["spellcasting", "sorcerousOrigin"],
    2: ["fontOfMagic"],
    3: ["metamagic"],
    20: ["sorcerousRestoration"]
  },

  // =========================================
  // АРХЕТИПИ PHB 2014
  // =========================================

  subclasses: {

    draconicBloodline: {
      id: "draconicBloodline",
      name: "Draconic Bloodline",
      ukr: "Драконяча кров",

      featuresByLevel: {
        1: ["dragonAncestor", "draconicResilience"],
        6: ["elementalAffinity"],
        14: ["dragonWings"],
        18: ["draconicPresence"]
      }
    },

    wildMagic: {
      id: "wildMagic",
      name: "Wild Magic",
      ukr: "Дика магія",

      featuresByLevel: {
        1: ["wildMagicSurge", "tidesOfChaos"],
        6: ["bendLuck"],
        14: ["controlledChaos"],
        18: ["spellBombardment"]
      }
    }

  }
},
  // ==================================================
// WARLOCK
// ==================================================

warlock: {
  id: "warlock",
  name: "Warlock",
  ukr: "Варлок",

  hitDie: 8,

  savingThrows: ["wisdom", "charisma"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE
  ],

  armorProficiencies: [
    ARMOR_PROFICIENCIES.LIGHT
  ],

  toolProficiencies: [],

  skillChoices: {
    count: 2,
    options: [
      "arcana",
      "deception",
      "history",
      "intimidation",
      "investigation",
      "nature",
      "religion"
    ]
  },

  // =========================================
  // PACT MAGIC
  // =========================================

  spellcasting: {
    ability: "charisma",
    preparation: "known",
    ritualCasting: false,
    pactMagic: true,

    slotsTable: PACT_MAGIC_SLOTS,

    cantripsKnown: {
      1: 2,
      4: 3,
      10: 4
    }
  },

  // =========================================
  // РЕСУРСИ
  // =========================================

  resourcesByLevel: {

    invocationsKnown: {
      2: 2,
      5: 3,
      7: 4,
      9: 5,
      12: 6,
      15: 7,
      18: 8
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["otherworldlyPatron", "spellcasting"],
    2: ["eldritchInvocations"],
    3: ["pactBoon"],
    11: ["mysticArcanum"],
    20: ["eldritchMaster"]
  },

  // =========================================
  // ПОКРОВИТЕЛІ PHB 2014
  // =========================================

  subclasses: {

    fiend: {
      id: "fiend",
      name: "The Fiend",
      ukr: "Пекельний Покровитель",

      featuresByLevel: {
        1: ["darkOnesBlessing"],
        6: ["darkOnesOwnLuck"],
        10: ["fiendishResilience"],
        14: ["hurlThroughHell"]
      }
    },

    archfey: {
      id: "archfey",
      name: "The Archfey",
      ukr: "Архіфея",

      featuresByLevel: {
        1: ["feyPresence"],
        6: ["mistyEscape"],
        10: ["beguilingDefenses"],
        14: ["darkDelirium"]
      }
    },

    greatOldOne: {
      id: "greatOldOne",
      name: "The Great Old One",
      ukr: "Великий Прадавній",

      featuresByLevel: {
        1: ["awakenedMind"],
        6: ["entropicWard"],
        10: ["thoughtShield"],
        14: ["createThrall"]
      }
    }

  }
},
  // ==================================================
// WIZARD
// ==================================================

wizard: {
  id: "wizard",
  name: "Wizard",
  ukr: "Маг",

  hitDie: 6,

  savingThrows: ["intelligence", "wisdom"],

  weaponProficiencies: [
    WEAPON_PROFICIENCIES.SIMPLE
  ],

  armorProficiencies: [],

  toolProficiencies: [],

  skillChoices: {
    count: 2,
    options: [
      "arcana",
      "history",
      "insight",
      "investigation",
      "medicine",
      "religion"
    ]
  },

  // =========================================
  // МАГІЯ
  // =========================================

  spellcasting: {
    ability: "intelligence",
    preparation: "prepared",
    ritualCasting: true,

    slotsTable: FULL_CASTER_SLOTS,

    cantripsKnown: {
      1: 3,
      4: 4,
      10: 5
    }
  },

  // =========================================
  // ФІЧІ
  // =========================================

  featuresByLevel: {
    1: ["spellcasting", "arcaneRecovery"],
    2: ["arcaneTradition"],
    18: ["spellMastery"],
    20: ["signatureSpells"]
  },

  // =========================================
  // АРКАННІ ТРАДИЦІЇ PHB 2014
  // =========================================

  subclasses: {

    abjuration: {
      id: "abjuration",
      ukr: "Школа Захисту",
      featuresByLevel: {
        2: ["arcaneWard"],
        6: ["projectedWard"],
        10: ["improvedAbjuration"],
        14: ["spellResistance"]
      }
    },

    evocation: {
      id: "evocation",
      ukr: "Школа Евокації",
      featuresByLevel: {
        2: ["sculptSpells"],
        6: ["potentCantrip"],
        10: ["empoweredEvocation"],
        14: ["overchannel"]
      }
    },

    illusion: {
      id: "illusion",
      ukr: "Школа Ілюзій",
      featuresByLevel: {
        2: ["improvedMinorIllusion"],
        6: ["malleableIllusions"],
        10: ["illusorySelf"],
        14: ["illusoryReality"]
      }
    },

    necromancy: {
      id: "necromancy",
      ukr: "Школа Некромантії",
      featuresByLevel: {
        2: ["grimHarvest"],
        6: ["undeadThralls"],
        10: ["inuredToUndeath"],
        14: ["commandUndead"]
      }
    },

    divination: {
      id: "divination",
      ukr: "Школа Віщування",
      featuresByLevel: {
        2: ["portent"],
        6: ["expertDivination"],
        10: ["thirdEye"],
        14: ["greaterPortent"]
      }
    },

    enchantment: {
      id: "enchantment",
      ukr: "Школа Зачарування",
      featuresByLevel: {
        2: ["hypnoticGaze"],
        6: ["instinctiveCharm"],
        10: ["splitEnchantment"],
        14: ["alterMemories"]
      }
    },

    conjuration: {
      id: "conjuration",
      ukr: "Школа Виклику",
      featuresByLevel: {
        2: ["minorConjuration"],
        6: ["benignTransposition"],
        10: ["focusedConjuration"],
        14: ["durableSummons"]
      }
    },

    transmutation: {
      id: "transmutation",
      ukr: "Школа Трансмутації",
      featuresByLevel: {
        2: ["minorAlchemy"],
        6: ["transmutersStone"],
        10: ["shapechanger"],
        14: ["masterTransmuter"]
      }
    }

  }
}

};
