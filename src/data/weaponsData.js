import { DAMAGE_TYPES } from "./rulesData.js";

// ==================================================
// ВОЛОДІННЯ ЗБРОЄЮ
// ==================================================

export const WEAPON_PROFICIENCIES = {

  SIMPLE: "simple",
  MARTIAL: "martial"

};

// ==================================================
// ЗБРОЯ PHB 2014
// ==================================================

export const WEAPONS = {

  // ================= SIMPLE MELEE =================

  club:{id:"club",name:"Club",ukr:"Дубина",category:"simple",type:"melee",damage:"1d4",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["light"]},
  dagger:{id:"dagger",name:"Dagger",ukr:"Кинджал",category:"simple",type:"melee",damage:"1d4",damageType:DAMAGE_TYPES.PIERCING,properties:["finesse","light","thrown"],range:"20/60"},
  greatclub:{id:"greatclub",name:"Greatclub",ukr:"Велика дубина",category:"simple",type:"melee",damage:"1d8",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["twoHanded"]},
  handaxe:{id:"handaxe",name:"Handaxe",ukr:"Ручна сокира",category:"simple",type:"melee",damage:"1d6",damageType:DAMAGE_TYPES.SLASHING,properties:["light","thrown"],range:"20/60"},
  javelin:{id:"javelin",name:"Javelin",ukr:"Дротик-спис",category:"simple",type:"melee",damage:"1d6",damageType:DAMAGE_TYPES.PIERCING,properties:["thrown"],range:"30/120"},
  lightHammer:{id:"lightHammer",name:"Light Hammer",ukr:"Легкий молот",category:"simple",type:"melee",damage:"1d4",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["light","thrown"],range:"20/60"},
  mace:{id:"mace",name:"Mace",ukr:"Булава",category:"simple",type:"melee",damage:"1d6",damageType:DAMAGE_TYPES.BLUDGEONING,properties:[]},
  quarterstaff:{id:"quarterstaff",name:"Quarterstaff",ukr:"Посох",category:"simple",type:"melee",damage:"1d6",versatileDamage:"1d8",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["versatile"]},
  sickle:{id:"sickle",name:"Sickle",ukr:"Серп",category:"simple",type:"melee",damage:"1d4",damageType:DAMAGE_TYPES.SLASHING,properties:["light"]},
  spear:{id:"spear",name:"Spear",ukr:"Спис",category:"simple",type:"melee",damage:"1d6",versatileDamage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:["thrown","versatile"],range:"20/60"},

  // ================= SIMPLE RANGED =================

  lightCrossbow:{id:"lightCrossbow",name:"Light Crossbow",ukr:"Легкий арбалет",category:"simple",type:"ranged",damage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:["ammunition","loading","twoHanded"],range:"80/320"},
  dart:{id:"dart",name:"Dart",ukr:"Дротик",category:"simple",type:"ranged",damage:"1d4",damageType:DAMAGE_TYPES.PIERCING,properties:["finesse","thrown"],range:"20/60"},
  shortbow:{id:"shortbow",name:"Shortbow",ukr:"Короткий лук",category:"simple",type:"ranged",damage:"1d6",damageType:DAMAGE_TYPES.PIERCING,properties:["ammunition","twoHanded"],range:"80/320"},
  sling:{id:"sling",name:"Sling",ukr:"Праща",category:"simple",type:"ranged",damage:"1d4",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["ammunition"],range:"30/120"},

  // ================= MARTIAL MELEE =================

  battleaxe:{id:"battleaxe",name:"Battleaxe",ukr:"Бойова сокира",category:"martial",type:"melee",damage:"1d8",versatileDamage:"1d10",damageType:DAMAGE_TYPES.SLASHING,properties:["versatile"]},
  flail:{id:"flail",name:"Flail",ukr:"Ціп",category:"martial",type:"melee",damage:"1d8",damageType:DAMAGE_TYPES.BLUDGEONING,properties:[]},
  glaive:{id:"glaive",name:"Glaive",ukr:"Глефа",category:"martial",type:"melee",damage:"1d10",damageType:DAMAGE_TYPES.SLASHING,properties:["heavy","reach","twoHanded"]},
  greataxe:{id:"greataxe",name:"Greataxe",ukr:"Дворучна сокира",category:"martial",type:"melee",damage:"1d12",damageType:DAMAGE_TYPES.SLASHING,properties:["heavy","twoHanded"]},
  greatsword:{id:"greatsword",name:"Greatsword",ukr:"Дворучний меч",category:"martial",type:"melee",damage:"2d6",damageType:DAMAGE_TYPES.SLASHING,properties:["heavy","twoHanded"]},
  halberd:{id:"halberd",name:"Halberd",ukr:"Алебарда",category:"martial",type:"melee",damage:"1d10",damageType:DAMAGE_TYPES.SLASHING,properties:["heavy","reach","twoHanded"]},
  lance:{id:"lance",name:"Lance",ukr:"Піка",category:"martial",type:"melee",damage:"1d12",damageType:DAMAGE_TYPES.PIERCING,properties:["reach","special"]},
  longsword:{id:"longsword",name:"Longsword",ukr:"Довгий меч",category:"martial",type:"melee",damage:"1d8",versatileDamage:"1d10",damageType:DAMAGE_TYPES.SLASHING,properties:["versatile"]},
  maul:{id:"maul",name:"Maul",ukr:"Кувалда",category:"martial",type:"melee",damage:"2d6",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["heavy","twoHanded"]},
  morningstar:{id:"morningstar",name:"Morningstar",ukr:"Моргенштерн",category:"martial",type:"melee",damage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:[]},
  pike:{id:"pike",name:"Pike",ukr:"Довга піка",category:"martial",type:"melee",damage:"1d10",damageType:DAMAGE_TYPES.PIERCING,properties:["heavy","reach","twoHanded"]},
  rapier:{id:"rapier",name:"Rapier",ukr:"Рапіра",category:"martial",type:"melee",damage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:["finesse"]},
  scimitar:{id:"scimitar",name:"Scimitar",ukr:"Ятаган",category:"martial",type:"melee",damage:"1d6",damageType:DAMAGE_TYPES.SLASHING,properties:["finesse","light"]},
  shortsword:{id:"shortsword",name:"Shortsword",ukr:"Короткий меч",category:"martial",type:"melee",damage:"1d6",damageType:DAMAGE_TYPES.PIERCING,properties:["finesse","light"]},
  trident:{id:"trident",name:"Trident",ukr:"Тризуб",category:"martial",type:"melee",damage:"1d6",versatileDamage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:["thrown","versatile"],range:"20/60"},
  warPick:{id:"warPick",name:"War Pick",ukr:"Бойовий кайло",category:"martial",type:"melee",damage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:[]},
  warhammer:{id:"warhammer",name:"Warhammer",ukr:"Бойовий молот",category:"martial",type:"melee",damage:"1d8",versatileDamage:"1d10",damageType:DAMAGE_TYPES.BLUDGEONING,properties:["versatile"]},
  whip:{id:"whip",name:"Whip",ukr:"Батіг",category:"martial",type:"melee",damage:"1d4",damageType:DAMAGE_TYPES.SLASHING,properties:["finesse","reach"]},

  // ================= MARTIAL RANGED =================

  blowgun:{id:"blowgun",name:"Blowgun",ukr:"Духова трубка",category:"martial",type:"ranged",damage:"1",damageType:DAMAGE_TYPES.PIERCING,properties:["ammunition","loading"],range:"25/100"},
  handCrossbow:{id:"handCrossbow",name:"Hand Crossbow",ukr:"Ручний арбалет",category:"martial",type:"ranged",damage:"1d6",damageType:DAMAGE_TYPES.PIERCING,properties:["ammunition","light","loading"],range:"30/120"},
  heavyCrossbow:{id:"heavyCrossbow",name:"Heavy Crossbow",ukr:"Важкий арбалет",category:"martial",type:"ranged",damage:"1d10",damageType:DAMAGE_TYPES.PIERCING,properties:["ammunition","heavy","loading","twoHanded"],range:"100/400"},
  longbow:{id:"longbow",name:"Longbow",ukr:"Довгий лук",category:"martial",type:"ranged",damage:"1d8",damageType:DAMAGE_TYPES.PIERCING,properties:["ammunition","heavy","twoHanded"],range:"150/600"},
  net:{id:"net",name:"Net",ukr:"Сітка",category:"martial",type:"ranged",damage:null,damageType:null,properties:["special","thrown"],range:"5/15"}

};