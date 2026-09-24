// ==================================================
// D&D Character Sheet — Rules Data
// Загальні правила PHB 2014.
// Цей файл НЕ містить рас, класів, зброї чи броні.
// ==================================================


// ==================================================
// СТАТУСИ ВОЛОДІННЯ
// ==================================================

export const PROFICIENCY = {
  NONE: 0,
  PROFICIENT: 1,
  EXPERTISE: 2,
  HALF: 3
};


// ==================================================
// ТИПИ НАВИЧОК
// ==================================================

export const SKILL_TYPES = {
  SAVE: "save",
  SKILL: "skill"
};


// ==================================================
// ХАРАКТЕРИСТИКИ
// ==================================================

export const ABILITY_KEYS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma"
];

export const STATS = {
  strength: {
    short: "STR",
    name: "Strength",
    ukr: "Сила",
    description: "Фізична сила, атлетизм та здатність прикладати зусилля."
  },

  dexterity: {
    short: "DEX",
    name: "Dexterity",
    ukr: "Спритність",
    description: "Спритність, реакція, баланс та координація."
  },

  constitution: {
    short: "CON",
    name: "Constitution",
    ukr: "Статура",
    description: "Витривалість, здоров'я та фізична стійкість."
  },

  intelligence: {
    short: "INT",
    name: "Intelligence",
    ukr: "Інтелект",
    description: "Логіка, пам'ять, знання та аналіз."
  },

  wisdom: {
    short: "WIS",
    name: "Wisdom",
    ukr: "Мудрість",
    description: "Уважність, інтуїція та сприйняття світу."
  },

  charisma: {
    short: "CHA",
    name: "Charisma",
    ukr: "Харизма",
    description: "Особистість, впевненість і вплив на інших."
  }
};


// ==================================================
// НАВИЧКИ ТА РЯТКИДКИ
// ==================================================

export const SKILLS = {

  // STR
  strengthST: {
    name: "Strength Saving Throw",
    ukr: "Ряткидок Сили",
    stat: "strength",
    type: SKILL_TYPES.SAVE
  },

  athletics: {
    name: "Athletics",
    ukr: "Атлетика",
    stat: "strength",
    type: SKILL_TYPES.SKILL
  },

  // DEX
  dexterityST: {
    name: "Dexterity Saving Throw",
    ukr: "Ряткидок Спритності",
    stat: "dexterity",
    type: SKILL_TYPES.SAVE
  },

  acrobatics: {
    name: "Acrobatics",
    ukr: "Акробатика",
    stat: "dexterity",
    type: SKILL_TYPES.SKILL
  },

  sleightOfHand: {
    name: "Sleight of Hand",
    ukr: "Спритність рук",
    stat: "dexterity",
    type: SKILL_TYPES.SKILL
  },

  stealth: {
    name: "Stealth",
    ukr: "Скритність",
    stat: "dexterity",
    type: SKILL_TYPES.SKILL
  },

  // CON
  constitutionST: {
    name: "Constitution Saving Throw",
    ukr: "Ряткидок Статури",
    stat: "constitution",
    type: SKILL_TYPES.SAVE
  },

  // INT
  intelligenceST: {
    name: "Intelligence Saving Throw",
    ukr: "Ряткидок Інтелекту",
    stat: "intelligence",
    type: SKILL_TYPES.SAVE
  },

  arcana: {
    name: "Arcana",
    ukr: "Аркана",
    stat: "intelligence",
    type: SKILL_TYPES.SKILL
  },

  history: {
    name: "History",
    ukr: "Історія",
    stat: "intelligence",
    type: SKILL_TYPES.SKILL
  },

  investigation: {
    name: "Investigation",
    ukr: "Розслідування",
    stat: "intelligence",
    type: SKILL_TYPES.SKILL
  },

  nature: {
    name: "Nature",
    ukr: "Природа",
    stat: "intelligence",
    type: SKILL_TYPES.SKILL
  },

  religion: {
    name: "Religion",
    ukr: "Релігія",
    stat: "intelligence",
    type: SKILL_TYPES.SKILL
  },

  // WIS
  wisdomST: {
    name: "Wisdom Saving Throw",
    ukr: "Ряткидок Мудрості",
    stat: "wisdom",
    type: SKILL_TYPES.SAVE
  },

  animalHandling: {
    name: "Animal Handling",
    ukr: "Поводження з тваринами",
    stat: "wisdom",
    type: SKILL_TYPES.SKILL
  },

  insight: {
    name: "Insight",
    ukr: "Проникливість",
    stat: "wisdom",
    type: SKILL_TYPES.SKILL
  },

  medicine: {
    name: "Medicine",
    ukr: "Медицина",
    stat: "wisdom",
    type: SKILL_TYPES.SKILL
  },

  perception: {
    name: "Perception",
    ukr: "Уважність",
    stat: "wisdom",
    type: SKILL_TYPES.SKILL
  },

  survival: {
    name: "Survival",
    ukr: "Виживання",
    stat: "wisdom",
    type: SKILL_TYPES.SKILL
  },

  // CHA
  charismaST: {
    name: "Charisma Saving Throw",
    ukr: "Ряткидок Харизми",
    stat: "charisma",
    type: SKILL_TYPES.SAVE
  },

  deception: {
    name: "Deception",
    ukr: "Обман",
    stat: "charisma",
    type: SKILL_TYPES.SKILL
  },

  intimidation: {
    name: "Intimidation",
    ukr: "Залякування",
    stat: "charisma",
    type: SKILL_TYPES.SKILL
  },

  performance: {
    name: "Performance",
    ukr: "Виступ",
    stat: "charisma",
    type: SKILL_TYPES.SKILL
  },

  persuasion: {
    name: "Persuasion",
    ukr: "Переконання",
    stat: "charisma",
    type: SKILL_TYPES.SKILL
  }
};


