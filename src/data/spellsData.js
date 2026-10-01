// D&D 5e Character Sheet — Spell Data
// PHB 2014 catalogue. Character state stores only spellId references.

export const SPELL_SCHOOLS = {
  "A": "abjuration",
  "C": "conjuration",
  "D": "divination",
  "E": "enchantment",
  "V": "evocation",
  "I": "illusion",
  "N": "necromancy",
  "T": "transmutation"
};
export const SPELL_SCHOOL_LABELS = {
  "abjuration": "Огородження",
  "conjuration": "Виклик",
  "divination": "Пророцтво",
  "enchantment": "Зачарування",
  "evocation": "Евокація",
  "illusion": "Ілюзія",
  "necromancy": "Некромантія",
  "transmutation": "Трансмутація"
};
export const SPELL_EFFECT_TYPES = { ATTACK:"attack", SAVE:"save", UTILITY:"utility", HEALING:"healing", BUFF:"buff", DEBUFF:"debuff" };
export const SPELL_EFFECT_TYPE_LABELS = { attack:"Атака", save:"Ряткидок", utility:"Утилітарне", healing:"Лікування", buff:"Посилення", debuff:"Послаблення" };
export const SPELLS = {
  "acidSplash": {
    "id": "acidSplash",
    "name": "Acid Splash",
    "ukr": "Acid Splash",
    "level": 0,
    "type": "cantrip",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "acid",
    "areaTags": [
      "MT",
      "ST"
    ],
    "damage": {
      "label": "acid damage",
      "scaling": {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6"
      }
    },
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "page": 211,
    "source": "PHB 2014"
  },
  "aid": {
    "id": "aid",
    "name": "Aid",
    "ukr": "aid",
    "level": 2,
    "type": "spell",
    "school": "abjuration",
    "effectType": "healing",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny strip of white cloth",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 211,
    "source": "PHB 2014"
  },
  "alarm": {
    "id": "alarm",
    "name": "Alarm",
    "ukr": "alarm",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "ranger",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny bell and a piece of fine silver wire",
    "duration": "8 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [],
    "page": 211,
    "source": "PHB 2014"
  },
  "alterSelf": {
    "id": "alterSelf",
    "name": "Alter Self",
    "ukr": "Alter Self",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "bludgeoning, piercing, slashing",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 211,
    "source": "PHB 2014"
  },
  "animalFriendship": {
    "id": "animalFriendship",
    "name": "Animal Friendship",
    "ukr": "Animal Friendship",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a morsel of food",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 212,
    "source": "PHB 2014"
  },
  "animalMessenger": {
    "id": "animalMessenger",
    "name": "Animal Messenger",
    "ukr": "Animal Messenger",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a morsel of food",
    "duration": "24 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 212,
    "source": "PHB 2014"
  },
  "animalShapes": {
    "id": "animalShapes",
    "name": "Animal Shapes",
    "ukr": "Animal Shapes",
    "level": 8,
    "type": "spell",
    "school": "transmutation",
    "effectType": "healing",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 212,
    "source": "PHB 2014"
  },
  "animateDead": {
    "id": "animateDead",
    "name": "Animate Dead",
    "ukr": "Animate Dead",
    "level": 3,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of blood, a piece of flesh, and a pinch of bone dust",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PRM",
      "SMN",
      "UBA"
    ],
    "page": 212,
    "source": "PHB 2014"
  },
  "animateObjects": {
    "id": "animateObjects",
    "name": "Animate Objects",
    "ukr": "Animate Objects",
    "level": 5,
    "type": "spell",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "bludgeoning, piercing, slashing",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SMN",
      "UBA"
    ],
    "page": 213,
    "source": "PHB 2014"
  },
  "antilifeShell": {
    "id": "antilifeShell",
    "name": "Antilife Shell",
    "ukr": "Antilife Shell",
    "level": 5,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 213,
    "source": "PHB 2014"
  },
  "antimagicField": {
    "id": "antimagicField",
    "name": "Antimagic Field",
    "ukr": "Antimagic Field",
    "level": 8,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of powdered iron or iron filings",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 213,
    "source": "PHB 2014"
  },
  "antipathySympathy": {
    "id": "antipathySympathy",
    "name": "Antipathy/Sympathy",
    "ukr": "Antipathy/Sympathy",
    "level": 8,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "either a lump of alum soaked in vinegar for the antipathy effect or a drop of honey for the sympathy effect",
    "duration": "10 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 214,
    "source": "PHB 2014"
  },
  "arcaneEye": {
    "id": "arcaneEye",
    "name": "Arcane Eye",
    "ukr": "Arcane Eye",
    "level": 4,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of bat fur",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 214,
    "source": "PHB 2014"
  },
  "arcaneGate": {
    "id": "arcaneGate",
    "name": "Arcane Gate",
    "ukr": "Arcane Gate",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "500 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT",
      "TP",
      "UBA"
    ],
    "page": 214,
    "source": "PHB 2014"
  },
  "arcaneLock": {
    "id": "arcaneLock",
    "name": "Arcane Lock",
    "ukr": "Arcane Lock",
    "level": 2,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 215,
    "source": "PHB 2014"
  },
  "armorOfAgathys": {
    "id": "armorOfAgathys",
    "name": "Armor of Agathys",
    "ukr": "Armor of Agathys",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "attack",
    "classes": [
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a cup of water",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "cold",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "THP"
    ],
    "page": 215,
    "source": "PHB 2014"
  },
  "armsOfHadar": {
    "id": "armsOfHadar",
    "name": "Arms of Hadar",
    "ukr": "Arms of Hadar",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "necrotic",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 215,
    "source": "PHB 2014"
  },
  "astralProjection": {
    "id": "astralProjection",
    "name": "Astral Projection",
    "ukr": "Astral Projection",
    "level": 9,
    "type": "spell",
    "school": "necromancy",
    "effectType": "healing",
    "classes": [
      "cleric",
      "warlock",
      "wizard",
      "monk"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "special",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "PRM",
      "PS"
    ],
    "page": 215,
    "source": "PHB 2014"
  },
  "augury": {
    "id": "augury",
    "name": "Augury",
    "ukr": "augury",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 215,
    "source": "PHB 2014"
  },
  "auraOfLife": {
    "id": "auraOfLife",
    "name": "Aura of Life",
    "ukr": "Aura of Life",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "healing",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 216,
    "source": "PHB 2014"
  },
  "auraOfPurity": {
    "id": "auraOfPurity",
    "name": "Aura of Purity",
    "ukr": "Aura of Purity",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 216,
    "source": "PHB 2014"
  },
  "auraOfVitality": {
    "id": "auraOfVitality",
    "name": "Aura of Vitality",
    "ukr": "Aura of Vitality",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "HL",
      "UBA"
    ],
    "page": 216,
    "source": "PHB 2014"
  },
  "awaken": {
    "id": "awaken",
    "name": "Awaken",
    "ukr": "awaken",
    "level": 5,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "8 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PRM"
    ],
    "page": 216,
    "source": "PHB 2014"
  },
  "bane": {
    "id": "bane",
    "name": "Bane",
    "ukr": "bane",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of blood",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "Up to three creatures you can see must make Charisma saving throws. If a target fails, whenever they make an attack roll or saving throw before the spell ends, they must roll a d4 and subtract the number rolled. At Higher Levels: You can target one additional creature for each slot level above 1st.",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 216,
    "source": "PHB 2014"
  },
  "banishingSmite": {
    "id": "banishingSmite",
    "name": "Banishing Smite",
    "ukr": "Banishing Smite",
    "level": 5,
    "type": "spell",
    "school": "abjuration",
    "effectType": "attack",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 216,
    "source": "PHB 2014"
  },
  "banishment": {
    "id": "banishment",
    "name": "Banishment",
    "ukr": "banishment",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "cleric",
      "paladin",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "an item distasteful to the target",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 217,
    "source": "PHB 2014"
  },
  "barkskin": {
    "id": "barkskin",
    "name": "Barkskin",
    "ukr": "barkskin",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a handful of oak bark",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "MAC"
    ],
    "page": 217,
    "source": "PHB 2014"
  },
  "beaconOfHope": {
    "id": "beaconOfHope",
    "name": "Beacon of Hope",
    "ukr": "Beacon of Hope",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "HL"
    ],
    "page": 217,
    "source": "PHB 2014"
  },
  "beastSense": {
    "id": "beastSense",
    "name": "Beast Sense",
    "ukr": "Beast Sense",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 217,
    "source": "PHB 2014"
  },
  "bestowCurse": {
    "id": "bestowCurse",
    "name": "Bestow Curse",
    "ukr": "Bestow Curse",
    "level": 3,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PRM"
    ],
    "page": 218,
    "source": "PHB 2014"
  },
  "bigbySHand": {
    "id": "bigbySHand",
    "name": "Bigby's Hand",
    "ukr": "Bigby's Hand",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "an eggshell and a snakeskin glove",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "bludgeoning, force",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "DFT",
      "FMV",
      "OBJ",
      "SGT",
      "UBA"
    ],
    "page": 218,
    "source": "PHB 2014"
  },
  "bladeBarrier": {
    "id": "bladeBarrier",
    "name": "Blade Barrier",
    "ukr": "Blade Barrier",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "slashing",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [
      "DFT"
    ],
    "page": 218,
    "source": "PHB 2014"
  },
  "bladeWard": {
    "id": "bladeWard",
    "name": "Blade Ward",
    "ukr": "Blade Ward",
    "level": 0,
    "type": "cantrip",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 218,
    "source": "PHB 2014"
  },
  "bless": {
    "id": "bless",
    "name": "Bless",
    "ukr": "bless",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a sprinkling of holy water",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw. At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SCT"
    ],
    "page": 219,
    "source": "PHB 2014"
  },
  "blight": {
    "id": "blight",
    "name": "Blight",
    "ukr": "blight",
    "level": 4,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 219,
    "source": "PHB 2014"
  },
  "blindingSmite": {
    "id": "blindingSmite",
    "name": "Blinding Smite",
    "ukr": "Blinding Smite",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "radiant",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 219,
    "source": "PHB 2014"
  },
  "blindnessDeafness": {
    "id": "blindnessDeafness",
    "name": "Blindness/Deafness",
    "ukr": "Blindness/Deafness",
    "level": 2,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 219,
    "source": "PHB 2014"
  },
  "blink": {
    "id": "blink",
    "name": "Blink",
    "ukr": "blink",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 219,
    "source": "PHB 2014"
  },
  "blur": {
    "id": "blur",
    "name": "Blur",
    "ukr": "blur",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 219,
    "source": "PHB 2014"
  },
  "brandingSmite": {
    "id": "brandingSmite",
    "name": "Branding Smite",
    "ukr": "Branding Smite",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "radiant",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD",
      "LGT"
    ],
    "page": 219,
    "source": "PHB 2014"
  },
  "burningHands": {
    "id": "burningHands",
    "name": "Burning Hands",
    "ukr": "Burning Hands",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "15 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "N"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 220,
    "source": "PHB 2014"
  },
  "callLightning": {
    "id": "callLightning",
    "name": "Call Lightning",
    "ukr": "Call Lightning",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "lightning",
    "areaTags": [
      "S",
      "Y"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 220,
    "source": "PHB 2014"
  },
  "calmEmotions": {
    "id": "calmEmotions",
    "name": "Calm Emotions",
    "ukr": "Calm Emotions",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 221,
    "source": "PHB 2014"
  },
  "chainLightning": {
    "id": "chainLightning",
    "name": "Chain Lightning",
    "ukr": "Chain Lightning",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fur; a piece of amber, glass, or a crystal rod; and three silver pins",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "lightning",
    "areaTags": [
      "MT",
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SCT",
      "SGT"
    ],
    "page": 221,
    "source": "PHB 2014"
  },
  "charmPerson": {
    "id": "charmPerson",
    "name": "Charm Person",
    "ukr": "Charm Person",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 221,
    "source": "PHB 2014"
  },
  "chillTouch": {
    "id": "chillTouch",
    "name": "Chill Touch",
    "ukr": "Chill Touch",
    "level": 0,
    "type": "cantrip",
    "school": "necromancy",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "necrotic damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "miscTags": [
      "SCL"
    ],
    "page": 221,
    "source": "PHB 2014"
  },
  "chromaticOrb": {
    "id": "chromaticOrb",
    "name": "Chromatic Orb",
    "ukr": "Chromatic Orb",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "acid, cold, fire, lightning, poison, thunder",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 221,
    "source": "PHB 2014"
  },
  "circleOfDeath": {
    "id": "circleOfDeath",
    "name": "Circle of Death",
    "ukr": "Circle of Death",
    "level": 6,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "necrotic",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 221,
    "source": "PHB 2014"
  },
  "circleOfPower": {
    "id": "circleOfPower",
    "name": "Circle of Power",
    "ukr": "Circle of Power",
    "level": 5,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 221,
    "source": "PHB 2014"
  },
  "clairvoyance": {
    "id": "clairvoyance",
    "name": "Clairvoyance",
    "ukr": "clairvoyance",
    "level": 3,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "1 миль",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 222,
    "source": "PHB 2014"
  },
  "clone": {
    "id": "clone",
    "name": "Clone",
    "ukr": "clone",
    "level": 8,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PRM"
    ],
    "page": 222,
    "source": "PHB 2014"
  },
  "cloudOfDaggers": {
    "id": "cloudOfDaggers",
    "name": "Cloud of Daggers",
    "ukr": "Cloud of Daggers",
    "level": 2,
    "type": "spell",
    "school": "conjuration",
    "effectType": "attack",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a sliver of glass",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "slashing",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [],
    "page": 222,
    "source": "PHB 2014"
  },
  "cloudkill": {
    "id": "cloudkill",
    "name": "Cloudkill",
    "ukr": "cloudkill",
    "level": 5,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "poison",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBS"
    ],
    "page": 222,
    "source": "PHB 2014"
  },
  "colorSpray": {
    "id": "colorSpray",
    "name": "Color Spray",
    "ukr": "Color Spray",
    "level": 1,
    "type": "spell",
    "school": "illusion",
    "effectType": "healing",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "15 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of powder or sand that is colored red, yellow, and blue",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "N"
    ],
    "damage": null,
    "miscTags": [],
    "page": 222,
    "source": "PHB 2014"
  },
  "command": {
    "id": "command",
    "name": "Command",
    "ukr": "command",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn’t understand your language, or if your command is directly harmful to it. Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the DM determines how the target behaves. If the target can’t follow your command, the spell ends. Approach. The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you. Drop. The target drops whatever it is holding and then ends its turn. Flee. The target spends its turn moving away from you by the fastest available means. Grovel. The target falls prone and then ends its turn. Halt. The target doesn’t move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air. At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 223,
    "source": "PHB 2014"
  },
  "commune": {
    "id": "commune",
    "name": "Commune",
    "ukr": "commune",
    "level": 5,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "incense and a vial of holy or unholy water",
    "duration": "1 хв",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 223,
    "source": "PHB 2014"
  },
  "communeWithNature": {
    "id": "communeWithNature",
    "name": "Commune with Nature",
    "ukr": "Commune with Nature",
    "level": 5,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 224,
    "source": "PHB 2014"
  },
  "compelledDuel": {
    "id": "compelledDuel",
    "name": "Compelled Duel",
    "ukr": "Compelled Duel",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 224,
    "source": "PHB 2014"
  },
  "comprehendLanguages": {
    "id": "comprehendLanguages",
    "name": "Comprehend Languages",
    "ukr": "Comprehend Languages",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of soot and salt",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 224,
    "source": "PHB 2014"
  },
  "compulsion": {
    "id": "compulsion",
    "name": "Compulsion",
    "ukr": "compulsion",
    "level": 4,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "page": 224,
    "source": "PHB 2014"
  },
  "coneOfCold": {
    "id": "coneOfCold",
    "name": "Cone of Cold",
    "ukr": "Cone of Cold",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small crystal or glass cone",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "cold",
    "areaTags": [
      "N"
    ],
    "damage": null,
    "miscTags": [],
    "page": 224,
    "source": "PHB 2014"
  },
  "confusion": {
    "id": "confusion",
    "name": "Confusion",
    "ukr": "confusion",
    "level": 4,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "three nut shells",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "RO"
    ],
    "page": 224,
    "source": "PHB 2014"
  },
  "conjureAnimals": {
    "id": "conjureAnimals",
    "name": "Conjure Animals",
    "ukr": "Conjure Animals",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "SMN"
    ],
    "page": 225,
    "source": "PHB 2014"
  },
  "conjureBarrage": {
    "id": "conjureBarrage",
    "name": "Conjure Barrage",
    "ukr": "Conjure Barrage",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "one piece of ammunition or a thrown weapon",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "N"
    ],
    "damage": null,
    "miscTags": [],
    "page": 225,
    "source": "PHB 2014"
  },
  "conjureCelestial": {
    "id": "conjureCelestial",
    "name": "Conjure Celestial",
    "ukr": "Conjure Celestial",
    "level": 7,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "SMN"
    ],
    "page": 225,
    "source": "PHB 2014"
  },
  "conjureElemental": {
    "id": "conjureElemental",
    "name": "Conjure Elemental",
    "ukr": "Conjure Elemental",
    "level": 5,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "burning incense for air, soft clay for earth, sulfur and phosphorus for fire, or water and sand for water",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SMN"
    ],
    "page": 225,
    "source": "PHB 2014"
  },
  "conjureFey": {
    "id": "conjureFey",
    "name": "Conjure Fey",
    "ukr": "Conjure Fey",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "druid",
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "SMN"
    ],
    "page": 226,
    "source": "PHB 2014"
  },
  "conjureMinorElementals": {
    "id": "conjureMinorElementals",
    "name": "Conjure Minor Elementals",
    "ukr": "Conjure Minor Elementals",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "SMN"
    ],
    "page": 226,
    "source": "PHB 2014"
  },
  "conjureVolley": {
    "id": "conjureVolley",
    "name": "Conjure Volley",
    "ukr": "Conjure Volley",
    "level": 5,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "one piece of ammunition or one thrown weapon",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [],
    "page": 226,
    "source": "PHB 2014"
  },
  "conjureWoodlandBeings": {
    "id": "conjureWoodlandBeings",
    "name": "Conjure Woodland Beings",
    "ukr": "Conjure Woodland Beings",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "one holly berry per creature summoned",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "SMN"
    ],
    "page": 226,
    "source": "PHB 2014"
  },
  "contactOtherPlane": {
    "id": "contactOtherPlane",
    "name": "Contact Other Plane",
    "ukr": "Contact Other Plane",
    "level": 5,
    "type": "spell",
    "school": "divination",
    "effectType": "save",
    "classes": [
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "intelligence",
    "damageType": "psychic",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 226,
    "source": "PHB 2014"
  },
  "contagion": {
    "id": "contagion",
    "name": "Contagion",
    "ukr": "contagion",
    "level": 5,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "7 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 227,
    "source": "PHB 2014"
  },
  "contingency": {
    "id": "contingency",
    "name": "Contingency",
    "ukr": "contingency",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "10 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 227,
    "source": "PHB 2014"
  },
  "continualFlame": {
    "id": "continualFlame",
    "name": "Continual Flame",
    "ukr": "Continual Flame",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "LGT",
      "OBJ"
    ],
    "page": 227,
    "source": "PHB 2014"
  },
  "controlWater": {
    "id": "controlWater",
    "name": "Control Water",
    "ukr": "Control Water",
    "level": 4,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "cleric",
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "300 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of water and a pinch of dust",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "bludgeoning",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "FMV",
      "OBJ"
    ],
    "page": 227,
    "source": "PHB 2014"
  },
  "controlWeather": {
    "id": "controlWeather",
    "name": "Control Weather",
    "ukr": "Control Weather",
    "level": 8,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "5 миль",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "burning incense and bits of earth and wood mixed in water",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 228,
    "source": "PHB 2014"
  },
  "cordonOfArrows": {
    "id": "cordonOfArrows",
    "name": "Cordon of Arrows",
    "ukr": "Cordon of Arrows",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "5 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "four or more arrows or bolts",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "piercing",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 228,
    "source": "PHB 2014"
  },
  "counterspell": {
    "id": "counterspell",
    "name": "Counterspell",
    "ukr": "counterspell",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 реакція",
    "range": "60 футів",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 228,
    "source": "PHB 2014"
  },
  "createFoodAndWater": {
    "id": "createFoodAndWater",
    "name": "Create Food and Water",
    "ukr": "Create Food and Water",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 229,
    "source": "PHB 2014"
  },
  "createOrDestroyWater": {
    "id": "createOrDestroyWater",
    "name": "Create or Destroy Water",
    "ukr": "Create or Destroy Water",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of water if creating water or a few grains of sand if destroying it",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "PRM"
    ],
    "page": 229,
    "source": "PHB 2014"
  },
  "createUndead": {
    "id": "createUndead",
    "name": "Create Undead",
    "ukr": "Create Undead",
    "level": 6,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "cleric",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PRM",
      "SMN",
      "UBA"
    ],
    "page": 229,
    "source": "PHB 2014"
  },
  "creation": {
    "id": "creation",
    "name": "Creation",
    "ukr": "creation",
    "level": 5,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny piece of matter of the same type of the item you plan to create",
    "duration": "special",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 229,
    "source": "PHB 2014"
  },
  "crownOfMadness": {
    "id": "crownOfMadness",
    "name": "Crown of Madness",
    "ukr": "Crown of Madness",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 229,
    "source": "PHB 2014"
  },
  "crusaderSMantle": {
    "id": "crusaderSMantle",
    "name": "Crusader's Mantle",
    "ukr": "Crusader's Mantle",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "radiant",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 230,
    "source": "PHB 2014"
  },
  "cureWounds": {
    "id": "cureWounds",
    "name": "Cure Wounds",
    "ukr": "Cure Wounds",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 230,
    "source": "PHB 2014"
  },
  "dancingLights": {
    "id": "dancingLights",
    "name": "Dancing Lights",
    "ukr": "Dancing Lights",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of phosphorus or wychwood, or a glowworm",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "LGT",
      "UBA"
    ],
    "page": 230,
    "source": "PHB 2014"
  },
  "darkness": {
    "id": "darkness",
    "name": "Darkness",
    "ukr": "darkness",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "bat fur and a drop of pitch or piece of coal",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "OBS"
    ],
    "page": 230,
    "source": "PHB 2014"
  },
  "darkvision": {
    "id": "darkvision",
    "name": "Darkvision",
    "ukr": "darkvision",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "either a pinch of dried carrot or an agate",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 230,
    "source": "PHB 2014"
  },
  "daylight": {
    "id": "daylight",
    "name": "Daylight",
    "ukr": "daylight",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "LGT",
      "OBJ"
    ],
    "page": 230,
    "source": "PHB 2014"
  },
  "deathWard": {
    "id": "deathWard",
    "name": "Death Ward",
    "ukr": "Death Ward",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "healing",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 230,
    "source": "PHB 2014"
  },
  "delayedBlastFireball": {
    "id": "delayedBlastFireball",
    "name": "Delayed Blast Fireball",
    "ukr": "Delayed Blast Fireball",
    "level": 7,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny ball of bat guano and sulfur",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 230,
    "source": "PHB 2014"
  },
  "demiplane": {
    "id": "demiplane",
    "name": "Demiplane",
    "ukr": "demiplane",
    "level": 8,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "PRM",
      "SGT"
    ],
    "page": 231,
    "source": "PHB 2014"
  },
  "destructiveWave": {
    "id": "destructiveWave",
    "name": "Destructive Wave",
    "ukr": "Destructive Wave",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "necrotic, radiant, thunder",
    "areaTags": [
      "MT",
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 231,
    "source": "PHB 2014"
  },
  "detectEvilAndGood": {
    "id": "detectEvilAndGood",
    "name": "Detect Evil and Good",
    "ukr": "Detect Evil and Good",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 231,
    "source": "PHB 2014"
  },
  "detectMagic": {
    "id": "detectMagic",
    "name": "Detect Magic",
    "ukr": "Detect Magic",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 231,
    "source": "PHB 2014"
  },
  "detectPoisonAndDisease": {
    "id": "detectPoisonAndDisease",
    "name": "Detect Poison and Disease",
    "ukr": "Detect Poison and Disease",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a yew leaf",
    "duration": "10 хв",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 231,
    "source": "PHB 2014"
  },
  "detectThoughts": {
    "id": "detectThoughts",
    "name": "Detect Thoughts",
    "ukr": "Detect Thoughts",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a copper piece",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 231,
    "source": "PHB 2014"
  },
  "dimensionDoor": {
    "id": "dimensionDoor",
    "name": "Dimension Door",
    "ukr": "Dimension Door",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "attack",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "500 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "TP"
    ],
    "page": 233,
    "source": "PHB 2014"
  },
  "disguiseSelf": {
    "id": "disguiseSelf",
    "name": "Disguise Self",
    "ukr": "Disguise Self",
    "level": 1,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 233,
    "source": "PHB 2014"
  },
  "disintegrate": {
    "id": "disintegrate",
    "name": "Disintegrate",
    "ukr": "disintegrate",
    "level": 6,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a lodestone and a pinch of dust",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "force",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "page": 233,
    "source": "PHB 2014"
  },
  "dispelEvilAndGood": {
    "id": "dispelEvilAndGood",
    "name": "Dispel Evil and Good",
    "ukr": "Dispel Evil and Good",
    "level": 5,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "holy water or powdered silver and iron",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 233,
    "source": "PHB 2014"
  },
  "dispelMagic": {
    "id": "dispelMagic",
    "name": "Dispel Magic",
    "ukr": "Dispel Magic",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 234,
    "source": "PHB 2014"
  },
  "dissonantWhispers": {
    "id": "dissonantWhispers",
    "name": "Dissonant Whispers",
    "ukr": "Dissonant Whispers",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 234,
    "source": "PHB 2014"
  },
  "divination": {
    "id": "divination",
    "name": "Divination",
    "ukr": "divination",
    "level": 4,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 234,
    "source": "PHB 2014"
  },
  "divineFavor": {
    "id": "divineFavor",
    "name": "Divine Favor",
    "ukr": "Divine Favor",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "radiant",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 234,
    "source": "PHB 2014"
  },
  "divineWord": {
    "id": "divineWord",
    "name": "Divine Word",
    "ukr": "Divine Word",
    "level": 7,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 234,
    "source": "PHB 2014"
  },
  "dominateBeast": {
    "id": "dominateBeast",
    "name": "Dominate Beast",
    "ukr": "Dominate Beast",
    "level": 4,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 234,
    "source": "PHB 2014"
  },
  "dominateMonster": {
    "id": "dominateMonster",
    "name": "Dominate Monster",
    "ukr": "Dominate Monster",
    "level": 8,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 235,
    "source": "PHB 2014"
  },
  "dominatePerson": {
    "id": "dominatePerson",
    "name": "Dominate Person",
    "ukr": "Dominate Person",
    "level": 5,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 235,
    "source": "PHB 2014"
  },
  "drawmijSInstantSummons": {
    "id": "drawmijSInstantSummons",
    "name": "Drawmij's Instant Summons",
    "ukr": "Drawmij's Instant Summons",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 235,
    "source": "PHB 2014"
  },
  "dream": {
    "id": "dream",
    "name": "Dream",
    "ukr": "dream",
    "level": 5,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "special",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a handful of sand, a dab of ink, and a writing quill plucked from a sleeping bird",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 236,
    "source": "PHB 2014"
  },
  "druidcraft": {
    "id": "druidcraft",
    "name": "Druidcraft",
    "ukr": "druidcraft",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 236,
    "source": "PHB 2014"
  },
  "earthquake": {
    "id": "earthquake",
    "name": "Earthquake",
    "ukr": "earthquake",
    "level": 8,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric",
      "druid",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "500 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of dirt, a piece of rock, and a lump of clay",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution, dexterity",
    "damageType": "bludgeoning",
    "areaTags": [
      "R"
    ],
    "damage": null,
    "miscTags": [
      "DFT",
      "SGT"
    ],
    "page": 236,
    "source": "PHB 2014"
  },
  "eldritchBlast": {
    "id": "eldritchBlast",
    "name": "Eldritch Blast",
    "ukr": "Eldritch Blast",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [
      "MT",
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCL"
    ],
    "page": 237,
    "source": "PHB 2014"
  },
  "elementalWeapon": {
    "id": "elementalWeapon",
    "name": "Elemental Weapon",
    "ukr": "Elemental Weapon",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "acid, cold, fire, lightning, thunder",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 237,
    "source": "PHB 2014"
  },
  "enhanceAbility": {
    "id": "enhanceAbility",
    "name": "Enhance Ability",
    "ukr": "Enhance Ability",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "fur or a feather from a beast",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "SCT",
      "THP"
    ],
    "page": 237,
    "source": "PHB 2014"
  },
  "enlargeReduce": {
    "id": "enlargeReduce",
    "name": "Enlarge/Reduce",
    "ukr": "Enlarge/Reduce",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of powdered iron",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "OBJ",
      "SGT"
    ],
    "page": 237,
    "source": "PHB 2014"
  },
  "ensnaringStrike": {
    "id": "ensnaringStrike",
    "name": "Ensnaring Strike",
    "ukr": "Ensnaring Strike",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "piercing",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 237,
    "source": "PHB 2014"
  },
  "entangle": {
    "id": "entangle",
    "name": "Entangle",
    "ukr": "entangle",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "Plants that grab and entwine fill a 20-foot square with a point of origin that you choose. The area becomes difficult terrain. When the spell ends, the plants wilt away.If a creature is standing in the area when you cast the spell it must pass a Strength save or be restrained. A restrained creature can release itself by using its action to attempt another Strength save, being freed on a success.",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "",
    "areaTags": [
      "Q"
    ],
    "damage": null,
    "miscTags": [],
    "page": 238,
    "source": "PHB 2014"
  },
  "enthrall": {
    "id": "enthrall",
    "name": "Enthrall",
    "ukr": "enthrall",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 238,
    "source": "PHB 2014"
  },
  "etherealness": {
    "id": "etherealness",
    "name": "Etherealness",
    "ukr": "etherealness",
    "level": 7,
    "type": "spell",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PS",
      "SCT"
    ],
    "page": 238,
    "source": "PHB 2014"
  },
  "evardSBlackTentacles": {
    "id": "evardSBlackTentacles",
    "name": "Evard's Black Tentacles",
    "ukr": "Evard's Black Tentacles",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a piece of tentacle from a giant octopus or a giant squid",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "bludgeoning",
    "areaTags": [
      "Q"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 238,
    "source": "PHB 2014"
  },
  "expeditiousRetreat": {
    "id": "expeditiousRetreat",
    "name": "Expeditious Retreat",
    "ukr": "Expeditious Retreat",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "UBA"
    ],
    "page": 238,
    "source": "PHB 2014"
  },
  "eyebite": {
    "id": "eyebite",
    "name": "Eyebite",
    "ukr": "eyebite",
    "level": 6,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 238,
    "source": "PHB 2014"
  },
  "fabricate": {
    "id": "fabricate",
    "name": "Fabricate",
    "ukr": "fabricate",
    "level": 4,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "PRM",
      "SGT"
    ],
    "page": 239,
    "source": "PHB 2014"
  },
  "faerieFire": {
    "id": "faerieFire",
    "name": "Faerie Fire",
    "ukr": "Faerie Fire",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "bard",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "LGT"
    ],
    "page": 239,
    "source": "PHB 2014"
  },
  "falseLife": {
    "id": "falseLife",
    "name": "False Life",
    "ukr": "False Life",
    "level": 1,
    "type": "spell",
    "school": "necromancy",
    "effectType": "healing",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small amount of alcohol or distilled spirits",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "THP"
    ],
    "page": 239,
    "source": "PHB 2014"
  },
  "fear": {
    "id": "fear",
    "name": "Fear",
    "ukr": "fear",
    "level": 3,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a white feather or the heart of a hen",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "N"
    ],
    "damage": null,
    "miscTags": [],
    "page": 239,
    "source": "PHB 2014"
  },
  "featherFall": {
    "id": "featherFall",
    "name": "Feather Fall",
    "ukr": "Feather Fall",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 реакція",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "a small feather or a piece of down",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [],
    "page": 239,
    "source": "PHB 2014"
  },
  "feeblemind": {
    "id": "feeblemind",
    "name": "Feeblemind",
    "ukr": "feeblemind",
    "level": 8,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "druid",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a handful of clay, crystal, glass, or mineral spheres",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "intelligence",
    "damageType": "psychic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 239,
    "source": "PHB 2014"
  },
  "feignDeath": {
    "id": "feignDeath",
    "name": "Feign Death",
    "ukr": "Feign Death",
    "level": 3,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of graveyard dirt",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 240,
    "source": "PHB 2014"
  },
  "findFamiliar": {
    "id": "findFamiliar",
    "name": "Find Familiar",
    "ukr": "Find Familiar",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PRM",
      "SMN"
    ],
    "page": 240,
    "source": "PHB 2014"
  },
  "findSteed": {
    "id": "findSteed",
    "name": "Find Steed",
    "ukr": "Find Steed",
    "level": 2,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PRM",
      "SMN"
    ],
    "page": 240,
    "source": "PHB 2014"
  },
  "findThePath": {
    "id": "findThePath",
    "name": "Find the Path",
    "ukr": "Find the Path",
    "level": 6,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 240,
    "source": "PHB 2014"
  },
  "findTraps": {
    "id": "findTraps",
    "name": "Find Traps",
    "ukr": "Find Traps",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 241,
    "source": "PHB 2014"
  },
  "fingerOfDeath": {
    "id": "fingerOfDeath",
    "name": "Finger of Death",
    "ukr": "Finger of Death",
    "level": 7,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PRM",
      "SGT",
      "SMN"
    ],
    "page": 241,
    "source": "PHB 2014"
  },
  "fireBolt": {
    "id": "fireBolt",
    "name": "Fire Bolt",
    "ukr": "Fire Bolt",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "fire",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "fire damage",
      "scaling": {
        "1": "1d10",
        "5": "2d10",
        "11": "3d10",
        "17": "4d10"
      }
    },
    "miscTags": [
      "OBJ",
      "SCL"
    ],
    "page": 242,
    "source": "PHB 2014"
  },
  "fireShield": {
    "id": "fireShield",
    "name": "Fire Shield",
    "ukr": "Fire Shield",
    "level": 4,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of phosphorus or a firefly",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "cold, fire",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "LGT"
    ],
    "page": 242,
    "source": "PHB 2014"
  },
  "fireStorm": {
    "id": "fireStorm",
    "name": "Fire Storm",
    "ukr": "Fire Storm",
    "level": 7,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric",
      "druid",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 242,
    "source": "PHB 2014"
  },
  "fireball": {
    "id": "fireball",
    "name": "Fireball",
    "ukr": "fireball",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny ball of bat guano and sulfur",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 241,
    "source": "PHB 2014"
  },
  "flameBlade": {
    "id": "flameBlade",
    "name": "Flame Blade",
    "ukr": "Flame Blade",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "leaf of sumac",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "fire",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "LGT",
      "UBA"
    ],
    "page": 242,
    "source": "PHB 2014"
  },
  "flameStrike": {
    "id": "flameStrike",
    "name": "Flame Strike",
    "ukr": "Flame Strike",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "pinch of sulfur",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire, radiant",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [],
    "page": 242,
    "source": "PHB 2014"
  },
  "flamingSphere": {
    "id": "flamingSphere",
    "name": "Flaming Sphere",
    "ukr": "Flaming Sphere",
    "level": 2,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of tallow, a pinch of brimstone, and a dusting of powdered iron",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "LGT",
      "OBJ",
      "UBA"
    ],
    "page": 242,
    "source": "PHB 2014"
  },
  "fleshToStone": {
    "id": "fleshToStone",
    "name": "Flesh to Stone",
    "ukr": "Flesh to Stone",
    "level": 6,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of lime, water, and earth",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "page": 243,
    "source": "PHB 2014"
  },
  "fly": {
    "id": "fly",
    "name": "Fly",
    "ukr": "fly",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a wing feather from any bird",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT"
    ],
    "page": 243,
    "source": "PHB 2014"
  },
  "fogCloud": {
    "id": "fogCloud",
    "name": "Fog Cloud",
    "ukr": "Fog Cloud",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBS"
    ],
    "page": 243,
    "source": "PHB 2014"
  },
  "forbiddance": {
    "id": "forbiddance",
    "name": "Forbiddance",
    "ukr": "forbiddance",
    "level": 6,
    "type": "spell",
    "school": "abjuration",
    "effectType": "attack",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 дн",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "necrotic, radiant",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PIR",
      "PRM"
    ],
    "page": 243,
    "source": "PHB 2014"
  },
  "forcecage": {
    "id": "forcecage",
    "name": "Forcecage",
    "ukr": "forcecage",
    "level": 7,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "100 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [],
    "page": 243,
    "source": "PHB 2014"
  },
  "foresight": {
    "id": "foresight",
    "name": "Foresight",
    "ukr": "foresight",
    "level": 9,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a hummingbird feather",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 244,
    "source": "PHB 2014"
  },
  "freedomOfMovement": {
    "id": "freedomOfMovement",
    "name": "Freedom of Movement",
    "ukr": "Freedom of Movement",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a leather strap, bound around the arm or a similar appendage",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 244,
    "source": "PHB 2014"
  },
  "friends": {
    "id": "friends",
    "name": "Friends",
    "ukr": "Friends",
    "level": 0,
    "type": "cantrip",
    "school": "enchantment",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": true
    },
    "materialText": "a small amount of makeup applied to the face as this spell is cast",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 244,
    "source": "PHB 2014"
  },
  "gaseousForm": {
    "id": "gaseousForm",
    "name": "Gaseous Form",
    "ukr": "Gaseous Form",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "healing",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of gauze and a wisp of smoke",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 244,
    "source": "PHB 2014"
  },
  "gate": {
    "id": "gate",
    "name": "Gate",
    "ukr": "gate",
    "level": 9,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PS",
      "SGT",
      "TP"
    ],
    "page": 244,
    "source": "PHB 2014"
  },
  "geas": {
    "id": "geas",
    "name": "Geas",
    "ukr": "geas",
    "level": 5,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "30 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "page": 244,
    "source": "PHB 2014"
  },
  "gentleRepose": {
    "id": "gentleRepose",
    "name": "Gentle Repose",
    "ukr": "Gentle Repose",
    "level": 2,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of salt and one copper piece placed on each of the corpse's eyes, which must remain there for the duration",
    "duration": "10 дн",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 245,
    "source": "PHB 2014"
  },
  "giantInsect": {
    "id": "giantInsect",
    "name": "Giant Insect",
    "ukr": "Giant Insect",
    "level": 4,
    "type": "spell",
    "school": "transmutation",
    "effectType": "healing",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SMN"
    ],
    "page": 245,
    "source": "PHB 2014"
  },
  "glibness": {
    "id": "glibness",
    "name": "Glibness",
    "ukr": "glibness",
    "level": 8,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 245,
    "source": "PHB 2014"
  },
  "globeOfInvulnerability": {
    "id": "globeOfInvulnerability",
    "name": "Globe of Invulnerability",
    "ukr": "Globe of Invulnerability",
    "level": 6,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 245,
    "source": "PHB 2014"
  },
  "glyphOfWarding": {
    "id": "glyphOfWarding",
    "name": "Glyph of Warding",
    "ukr": "Glyph of Warding",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "acid, cold, fire, lightning, thunder",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 245,
    "source": "PHB 2014"
  },
  "goodberry": {
    "id": "goodberry",
    "name": "Goodberry",
    "ukr": "goodberry",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a sprig of mistletoe",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 246,
    "source": "PHB 2014"
  },
  "graspingVine": {
    "id": "graspingVine",
    "name": "Grasping Vine",
    "ukr": "Grasping Vine",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "FMV",
      "SGT",
      "UBA"
    ],
    "page": 246,
    "source": "PHB 2014"
  },
  "grease": {
    "id": "grease",
    "name": "Grease",
    "ukr": "grease",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of pork rind or butter",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "Grease covers the ground in a 10-foot square within range. It's difficult terrain for the duration. When the grease appears, each creature standing in its area must pass a Dexterity save or fall prone. A creature that enters the area or ends its turn there must also make this save.",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "Q"
    ],
    "damage": null,
    "miscTags": [
      "DFT"
    ],
    "page": 246,
    "source": "PHB 2014"
  },
  "greaterInvisibility": {
    "id": "greaterInvisibility",
    "name": "Greater Invisibility",
    "ukr": "Greater Invisibility",
    "level": 4,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 246,
    "source": "PHB 2014"
  },
  "greaterRestoration": {
    "id": "greaterRestoration",
    "name": "Greater Restoration",
    "ukr": "Greater Restoration",
    "level": 5,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 246,
    "source": "PHB 2014"
  },
  "guardianOfFaith": {
    "id": "guardianOfFaith",
    "name": "Guardian of Faith",
    "ukr": "Guardian of Faith",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "radiant",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 246,
    "source": "PHB 2014"
  },
  "guardsAndWards": {
    "id": "guardsAndWards",
    "name": "Guards and Wards",
    "ukr": "Guards and Wards",
    "level": 6,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "Q"
    ],
    "damage": null,
    "miscTags": [
      "OBS",
      "PIR",
      "PRM"
    ],
    "page": 248,
    "source": "PHB 2014"
  },
  "guidance": {
    "id": "guidance",
    "name": "Guidance",
    "ukr": "guidance",
    "level": 0,
    "type": "cantrip",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 248,
    "source": "PHB 2014"
  },
  "guidingBolt": {
    "id": "guidingBolt",
    "name": "Guiding Bolt",
    "ukr": "Guiding Bolt",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "radiant",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 248,
    "source": "PHB 2014"
  },
  "gustOfWind": {
    "id": "gustOfWind",
    "name": "Gust of Wind",
    "ukr": "Gust of Wind",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a legume seed",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "",
    "areaTags": [
      "L"
    ],
    "damage": null,
    "miscTags": [
      "FMV",
      "UBA"
    ],
    "page": 248,
    "source": "PHB 2014"
  },
  "hailOfThorns": {
    "id": "hailOfThorns",
    "name": "Hail of Thorns",
    "ukr": "Hail of Thorns",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "piercing",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 249,
    "source": "PHB 2014"
  },
  "hallow": {
    "id": "hallow",
    "name": "Hallow",
    "ukr": "hallow",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "24 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "LGT",
      "OBS"
    ],
    "page": 249,
    "source": "PHB 2014"
  },
  "hallucinatoryTerrain": {
    "id": "hallucinatoryTerrain",
    "name": "Hallucinatory Terrain",
    "ukr": "Hallucinatory Terrain",
    "level": 4,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "300 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a stone, a twig, and a bit of green plant",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [],
    "page": 249,
    "source": "PHB 2014"
  },
  "harm": {
    "id": "harm",
    "name": "Harm",
    "ukr": "harm",
    "level": 6,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 249,
    "source": "PHB 2014"
  },
  "haste": {
    "id": "haste",
    "name": "Haste",
    "ukr": "haste",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a shaving of licorice root",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "MAC",
      "SGT"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "heal": {
    "id": "heal",
    "name": "Heal",
    "ukr": "heal",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL",
      "SGT"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "healingWord": {
    "id": "healingWord",
    "name": "Healing Word",
    "ukr": "Healing Word",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL",
      "SGT"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "heatMetal": {
    "id": "heatMetal",
    "name": "Heat Metal",
    "ukr": "Heat Metal",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "bard",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a piece of iron and a flame",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "fire",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT",
      "UBA"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "hellishRebuke": {
    "id": "hellishRebuke",
    "name": "Hellish Rebuke",
    "ukr": "Hellish Rebuke",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 реакція",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "heroesFeast": {
    "id": "heroesFeast",
    "name": "Heroes' Feast",
    "ukr": "Heroes' Feast",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "HL"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "heroism": {
    "id": "heroism",
    "name": "Heroism",
    "ukr": "heroism",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "healing",
    "classes": [
      "bard",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell.At Higher Levels: When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "THP"
    ],
    "page": 250,
    "source": "PHB 2014"
  },
  "hex": {
    "id": "hex",
    "name": "Hex",
    "ukr": "Hex",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "attack",
    "classes": [
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "the petrified eye of a newt",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "page": 251,
    "source": "PHB 2014"
  },
  "holdMonster": {
    "id": "holdMonster",
    "name": "Hold Monster",
    "ukr": "Hold Monster",
    "level": 5,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small, straight piece of iron",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 251,
    "source": "PHB 2014"
  },
  "holdPerson": {
    "id": "holdPerson",
    "name": "Hold Person",
    "ukr": "Hold Person",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small, straight piece of iron",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "page": 251,
    "source": "PHB 2014"
  },
  "holyAura": {
    "id": "holyAura",
    "name": "Holy Aura",
    "ukr": "Holy Aura",
    "level": 8,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "ADV",
      "LGT"
    ],
    "page": 251,
    "source": "PHB 2014"
  },
  "hungerOfHadar": {
    "id": "hungerOfHadar",
    "name": "Hunger of Hadar",
    "ukr": "Hunger of Hadar",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "warlock"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pickled octopus tentacle",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "acid, cold",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "DFT",
      "OBS"
    ],
    "page": 251,
    "source": "PHB 2014"
  },
  "hunterSMark": {
    "id": "hunterSMark",
    "name": "Hunter's Mark",
    "ukr": "Hunter's Mark",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "healing",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "AAD",
      "ADV",
      "SGT",
      "UBA"
    ],
    "page": 251,
    "source": "PHB 2014"
  },
  "hypnoticPattern": {
    "id": "hypnoticPattern",
    "name": "Hypnotic Pattern",
    "ukr": "Hypnotic Pattern",
    "level": 3,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": true
    },
    "materialText": "a glowing stick of incense or a crystal vial filled with phosphorescent material",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [],
    "page": 252,
    "source": "PHB 2014"
  },
  "iceStorm": {
    "id": "iceStorm",
    "name": "Ice Storm",
    "ukr": "Ice Storm",
    "level": 4,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "300 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of dust and a few drops of water",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "bludgeoning, cold",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [],
    "page": 252,
    "source": "PHB 2014"
  },
  "identify": {
    "id": "identify",
    "name": "Identify",
    "ukr": "identify",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any. You learn whether any spells are affecting the item and what they are. If the item was created by a spell, you learn which spell created it. If you instead touch a creature throughout the casting, you learn what spells, if any, are currently affecting it.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 252,
    "source": "PHB 2014"
  },
  "illusoryScript": {
    "id": "illusoryScript",
    "name": "Illusory Script",
    "ukr": "Illusory Script",
    "level": 1,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "10 дн",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 252,
    "source": "PHB 2014"
  },
  "imprisonment": {
    "id": "imprisonment",
    "name": "Imprisonment",
    "ukr": "imprisonment",
    "level": 9,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 252,
    "source": "PHB 2014"
  },
  "incendiaryCloud": {
    "id": "incendiaryCloud",
    "name": "Incendiary Cloud",
    "ukr": "Incendiary Cloud",
    "level": 8,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBS"
    ],
    "page": 253,
    "source": "PHB 2014"
  },
  "inflictWounds": {
    "id": "inflictWounds",
    "name": "Inflict Wounds",
    "ukr": "Inflict Wounds",
    "level": 1,
    "type": "spell",
    "school": "necromancy",
    "effectType": "attack",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 253,
    "source": "PHB 2014"
  },
  "insectPlague": {
    "id": "insectPlague",
    "name": "Insect Plague",
    "ukr": "Insect Plague",
    "level": 5,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "cleric",
      "druid",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "300 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a few grains of sugar, some kernels of grain, and a smear of fat",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "piercing",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "DFT",
      "OBS"
    ],
    "page": 254,
    "source": "PHB 2014"
  },
  "invisibility": {
    "id": "invisibility",
    "name": "Invisibility",
    "ukr": "invisibility",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "an eyelash encased in gum arabic",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT"
    ],
    "page": 254,
    "source": "PHB 2014"
  },
  "jump": {
    "id": "jump",
    "name": "Jump",
    "ukr": "jump",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a grasshopper's hind leg",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "The target's jump distance is tripled until the spell ends.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 254,
    "source": "PHB 2014"
  },
  "knock": {
    "id": "knock",
    "name": "Knock",
    "ukr": "knock",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "page": 254,
    "source": "PHB 2014"
  },
  "legendLore": {
    "id": "legendLore",
    "name": "Legend Lore",
    "ukr": "Legend Lore",
    "level": 5,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 254,
    "source": "PHB 2014"
  },
  "leomundSSecretChest": {
    "id": "leomundSSecretChest",
    "name": "Leomund's Secret Chest",
    "ukr": "Leomund's Secret Chest",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "PRM"
    ],
    "page": 254,
    "source": "PHB 2014"
  },
  "leomundSTinyHut": {
    "id": "leomundSTinyHut",
    "name": "Leomund's Tiny Hut",
    "ukr": "Leomund's Tiny Hut",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small crystal bead",
    "duration": "8 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "H"
    ],
    "damage": null,
    "miscTags": [],
    "page": 255,
    "source": "PHB 2014"
  },
  "lesserRestoration": {
    "id": "lesserRestoration",
    "name": "Lesser Restoration",
    "ukr": "Lesser Restoration",
    "level": 2,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 255,
    "source": "PHB 2014"
  },
  "levitate": {
    "id": "levitate",
    "name": "Levitate",
    "ukr": "levitate",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "page": 255,
    "source": "PHB 2014"
  },
  "light": {
    "id": "light",
    "name": "Light",
    "ukr": "light",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "a firefly or phosphorescent moss",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action. If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to a void the spell.",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "LGT",
      "OBJ"
    ],
    "page": 255,
    "source": "PHB 2014"
  },
  "lightningArrow": {
    "id": "lightningArrow",
    "name": "Lightning Arrow",
    "ukr": "Lightning Arrow",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "lightning",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 255,
    "source": "PHB 2014"
  },
  "lightningBolt": {
    "id": "lightningBolt",
    "name": "Lightning Bolt",
    "ukr": "Lightning Bolt",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "100 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fur and a rod of amber, crystal, or glass",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "lightning",
    "areaTags": [
      "L"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 255,
    "source": "PHB 2014"
  },
  "locateAnimalsOrPlants": {
    "id": "locateAnimalsOrPlants",
    "name": "Locate Animals or Plants",
    "ukr": "Locate Animals or Plants",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fur from a bloodhound",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 256,
    "source": "PHB 2014"
  },
  "locateCreature": {
    "id": "locateCreature",
    "name": "Locate Creature",
    "ukr": "Locate Creature",
    "level": 4,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fur from a bloodhound",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 256,
    "source": "PHB 2014"
  },
  "locateObject": {
    "id": "locateObject",
    "name": "Locate Object",
    "ukr": "Locate Object",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a forked twig",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 256,
    "source": "PHB 2014"
  },
  "longstrider": {
    "id": "longstrider",
    "name": "Longstrider",
    "ukr": "longstrider",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "ranger",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of dirt",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "The target’s speed increases by 10 feet until the spell ends.At Higher Levels: You can target one additional creature for each slot level above 1st.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SCT"
    ],
    "page": 256,
    "source": "PHB 2014"
  },
  "mageArmor": {
    "id": "mageArmor",
    "name": "Mage Armor",
    "ukr": "Mage Armor",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a piece of cured leather",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "MAC"
    ],
    "page": 256,
    "source": "PHB 2014"
  },
  "mageHand": {
    "id": "mageHand",
    "name": "Mage Hand",
    "ukr": "Mage Hand",
    "level": 0,
    "type": "cantrip",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 256,
    "source": "PHB 2014"
  },
  "magicCircle": {
    "id": "magicCircle",
    "name": "Magic Circle",
    "ukr": "Magic Circle",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "cleric",
      "paladin",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 256,
    "source": "PHB 2014"
  },
  "magicJar": {
    "id": "magicJar",
    "name": "Magic Jar",
    "ukr": "Magic Jar",
    "level": 6,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 257,
    "source": "PHB 2014"
  },
  "magicMissile": {
    "id": "magicMissile",
    "name": "Magic Missile",
    "ukr": "Magic Missile",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [
      "MT",
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 257,
    "source": "PHB 2014"
  },
  "magicMouth": {
    "id": "magicMouth",
    "name": "Magic Mouth",
    "ukr": "Magic Mouth",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "page": 257,
    "source": "PHB 2014"
  },
  "magicWeapon": {
    "id": "magicWeapon",
    "name": "Magic Weapon",
    "ukr": "Magic Weapon",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "paladin",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 257,
    "source": "PHB 2014"
  },
  "majorImage": {
    "id": "majorImage",
    "name": "Major Image",
    "ukr": "Major Image",
    "level": 3,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fleece",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "page": 258,
    "source": "PHB 2014"
  },
  "massCureWounds": {
    "id": "massCureWounds",
    "name": "Mass Cure Wounds",
    "ukr": "Mass Cure Wounds",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT",
      "S"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 258,
    "source": "PHB 2014"
  },
  "massHeal": {
    "id": "massHeal",
    "name": "Mass Heal",
    "ukr": "Mass Heal",
    "level": 9,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "HL",
      "SGT"
    ],
    "page": 258,
    "source": "PHB 2014"
  },
  "massHealingWord": {
    "id": "massHealingWord",
    "name": "Mass Healing Word",
    "ukr": "Mass Healing Word",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "HL",
      "SGT"
    ],
    "page": 258,
    "source": "PHB 2014"
  },
  "massSuggestion": {
    "id": "massSuggestion",
    "name": "Mass Suggestion",
    "ukr": "Mass Suggestion",
    "level": 6,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "a snake's tongue and either a bit of honeycomb or a drop of sweet oil",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 258,
    "source": "PHB 2014"
  },
  "maze": {
    "id": "maze",
    "name": "Maze",
    "ukr": "maze",
    "level": 8,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 258,
    "source": "PHB 2014"
  },
  "meldIntoStone": {
    "id": "meldIntoStone",
    "name": "Meld into Stone",
    "ukr": "Meld into Stone",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "8 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "bludgeoning",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 259,
    "source": "PHB 2014"
  },
  "melfSAcidArrow": {
    "id": "melfSAcidArrow",
    "name": "Melf's Acid Arrow",
    "ukr": "Melf's Acid Arrow",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "powdered rhubarb leaf and an adder's stomach",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "acid",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 259,
    "source": "PHB 2014"
  },
  "mending": {
    "id": "mending",
    "name": "Mending",
    "ukr": "mending",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "two lodestones",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.This spell can physically repair a magic item or construct, but the spell can’t restore magic to such an object.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 259,
    "source": "PHB 2014"
  },
  "message": {
    "id": "message",
    "name": "Message",
    "ukr": "message",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a short piece of copper wire",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn’t have to follow a straight line and can travel freely around corners or through openings.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 259,
    "source": "PHB 2014"
  },
  "meteorSwarm": {
    "id": "meteorSwarm",
    "name": "Meteor Swarm",
    "ukr": "Meteor Swarm",
    "level": 9,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "1 миль",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "bludgeoning, fire",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "page": 259,
    "source": "PHB 2014"
  },
  "mindBlank": {
    "id": "mindBlank",
    "name": "Mind Blank",
    "ukr": "Mind Blank",
    "level": 8,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 259,
    "source": "PHB 2014"
  },
  "minorIllusion": {
    "id": "minorIllusion",
    "name": "Minor Illusion",
    "ukr": "Minor Illusion",
    "level": 0,
    "type": "cantrip",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fleece",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 260,
    "source": "PHB 2014"
  },
  "mirageArcane": {
    "id": "mirageArcane",
    "name": "Mirage Arcane",
    "ukr": "Mirage Arcane",
    "level": 7,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 260,
    "source": "PHB 2014"
  },
  "mirrorImage": {
    "id": "mirrorImage",
    "name": "Mirror Image",
    "ukr": "Mirror Image",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 260,
    "source": "PHB 2014"
  },
  "mislead": {
    "id": "mislead",
    "name": "Mislead",
    "ukr": "mislead",
    "level": 5,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "page": 260,
    "source": "PHB 2014"
  },
  "mistyStep": {
    "id": "mistyStep",
    "name": "Misty Step",
    "ukr": "Misty Step",
    "level": 2,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "TP"
    ],
    "page": 260,
    "source": "PHB 2014"
  },
  "modifyMemory": {
    "id": "modifyMemory",
    "name": "Modify Memory",
    "ukr": "Modify Memory",
    "level": 5,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "page": 261,
    "source": "PHB 2014"
  },
  "moonbeam": {
    "id": "moonbeam",
    "name": "Moonbeam",
    "ukr": "moonbeam",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "several seeds of any moonseed plant and a piece of opalescent feldspar",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "radiant",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [
      "LGT"
    ],
    "page": 261,
    "source": "PHB 2014"
  },
  "mordenkainenSFaithfulHound": {
    "id": "mordenkainenSFaithfulHound",
    "name": "Mordenkainen's Faithful Hound",
    "ukr": "Mordenkainen's Faithful Hound",
    "level": 4,
    "type": "spell",
    "school": "conjuration",
    "effectType": "attack",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny silver whistle, a piece of bone, and a thread",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "piercing",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 261,
    "source": "PHB 2014"
  },
  "mordenkainenSMagnificentMansion": {
    "id": "mordenkainenSMagnificentMansion",
    "name": "Mordenkainen's Magnificent Mansion",
    "ukr": "Mordenkainen's Magnificent Mansion",
    "level": 7,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "300 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 261,
    "source": "PHB 2014"
  },
  "mordenkainenSPrivateSanctum": {
    "id": "mordenkainenSPrivateSanctum",
    "name": "Mordenkainen's Private Sanctum",
    "ukr": "Mordenkainen's Private Sanctum",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and powdered chrysolite",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "PIR",
      "PRM"
    ],
    "page": 262,
    "source": "PHB 2014"
  },
  "mordenkainenSSword": {
    "id": "mordenkainenSSword",
    "name": "Mordenkainen's Sword",
    "ukr": "Mordenkainen's Sword",
    "level": 7,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "page": 262,
    "source": "PHB 2014"
  },
  "moveEarth": {
    "id": "moveEarth",
    "name": "Move Earth",
    "ukr": "Move Earth",
    "level": 6,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "an iron blade and a small bag containing a mixture of soils—clay, loam, and sand",
    "duration": "2 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "Q"
    ],
    "damage": null,
    "miscTags": [],
    "page": 263,
    "source": "PHB 2014"
  },
  "nondetection": {
    "id": "nondetection",
    "name": "Nondetection",
    "ukr": "nondetection",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "ranger",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 263,
    "source": "PHB 2014"
  },
  "nystulSMagicAura": {
    "id": "nystulSMagicAura",
    "name": "Nystul's Magic Aura",
    "ukr": "Nystul's Magic Aura",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small square of silk",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "PIR",
      "PRM"
    ],
    "page": 263,
    "source": "PHB 2014"
  },
  "otilukeSFreezingSphere": {
    "id": "otilukeSFreezingSphere",
    "name": "Otiluke's Freezing Sphere",
    "ukr": "Otiluke's Freezing Sphere",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "300 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small crystal sphere",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "cold",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 263,
    "source": "PHB 2014"
  },
  "otilukeSResilientSphere": {
    "id": "otilukeSResilientSphere",
    "name": "Otiluke's Resilient Sphere",
    "ukr": "Otiluke's Resilient Sphere",
    "level": 4,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a hemispherical piece of clear crystal and a matching hemispherical piece of gum arabic",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 264,
    "source": "PHB 2014"
  },
  "ottoSIrresistibleDance": {
    "id": "ottoSIrresistibleDance",
    "name": "Otto's Irresistible Dance",
    "ukr": "Otto's Irresistible Dance",
    "level": 6,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 264,
    "source": "PHB 2014"
  },
  "passWithoutTrace": {
    "id": "passWithoutTrace",
    "name": "Pass without Trace",
    "ukr": "Pass without Trace",
    "level": 2,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "ashes from a burned leaf of mistletoe and a sprig of spruce",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [],
    "page": 264,
    "source": "PHB 2014"
  },
  "passwall": {
    "id": "passwall",
    "name": "Passwall",
    "ukr": "passwall",
    "level": 5,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of sesame seeds",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "page": 264,
    "source": "PHB 2014"
  },
  "phantasmalForce": {
    "id": "phantasmalForce",
    "name": "Phantasmal Force",
    "ukr": "Phantasmal Force",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fleece",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "intelligence",
    "damageType": "psychic",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 264,
    "source": "PHB 2014"
  },
  "phantasmalKiller": {
    "id": "phantasmalKiller",
    "name": "Phantasmal Killer",
    "ukr": "Phantasmal Killer",
    "level": 4,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 265,
    "source": "PHB 2014"
  },
  "phantomSteed": {
    "id": "phantomSteed",
    "name": "Phantom Steed",
    "ukr": "Phantom Steed",
    "level": 3,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SMN"
    ],
    "page": 265,
    "source": "PHB 2014"
  },
  "planarAlly": {
    "id": "planarAlly",
    "name": "Planar Ally",
    "ukr": "Planar Ally",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SMN"
    ],
    "page": 265,
    "source": "PHB 2014"
  },
  "planarBinding": {
    "id": "planarBinding",
    "name": "Planar Binding",
    "ukr": "Planar Binding",
    "level": 5,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SMN"
    ],
    "page": 265,
    "source": "PHB 2014"
  },
  "planeShift": {
    "id": "planeShift",
    "name": "Plane Shift",
    "ukr": "Plane Shift",
    "level": 7,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "cleric",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "MT",
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "PS",
      "TP"
    ],
    "page": 266,
    "source": "PHB 2014"
  },
  "plantGrowth": {
    "id": "plantGrowth",
    "name": "Plant Growth",
    "ukr": "Plant Growth",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія, 8 год",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "DFT"
    ],
    "page": 266,
    "source": "PHB 2014"
  },
  "poisonSpray": {
    "id": "poisonSpray",
    "name": "Poison Spray",
    "ukr": "Poison Spray",
    "level": 0,
    "type": "cantrip",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "poison",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "poison damage",
      "scaling": {
        "1": "1d12",
        "5": "2d12",
        "11": "3d12",
        "17": "4d12"
      }
    },
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "page": 266,
    "source": "PHB 2014"
  },
  "polymorph": {
    "id": "polymorph",
    "name": "Polymorph",
    "ukr": "polymorph",
    "level": 4,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a caterpillar cocoon",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 266,
    "source": "PHB 2014"
  },
  "powerWordHeal": {
    "id": "powerWordHeal",
    "name": "Power Word Heal",
    "ukr": "Power Word Heal",
    "level": 9,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "bard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 266,
    "source": "PHB 2014"
  },
  "powerWordKill": {
    "id": "powerWordKill",
    "name": "Power Word Kill",
    "ukr": "Power Word Kill",
    "level": 9,
    "type": "spell",
    "school": "enchantment",
    "effectType": "healing",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 266,
    "source": "PHB 2014"
  },
  "powerWordStun": {
    "id": "powerWordStun",
    "name": "Power Word Stun",
    "ukr": "Power Word Stun",
    "level": 8,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 267,
    "source": "PHB 2014"
  },
  "prayerOfHealing": {
    "id": "prayerOfHealing",
    "name": "Prayer of Healing",
    "ukr": "Prayer of Healing",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "HL",
      "SGT"
    ],
    "page": 267,
    "source": "PHB 2014"
  },
  "prestidigitation": {
    "id": "prestidigitation",
    "name": "Prestidigitation",
    "ukr": "prestidigitation",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range: • You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musi- cal notes, or an odd odor. • You instantaneously light or snuff out a candle, a torch, or a small campfire. • You instantaneously clean or soil an object no larger than 1 cubic foot. • You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour. • You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour. • You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn. If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 267,
    "source": "PHB 2014"
  },
  "prismaticSpray": {
    "id": "prismaticSpray",
    "name": "Prismatic Spray",
    "ukr": "Prismatic Spray",
    "level": 7,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity, constitution, wisdom",
    "damageType": "acid, cold, fire, lightning, poison",
    "areaTags": [
      "N"
    ],
    "damage": null,
    "miscTags": [
      "PRM"
    ],
    "page": 267,
    "source": "PHB 2014"
  },
  "prismaticWall": {
    "id": "prismaticWall",
    "name": "Prismatic Wall",
    "ukr": "Prismatic Wall",
    "level": 9,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution, dexterity, wisdom",
    "damageType": "acid, cold, fire, force, lightning, poison",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [
      "LGT",
      "PRM",
      "SGT"
    ],
    "page": 267,
    "source": "PHB 2014"
  },
  "produceFlame": {
    "id": "produceFlame",
    "name": "Produce Flame",
    "ukr": "Produce Flame",
    "level": 0,
    "type": "cantrip",
    "school": "conjuration",
    "effectType": "attack",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "fire",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "fire damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "miscTags": [
      "LGT",
      "SCL"
    ],
    "page": 269,
    "source": "PHB 2014"
  },
  "programmedIllusion": {
    "id": "programmedIllusion",
    "name": "Programmed Illusion",
    "ukr": "Programmed Illusion",
    "level": 6,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 269,
    "source": "PHB 2014"
  },
  "projectImage": {
    "id": "projectImage",
    "name": "Project Image",
    "ukr": "Project Image",
    "level": 7,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "500 миль",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 дн",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "page": 270,
    "source": "PHB 2014"
  },
  "protectionFromEnergy": {
    "id": "protectionFromEnergy",
    "name": "Protection from Energy",
    "ukr": "Protection from Energy",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 270,
    "source": "PHB 2014"
  },
  "protectionFromEvilAndGood": {
    "id": "protectionFromEvilAndGood",
    "name": "Protection from Evil and Good",
    "ukr": "Protection from Evil and Good",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 270,
    "source": "PHB 2014"
  },
  "protectionFromPoison": {
    "id": "protectionFromPoison",
    "name": "Protection from Poison",
    "ukr": "Protection from Poison",
    "level": 2,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 270,
    "source": "PHB 2014"
  },
  "purifyFoodAndDrink": {
    "id": "purifyFoodAndDrink",
    "name": "Purify Food and Drink",
    "ukr": "Purify Food and Drink",
    "level": 1,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 270,
    "source": "PHB 2014"
  },
  "raiseDead": {
    "id": "raiseDead",
    "name": "Raise Dead",
    "ukr": "Raise Dead",
    "level": 5,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 270,
    "source": "PHB 2014"
  },
  "rarySTelepathicBond": {
    "id": "rarySTelepathicBond",
    "name": "Rary's Telepathic Bond",
    "ukr": "Rary's Telepathic Bond",
    "level": 5,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "pieces of eggshell from two different kinds of creatures",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [],
    "page": 270,
    "source": "PHB 2014"
  },
  "rayOfEnfeeblement": {
    "id": "rayOfEnfeeblement",
    "name": "Ray of Enfeeblement",
    "ukr": "Ray of Enfeeblement",
    "level": 2,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 271,
    "source": "PHB 2014"
  },
  "rayOfFrost": {
    "id": "rayOfFrost",
    "name": "Ray of Frost",
    "ukr": "Ray of Frost",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "cold",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "cold damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "miscTags": [
      "SCL"
    ],
    "page": 271,
    "source": "PHB 2014"
  },
  "rayOfSickness": {
    "id": "rayOfSickness",
    "name": "Ray of Sickness",
    "ukr": "Ray of Sickness",
    "level": 1,
    "type": "spell",
    "school": "necromancy",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "poison",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 271,
    "source": "PHB 2014"
  },
  "regenerate": {
    "id": "regenerate",
    "name": "Regenerate",
    "ukr": "regenerate",
    "level": 7,
    "type": "spell",
    "school": "transmutation",
    "effectType": "healing",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a prayer wheel and holy water",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 271,
    "source": "PHB 2014"
  },
  "reincarnate": {
    "id": "reincarnate",
    "name": "Reincarnate",
    "ukr": "reincarnate",
    "level": 5,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "HL",
      "RO"
    ],
    "page": 271,
    "source": "PHB 2014"
  },
  "removeCurse": {
    "id": "removeCurse",
    "name": "Remove Curse",
    "ukr": "Remove Curse",
    "level": 3,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 271,
    "source": "PHB 2014"
  },
  "resistance": {
    "id": "resistance",
    "name": "Resistance",
    "ukr": "resistance",
    "level": 0,
    "type": "cantrip",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a miniature cloak",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 272,
    "source": "PHB 2014"
  },
  "resurrection": {
    "id": "resurrection",
    "name": "Resurrection",
    "ukr": "resurrection",
    "level": 7,
    "type": "spell",
    "school": "necromancy",
    "effectType": "healing",
    "classes": [
      "bard",
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 272,
    "source": "PHB 2014"
  },
  "reverseGravity": {
    "id": "reverseGravity",
    "name": "Reverse Gravity",
    "ukr": "Reverse Gravity",
    "level": 7,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "100 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a lodestone and iron filings",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 272,
    "source": "PHB 2014"
  },
  "revivify": {
    "id": "revivify",
    "name": "Revivify",
    "ukr": "revivify",
    "level": 3,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 272,
    "source": "PHB 2014"
  },
  "ropeTrick": {
    "id": "ropeTrick",
    "name": "Rope Trick",
    "ukr": "Rope Trick",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "powdered corn extract and a twisted loop of parchment",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 272,
    "source": "PHB 2014"
  },
  "sacredFlame": {
    "id": "sacredFlame",
    "name": "Sacred Flame",
    "ukr": "Sacred Flame",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "radiant",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "radiant damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "page": 272,
    "source": "PHB 2014"
  },
  "sanctuary": {
    "id": "sanctuary",
    "name": "Sanctuary",
    "ukr": "sanctuary",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small silver mirror",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "You ward a creature within range against attack. Until the spell ends, any creature who targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw. On a failed save, the creature must choose a new target or lose the attack or spell. This spell doesn’t protect the warded creature from area effects, such as the explosion of a fireball. If the warded creature makes an attack or casts a spell that affects an enemy creature, this spell ends.",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 272,
    "source": "PHB 2014"
  },
  "scorchingRay": {
    "id": "scorchingRay",
    "name": "Scorching Ray",
    "ukr": "Scorching Ray",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "fire",
    "areaTags": [
      "MT",
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 273,
    "source": "PHB 2014"
  },
  "scrying": {
    "id": "scrying",
    "name": "Scrying",
    "ukr": "scrying",
    "level": 5,
    "type": "spell",
    "school": "divination",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "10 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 273,
    "source": "PHB 2014"
  },
  "searingSmite": {
    "id": "searingSmite",
    "name": "Searing Smite",
    "ukr": "Searing Smite",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "fire",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 274,
    "source": "PHB 2014"
  },
  "seeInvisibility": {
    "id": "seeInvisibility",
    "name": "See Invisibility",
    "ukr": "See Invisibility",
    "level": 2,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of talc and a small sprinkling of powdered silver",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 274,
    "source": "PHB 2014"
  },
  "seeming": {
    "id": "seeming",
    "name": "Seeming",
    "ukr": "seeming",
    "level": 5,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 274,
    "source": "PHB 2014"
  },
  "sending": {
    "id": "sending",
    "name": "Sending",
    "ukr": "sending",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a short piece of fine copper wire",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 274,
    "source": "PHB 2014"
  },
  "sequester": {
    "id": "sequester",
    "name": "Sequester",
    "ukr": "sequester",
    "level": 7,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 274,
    "source": "PHB 2014"
  },
  "shapechange": {
    "id": "shapechange",
    "name": "Shapechange",
    "ukr": "shapechange",
    "level": 9,
    "type": "spell",
    "school": "transmutation",
    "effectType": "healing",
    "classes": [
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 274,
    "source": "PHB 2014"
  },
  "shatter": {
    "id": "shatter",
    "name": "Shatter",
    "ukr": "shatter",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a chip of mica",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "thunder",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 275,
    "source": "PHB 2014"
  },
  "shield": {
    "id": "shield",
    "name": "Shield",
    "ukr": "shield",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 реакція",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "MAC"
    ],
    "page": 275,
    "source": "PHB 2014"
  },
  "shieldOfFaith": {
    "id": "shieldOfFaith",
    "name": "Shield of Faith",
    "ukr": "Shield of Faith",
    "level": 1,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small parchment with a bit of holy text written on it",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "MAC"
    ],
    "page": 275,
    "source": "PHB 2014"
  },
  "shillelagh": {
    "id": "shillelagh",
    "name": "Shillelagh",
    "ukr": "shillelagh",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "mistletoe, a shamrock leaf, and a club or quarterstaff",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "For the duration, you can use your spellcasting ability instead of Strength for a club or quarterstaff you touch, and the weapon's damage die becomes a d8. The weapon also becomes magical if it isn't. The spell ends if you cast it again or if you let go of the weapon.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 275,
    "source": "PHB 2014"
  },
  "shockingGrasp": {
    "id": "shockingGrasp",
    "name": "Shocking Grasp",
    "ukr": "Shocking Grasp",
    "level": 0,
    "type": "cantrip",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "lightning",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "lightning damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "miscTags": [
      "SCL"
    ],
    "page": 275,
    "source": "PHB 2014"
  },
  "silence": {
    "id": "silence",
    "name": "Silence",
    "ukr": "silence",
    "level": 2,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 275,
    "source": "PHB 2014"
  },
  "silentImage": {
    "id": "silentImage",
    "name": "Silent Image",
    "ukr": "Silent Image",
    "level": 1,
    "type": "spell",
    "school": "illusion",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of fleece",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 276,
    "source": "PHB 2014"
  },
  "simulacrum": {
    "id": "simulacrum",
    "name": "Simulacrum",
    "ukr": "simulacrum",
    "level": 7,
    "type": "spell",
    "school": "illusion",
    "effectType": "healing",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "12 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 276,
    "source": "PHB 2014"
  },
  "sleep": {
    "id": "sleep",
    "name": "Sleep",
    "ukr": "sleep",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "healing",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of fine sand, rose petals, or a cricket",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures). Starting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature’s hit points from the total before moving on to the creature with the next lowest hit points. A creature’s hit points must be equal to or less than the remaining total for that creature to be affected. Undead and creatures immune to being charmed aren’t affected by this spell. At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 276,
    "source": "PHB 2014"
  },
  "sleetStorm": {
    "id": "sleetStorm",
    "name": "Sleet Storm",
    "ukr": "Sleet Storm",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of dust and a few drops of water",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity, constitution",
    "damageType": "",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [
      "DFT",
      "OBS"
    ],
    "page": 276,
    "source": "PHB 2014"
  },
  "slow": {
    "id": "slow",
    "name": "Slow",
    "ukr": "slow",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of molasses",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "C",
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "MAC"
    ],
    "page": 277,
    "source": "PHB 2014"
  },
  "spareTheDying": {
    "id": "spareTheDying",
    "name": "Spare the Dying",
    "ukr": "Spare the Dying",
    "level": 0,
    "type": "cantrip",
    "school": "necromancy",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 277,
    "source": "PHB 2014"
  },
  "speakWithAnimals": {
    "id": "speakWithAnimals",
    "name": "Speak with Animals",
    "ukr": "Speak with Animals",
    "level": 1,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 277,
    "source": "PHB 2014"
  },
  "speakWithDead": {
    "id": "speakWithDead",
    "name": "Speak with Dead",
    "ukr": "Speak with Dead",
    "level": 3,
    "type": "spell",
    "school": "necromancy",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "burning incense",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 277,
    "source": "PHB 2014"
  },
  "speakWithPlants": {
    "id": "speakWithPlants",
    "name": "Speak with Plants",
    "ukr": "Speak with Plants",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 277,
    "source": "PHB 2014"
  },
  "spiderClimb": {
    "id": "spiderClimb",
    "name": "Spider Climb",
    "ukr": "Spider Climb",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of bitumen and a spider",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 277,
    "source": "PHB 2014"
  },
  "spikeGrowth": {
    "id": "spikeGrowth",
    "name": "Spike Growth",
    "ukr": "Spike Growth",
    "level": 2,
    "type": "spell",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "seven sharp thorns or seven small twigs, each sharpened to a point",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "piercing",
    "areaTags": [
      "R"
    ],
    "damage": null,
    "miscTags": [
      "DFT"
    ],
    "page": 277,
    "source": "PHB 2014"
  },
  "spiritGuardians": {
    "id": "spiritGuardians",
    "name": "Spirit Guardians",
    "ukr": "Spirit Guardians",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "15 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a holy symbol",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "necrotic, radiant",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 278,
    "source": "PHB 2014"
  },
  "spiritualWeapon": {
    "id": "spiritualWeapon",
    "name": "Spiritual Weapon",
    "ukr": "Spiritual Weapon",
    "level": 2,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "UBA"
    ],
    "page": 278,
    "source": "PHB 2014"
  },
  "staggeringSmite": {
    "id": "staggeringSmite",
    "name": "Staggering Smite",
    "ukr": "Staggering Smite",
    "level": 4,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 278,
    "source": "PHB 2014"
  },
  "stinkingCloud": {
    "id": "stinkingCloud",
    "name": "Stinking Cloud",
    "ukr": "Stinking Cloud",
    "level": 3,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "90 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a rotten egg or several skunk cabbage leaves",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "OBS"
    ],
    "page": 278,
    "source": "PHB 2014"
  },
  "stoneShape": {
    "id": "stoneShape",
    "name": "Stone Shape",
    "ukr": "Stone Shape",
    "level": 4,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "soft clay, which must be worked into roughly the desired shape of the stone object",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "OBJ"
    ],
    "page": 278,
    "source": "PHB 2014"
  },
  "stoneskin": {
    "id": "stoneskin",
    "name": "Stoneskin",
    "ukr": "stoneskin",
    "level": 4,
    "type": "spell",
    "school": "abjuration",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 278,
    "source": "PHB 2014"
  },
  "stormOfVengeance": {
    "id": "stormOfVengeance",
    "name": "Storm of Vengeance",
    "ukr": "Storm of Vengeance",
    "level": 9,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution, dexterity",
    "damageType": "acid, bludgeoning, cold, lightning, thunder",
    "areaTags": [
      "Y"
    ],
    "damage": null,
    "miscTags": [
      "DFT",
      "OBJ",
      "OBS",
      "SGT"
    ],
    "page": 279,
    "source": "PHB 2014"
  },
  "suggestion": {
    "id": "suggestion",
    "name": "Suggestion",
    "ukr": "suggestion",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "a snake's tongue and either a bit of honeycomb or a drop of sweet oil",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 279,
    "source": "PHB 2014"
  },
  "sunbeam": {
    "id": "sunbeam",
    "name": "Sunbeam",
    "ukr": "sunbeam",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a magnifying glass",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "radiant",
    "areaTags": [
      "L"
    ],
    "damage": null,
    "miscTags": [
      "LGTS"
    ],
    "page": 279,
    "source": "PHB 2014"
  },
  "sunburst": {
    "id": "sunburst",
    "name": "Sunburst",
    "ukr": "sunburst",
    "level": 8,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "150 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "fire and a piece of sunstone",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "radiant",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "LGT",
      "LGTS"
    ],
    "page": 279,
    "source": "PHB 2014"
  },
  "swiftQuiver": {
    "id": "swiftQuiver",
    "name": "Swift Quiver",
    "ukr": "Swift Quiver",
    "level": 5,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a quiver containing at least one piece of ammunition",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "UBA"
    ],
    "page": 279,
    "source": "PHB 2014"
  },
  "symbol": {
    "id": "symbol",
    "name": "Symbol",
    "ukr": "symbol",
    "level": 7,
    "type": "spell",
    "school": "abjuration",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Постійно",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "constitution, wisdom, charisma, intelligence",
    "damageType": "necrotic",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [
      "LGT",
      "OBJ"
    ],
    "page": 280,
    "source": "PHB 2014"
  },
  "tashaSHideousLaughter": {
    "id": "tashaSHideousLaughter",
    "name": "Tasha's Hideous Laughter",
    "ukr": "Tasha's Hideous Laughter",
    "level": 1,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "tiny tarts and a feather that is waved in the air",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 280,
    "source": "PHB 2014"
  },
  "telekinesis": {
    "id": "telekinesis",
    "name": "Telekinesis",
    "ukr": "telekinesis",
    "level": 5,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "FMV",
      "OBJ",
      "SGT"
    ],
    "page": 280,
    "source": "PHB 2014"
  },
  "telepathy": {
    "id": "telepathy",
    "name": "Telepathy",
    "ukr": "Telepathy",
    "level": 8,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pair of linked silver rings",
    "duration": "24 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 281,
    "source": "PHB 2014"
  },
  "teleport": {
    "id": "teleport",
    "name": "Teleport",
    "ukr": "teleport",
    "level": 7,
    "type": "spell",
    "school": "conjuration",
    "effectType": "attack",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 7,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "force",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "RO",
      "SGT",
      "TP"
    ],
    "page": 281,
    "source": "PHB 2014"
  },
  "teleportationCircle": {
    "id": "teleportationCircle",
    "name": "Teleportation Circle",
    "ukr": "Teleportation Circle",
    "level": 5,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PIR",
      "PRM",
      "TP"
    ],
    "page": 282,
    "source": "PHB 2014"
  },
  "tenserSFloatingDisk": {
    "id": "tenserSFloatingDisk",
    "name": "Tenser's Floating Disk",
    "ukr": "Tenser's Floating Disk",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of mercury",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 282,
    "source": "PHB 2014"
  },
  "thaumaturgy": {
    "id": "thaumaturgy",
    "name": "Thaumaturgy",
    "ukr": "thaumaturgy",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range: • Your voice booms up to three times as loud as normal for 1 minute. • You cause flames to flicker, brighten, dim, or change color for 1 minute. • You cause harmless tremors in the ground for 1 minute. • You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or omi- nous whispers. • You instantaneously cause an unlocked door or window to fly open or slam shut. • You alter the appearance of your eyes for 1 minute. If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action.",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 282,
    "source": "PHB 2014"
  },
  "thornWhip": {
    "id": "thornWhip",
    "name": "Thorn Whip",
    "ukr": "Thorn Whip",
    "level": 0,
    "type": "cantrip",
    "school": "transmutation",
    "effectType": "attack",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "the stem of a plant with thorns",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "piercing",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "piercing damage",
      "scaling": {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6"
      }
    },
    "miscTags": [
      "FMV",
      "SCL"
    ],
    "page": 282,
    "source": "PHB 2014"
  },
  "thunderousSmite": {
    "id": "thunderousSmite",
    "name": "Thunderous Smite",
    "ukr": "Thunderous Smite",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "thunder",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD",
      "FMV"
    ],
    "page": 282,
    "source": "PHB 2014"
  },
  "thunderwave": {
    "id": "thunderwave",
    "name": "Thunderwave",
    "ukr": "thunderwave",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "15 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed. In addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell’s effect, and the spell emits a thunderous boom audible out to 300 feet. At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "higherLevel": "",
    "savingThrow": "constitution",
    "damageType": "thunder",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "FMV",
      "OBJ"
    ],
    "page": 282,
    "source": "PHB 2014"
  },
  "timeStop": {
    "id": "timeStop",
    "name": "Time Stop",
    "ukr": "Time Stop",
    "level": 9,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 283,
    "source": "PHB 2014"
  },
  "tongues": {
    "id": "tongues",
    "name": "Tongues",
    "ukr": "tongues",
    "level": 3,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": true
    },
    "materialText": "a small clay model of a ziggurat",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 283,
    "source": "PHB 2014"
  },
  "transportViaPlants": {
    "id": "transportViaPlants",
    "name": "Transport via Plants",
    "ukr": "Transport via Plants",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "10 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "TP"
    ],
    "page": 283,
    "source": "PHB 2014"
  },
  "treeStride": {
    "id": "treeStride",
    "name": "Tree Stride",
    "ukr": "Tree Stride",
    "level": 5,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "TP"
    ],
    "page": 283,
    "source": "PHB 2014"
  },
  "truePolymorph": {
    "id": "truePolymorph",
    "name": "True Polymorph",
    "ukr": "True Polymorph",
    "level": 9,
    "type": "spell",
    "school": "transmutation",
    "effectType": "save",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a drop of mercury, a dollop of gum arabic, and a wisp of smoke",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "PRM",
      "SGT",
      "SMN"
    ],
    "page": 283,
    "source": "PHB 2014"
  },
  "trueResurrection": {
    "id": "trueResurrection",
    "name": "True Resurrection",
    "ukr": "True Resurrection",
    "level": 9,
    "type": "spell",
    "school": "necromancy",
    "effectType": "healing",
    "classes": [
      "cleric",
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 год",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 284,
    "source": "PHB 2014"
  },
  "trueSeeing": {
    "id": "trueSeeing",
    "name": "True Seeing",
    "ukr": "True Seeing",
    "level": 6,
    "type": "spell",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [],
    "page": 284,
    "source": "PHB 2014"
  },
  "trueStrike": {
    "id": "trueStrike",
    "name": "True Strike",
    "ukr": "True Strike",
    "level": 0,
    "type": "cantrip",
    "school": "divination",
    "effectType": "utility",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": false,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "ADV"
    ],
    "page": 284,
    "source": "PHB 2014"
  },
  "tsunami": {
    "id": "tsunami",
    "name": "Tsunami",
    "ukr": "Tsunami",
    "level": 8,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "6 раунд",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 8,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "bludgeoning",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [],
    "page": 284,
    "source": "PHB 2014"
  },
  "unseenServant": {
    "id": "unseenServant",
    "name": "Unseen Servant",
    "ukr": "Unseen Servant",
    "level": 1,
    "type": "spell",
    "school": "conjuration",
    "effectType": "healing",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a piece of string and a bit of wood",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "SMN",
      "UBA"
    ],
    "page": 284,
    "source": "PHB 2014"
  },
  "vampiricTouch": {
    "id": "vampiricTouch",
    "name": "Vampiric Touch",
    "ukr": "Vampiric Touch",
    "level": 3,
    "type": "spell",
    "school": "necromancy",
    "effectType": "attack",
    "classes": [
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "necrotic",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "HL"
    ],
    "page": 285,
    "source": "PHB 2014"
  },
  "viciousMockery": {
    "id": "viciousMockery",
    "name": "Vicious Mockery",
    "ukr": "Vicious Mockery",
    "level": 0,
    "type": "cantrip",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": false,
    "spellSlotLevel": 0,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [
      "ST"
    ],
    "damage": {
      "label": "psychic damage",
      "scaling": {
        "1": "1d4",
        "5": "2d4",
        "11": "3d4",
        "17": "4d4"
      }
    },
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "page": 285,
    "source": "PHB 2014"
  },
  "wallOfFire": {
    "id": "wallOfFire",
    "name": "Wall of Fire",
    "ukr": "Wall of Fire",
    "level": 4,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small piece of phosphorus",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 4,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [],
    "page": 285,
    "source": "PHB 2014"
  },
  "wallOfForce": {
    "id": "wallOfForce",
    "name": "Wall of Force",
    "ukr": "Wall of Force",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "utility",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a pinch of powder made by crushing a clear gemstone",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [],
    "page": 285,
    "source": "PHB 2014"
  },
  "wallOfIce": {
    "id": "wallOfIce",
    "name": "Wall of Ice",
    "ukr": "Wall of Ice",
    "level": 6,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small piece of quartz",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity, constitution",
    "damageType": "cold",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [],
    "page": 285,
    "source": "PHB 2014"
  },
  "wallOfStone": {
    "id": "wallOfStone",
    "name": "Wall of Stone",
    "ukr": "Wall of Stone",
    "level": 5,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a small block of granite",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 5,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [
      "OBJ",
      "PRM"
    ],
    "page": 287,
    "source": "PHB 2014"
  },
  "wallOfThorns": {
    "id": "wallOfThorns",
    "name": "Wall of Thorns",
    "ukr": "Wall of Thorns",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a handful of thorns",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "piercing, slashing",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [],
    "page": 287,
    "source": "PHB 2014"
  },
  "wardingBond": {
    "id": "wardingBond",
    "name": "Warding Bond",
    "ukr": "Warding Bond",
    "level": 2,
    "type": "spell",
    "school": "abjuration",
    "effectType": "healing",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [
      "MAC"
    ],
    "page": 287,
    "source": "PHB 2014"
  },
  "waterBreathing": {
    "id": "waterBreathing",
    "name": "Water Breathing",
    "ukr": "Water Breathing",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a short reed or piece of straw",
    "duration": "24 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 287,
    "source": "PHB 2014"
  },
  "waterWalk": {
    "id": "waterWalk",
    "name": "Water Walk",
    "ukr": "Water Walk",
    "level": 3,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "cleric",
      "druid",
      "ranger",
      "sorcerer"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a piece of cork",
    "duration": "1 год",
    "concentration": false,
    "ritual": true,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 287,
    "source": "PHB 2014"
  },
  "web": {
    "id": "web",
    "name": "Web",
    "ukr": "web",
    "level": 2,
    "type": "spell",
    "school": "conjuration",
    "effectType": "save",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a bit of spiderweb",
    "duration": "1 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "dexterity",
    "damageType": "fire",
    "areaTags": [
      "C"
    ],
    "damage": null,
    "miscTags": [
      "DFT"
    ],
    "page": 287,
    "source": "PHB 2014"
  },
  "weird": {
    "id": "weird",
    "name": "Weird",
    "ukr": "weird",
    "level": 9,
    "type": "spell",
    "school": "illusion",
    "effectType": "save",
    "classes": [
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 288,
    "source": "PHB 2014"
  },
  "windWalk": {
    "id": "windWalk",
    "name": "Wind Walk",
    "ukr": "Wind Walk",
    "level": 6,
    "type": "spell",
    "school": "transmutation",
    "effectType": "utility",
    "classes": [
      "druid"
    ],
    "subclasses": [],
    "castingTime": "1 хв",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "fire and holy water",
    "duration": "8 год",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [
      "MT"
    ],
    "damage": null,
    "miscTags": [
      "SGT"
    ],
    "page": 288,
    "source": "PHB 2014"
  },
  "windWall": {
    "id": "windWall",
    "name": "Wind Wall",
    "ukr": "Wind Wall",
    "level": 3,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "druid",
      "ranger"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "120 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a tiny fan and a feather of exotic origin",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 3,
    "description": "",
    "higherLevel": "",
    "savingThrow": "strength",
    "damageType": "bludgeoning",
    "areaTags": [
      "W"
    ],
    "damage": null,
    "miscTags": [],
    "page": 288,
    "source": "PHB 2014"
  },
  "wish": {
    "id": "wish",
    "name": "Wish",
    "ukr": "wish",
    "level": 9,
    "type": "spell",
    "school": "conjuration",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 9,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "necrotic",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "ADV",
      "HL",
      "SGT"
    ],
    "page": 288,
    "source": "PHB 2014"
  },
  "witchBolt": {
    "id": "witchBolt",
    "name": "Witch Bolt",
    "ukr": "Witch Bolt",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "attack",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "30 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": true
    },
    "materialText": "a twig from a tree that has been struck by lightning",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "lightning",
    "areaTags": [
      "ST"
    ],
    "damage": null,
    "miscTags": [],
    "page": 289,
    "source": "PHB 2014"
  },
  "wordOfRecall": {
    "id": "wordOfRecall",
    "name": "Word of Recall",
    "ukr": "Word of Recall",
    "level": 6,
    "type": "spell",
    "school": "conjuration",
    "effectType": "utility",
    "classes": [
      "cleric"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "5 футів",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "Миттєво",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 6,
    "description": "",
    "higherLevel": "",
    "savingThrow": "",
    "damageType": "",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "PS",
      "TP"
    ],
    "page": 289,
    "source": "PHB 2014"
  },
  "wrathfulSmite": {
    "id": "wrathfulSmite",
    "name": "Wrathful Smite",
    "ukr": "Wrathful Smite",
    "level": 1,
    "type": "spell",
    "school": "evocation",
    "effectType": "save",
    "classes": [
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 бонусна дія",
    "range": "point",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": false
    },
    "materialText": "",
    "duration": "1 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 1,
    "description": "",
    "higherLevel": "",
    "savingThrow": "wisdom",
    "damageType": "psychic",
    "areaTags": [],
    "damage": null,
    "miscTags": [
      "AAD"
    ],
    "page": 289,
    "source": "PHB 2014"
  },
  "zoneOfTruth": {
    "id": "zoneOfTruth",
    "name": "Zone of Truth",
    "ukr": "Zone of Truth",
    "level": 2,
    "type": "spell",
    "school": "enchantment",
    "effectType": "save",
    "classes": [
      "bard",
      "cleric",
      "paladin"
    ],
    "subclasses": [],
    "castingTime": "1 дія",
    "range": "60 футів",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": false
    },
    "materialText": "",
    "duration": "10 хв",
    "concentration": false,
    "ritual": false,
    "requiresSlot": true,
    "spellSlotLevel": 2,
    "description": "",
    "higherLevel": "",
    "savingThrow": "charisma",
    "damageType": "",
    "areaTags": [
      "S"
    ],
    "damage": null,
    "miscTags": [],
    "page": 289,
    "source": "PHB 2014"
  }
};

export function getSpellById(id) { return SPELLS[id] ?? null; }
export function getAllSpells() { return Object.values(SPELLS); }
