// ==================================================
// D&D Character Sheet — Spells Data
// Структура каталогу заклять PHB 2014.
// ==================================================

export const SPELL_SCHOOLS = {
  ABJURATION: "abjuration",
  CONJURATION: "conjuration",
  DIVINATION: "divination",
  ENCHANTMENT: "enchantment",
  EVOCATION: "evocation",
  ILLUSION: "illusion",
  NECROMANCY: "necromancy",
  TRANSMUTATION: "transmutation"
};

export const SPELL_SCHOOL_LABELS = {
  abjuration: "Огородження",
  conjuration: "Виклик",
  divination: "Пророцтво",
  enchantment: "Зачарування",
  evocation: "Евокація",
  illusion: "Ілюзія",
  necromancy: "Некромантія",
  transmutation: "Трансмутація"
};

export const SPELL_EFFECT_TYPES = {
  ATTACK: "attack",
  SAVE: "save",
  UTILITY: "utility",
  HEALING: "healing",
  BUFF: "buff",
  DEBUFF: "debuff"
};

export const SPELL_EFFECT_TYPE_LABELS = {
  attack: "Атака",
  save: "Ряткидок",
  utility: "Утилітарне",
  healing: "Лікування",
  buff: "Посилення",
  debuff: "Послаблення"
};

// Поля каталогу:
// level, classes, school, effectType, castingTime, range,
// components, duration, concentration, ritual, requiresSlot,
// description, higherLevel, savingThrow, damageType.
// Для замов level = 0 і requiresSlot = false.

