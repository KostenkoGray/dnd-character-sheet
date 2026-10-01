import { LANGUAGES } from "./rulesData.js";

const item = (source, itemId, quantity = 1) => ({
  source,
  itemId,
  quantity
});

const custom = (itemId, name, type = "other", quantity = 1, description = "") => ({
  source: "custom",
  itemId,
  quantity,
  customItem: {
    id: itemId,
    name,
    ukr: name,
    type,
    equipable: false,
    equipmentSlot: type,
    description
  }
});

export const CREATOR_TOOL_OPTIONS = {
  musicalInstrument: [
    ["lute", "Лютня"],
    ["flute", "Флейта"],
    ["horn", "Ріг"],
    ["panFlute", "Свиріль"],
    ["viol", "Віола"],
    ["drum", "Барабан"],
    ["dulcimer", "Цимбали"],
    ["lyre", "Ліра"],
    ["bagpipes", "Волинка"],
    ["shawm", "Шоломія"]
  ],

  artisanTools: [
    ["alchemistsSupplies", "Приладдя алхіміка"],
    ["brewersSupplies", "Приладдя пивовара"],
    ["calligraphersSupplies", "Інструменти каліграфа"],
    ["carpentersTools", "Інструменти тесляра"],
    ["cartographersTools", "Інструменти картографа"],
    ["cobblersTools", "Інструменти шевця"],
    ["cooksUtensils", "Кухонне приладдя"],
    ["glassblowersTools", "Інструменти склодува"],
    ["jewelersTools", "Інструменти ювеліра"],
    ["leatherworkersTools", "Інструменти чинбаря"],
    ["masonsTools", "Інструменти муляра"],
    ["paintersSupplies", "Приладдя художника"],
    ["pottersTools", "Інструменти гончаря"],
    ["smithsTools", "Інструменти коваля"],
    ["tinkersTools", "Інструменти майстра"],
    ["weaversTools", "Інструменти ткача"],
    ["woodcarversTools", "Інструменти різьбяра"]
  ],

  gamingSet: [
    ["diceSet", "Набір кісток"],
    ["playingCards", "Гральні карти"],
    ["dragonchessSet", "Набір для драконячих шахів"],
    ["threeDragonAnte", "Набір для Three-Dragon Ante"]
  ],

  vehicle: [
    ["landVehicles", "Наземні транспортні засоби"],
    ["waterVehicles", "Водний транспорт"]
  ]
};

export const CREATOR_LANGUAGE_OPTIONS = Object.entries(LANGUAGES)
  .map(([id, name]) => [name, name])
  .sort((a, b) => a[1].localeCompare(b[1]));

export const CREATOR_CLASS_CHOICES = {
  fighter: {
    fightingStyle: [
      ["archery", "Стрільба"],
      ["defense", "Захист"],
      ["dueling", "Дуель"],
      ["greatWeaponFighting", "Бій великою зброєю"],
      ["protection", "Захист союзника"],
      ["twoWeaponFighting", "Бій двома зброями"]
    ]
  },

  ranger: {
    favoredEnemy: [
      ["aberrations", "Аберрації"],
      ["beasts", "Звірі"],
      ["celestials", "Небожителі"],
      ["constructs", "Конструкти"],
      ["dragons", "Дракони"],
      ["elementals", "Елементалі"],
      ["fey", "Феї"],
      ["fiends", "Нечисть"],
      ["giants", "Велетні"],
      ["monstrosities", "Потворності"],
      ["oozes", "Слизі"],
      ["plants", "Рослини"],
      ["undead", "Нежить"],
      ["humanoids", "Гуманоїди"]
    ],

    naturalExplorer: [
      ["arctic", "Арктика"],
      ["coast", "Узбережжя"],
      ["desert", "Пустеля"],
      ["forest", "Ліс"],
      ["grassland", "Луки"],
      ["mountain", "Гори"],
      ["swamp", "Болота"],
      ["underdark", "Підземелля"]
    ]
  }
};

