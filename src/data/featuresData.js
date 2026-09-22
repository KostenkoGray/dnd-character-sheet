// ==================================================
// D&D Character Sheet — Features Data (PHB 2014)
// Частина 1
// ==================================================

export const FEATURE_TYPES = {
  PASSIVE: "passive",
  ACTIVE: "active",
  REACTION: "reaction",
  RESOURCE: "resource",
  MODIFIER: "modifier",
  SPELLCASTING: "spellcasting",
  CHOICE: "choice"
};

export const FEATURES = {

  // ==================================================
  // BARBARIAN
  // ==================================================

  rage: {
    id: "rage",
    name: "Rage",
    ukr: "Лють",
    type: FEATURE_TYPES.RESOURCE,
    resource: "rage",
    short: "Бонус до шкоди, перевага на перевірки Сили, опір фізичній шкоді."
  },

  unarmoredDefenseBarbarian: {
    id: "unarmoredDefenseBarbarian",
    name: "Unarmored Defense",
    ukr: "Захист без броні",
    type: FEATURE_TYPES.MODIFIER,
    short: "AC = 10 + DEX + CON."
  },

  recklessAttack: {
    id: "recklessAttack",
    name: "Reckless Attack",
    ukr: "Безрозсудна атака",
    type: FEATURE_TYPES.ACTIVE,
    short: "Перевага на атаки Силою."
  },

  dangerSense: {
    id: "dangerSense",
    name: "Danger Sense",
    ukr: "Чуття небезпеки",
    type: FEATURE_TYPES.PASSIVE,
    short: "Перевага на DEX сейви."
  },

  fastMovement: {
    id: "fastMovement",
    name: "Fast Movement",
    ukr: "Швидкий рух",
    type: FEATURE_TYPES.MODIFIER,
    short: "+10 футів швидкості."
  },

  feralInstinct: {
    id: "feralInstinct",
    name: "Feral Instinct",
    ukr: "Первісний інстинкт",
    type: FEATURE_TYPES.PASSIVE,
    short: "Перевага на Initiative."
  },

  brutalCritical: {
    id: "brutalCritical",
    name: "Brutal Critical",
    ukr: "Жорстокий критичний удар",
    type: FEATURE_TYPES.PASSIVE,
    short: "Додаткові куби шкоди на криті."
  },

  relentlessRage: {
    id: "relentlessRage",
    name: "Relentless Rage",
    ukr: "Невгамовна лють",
    type: FEATURE_TYPES.REACTION,
    short: "Можеш залишитися на 1 HP."
  },

  persistentRage: {
    id: "persistentRage",
    name: "Persistent Rage",
    ukr: "Невпинна лють",
    type: FEATURE_TYPES.PASSIVE,
    short: "Лють не закінчується достроково."
  },

  indomitableMight: {
    id: "indomitableMight",
    name: "Indomitable Might",
    ukr: "Нездоланна міць",
    type: FEATURE_TYPES.PASSIVE,
    short: "Мінімум перевірки Сили = модифікатор Сили."
  },

  primalChampion: {
    id: "primalChampion",
    name: "Primal Champion",
    ukr: "Первісний чемпіон",
    type: FEATURE_TYPES.MODIFIER,
    short: "+4 STR і +4 CON."
  },

  frenzy: {
    id: "frenzy",
    name: "Frenzy",
    ukr: "Шал",
    type: FEATURE_TYPES.ACTIVE,
    short: "Бонусна атака під час Rage."
  },

  mindlessRage: {
    id: "mindlessRage",
    name: "Mindless Rage",
    ukr: "Безумна лють",
    type: FEATURE_TYPES.PASSIVE,
    short: "Імунітет до Charmed і Frightened."
  },

  intimidatingPresence: {
    id: "intimidatingPresence",
    name: "Intimidating Presence",
    ukr: "Страхітлива присутність",
    type: FEATURE_TYPES.ACTIVE,
    short: "Лякає ціль."
  },

  retaliation: {
    id: "retaliation",
    name: "Retaliation",
    ukr: "Відплата",
    type: FEATURE_TYPES.REACTION,
    short: "Атака реакцією у відповідь."
  },

  spiritSeeker: {
    id: "spiritSeeker",
    name: "Spirit Seeker",
    ukr: "Шукач духів",
    type: FEATURE_TYPES.PASSIVE,
    short: "Ритуали Beast Sense і Speak with Animals."
  },

  totemSpiritChoice: {
    id: "totemSpiritChoice",
    name: "Totem Spirit",
    ukr: "Дух тотема",
    type: FEATURE_TYPES.CHOICE,
    short: "Обери Ведмедя, Орла або Вовка."
  },

  aspectOfTheBeast: {
    id: "aspectOfTheBeast",
    name: "Aspect of the Beast",
    ukr: "Аспект звіра",
    type: FEATURE_TYPES.CHOICE,
    short: "Обери аспект тотема."
  },

  spiritWalker: {
    id: "spiritWalker",
    name: "Spirit Walker",
    ukr: "Ходок духів",
    type: FEATURE_TYPES.PASSIVE,
    short: "Commune with Nature як ритуал."
  },

  totemicAttunement: {
    id: "totemicAttunement",
    name: "Totemic Attunement",
    ukr: "Єднання з тотемом",
    type: FEATURE_TYPES.CHOICE,
    short: "Фінальна сила тотема."
  },

  // ==================================================
  // FIGHTER
  // ==================================================

  fightingStyle: {
    id: "fightingStyle",
    name: "Fighting Style",
    ukr: "Стиль бою",
    type: FEATURE_TYPES.CHOICE,
    short: "Обери стиль бою."
  },

  secondWind: {
    id: "secondWind",
    name: "Second Wind",
    ukr: "Друге дихання",
    type: FEATURE_TYPES.RESOURCE,
    resource: "secondWind",
    short: "Самолікування бонусною дією."
  },

  actionSurge: {
    id: "actionSurge",
    name: "Action Surge",
    ukr: "Сплеск дії",
    type: FEATURE_TYPES.RESOURCE,
    resource: "actionSurge",
    short: "Додаткова дія."
  },

  martialArchetype: {
    id: "martialArchetype",
    name: "Martial Archetype",
    ukr: "Бойовий архетип",
    type: FEATURE_TYPES.CHOICE,
    short: "Обери архетип бійця."
  },

  extraAttack: {
    id: "extraAttack",
    name: "Extra Attack",
    ukr: "Додаткова атака",
    type: FEATURE_TYPES.PASSIVE,
    short: "Більше атак дією Attack."
  },

  indomitable: {
    id: "indomitable",
    name: "Indomitable",
    ukr: "Незламність",
    type: FEATURE_TYPES.RESOURCE,
    resource: "indomitable",
    short: "Повторний ряткидок."
  },

  // Champion
  improvedCritical: { id:"improvedCritical", name:"Improved Critical", ukr:"Покращений критичний удар", type:FEATURE_TYPES.PASSIVE, short:"Крит на 19–20." },
  remarkableAthlete: { id:"remarkableAthlete", name:"Remarkable Athlete", ukr:"Видатний атлет", type:FEATURE_TYPES.PASSIVE, short:"Бонус до фізичних перевірок." },
  additionalFightingStyle: { id:"additionalFightingStyle", name:"Additional Fighting Style", ukr:"Додатковий стиль бою", type:FEATURE_TYPES.CHOICE, short:"Другий стиль бою." },
  superiorCritical: { id:"superiorCritical", name:"Superior Critical", ukr:"Найвищий критичний удар", type:FEATURE_TYPES.PASSIVE, short:"Крит на 18–20." },
  survivor: { id:"survivor", name:"Survivor", ukr:"Той, хто вижив", type:FEATURE_TYPES.PASSIVE, short:"Автоматичне відновлення HP." },

  // Battle Master
  combatSuperiority: { id:"combatSuperiority", name:"Combat Superiority", ukr:"Бойова перевага", type:FEATURE_TYPES.RESOURCE, resource:"superiorityDice", short:"Маневри та кубики переваги." },
  studentOfWar: { id:"studentOfWar", name:"Student of War", ukr:"Учень війни", type:FEATURE_TYPES.CHOICE, short:"Володіння інструментом ремісника." },
  knowYourEnemy: { id:"knowYourEnemy", name:"Know Your Enemy", ukr:"Пізнай ворога", type:FEATURE_TYPES.PASSIVE, short:"Дізнаєшся характеристики ворога." },
  improvedCombatSuperiority: { id:"improvedCombatSuperiority", name:"Improved Combat Superiority", ukr:"Покращена бойова перевага", type:FEATURE_TYPES.MODIFIER, short:"Кубики стають більшими." },
  relentlessBattleMaster: { id:"relentlessBattleMaster", name:"Relentless", ukr:"Невтомний", type:FEATURE_TYPES.PASSIVE, short:"Повертає кубик переваги." },

  // Eldritch Knight
  weaponBond: { id:"weaponBond", name:"Weapon Bond", ukr:"Зв'язок зі зброєю", type:FEATURE_TYPES.PASSIVE, short:"Зброя завжди повертається." },
  eldritchKnightSpellcasting: { id:"eldritchKnightSpellcasting", name:"Spellcasting", ukr:"Чаклування Містичного лицаря", type:FEATURE_TYPES.SPELLCASTING, short:"Магія лицаря." },
  warMagic: { id:"warMagic", name:"War Magic", ukr:"Бойова магія", type:FEATURE_TYPES.ACTIVE, short:"Кантрип + атака." },
  eldritchStrike: { id:"eldritchStrike", name:"Eldritch Strike", ukr:"Містичний удар", type:FEATURE_TYPES.PASSIVE, short:"Ворогу важче пройти сейв." },
  arcaneCharge: { id:"arcaneCharge", name:"Arcane Charge", ukr:"Містичний ривок", type:FEATURE_TYPES.ACTIVE, short:"Телепорт після Action Surge." },
  improvedWarMagic: { id:"improvedWarMagic", name:"Improved War Magic", ukr:"Покращена бойова магія", type:FEATURE_TYPES.ACTIVE, short:"Заклинання + атака." },

  // ==================================================
  // ROGUE
  // ==================================================

  expertise: { id:"expertise", name:"Expertise", ukr:"Компетентність", type:FEATURE_TYPES.CHOICE, short:"Подвоєний бонус майстерності." },
  sneakAttack: { id:"sneakAttack", name:"Sneak Attack", ukr:"Підступна атака", type:FEATURE_TYPES.PASSIVE, short:"Додаткова шкода раз за хід." },
  thievesCant: { id:"thievesCant", name:"Thieves' Cant", ukr:"Таємна мова злодіїв", type:FEATURE_TYPES.PASSIVE, short:"Таємна мова." },
  cunningAction: { id:"cunningAction", name:"Cunning Action", ukr:"Хитра дія", type:FEATURE_TYPES.ACTIVE, short:"Dash, Disengage або Hide бонусною дією." },
  roguishArchetype: { id:"roguishArchetype", name:"Roguish Archetype", ukr:"Архетип розбійника", type:FEATURE_TYPES.CHOICE, short:"Обери архетип." },
  uncannyDodge: { id:"uncannyDodge", name:"Uncanny Dodge", ukr:"Надзвичайне ухилення", type:FEATURE_TYPES.REACTION, short:"Половина шкоди від атаки." },
  evasion: { id:"evasion", name:"Evasion", ukr:"Ухилення", type:FEATURE_TYPES.PASSIVE, short:"DEX сейви зменшують шкоду." },
  reliableTalent: { id:"reliableTalent", name:"Reliable Talent", ukr:"Надійний талант", type:FEATURE_TYPES.PASSIVE, short:"Мінімум 10 на перевірках навичок." },
  blindsense: { id:"blindsense", name:"Blindsense", ukr:"Сліпе чуття", type:FEATURE_TYPES.PASSIVE, short:"Відчуваєш прихованих істот." },
  slipperyMind: { id:"slipperyMind", name:"Slippery Mind", ukr:"Слизький розум", type:FEATURE_TYPES.PASSIVE, short:"Володіння WIS сейвами." },
  elusive: { id:"elusive", name:"Elusive", ukr:"Невловимий", type:FEATURE_TYPES.PASSIVE, short:"По тобі важче влучити." },
  strokeOfLuck: { id:"strokeOfLuck", name:"Stroke of Luck", ukr:"Удар удачі", type:FEATURE_TYPES.RESOURCE, short:"Перетворює промах на влучання." },

// ==================================================
// BARD
// ==================================================

spellcasting: {
  id: "spellcasting",
  name: "Spellcasting",
  ukr: "Чаклування",
  type: FEATURE_TYPES.SPELLCASTING,
  short: "Отримує доступ до заклять класу."
},

bardicInspiration: {
  id: "bardicInspiration",
  name: "Bardic Inspiration",
  ukr: "Натхнення Барда",
  type: FEATURE_TYPES.RESOURCE,
  resource: "bardicInspiration",
  short: "Дає союзнику кубик натхнення."
},

jackOfAllTrades: {
  id: "jackOfAllTrades",
  name: "Jack of All Trades",
  ukr: "Майстер на всі руки",
  type: FEATURE_TYPES.PASSIVE,
  short: "Половина бонусу майстерності до всіх невивчених перевірок."
},

songOfRest: {
  id: "songOfRest",
  name: "Song of Rest",
  ukr: "Пісня відпочинку",
  type: FEATURE_TYPES.PASSIVE,
  short: "Додаткове лікування під час короткого відпочинку."
},

fontOfInspiration: {
  id: "fontOfInspiration",
  name: "Font of Inspiration",
  ukr: "Джерело натхнення",
  type: FEATURE_TYPES.PASSIVE,
  short: "Натхнення відновлюється після короткого відпочинку."
},

magicalSecrets: {
  id: "magicalSecrets",
  name: "Magical Secrets",
  ukr: "Магічні секрети",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери закляття з будь-якого списку."
},

superiorInspiration: {
  id: "superiorInspiration",
  name: "Superior Inspiration",
  ukr: "Вище натхнення",
  type: FEATURE_TYPES.PASSIVE,
  short: "Якщо не маєш натхнення після бою — отримуєш одне."
},

// ==================================================
// CLERIC
// ==================================================

divineDomain: {
  id: "divineDomain",
  name: "Divine Domain",
  ukr: "Божественний домен",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери домен божества."
},

channelDivinity: {
  id: "channelDivinity",
  name: "Channel Divinity",
  ukr: "Божественний канал",
  type: FEATURE_TYPES.RESOURCE,
  resource: "channelDivinity",
  short: "Використай силу свого божества."
},

turnUndead: {
  id: "turnUndead",
  name: "Turn Undead",
  ukr: "Вигнання нежиті",
  type: FEATURE_TYPES.ACTIVE,
  short: "Відганяє нежить."
},

destroyUndead: {
  id: "destroyUndead",
  name: "Destroy Undead",
  ukr: "Знищення нежиті",
  type: FEATURE_TYPES.PASSIVE,
  short: "Слабка нежить знищується замість вигнання."
},

divineIntervention: {
  id: "divineIntervention",
  name: "Divine Intervention",
  ukr: "Божественне втручання",
  type: FEATURE_TYPES.ACTIVE,
  short: "Просиш божество про допомогу."
},

improvedDivineIntervention: {
  id: "improvedDivineIntervention",
  name: "Improved Divine Intervention",
  ukr: "Покращене божественне втручання",
  type: FEATURE_TYPES.PASSIVE,
  short: "Втручання завжди спрацьовує."
},

// ==================================================
// DRUID
// ==================================================

druidic: {
  id: "druidic",
  name: "Druidic",
  ukr: "Мова друїдів",
  type: FEATURE_TYPES.PASSIVE,
  short: "Таємна мова друїдів."
},

wildShape: {
  id: "wildShape",
  name: "Wild Shape",
  ukr: "Дика форма",
  type: FEATURE_TYPES.RESOURCE,
  resource: "wildShape",
  short: "Перетворення на звіра."
},

druidCircle: {
  id: "druidCircle",
  name: "Druid Circle",
  ukr: "Коло друїда",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери коло друїда."
},

timelessBody: {
  id: "timelessBody",
  name: "Timeless Body",
  ukr: "Позачасове тіло",
  type: FEATURE_TYPES.PASSIVE,
  short: "Старієш набагато повільніше."
},

beastSpells: {
  id: "beastSpells",
  name: "Beast Spells",
  ukr: "Закляття звіра",
  type: FEATURE_TYPES.PASSIVE,
  short: "Можеш чаклувати у Wild Shape."
},

archdruid: {
  id: "archdruid",
  name: "Archdruid",
  ukr: "Архідруїд",
  type: FEATURE_TYPES.PASSIVE,
  short: "Необмежене використання Wild Shape."
},
  // ==================================================
// MONK
// ==================================================

martialArts: { id:"martialArts", name:"Martial Arts", ukr:"Бойові мистецтва", type:FEATURE_TYPES.PASSIVE, short:"Беззбройні удари та кубик бойових мистецтв." },

unarmoredDefenseMonk: { id:"unarmoredDefenseMonk", name:"Unarmored Defense", ukr:"Захист без броні", type:FEATURE_TYPES.MODIFIER, short:"AC = 10 + DEX + WIS." },

ki: { id:"ki", name:"Ki", ukr:"Кі", type:FEATURE_TYPES.RESOURCE, resource:"ki", short:"Очки Кі для здібностей монаха." },

unarmoredMovement: { id:"unarmoredMovement", name:"Unarmored Movement", ukr:"Рух без броні", type:FEATURE_TYPES.MODIFIER, short:"Додаткова швидкість." },

deflectMissiles: { id:"deflectMissiles", name:"Deflect Missiles", ukr:"Відбиття снарядів", type:FEATURE_TYPES.REACTION, short:"Зменшує шкоду від дальньої атаки." },

slowFall: { id:"slowFall", name:"Slow Fall", ukr:"Повільне падіння", type:FEATURE_TYPES.REACTION, short:"Зменшує шкоду від падіння." },

stunningStrike: { id:"stunningStrike", name:"Stunning Strike", ukr:"Оглушливий удар", type:FEATURE_TYPES.ACTIVE, short:"Витрачає Ki, щоб оглушити ворога." },

kiEmpoweredStrikes: { id:"kiEmpoweredStrikes", name:"Ki-Empowered Strikes", ukr:"Удари, посилені Кі", type:FEATURE_TYPES.PASSIVE, short:"Беззбройні удари стають магічними." },

stillnessOfMind: { id:"stillnessOfMind", name:"Stillness of Mind", ukr:"Спокій розуму", type:FEATURE_TYPES.ACTIVE, short:"Припиняє Charmed або Frightened." },

purityOfBody: { id:"purityOfBody", name:"Purity of Body", ukr:"Чистота тіла", type:FEATURE_TYPES.PASSIVE, short:"Імунітет до хвороб і отрути." },

diamondSoul: { id:"diamondSoul", name:"Diamond Soul", ukr:"Алмазна душа", type:FEATURE_TYPES.PASSIVE, short:"Володіння всіма сейвами." },

emptyBody: { id:"emptyBody", name:"Empty Body", ukr:"Порожнє тіло", type:FEATURE_TYPES.ACTIVE, short:"Невидимість і астральна проєкція." },

perfectSelf: { id:"perfectSelf", name:"Perfect Self", ukr:"Досконале Я", type:FEATURE_TYPES.PASSIVE, short:"Повертає Ki, якщо вони закінчилися." },

// ==================================================
// PALADIN
// ==================================================

divineSense: { id:"divineSense", name:"Divine Sense", ukr:"Божественне чуття", type:FEATURE_TYPES.RESOURCE, resource:"divineSense", short:"Відчуває небесних, демонів і нежить." },

layOnHands: { id:"layOnHands", name:"Lay on Hands", ukr:"Покладання рук", type:FEATURE_TYPES.RESOURCE, resource:"layOnHands", short:"Запас лікування." },

divineSmite: { id:"divineSmite", name:"Divine Smite", ukr:"Божественна кара", type:FEATURE_TYPES.ACTIVE, short:"Витрачає комірку магії для додаткової шкоди." },

divineHealth: { id:"divineHealth", name:"Divine Health", ukr:"Божественне здоров'я", type:FEATURE_TYPES.PASSIVE, short:"Імунітет до хвороб." },

sacredOath: { id:"sacredOath", name:"Sacred Oath", ukr:"Священна клятва", type:FEATURE_TYPES.CHOICE, short:"Обери клятву паладина." },

auraOfProtection: { id:"auraOfProtection", name:"Aura of Protection", ukr:"Аура захисту", type:FEATURE_TYPES.MODIFIER, short:"Бонус CHA до сейвів союзників." },

auraOfCourage: { id:"auraOfCourage", name:"Aura of Courage", ukr:"Аура відваги", type:FEATURE_TYPES.PASSIVE, short:"Імунітет до Frightened у аурі." },

improvedDivineSmite: { id:"improvedDivineSmite", name:"Improved Divine Smite", ukr:"Покращена божественна кара", type:FEATURE_TYPES.PASSIVE, short:"+1d8 радіантної шкоди кожній атаці." },

cleansingTouch: { id:"cleansingTouch", name:"Cleansing Touch", ukr:"Очищувальний дотик", type:FEATURE_TYPES.RESOURCE, short:"Знімає закляття дотиком." },

// ==================================================
// RANGER
// ==================================================

favoredEnemy: { id:"favoredEnemy", name:"Favored Enemy", ukr:"Улюблений ворог", type:FEATURE_TYPES.CHOICE, short:"Обери тип ворога." },

naturalExplorer: { id:"naturalExplorer", name:"Natural Explorer", ukr:"Природний дослідник", type:FEATURE_TYPES.CHOICE, short:"Обери улюблену місцевість." },

rangerArchetype: { id:"rangerArchetype", name:"Ranger Archetype", ukr:"Архетип следопита", type:FEATURE_TYPES.CHOICE, short:"Обери архетип." },

primevalAwareness: { id:"primevalAwareness", name:"Primeval Awareness", ukr:"Первісне відчуття", type:FEATURE_TYPES.ACTIVE, short:"Відчуває певні типи істот." },

landsStride: { id:"landsStride", name:"Land's Stride", ukr:"Крок землі", type:FEATURE_TYPES.PASSIVE, short:"Легше пересування складною місцевістю." },

hideInPlainSight: { id:"hideInPlainSight", name:"Hide in Plain Sight", ukr:"Сховатися на виду", type:FEATURE_TYPES.ACTIVE, short:"Створює природне маскування." },

vanish: { id:"vanish", name:"Vanish", ukr:"Зникнення", type:FEATURE_TYPES.PASSIVE, short:"Hide бонусною дією." },

feralSenses: { id:"feralSenses", name:"Feral Senses", ukr:"Первісні чуття", type:FEATURE_TYPES.PASSIVE, short:"Відчуває невидимих істот поруч." },

foeSlayer: { id:"foeSlayer", name:"Foe Slayer", ukr:"Винищувач ворогів", type:FEATURE_TYPES.PASSIVE, short:"Додає WIS до атаки або шкоди проти улюбленого ворога." },

// ==================================================
// SORCERER
// ==================================================

sorcerousOrigin: {
  id: "sorcerousOrigin",
  name: "Sorcerous Origin",
  ukr: "Походження чаклуна",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери магічне походження."
},

fontOfMagic: {
  id: "fontOfMagic",
  name: "Font of Magic",
  ukr: "Джерело магії",
  type: FEATURE_TYPES.RESOURCE,
  resource: "sorceryPoints",
  short: "Очки чаклунства."
},

metamagic: {
  id: "metamagic",
  name: "Metamagic",
  ukr: "Метамагія",
  type: FEATURE_TYPES.CHOICE,
  short: "Модифікує закляття."
},

sorcerousRestoration: {
  id: "sorcerousRestoration",
  name: "Sorcerous Restoration",
  ukr: "Відновлення чаклунства",
  type: FEATURE_TYPES.PASSIVE,
  short: "Повертає очки чаклунства після короткого відпочинку."
},

// ==================================================
// WARLOCK
// ==================================================

otherworldlyPatron: {
  id: "otherworldlyPatron",
  name: "Otherworldly Patron",
  ukr: "Потойбічний покровитель",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери покровителя."
},

eldritchInvocations: {
  id: "eldritchInvocations",
  name: "Eldritch Invocations",
  ukr: "Містичні інвокації",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери інвокації."
},

pactBoon: {
  id: "pactBoon",
  name: "Pact Boon",
  ukr: "Дар пакту",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери Клинок, Ланцюг або Книгу."
},

mysticArcanum: {
  id: "mysticArcanum",
  name: "Mystic Arcanum",
  ukr: "Містичний арканум",
  type: FEATURE_TYPES.PASSIVE,
  short: "Закляття 6–9 рівня."
},

eldritchMaster: {
  id: "eldritchMaster",
  name: "Eldritch Master",
  ukr: "Містичний майстер",
  type: FEATURE_TYPES.ACTIVE,
  short: "Відновлює Pact Magic."
},

// ==================================================
// WIZARD
// ==================================================

arcaneRecovery: {
  id: "arcaneRecovery",
  name: "Arcane Recovery",
  ukr: "Арканне відновлення",
  type: FEATURE_TYPES.PASSIVE,
  short: "Повертає комірки магії після короткого відпочинку."
},

arcaneTradition: {
  id: "arcaneTradition",
  name: "Arcane Tradition",
  ukr: "Арканна традиція",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери школу магії."
},

spellMastery: {
  id: "spellMastery",
  name: "Spell Mastery",
  ukr: "Майстерність заклять",
  type: FEATURE_TYPES.PASSIVE,
  short: "Безкоштовне чаклування двох заклять."
},

signatureSpells: {
  id: "signatureSpells",
  name: "Signature Spells",
  ukr: "Фірмові закляття",
  type: FEATURE_TYPES.CHOICE,
  short: "Обери два фірмових закляття."
}
};