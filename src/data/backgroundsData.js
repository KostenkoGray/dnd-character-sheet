// ==================================================
// BACKGROUNDS / ПОХОДЖЕННЯ
// D&D 5e — PHB 2014
// ==================================================
//
// Структура навмисно охоплює більше, ніж потрібно PHB 2014:
// - abilityScoreBonuses / savingThrowProficiencies залишені в схемі
//   для майбутніх/домашніх походжень;
// - skill/tool/language choices описані окремо;
// - startingEquipment придатне для подальшого автоматичного
//   наповнення Inventory;
// - startingCurrency одразу сумісне з Wallet.
//
// У PHB 2014 самі походження не дають бонусів характеристик
// або володіння ряткидками. Їхні поля залишені порожніми навмисно.
// Тексти описів тут коротко переказані, а не відтворюють книгу.

export const BACKGROUNDS = {

  // ==================================================
  // ACOLYTE
  // ==================================================

  acolyte: {
    id: "acolyte",
    name: "Acolyte",
    ukr: "Послушник",

    source: "PHB 2014",

    description: "Служіння при храмі або іншій релігійній спільноті: обряди, молитви, жертовність і допомога вірянам.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["insight", "religion"],
      choices: []
    },

    toolProficiencies: {
      granted: [],
      choices: []
    },

    languages: {
      granted: [],
      choices: [
        { count: 2, options: "anyLanguage" }
      ]
    },

    feature: {
      id: "shelterOfTheFaithful",
      name: "Shelter of the Faithful",
      ukr: "Притулок вірних",
      description: "Релігійні громади можуть надати тобі та супутникам базову допомогу, догляд і прихисток, а також сприяти твоїм справам у межах можливого."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "holySymbol", name: "Святий символ", quantity: 1 },
        { kind: "item", id: "prayerBook", name: "Молитовник або молитовне колесо", quantity: 1 },
        { kind: "item", id: "incense", name: "Пахощі", quantity: 5 },
        { kind: "item", id: "vestments", name: "Церковне вбрання", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 15,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "віра, храмова дисципліна, ставлення до інших релігій" },
      ideals: { die: "d6", count: 1, theme: "традиція, милосердя, зміни, влада, віра або прагнення" },
      bonds: { die: "d6", count: 1, theme: "храм, святиня, наставник, громада або втрачена реліквія" },
      flaws: { die: "d6", count: 1, theme: "догматизм, надмірна довіра, підозрілість або одержимість" }
    }
  },

  // ==================================================
  // CHARLATAN
  // ==================================================

  charlatan: {
    id: "charlatan",
    name: "Charlatan",
    ukr: "Шарлатан",

    source: "PHB 2014",

    description: "Майстер обману, підробок і переконливих легенд, який уміє створювати фальшиву особу та видавати бажане за правду.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["deception", "sleightOfHand"],
      choices: []
    },

    toolProficiencies: {
      granted: ["disguiseKit", "forgeryKit"],
      choices: []
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "falseIdentity",
      name: "False Identity",
      ukr: "Фальшива особа",
      description: "Ти маєш створену заздалегідь альтернативну особу з документами, знаннями прикриття та відповідною легендою."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "fineClothes", name: "Вишуканий одяг", quantity: 1 },
        { kind: "tool", id: "disguiseKit", name: "Набір для маскування", quantity: 1 },
        { kind: "tool", id: "forgeryKit", name: "Набір для підробок", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 15,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "хитрість, імпровізація, довіра, ризик" },
      ideals: { die: "d6", count: 1, theme: "чесність серед злодіїв, свобода, допомога, багатство або перевтілення" },
      bonds: { die: "d6", count: 1, theme: "борг, родина, таємниця, обманута людина або велика афера" },
      flaws: { die: "d6", count: 1, theme: "жадібність, брехня, боягузтво або неконтрольоване бажання наживи" }
    },

    variants: [
      {
        id: "spy",
        name: "Spy",
        ukr: "Шпигун",
        description: "Варіант Шарлатана: ті самі базові механічні навички та інструменти переосмислюються як шпигунська підготовка."
      }
    ]
  },

  // ==================================================
  // CRIMINAL
  // ==================================================

  criminal: {
    id: "criminal",
    name: "Criminal",
    ukr: "Злочинець",

    source: "PHB 2014",

    description: "Досвідчений порушник закону з кримінальними зв'язками, навичками проникнення та контактом у злочинному середовищі.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["deception", "stealth"],
      choices: []
    },

    toolProficiencies: {
      granted: ["thievesTools"],
      choices: [
        { count: 1, options: ["gamingSet"] }
      ]
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "criminalContact",
      name: "Criminal Contact",
      ukr: "Злочинний контакт",
      description: "Ти маєш надійного посередника, через якого можеш передавати й отримувати повідомлення в кримінальній мережі."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "crowbar", name: "Лом", quantity: 1 },
        { kind: "item", id: "darkCommonClothes", name: "Темний звичайний одяг із каптуром", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 15,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "планування, холоднокровність, ризик, недовіра, спостережливість" },
      ideals: { die: "d6", count: 1, theme: "честь, свобода, благодійність, жадібність, відданість або спокута" },
      bonds: { die: "d6", count: 1, theme: "борг, сім'я, втрачена річ, злочин або особиста помста" },
      flaws: { die: "d6", count: 1, theme: "крадіжки, гроші, брехня, втеча або минулі злочини" }
    },

    variants: [
      {
        id: "spy",
        name: "Spy",
        ukr: "Шпигун",
        description: "Варіант Злочинця: той самий базовий пакет застосовується до шпигунської діяльності."
      }
    ]
  },

  // ==================================================
  // ENTERTAINER
  // ==================================================

  entertainer: {
    id: "entertainer",
    name: "Entertainer",
    ukr: "Артист",

    source: "PHB 2014",

    description: "Мандрівний виконавець, який заробляв на життя виступами, музикою, акробатикою або іншою розвагою.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["acrobatics", "performance"],
      choices: []
    },

    toolProficiencies: {
      granted: ["disguiseKit"],
      choices: [
        { count: 1, options: ["musicalInstrument"] }
      ]
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "byPopularDemand",
      name: "By Popular Demand",
      ukr: "На вимогу публіки",
      description: "Ти можеш відносно легко знаходити місце для виступу та отримувати базову гостинність від аудиторії й організаторів."
    },

    startingEquipment: {
      fixed: [
        { kind: "tool", id: "musicalInstrument", name: "Музичний інструмент", quantity: 1 },
        { kind: "item", id: "favorOfAnAdmirer", name: "Подарунок або знак уваги прихильника", quantity: 1 },
        { kind: "item", id: "costume", name: "Костюм", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 15,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "сцена, глядачі, самовпевненість, гумор, драматизм" },
      ideals: { die: "d6", count: 1, theme: "краса, свобода, творчість, жадоба слави або самореалізація" },
      bonds: { die: "d6", count: 1, theme: "трупа, наставник, шанувальник, театр або важливий виступ" },
      flaws: { die: "d6", count: 1, theme: "марнославство, залежність від уваги, конкуренція або ризикована поведінка" }
    },

    variants: [
      {
        id: "gladiator",
        name: "Gladiator",
        ukr: "Гладіатор",
        description: "Варіант Артиста для бійця на арені."
      }
    ]
  },

  // ==================================================
  // FOLK HERO
  // ==================================================

  folkHero: {
    id: "folkHero",
    name: "Folk Hero",
    ukr: "Народний герой",

    source: "PHB 2014",

    description: "Виходець із простого люду, який став місцевим героєм після вчинку, що надихнув громаду.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["animalHandling", "survival"],
      choices: []
    },

    toolProficiencies: {
      granted: ["landVehicles"],
      choices: [
        { count: 1, options: ["artisanTools"] }
      ]
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "rusticHospitality",
      name: "Rustic Hospitality",
      ukr: "Сільська гостинність",
      description: "Прості люди впізнають у тобі одного зі своїх і можуть надати прихисток або допомогу, якщо ти не становиш для них небезпеки."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "shovel", name: "Лопата", quantity: 1 },
        { kind: "item", id: "ironPot", name: "Залізний горщик", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: [
        { count: 1, options: ["artisanTools"] }
      ]
    },

    startingCurrency: {
      pp: 0,
      gp: 10,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "простота, справедливість, допомога іншим, рішучість" },
      ideals: { die: "d6", count: 1, theme: "повага, справедливість, свобода, сила або доля" },
      bonds: { die: "d6", count: 1, theme: "рідне село, громада, родина або подія, що зробила тебе героєм" },
      flaws: { die: "d6", count: 1, theme: "впертість, нудьга, надмірна самовпевненість або старі вороги" }
    }
  },

  // ==================================================
  // GUILD ARTISAN
  // ==================================================

  guildArtisan: {
    id: "guildArtisan",
    name: "Guild Artisan",
    ukr: "Гільдійський ремісник",

    source: "PHB 2014",

    description: "Кваліфікований ремісник, пов'язаний із гільдією, її правилами, контактами та професійною репутацією.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["insight", "persuasion"],
      choices: []
    },

    toolProficiencies: {
      granted: [],
      choices: [
        { count: 1, options: ["artisanTools"] }
      ]
    },

    languages: {
      granted: [],
      choices: [
        { count: 1, options: "anyLanguage" }
      ]
    },

    feature: {
      id: "guildMembership",
      name: "Guild Membership",
      ukr: "Членство в гільдії",
      description: "Гільдія може забезпечувати професійні контакти, підтримку, інформацію та допомогу за прийнятних умов."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "guildLetter", name: "Вступний лист від гільдії", quantity: 1 },
        { kind: "item", id: "travelersClothes", name: "Дорожній одяг", quantity: 1 }
      ],
      choices: [
        { count: 1, options: ["artisanTools"] }
      ]
    },

    startingCurrency: {
      pp: 0,
      gp: 15,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "майстерність, робота, гільдійна культура, професійна гордість" },
      ideals: { die: "d6", count: 1, theme: "спільнота, справедливість, свобода, торгівля або майстерність" },
      bonds: { die: "d6", count: 1, theme: "майстерня, гільдія, учень, наставник або важливе замовлення" },
      flaws: { die: "d6", count: 1, theme: "гординя, жадібність, конкуренція або надмірна відданість гільдії" }
    },

    variants: [
      {
        id: "guildMerchant",
        name: "Guild Merchant",
        ukr: "Гільдійський торговець",
        description: "Варіант ремісника, у якому професійна роль зміщена від виготовлення товарів до торгівлі."
      }
    ]
  },

  // ==================================================
  // HERMIT
  // ==================================================

  hermit: {
    id: "hermit",
    name: "Hermit",
    ukr: "Відлюдник",

    source: "PHB 2014",

    description: "Тривалий час жив на самоті, присвятивши себе молитві, дослідженням, спогляданню або пошуку істини.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["medicine", "religion"],
      choices: []
    },

    toolProficiencies: {
      granted: ["herbalismKit"],
      choices: []
    },

    languages: {
      granted: [],
      choices: [
        { count: 1, options: "anyLanguage" }
      ]
    },

    feature: {
      id: "discovery",
      name: "Discovery",
      ukr: "Відкриття",
      description: "Ти зробив важливе відкриття під час усамітнення. Його зміст визначається разом із DM і може стати основою великої сюжетної лінії."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "scrollCaseNotes", name: "Футляр із нотатками або молитвами", quantity: 1 },
        { kind: "item", id: "winterBlanket", name: "Зимова ковдра", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 },
        { kind: "tool", id: "herbalismKit", name: "Набір травника", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 5,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "спокій, самоспостереження, відчуженість, незвичні звички" },
      ideals: { die: "d6", count: 1, theme: "знання, свобода, самовдосконалення, віра або змирення" },
      bonds: { die: "d6", count: 1, theme: "місце усамітнення, відкриття, духовний наставник або таємниця" },
      flaws: { die: "d6", count: 1, theme: "ізоляція, дивні переконання, підозрілість або одержимість" }
    }
  },

  // ==================================================
  // NOBLE
  // ==================================================

  noble: {
    id: "noble",
    name: "Noble",
    ukr: "Дворянин",

    source: "PHB 2014",

    description: "Представник знатної родини з титулом, статками, впливом і місцем у соціальній ієрархії.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["history", "persuasion"],
      choices: []
    },

    toolProficiencies: {
      granted: [],
      choices: [
        { count: 1, options: ["gamingSet"] }
      ]
    },

    languages: {
      granted: [],
      choices: [
        { count: 1, options: "anyLanguage" }
      ]
    },

    feature: {
      id: "positionOfPrivilege",
      name: "Position of Privilege",
      ukr: "Привілейоване становище",
      description: "Твоє походження відкриває двері у вищому суспільстві: тебе можуть приймати з повагою, а родинні зв'язки дають доступ до певних людей і подій."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "fineClothes", name: "Вишуканий одяг", quantity: 1 },
        { kind: "item", id: "signetRing", name: "Печатка-перстень", quantity: 1 },
        { kind: "item", id: "pedigreeScroll", name: "Сувій із родоводом", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 25,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "манери, гордість, відповідальність, аристократичний досвід" },
      ideals: { die: "d6", count: 1, theme: "повага, відповідальність, свобода, влада або родина" },
      bonds: { die: "d6", count: 1, theme: "рід, титул, спадок, родина або союзник" },
      flaws: { die: "d6", count: 1, theme: "пиха, марнотратство, упередження або політичні вороги" }
    },

    variants: [
      {
        id: "knight",
        name: "Knight",
        ukr: "Лицар",
        description: "Варіант Дворянина для персонажа, чия роль побудована навколо лицарського статусу."
      }
    ]
  },

  // ==================================================
  // OUTLANDER
  // ==================================================

  outlander: {
    id: "outlander",
    name: "Outlander",
    ukr: "Чужинець",

    source: "PHB 2014",

    description: "Людина диких земель, мисливець, кочівник або мандрівник, звиклий виживати далеко від цивілізації.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["athletics", "survival"],
      choices: []
    },

    toolProficiencies: {
      granted: [],
      choices: [
        { count: 1, options: ["musicalInstrument"] }
      ]
    },

    languages: {
      granted: [],
      choices: [
        { count: 1, options: "anyLanguage" }
      ]
    },

    feature: {
      id: "wanderer",
      name: "Wanderer",
      ukr: "Мандрівник",
      description: "Ти добре орієнтуєшся в природі та вмієш знаходити їжу й воду в дикій місцевості, а також пам'ятаєш загальний напрямок і місцевість, якою вже проходив."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "staff", name: "Посох", quantity: 1 },
        { kind: "item", id: "huntingTrap", name: "Мисливська пастка", quantity: 1 },
        { kind: "item", id: "animalTrophy", name: "Трофей із тварини", quantity: 1 },
        { kind: "item", id: "travelersClothes", name: "Дорожній одяг", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 10,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "самостійність, суворість, зв'язок із природою, любов до подорожей" },
      ideals: { die: "d6", count: 1, theme: "свобода, дикість, природа, виживання або племінний обов'язок" },
      bonds: { die: "d6", count: 1, theme: "плем'я, батьківщина, природна святиня або старий товариш" },
      flaws: { die: "d6", count: 1, theme: "неприйняття цивілізації, впертість, ізоляція або кочовий неспокій" }
    }
  },

  // ==================================================
  // SAGE
  // ==================================================

  sage: {
    id: "sage",
    name: "Sage",
    ukr: "Мудрець",

    source: "PHB 2014",

    description: "Учений, дослідник або книжник, який роками вивчав тексти, знання та таємниці світу.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["arcana", "history"],
      choices: []
    },

    toolProficiencies: {
      granted: [],
      choices: []
    },

    languages: {
      granted: [],
      choices: [
        { count: 2, options: "anyLanguage" }
      ]
    },

    feature: {
      id: "researcher",
      name: "Researcher",
      ukr: "Дослідник",
      description: "Коли ти не знаєш потрібної інформації, зазвичай можеш здогадатися, де або в кого її можна знайти."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "blackInk", name: "Чорнило", quantity: 1 },
        { kind: "item", id: "quill", name: "Перо", quantity: 1 },
        { kind: "item", id: "smallKnife", name: "Малий ніж", quantity: 1 },
        { kind: "item", id: "letterDeadColleague", name: "Лист від покійного колеги", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 10,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "допитливість, книги, знання, академічні звички" },
      ideals: { die: "d6", count: 1, theme: "знання, краса, логіка, влада або пошук істини" },
      bonds: { die: "d6", count: 1, theme: "наукова праця, бібліотека, наставник, колега або нерозгадана таємниця" },
      flaws: { die: "d6", count: 1, theme: "неуважність до побуту, зарозумілість, одержимість знаннями або нездатність мовчати" }
    }
  },

  // ==================================================
  // SAILOR
  // ==================================================

  sailor: {
    id: "sailor",
    name: "Sailor",
    ukr: "Моряк",

    source: "PHB 2014",

    description: "Досвідчений моряк, який знає життя корабля, дисципліну екіпажу та небезпеки морських подорожей.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["athletics", "perception"],
      choices: []
    },

    toolProficiencies: {
      granted: ["navigatorsTools", "waterVehicles"],
      choices: []
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "shipsPassage",
      name: "Ship's Passage",
      ukr: "Проїзд на кораблі",
      description: "Ти можеш домовлятися про безкоштовний або пільговий проїзд на торгових та інших суднах, використовуючи старі морські зв'язки."
    },

    startingEquipment: {
      fixed: [
        { kind: "weapon", id: "club", name: "Бойова палиця / бейлінг-пін", quantity: 1 },
        { kind: "item", id: "silkRope", name: "Шовкова мотузка", quantity: 50, unit: "ft." },
        { kind: "item", id: "luckyCharm", name: "Щасливий талісман", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 10,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "морські звички, товариськість, дисципліна, пригоди" },
      ideals: { die: "d6", count: 1, theme: "свобода, екіпаж, дисципліна, майстерність або удача" },
      bonds: { die: "d6", count: 1, theme: "корабель, капітан, екіпаж, порт або морська пригода" },
      flaws: { die: "d6", count: 1, theme: "згубні звички, конфліктність, тяга до ризику або ностальгія за морем" }
    },

    variants: [
      {
        id: "pirate",
        name: "Pirate",
        ukr: "Пірат",
        description: "Варіант Моряка для персонажа з піратським минулим."
      }
    ]
  },

  // ==================================================
  // SOLDIER
  // ==================================================

  soldier: {
    id: "soldier",
    name: "Soldier",
    ukr: "Солдат",

    source: "PHB 2014",

    description: "Ветеран військової служби, навчений зброї, дисципліні, виживанню та життю в армійській структурі.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["athletics", "intimidation"],
      choices: []
    },

    toolProficiencies: {
      granted: ["landVehicles"],
      choices: [
        { count: 1, options: ["gamingSet"] }
      ]
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "militaryRank",
      name: "Military Rank",
      ukr: "Військове звання",
      description: "Твоє колишнє військове звання може давати авторитет серед солдатів і доступ до дружніх військових таборів та базових ресурсів."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "rankInsignia", name: "Знак військового звання", quantity: 1 },
        { kind: "item", id: "fallenEnemyTrophy", name: "Трофей переможеного ворога", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: [
        { count: 1, options: ["gamingSet", "deckOfCards", "boneDice"] }
      ]
    },

    startingCurrency: {
      pp: 0,
      gp: 10,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "військова дисципліна, спогади про службу, прямолінійність, товариськість" },
      ideals: { die: "d6", count: 1, theme: "обов'язок, відповідальність, незалежність, сила або країна" },
      bonds: { die: "d6", count: 1, theme: "підрозділ, товариші, військовий обов'язок або незавершена війна" },
      flaws: { die: "d6", count: 1, theme: "жорсткість, травматичні спогади, упертість, залежність від азарту або війни" }
    }
  },

  // ==================================================
  // URCHIN
  // ==================================================

  urchin: {
    id: "urchin",
    name: "Urchin",
    ukr: "Безпритульник",

    source: "PHB 2014",

    description: "Виріс на вулицях, навчився виживати без грошей, швидко орієнтуватися в місті та покладатися на себе.",

    abilityScoreBonuses: {},
    savingThrowProficiencies: [],

    skillProficiencies: {
      granted: ["sleightOfHand", "stealth"],
      choices: []
    },

    toolProficiencies: {
      granted: ["disguiseKit", "thievesTools"],
      choices: []
    },

    languages: {
      granted: [],
      choices: []
    },

    feature: {
      id: "citySecrets",
      name: "City Secrets",
      ukr: "Таємниці міста",
      description: "Ти добре знаєш міські проходи, короткі шляхи та способи непомітно пересуватися великими поселеннями."
    },

    startingEquipment: {
      fixed: [
        { kind: "item", id: "smallKnife", name: "Малий ніж", quantity: 1 },
        { kind: "item", id: "mapOfHometown", name: "Мапа рідного міста", quantity: 1 },
        { kind: "item", id: "tokenOfParents", name: "Пам'ятна річ від батьків", quantity: 1 },
        { kind: "creature", id: "petMouse", name: "Маленька домашня миша", quantity: 1 },
        { kind: "item", id: "commonClothes", name: "Звичайний одяг", quantity: 1 }
      ],
      choices: []
    },

    startingCurrency: {
      pp: 0,
      gp: 10,
      ep: 0,
      sp: 0,
      cp: 0
    },

    characteristics: {
      personalityTraits: { die: "d8", count: 2, theme: "вулиця, обережність, винахідливість, незалежність" },
      ideals: { die: "d6", count: 1, theme: "зміни, справедливість, свобода, винагорода або виживання" },
      bonds: { die: "d6", count: 1, theme: "рідне місто, вулична сім'я, друг або покинутий район" },
      flaws: { die: "d6", count: 1, theme: "недовіра, жадібність, імпульсивність або страх повернення в минуле" }
    }
  }
};

// Усі базові походження PHB 2014.
// Зручний масив для селектора у Character Creator.
export const BACKGROUND_ORDER = [
  "acolyte",
  "charlatan",
  "criminal",
  "entertainer",
  "folkHero",
  "guildArtisan",
  "hermit",
  "noble",
  "outlander",
  "sage",
  "sailor",
  "soldier",
  "urchin"
];

// Окремий список для майбутнього Creator:
// усі стандартні рекомендації, які використовує Quick Build класів PHB 2014.
export const RECOMMENDED_BACKGROUND_BY_CLASS = {
  barbarian: "outlander",
  bard: "entertainer",
  cleric: "acolyte",
  druid: "hermit",
  fighter: "soldier",
  monk: "hermit",
  paladin: "noble",
  ranger: "outlander",
  rogue: "criminal",
  sorcerer: "hermit",
  warlock: "charlatan",
  wizard: "sage"
};