export const CREATOR_RACE_DETAILS = {
  dwarf: {
    traits: [
      ["Dwarven Resilience", "Стійкість дворфів", "Перевага на ряткидки проти отрути та стійкість до шкоди отрутою."],
      ["Dwarven Combat Training", "Бойова підготовка дворфів", "Володіння бойовою сокирою, ручною сокирою, легким молотом і бойовим молотом."]
    ],
    subraces: {
      hillDwarf: {
        abilityScoreIncrease: { wisdom: 1 },
        traits: [["Dwarven Toughness", "Витривалість дворфів", "Максимальні HP збільшуються на 1 за кожен рівень."]]
      },
      mountainDwarf: {
        abilityScoreIncrease: { strength: 2 },
        traits: [["Dwarven Armor Training", "Навчання броні дворфів", "Володіння легкою та середньою бронею."]]
      }
    }
  },

  elf: {
    traits: [
      ["Fey Ancestry", "Фейське походження", "Перевага на ряткидки проти зачарування; магією сном заснути не можна."],
      ["Trance", "Транс", "Ельфу потрібно лише 4 години медитації замість звичайного сну."]
    ],
    subraces: {
      highElf: {
        abilityScoreIncrease: { intelligence: 1 },
        traits: [
          ["Cantrip", "Заговор", "Один заговор зі списку мага."],
          ["Elf Weapon Training", "Ельфійська бойова підготовка", "Володіння довгим мечем, коротким мечем, коротким і довгим луком."],
          ["Extra Language", "Додаткова мова", "Ще одна мова на вибір."]
        ]
      },
      woodElf: {
        abilityScoreIncrease: { wisdom: 1 },
        traits: [
          ["Elf Weapon Training", "Ельфійська бойова підготовка", "Володіння довгим мечем, коротким мечем, коротким і довгим луком."],
          ["Fleet of Foot", "Швидконогий", "Швидкість ходьби 35 ft."],
          ["Mask of the Wild", "Маска дикої природи", "Можна ховатися за природними перешкодами, що лише частково закривають тебе."]
        ]
      },
      drow: {
        abilityScoreIncrease: { charisma: 1 },
        traits: [
          ["Superior Darkvision", "Покращене темнобачення", "Темнобачення 120 ft."],
          ["Sunlight Sensitivity", "Чутливість до сонячного світла", "Невигідність на атаки та Perception, якщо ти або ціль під прямим сонячним світлом."],
          ["Drow Weapon Training", "Бойова підготовка дроу", "Володіння рапірою, коротким мечем і ручним арбалетом."],
          ["Drow Magic", "Магія дроу", "Thaumaturgy; на 3 рівні Hellish Rebuke замінюється відповідним расовим закляттям за правилами PHB."]
        ]
      }
    }
  },

  halfling: {
    traits: [
      ["Lucky", "Щасливчик", "Кидок природної 1 на d20 можна перекинути."],
      ["Brave", "Сміливий", "Перевага на ряткидки проти переляку."],
      ["Halfling Nimbleness", "Галфлінгська спритність", "Можна проходити через простір істот, що більші за тебе."]
    ],
    subraces: {
      lightfoot: {
        abilityScoreIncrease: { charisma: 1 },
        traits: [["Naturally Stealthy", "Природна скритність", "Можна ховатися за істотою, яка щонайменше на один розмір більша."]]
      },
      stout: {
        abilityScoreIncrease: { constitution: 1 },
        traits: [["Stout Resilience", "Кремезна витривалість", "Перевага на ряткидки проти отрути та стійкість до шкоди отрутою."]]
      }
    }
  },

  human: {
    abilityScoreIncrease: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1
    },
    traits: [["Versatility", "Універсальність", "Усі шість характеристик збільшуються на 1."]],
    variants: {
      standard: { label: "Звичайна людина" },
      variant: {
        label: "Варіантна людина",
        replaceBaseAbilityScoreIncrease: true,
        abilityScoreChoice: { count: 2, value: 1 },
        skillChoice: { count: 1 },
        featChoice: true,
        languageChoice: { count: 1 },
        traits: [["Variant Human", "Варіантна людина", "Замість +1 до всіх характеристик: +1 до двох обраних; одна навичка, одна риса та одна додаткова мова."]]
      }
    }
  },

  dragonborn: {
    traits: [
      ["Draconic Ancestry", "Драконяче походження", "Обери драконяче походження; воно визначає тип шкоди подиху та опір."],
      ["Breath Weapon", "Подих дракона", "Один раз на короткий або довгий відпочинок можна використовувати подих залежно від рівня та правил."],
      ["Damage Resistance", "Опір шкоді", "Стійкість до типу шкоди, визначеного походженням."]
    ],
    choices: {
      draconicAncestry: true
    }
  },

  gnome: {
    traits: [["Gnome Cunning", "Гном'яча кмітливість", "Перевага на INT, WIS та CHA ряткидки проти магії."]],
    subraces: {
      forestGnome: {
        abilityScoreIncrease: { dexterity: 1 },
        traits: [
          ["Natural Illusionist", "Природний ілюзіоніст", "Заговор Minor Illusion."],
          ["Speak with Small Beasts", "Розмова з малими звірами", "Можна передавати прості ідеї маленьким або меншим звірам."]
        ]
      },
      rockGnome: {
        abilityScoreIncrease: { constitution: 1 },
        traits: [
          ["Artificer's Lore", "Знання майстра", "Подвійний бонус майстерності для історичних перевірок щодо магічних, алхімічних і технологічних об'єктів."],
          ["Tinker", "Майстрування", "Можна створювати прості механічні пристрої."]
        ]
      }
    }
  },

  halfElf: {
    abilityScoreIncrease: { charisma: 2 },
    variableAbilityScoreChoice: { count: 2, value: 1 },
    skillChoice: { count: 2 },
    traits: [
      ["Darkvision", "Темнобачення", "Темнобачення 60 ft."],
      ["Fey Ancestry", "Фейське походження", "Перевага на ряткидки проти зачарування; магією сном заснути не можна."],
      ["Skill Versatility", "Універсальність навичок", "Додаткове володіння двома навичками на вибір."]
    ]
  },

  halfOrc: {
    abilityScoreIncrease: { strength: 2, constitution: 1 },
    traits: [
      ["Menacing", "Залякування", "Володіння навичкою Intimidation."],
      ["Relentless Endurance", "Невтомна витривалість", "Раз за довгий відпочинок, коли HP падають до 0, залишаєшся на 1 HP."],
      ["Savage Attacks", "Жорстокі атаки", "Додаєш один кубик шкоди зброї до критичного удару."]
    ]
  },

  tiefling: {
    abilityScoreIncrease: { charisma: 2, intelligence: 1 },
    traits: [
      ["Darkvision", "Темнобачення", "Темнобачення 60 ft."],
      ["Hellish Resistance", "Пекельна стійкість", "Стійкість до шкоди вогнем."],
      ["Infernal Legacy", "Пекельна спадщина", "Thaumaturgy; на вищих рівнях відкриваються расові закляття."]
    ]
  }
};

