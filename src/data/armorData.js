// ==================================================
// ВОЛОДІННЯ БРОНЕЮ
// ==================================================

export const ARMOR_PROFICIENCIES = {

  LIGHT: "light",

  MEDIUM: "medium",

  HEAVY: "heavy",

  SHIELD: "shield"

};


// ==================================================
// БРОНЯ PHB 2014
// ==================================================

export const ARMOR = {

  // ================= LIGHT ARMOR =================

  padded: {
    id: "padded",
    name: "Padded",
    ukr: "Стьобаний обладунок",

    category: "light",

    baseAC: 11,

    dexModifier: "full",

    stealthDisadvantage: true
  },

  leather: {
    id: "leather",
    name: "Leather",
    ukr: "Шкіряний обладунок",

    category: "light",

    baseAC: 11,

    dexModifier: "full",

    stealthDisadvantage: false
  },

  studdedLeather: {
    id: "studdedLeather",
    name: "Studded Leather",
    ukr: "Клепаний шкіряний обладунок",

    category: "light",

    baseAC: 12,

    dexModifier: "full",

    stealthDisadvantage: false
  },

  // ================= MEDIUM ARMOR =================

  hide: {
    id: "hide",
    name: "Hide",
    ukr: "Шкуряний обладунок",

    category: "medium",

    baseAC: 12,

    dexModifier: "max2",

    stealthDisadvantage: false
  },

  chainShirt: {
    id: "chainShirt",
    name: "Chain Shirt",
    ukr: "Кольчужна сорочка",

    category: "medium",

    baseAC: 13,

    dexModifier: "max2",

    stealthDisadvantage: false
  },

  scaleMail: {
    id: "scaleMail",
    name: "Scale Mail",
    ukr: "Лускатий обладунок",

    category: "medium",

    baseAC: 14,

    dexModifier: "max2",

    stealthDisadvantage: true
  },

  breastplate: {
    id: "breastplate",
    name: "Breastplate",
    ukr: "Кіраса",

    category: "medium",

    baseAC: 14,

    dexModifier: "max2",

    stealthDisadvantage: false
  },

  halfPlate: {
    id: "halfPlate",
    name: "Half Plate",
    ukr: "Напівпластинчатий обладунок",

    category: "medium",

    baseAC: 15,

    dexModifier: "max2",

    stealthDisadvantage: true
  },

  // ================= HEAVY ARMOR =================

  ringMail: {
    id: "ringMail",
    name: "Ring Mail",
    ukr: "Кільчастий обладунок",

    category: "heavy",

    baseAC: 14,

    dexModifier: "none",

    stealthDisadvantage: true
  },

  chainMail: {
    id: "chainMail",
    name: "Chain Mail",
    ukr: "Кольчуга",

    category: "heavy",

    baseAC: 16,

    dexModifier: "none",

    strengthRequirement: 13,

    stealthDisadvantage: true
  },

  splint: {
    id: "splint",
    name: "Splint",
    ukr: "Сегментний обладунок",

    category: "heavy",

    baseAC: 17,

    dexModifier: "none",

    strengthRequirement: 15,

    stealthDisadvantage: true
  },

  plate: {
    id: "plate",
    name: "Plate",
    ukr: "Пластинчатий обладунок",

    category: "heavy",

    baseAC: 18,

    dexModifier: "none",

    strengthRequirement: 15,

    stealthDisadvantage: true
  }

};


// ==================================================
// ЩИТИ PHB 2014
// ==================================================

export const SHIELDS = {

  shield: {
    id: "shield",
    name: "Shield",
    ukr: "Щит",

    acBonus: 2
  }

};