// ==================================================
// РОЗМІРИ
// ==================================================

export const SIZES = {
  SMALL: "Small",
  MEDIUM: "Medium"
};


// ==================================================
// ТИПИ ШКОДИ
// ==================================================

export const DAMAGE_TYPES = {
  ACID: "acid",
  BLUDGEONING: "bludgeoning",
  COLD: "cold",
  FIRE: "fire",
  FORCE: "force",
  LIGHTNING: "lightning",
  NECROTIC: "necrotic",
  PIERCING: "piercing",
  POISON: "poison",
  PSYCHIC: "psychic",
  RADIANT: "radiant",
  SLASHING: "slashing",
  THUNDER: "thunder"
};


// ==================================================
// СТАНИ
// ==================================================

export const CONDITIONS = {
  BLINDED: "blinded",
  CHARMED: "charmed",
  DEAFENED: "deafened",
  FRIGHTENED: "frightened",
  GRAPPLED: "grappled",
  INCAPACITATED: "incapacitated",
  INVISIBLE: "invisible",
  PARALYZED: "paralyzed",
  PETRIFIED: "petrified",
  POISONED: "poisoned",
  PRONE: "prone",
  RESTRAINED: "restrained",
  STUNNED: "stunned",
  UNCONSCIOUS: "unconscious"
};


// ==================================================
// МОВИ
// ==================================================

export const LANGUAGES = {
  COMMON: "Common",
  DWARVISH: "Dwarvish",
  ELVISH: "Elvish",
  DRACONIC: "Draconic",
  GNOMISH: "Gnomish",
  HALFLING: "Halfling",
  ORC: "Orc",
  INFERNAL: "Infernal",
  GIANT: "Giant",
  GOBLIN: "Goblin",
  ABYSSAL: "Abyssal",
  CELESTIAL: "Celestial",
  DEEP_SPEECH: "Deep Speech",
  SYLVAN: "Sylvan",
  UNDERCOMMON: "Undercommon",
  PRIMORDIAL: "Primordial"
};


// ==================================================
// ІНСТРУМЕНТИ
// ==================================================

export const TOOLS = {
  SMITHS_TOOLS: "smithsTools",
  BREWERS_SUPPLIES: "brewersSupplies",
  MASONS_TOOLS: "masonsTools",
  TINKERS_TOOLS: "tinkersTools"
};

// ==================================================
// REST & LEVEL-UP RULES
// ==================================================

export const REST_TYPES = {
  SHORT: "short",
  LONG: "long"
};

export const HP_LEVEL_UP_METHODS = {
  AVERAGE: "average",
  ROLL: "roll",
  MANUAL: "manual"
};

export const LONG_REST_HIT_DICE_RECOVERY = {
  FRACTION: 0.5,
  MINIMUM: 1
};

// ==================================================
// ACTION PREFERENCES
// ==================================================
// Generic preference keys for mechanics that support multiple methods.

export const ACTION_PREFERENCES = {
  SHORT_REST_HEALING: "shortRestHealing",
  LEVEL_UP_HP: "levelUpHp"
};