const pick = (id, label, option, extra = {}) => ({
  id,
  label,
  options: option,
  ...extra
});

export const CREATOR_CLASS_EQUIPMENT = {
  barbarian: {
    fixed: [
      custom("explorerPack", "Набір дослідника"),
      item("weapon", "javelin", 4)
    ],
    choices: [
      pick("primaryWeapon", "Основна зброя", [
        { id: "greataxe", label: "Дворучна сокира", items: [item("weapon", "greataxe")] },
        { id: "martialMelee", label: "Будь-яка бойова зброя ближнього бою", pickFrom: "martialMeleeWeapon", count: 1 }
      ]),
      pick("secondaryWeapon", "Додаткова зброя", [
        { id: "twoHandaxes", label: "Дві ручні сокири", items: [item("weapon", "handaxe", 2)] },
        { id: "simpleWeapon", label: "Будь-яка проста зброя", pickFrom: "simpleWeapon", count: 1 }
      ])
    ]
  },

  bard: {
    fixed: [
      item("armor", "leather"),
      custom("lute", "Лютня", "tool"),
      item("weapon", "dagger")
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "rapier", label: "Рапіра", items: [item("weapon", "rapier")] },
        { id: "longsword", label: "Довгий меч", items: [item("weapon", "longsword")] },
        { id: "simpleWeapon", label: "Будь-яка проста зброя", pickFrom: "simpleWeapon", count: 1 }
      ]),
      pick("pack", "Набір", [
        { id: "diplomatPack", label: "Набір дипломата", items: [custom("diplomatPack", "Набір дипломата")] },
        { id: "entertainerPack", label: "Набір артиста", items: [custom("entertainerPack", "Набір артиста")] }
      ])
    ]
  },

  cleric: {
    fixed: [
      item("armor", "shield"),
      custom("holySymbol", "Святий символ", "other")
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "mace", label: "Булава", items: [item("weapon", "mace")] },
        { id: "warhammer", label: "Бойовий молот", items: [item("weapon", "warhammer")] }
      ]),
      pick("armor", "Броня", [
        { id: "scaleMail", label: "Лускатий обладунок", items: [item("armor", "scaleMail")] },
        { id: "leather", label: "Шкіряний обладунок", items: [item("armor", "leather")] },
        { id: "chainMail", label: "Кольчуга", items: [item("armor", "chainMail")] }
      ]),
      pick("rangedOrSimple", "Дальня зброя", [
        { id: "lightCrossbow", label: "Легкий арбалет + 20 болтів", items: [item("weapon", "lightCrossbow"), custom("bolts20", "20 болтів")] },
        { id: "simpleWeapon", label: "Будь-яка проста зброя", pickFrom: "simpleWeapon", count: 1 }
      ]),
      pick("pack", "Набір", [
        { id: "priestPack", label: "Набір жерця", items: [custom("priestPack", "Набір жерця")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  druid: {
    fixed: [
      item("armor", "leather"),
      custom("explorerPack", "Набір дослідника"),
      custom("druidicFocus", "Друїдичний фокус")
    ],
    choices: [
      pick("shieldOrWeapon", "Захист / зброя", [
        { id: "woodenShield", label: "Дерев'яний щит", items: [custom("woodenShield", "Дерев'яний щит", "shield")] },
        { id: "simpleMelee", label: "Проста зброя ближнього бою", pickFrom: "simpleMeleeWeapon", count: 1 }
      ]),
      pick("scimitarOrWeapon", "Зброя", [
        { id: "scimitar", label: "Ятаган", items: [item("weapon", "scimitar")] },
        { id: "simpleMelee", label: "Проста зброя ближнього бою", pickFrom: "simpleMeleeWeapon", count: 1 }
      ])
    ]
  },

  fighter: {
    fixed: [
      item("weapon", "longbow"),
      custom("arrows20", "20 стріл"),
    ],
    choices: [
      pick("armor", "Броня", [
        { id: "chainMail", label: "Кольчуга", items: [item("armor", "chainMail")] },
        { id: "leatherLongbow", label: "Шкіряний обладунок", items: [item("armor", "leather")] }
      ]),
      pick("weapons", "Основний комплект", [
        {
          id: "martialShield",
          label: "Бойова зброя + щит",
          pickFrom: "martialMeleeWeapon",
          count: 1,
          extraItems: [item("armor", "shield")]
        },
        {
          id: "twoMartial",
          label: "Дві бойові зброї",
          pickFrom: "martialMeleeWeapon",
          count: 2
        }
      ]),
      pick("ranged", "Додаткова зброя", [
        { id: "crossbow", label: "Легкий арбалет + 20 болтів", items: [item("weapon", "lightCrossbow"), custom("bolts20", "20 болтів")] },
        { id: "twoHandaxes", label: "Дві ручні сокири", items: [item("weapon", "handaxe", 2)] }
      ]),
      pick("pack", "Набір", [
        { id: "dungeoneerPack", label: "Набір підземелля", items: [custom("dungeoneerPack", "Набір підземелля")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  monk: {
    fixed: [
      custom("explorerPack", "Набір дослідника"),
      item("weapon", "dart", 10)
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "shortsword", label: "Короткий меч", items: [item("weapon", "shortsword")] },
        { id: "simpleMelee", label: "Проста зброя ближнього бою", pickFrom: "simpleMeleeWeapon", count: 1 }
      ]),
      pick("pack", "Набір", [
        { id: "dungeoneerPack", label: "Набір підземелля", items: [custom("dungeoneerPack", "Набір підземелля")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  paladin: {
    fixed: [
      item("armor", "chainMail"),
      custom("holySymbol", "Святий символ")
    ],
    choices: [
      pick("weapons", "Основний комплект", [
        {
          id: "martialShield",
          label: "Бойова зброя + щит",
          pickFrom: "martialMeleeWeapon",
          count: 1,
          extraItems: [custom("shield", "Щит", "shield")]
        },
        {
          id: "twoMartial",
          label: "Дві бойові зброї",
          pickFrom: "martialMeleeWeapon",
          count: 2
        }
      ]),
      pick("secondaryWeapon", "Додаткова зброя", [
        { id: "javelins", label: "5 дротиків-списів", items: [item("weapon", "javelin", 5)] },
        { id: "simpleMelee", label: "Будь-яка проста зброя ближнього бою", pickFrom: "simpleMeleeWeapon", count: 1 }
      ]),
      pick("pack", "Набір", [
        { id: "priestPack", label: "Набір жерця", items: [custom("priestPack", "Набір жерця")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  ranger: {
    fixed: [
      item("weapon", "longbow"),
      custom("arrows20", "20 стріл")
    ],
    choices: [
      pick("armor", "Броня", [
        { id: "scaleMail", label: "Лускатий обладунок", items: [item("armor", "scaleMail")] },
        { id: "leather", label: "Шкіряний обладунок", items: [item("armor", "leather")] }
      ]),
      pick("weapons", "Зброя", [
        { id: "twoShortswords", label: "Два короткі мечі", items: [item("weapon", "shortsword", 2)] },
        { id: "twoSimpleMelee", label: "Дві прості зброї ближнього бою", pickFrom: "simpleMeleeWeapon", count: 2 }
      ]),
      pick("pack", "Набір", [
        { id: "dungeoneerPack", label: "Набір підземелля", items: [custom("dungeoneerPack", "Набір підземелля")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  rogue: {
    fixed: [
      item("armor", "leather"),
      item("weapon", "dagger", 2),
      custom("thievesTools", "Злодійські інструменти", "tool")
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "rapier", label: "Рапіра", items: [item("weapon", "rapier")] },
        { id: "shortsword", label: "Короткий меч", items: [item("weapon", "shortsword")] }
      ]),
      pick("ranged", "Дальня зброя", [
        { id: "shortbow", label: "Короткий лук + 20 стріл", items: [item("weapon", "shortbow"), custom("arrows20", "20 стріл")] },
        { id: "shortsword", label: "Короткий меч", items: [item("weapon", "shortsword")] }
      ]),
      pick("pack", "Набір", [
        { id: "burglarPack", label: "Злодійський набір", items: [custom("burglarPack", "Злодійський набір")] },
        { id: "dungeoneerPack", label: "Набір підземелля", items: [custom("dungeoneerPack", "Набір підземелля")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  sorcerer: {
    fixed: [
      item("weapon", "dagger", 2)
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "lightCrossbow", label: "Легкий арбалет + 20 болтів", items: [item("weapon", "lightCrossbow"), custom("bolts20", "20 болтів")] },
        { id: "simpleWeapon", label: "Будь-яка проста зброя", pickFrom: "simpleWeapon", count: 1 }
      ]),
      pick("focus", "Магічний фокус", [
        { id: "componentPouch", label: "Компонентна сумка", items: [custom("componentPouch", "Компонентна сумка")] },
        { id: "arcaneFocus", label: "Арканний фокус", items: [custom("arcaneFocus", "Арканний фокус")] }
      ]),
      pick("pack", "Набір", [
        { id: "dungeoneerPack", label: "Набір підземелля", items: [custom("dungeoneerPack", "Набір підземелля")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  warlock: {
    fixed: [
      item("armor", "leather"),
      item("weapon", "dagger", 2)
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "lightCrossbow", label: "Легкий арбалет + 20 болтів", items: [item("weapon", "lightCrossbow"), custom("bolts20", "20 болтів")] },
        { id: "simpleWeapon", label: "Будь-яка проста зброя", pickFrom: "simpleWeapon", count: 1 }
      ]),
      pick("focus", "Магічний фокус", [
        { id: "componentPouch", label: "Компонентна сумка", items: [custom("componentPouch", "Компонентна сумка")] },
        { id: "arcaneFocus", label: "Арканний фокус", items: [custom("arcaneFocus", "Арканний фокус")] }
      ]),
      pick("pack", "Набір", [
        { id: "scholarPack", label: "Набір ученого", items: [custom("scholarPack", "Набір ученого")] },
        { id: "dungeoneerPack", label: "Набір підземелля", items: [custom("dungeoneerPack", "Набір підземелля")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  },

  wizard: {
    fixed: [
      custom("spellbook", "Книга заклинань")
    ],
    choices: [
      pick("weapon", "Зброя", [
        { id: "quarterstaff", label: "Посох", items: [item("weapon", "quarterstaff")] },
        { id: "dagger", label: "Кинджал", items: [item("weapon", "dagger")] }
      ]),
      pick("focus", "Магічний фокус", [
        { id: "componentPouch", label: "Компонентна сумка", items: [custom("componentPouch", "Компонентна сумка")] },
        { id: "arcaneFocus", label: "Арканний фокус", items: [custom("arcaneFocus", "Арканний фокус")] }
      ]),
      pick("pack", "Набір", [
        { id: "scholarPack", label: "Набір ученого", items: [custom("scholarPack", "Набір ученого")] },
        { id: "explorerPack", label: "Набір дослідника", items: [custom("explorerPack", "Набір дослідника")] }
      ])
    ]
  }
};