export const SPELLS = {
  eldritchBlast: {
    id: "eldritchBlast", name: "Eldritch Blast", ukr: "Містичний заряд",
    level: 0, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.ATTACK,
    classes: ["warlock"], castingTime: "1 action", range: "120 feet",
    components: { verbal: true, somatic: true, material: false },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: false,
    description: "Далекобійна магічна атака, що завдає 1d10 force шкоди при влучанні.",
    higherLevel: "На 5, 11 і 17 рівнях створюються додаткові промені."
  },

  mageHand: {
    id: "mageHand", name: "Mage Hand", ukr: "Магічна рука",
    level: 0, school: SPELL_SCHOOLS.CONJURATION, effectType: SPELL_EFFECT_TYPES.UTILITY,
    classes: ["bard", "sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "30 feet",
    components: { verbal: true, somatic: true, material: false },
    duration: "1 minute", concentration: false, ritual: false, requiresSlot: false,
    description: "Створює спектральну руку, яка може маніпулювати легкими предметами."
  },

  minorIllusion: {
    id: "minorIllusion", name: "Minor Illusion", ukr: "Мала ілюзія",
    level: 0, school: SPELL_SCHOOLS.ILLUSION, effectType: SPELL_EFFECT_TYPES.UTILITY,
    classes: ["bard", "sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "30 feet",
    components: { somatic: true, material: true, materialText: "шматок руна" },
    duration: "1 minute", concentration: false, ritual: false, requiresSlot: false,
    description: "Створює невеликий звуковий або візуальний ілюзорний ефект."
  },

  chillTouch: {
    id: "chillTouch", name: "Chill Touch", ukr: "Дотик могили",
    level: 0, school: SPELL_SCHOOLS.NECROMANCY, effectType: SPELL_EFFECT_TYPES.ATTACK,
    classes: ["sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "120 feet",
    components: { verbal: true, somatic: true, material: false },
    duration: "1 round", concentration: false, ritual: false, requiresSlot: false,
    damageType: "necrotic",
    description: "Примарна рука завдає 1d8 necrotic шкоди та заважає відновленню HP до початку твого наступного ходу."
  },

  hex: {
    id: "hex", name: "Hex", ukr: "Прокляття",
    level: 1, school: SPELL_SCHOOLS.ENCHANTMENT, effectType: SPELL_EFFECT_TYPES.DEBUFF,
    classes: ["warlock"], castingTime: "1 bonus action", range: "90 feet",
    components: { verbal: true, somatic: true, material: true, materialText: "засохле очне яблуко" },
    duration: "Up to 1 hour", concentration: true, ritual: false, requiresSlot: true,
    damageType: "necrotic",
    description: "Проклинає істоту: твої атаки по ній завдають додаткової 1d6 necrotic шкоди."
  },

  armorOfAgathys: {
    id: "armorOfAgathys", name: "Armor of Agathys", ukr: "Обладунок Агатиса",
    level: 1, school: SPELL_SCHOOLS.ABJURATION, effectType: SPELL_EFFECT_TYPES.BUFF,
    classes: ["warlock"], castingTime: "1 action", range: "Self",
    components: { verbal: true, somatic: true, material: true, materialText: "чашка води" },
    duration: "1 hour", concentration: false, ritual: false, requiresSlot: true,
    damageType: "cold",
    description: "Надає тимчасові HP і завдає cold шкоди істоті, що влучає по тобі рукопашною атакою."
  },

  hellishRebuke: {
    id: "hellishRebuke", name: "Hellish Rebuke", ukr: "Пекельна відплата",
    level: 1, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.SAVE,
    classes: ["warlock"], castingTime: "1 reaction", range: "60 feet",
    components: { verbal: true, somatic: true },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    savingThrow: "Dexterity", damageType: "fire",
    description: "Реакцією після отримання шкоди змушує нападника зробити Dexterity save та може завдати 2d10 fire шкоди."
  },

  witchBolt: {
    id: "witchBolt", name: "Witch Bolt", ukr: "Відьомський заряд",
    level: 1, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.ATTACK,
    classes: ["sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "30 feet",
    components: { verbal: true, somatic: true, material: true, materialText: "гілочка, у яку вдарила блискавка" },
    duration: "Up to 1 minute", concentration: true, ritual: false, requiresSlot: true,
    damageType: "lightning",
    description: "Створює lightning-повідок між тобою та ціллю, який можна підтримувати наступними ходами."
  },

  magicMissile: {
    id: "magicMissile", name: "Magic Missile", ukr: "Чарівна стріла",
    level: 1, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.ATTACK,
    classes: ["sorcerer", "wizard"], castingTime: "1 action", range: "120 feet",
    components: { verbal: true, somatic: true },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    damageType: "force",
    description: "Створює три магічні дротики, які автоматично влучають та завдають force шкоди."
  },

  shield: {
    id: "shield", name: "Shield", ukr: "Щит",
    level: 1, school: SPELL_SCHOOLS.ABJURATION, effectType: SPELL_EFFECT_TYPES.BUFF,
    classes: ["sorcerer", "wizard"], castingTime: "1 reaction", range: "Self",
    components: { verbal: true, somatic: true },
    duration: "1 round", concentration: false, ritual: false, requiresSlot: true,
    description: "Реакцією дає +5 AC до початку твого наступного ходу та блокує Magic Missile."
  },

  bless: {
    id: "bless", name: "Bless", ukr: "Благословення",
    level: 1, school: SPELL_SCHOOLS.ENCHANTMENT, effectType: SPELL_EFFECT_TYPES.BUFF,
    classes: ["cleric", "paladin"], castingTime: "1 action", range: "30 feet",
    components: { verbal: true, somatic: true, material: true, materialText: "окроплення святою водою" },
    duration: "Up to 1 minute", concentration: true, ritual: false, requiresSlot: true,
    description: "До трьох істот додають 1d4 до attack rolls та saving throws."
  },

  cureWounds: {
    id: "cureWounds", name: "Cure Wounds", ukr: "Лікування ран",
    level: 1, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.HEALING,
    classes: ["bard", "cleric", "druid", "paladin", "ranger"], castingTime: "1 action", range: "Touch",
    components: { verbal: true, somatic: true },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    description: "Дотиком відновлює 1d8 + spellcasting ability modifier HP."
  },

  healingWord: {
    id: "healingWord", name: "Healing Word", ukr: "Цілюще слово",
    level: 1, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.HEALING,
    classes: ["bard", "cleric", "druid"], castingTime: "1 bonus action", range: "60 feet",
    components: { verbal: true },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    description: "Дистанційно відновлює 1d4 + spellcasting ability modifier HP."
  },

  mistyStep: {
    id: "mistyStep", name: "Misty Step", ukr: "Туманний крок",
    level: 2, school: SPELL_SCHOOLS.CONJURATION, effectType: SPELL_EFFECT_TYPES.UTILITY,
    classes: ["sorcerer", "warlock", "wizard"], castingTime: "1 bonus action", range: "Self",
    components: { verbal: true },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    description: "Телепортує тебе на відстань до 30 футів у видиму незайняту точку."
  },

  darkness: {
    id: "darkness", name: "Darkness", ukr: "Темрява",
    level: 2, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.UTILITY,
    classes: ["sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "60 feet",
    components: { verbal: true, material: true, materialText: "хутро кажана та крапля смоли" },
    duration: "Up to 10 minutes", concentration: true, ritual: false, requiresSlot: true,
    description: "Створює сферу магічної темряви, яку не долає звичайний darkvision."
  },

  invisibility: {
    id: "invisibility", name: "Invisibility", ukr: "Невидимість",
    level: 2, school: SPELL_SCHOOLS.ILLUSION, effectType: SPELL_EFFECT_TYPES.BUFF,
    classes: ["bard", "sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "Touch",
    components: { verbal: true, somatic: true, material: true, materialText: "війко з ясеневої гілки" },
    duration: "Up to 1 hour", concentration: true, ritual: false, requiresSlot: true,
    description: "Робить доторкнуту істоту невидимою, доки вона не атакує або не накладе заклинання."
  },

  shatter: {
    id: "shatter", name: "Shatter", ukr: "Розтрощення",
    level: 2, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.SAVE,
    classes: ["bard", "sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "60 feet",
    components: { verbal: true, somatic: true, material: true, materialText: "уламок слюди" },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    savingThrow: "Constitution", damageType: "thunder",
    description: "Вибух звуку у сфері 10 футів завдає 3d8 thunder шкоди при невдалому Constitution save."
  },

  counterspell: {
    id: "counterspell", name: "Counterspell", ukr: "Контрзакляття",
    level: 3, school: SPELL_SCHOOLS.ABJURATION, effectType: SPELL_EFFECT_TYPES.UTILITY,
    classes: ["sorcerer", "warlock", "wizard"], castingTime: "1 reaction", range: "60 feet",
    components: { somatic: true },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    description: "Перериває інше заклинання в момент його накладання; вищі рівні можуть вимагати перевірки."
  },

  fireball: {
    id: "fireball", name: "Fireball", ukr: "Вогняна куля",
    level: 3, school: SPELL_SCHOOLS.EVOCATION, effectType: SPELL_EFFECT_TYPES.SAVE,
    classes: ["sorcerer", "wizard"], castingTime: "1 action", range: "150 feet",
    components: { verbal: true, somatic: true, material: true, materialText: "крихітна кулька гуано та сірки" },
    duration: "Instantaneous", concentration: false, ritual: false, requiresSlot: true,
    savingThrow: "Dexterity", damageType: "fire",
    description: "Вибух у сфері 20 футів завдає 8d6 fire шкоди; Dexterity save зменшує шкоду вдвічі."
  },

  hypnoticPattern: {
    id: "hypnoticPattern", name: "Hypnotic Pattern", ukr: "Гіпнотичний візерунок",
    level: 3, school: SPELL_SCHOOLS.ILLUSION, effectType: SPELL_EFFECT_TYPES.SAVE,
    classes: ["bard", "sorcerer", "wizard"], castingTime: "1 action", range: "120 feet",
    components: { somatic: true, material: true, materialText: "сяюча паличка" },
    duration: "Up to 1 minute", concentration: true, ritual: false, requiresSlot: true,
    savingThrow: "Wisdom",
    description: "Магічний візерунок у кубі 30 футів зачаровує та робить incapacitated істот при невдалому Wisdom save."
  },

  fly: {
    id: "fly", name: "Fly", ukr: "Політ",
    level: 3, school: SPELL_SCHOOLS.TRANSMUTATION, effectType: SPELL_EFFECT_TYPES.BUFF,
    classes: ["sorcerer", "warlock", "wizard"], castingTime: "1 action", range: "Touch",
    components: { verbal: true, somatic: true, material: true, materialText: "пір'їна з крила птаха" },
    duration: "Up to 10 minutes", concentration: true, ritual: false, requiresSlot: true,
    description: "Надає цілі flying speed 60 feet."
  }
};

export function getSpellById(id) {
  return SPELLS[id] ?? null;
}

export function getAllSpells() {
  return Object.values(SPELLS);
}
