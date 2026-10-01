import { RACES, DRACONIC_ANCESTRY } from "../data/racesData.js";
import { CLASSES } from "../data/classesData.js";
import { BACKGROUNDS, BACKGROUND_ORDER } from "../data/backgroundsData.js";
import { FEATS } from "../data/featsData.js";
import { FEATURES } from "../data/featuresData.js";
import { STATS, SKILLS, ABILITY_KEYS, PROFICIENCY } from "../data/rulesData.js";
import { WEAPONS } from "../data/weaponsData.js";
import { ARMOR } from "../data/armorData.js";
import { OTHER_ITEMS } from "../data/otherItemsData.js";
import { SPELLS, getAllSpells } from "../data/spellsData.js";
import {
  CREATOR_TOOL_OPTIONS,
  CREATOR_LANGUAGE_OPTIONS,
  CREATOR_CLASS_CHOICES,
  CREATOR_RACE_DETAILS,
  CREATOR_CLASS_EQUIPMENT,
  CREATOR_ABILITY_SCORE_ARRAY,
  CREATOR_STARTING_SPELLS
} from "../data/characterCreatorData.js";

const CLASS_WEAPON_PROFICIENCY_LABELS = {
  simple: "Проста зброя",
  martial: "Бойова зброя"
};

const CLASS_ARMOR_PROFICIENCY_LABELS = {
  light: "Легка броня",
  medium: "Середня броня",
  heavy: "Важка броня",
  shield: "Щити"
};

const WEAPON_PICKERS = {
  simpleWeapon: item => item.category === "simple",
  simpleMeleeWeapon: item => item.category === "simple" && item.type === "melee",
  martialMeleeWeapon: item => item.category === "martial" && item.type === "melee"
};

const SPECIAL_EQUIPMENT_OPTIONS = {
  deckOfCards: ["deckOfCards", "Колода карт"],
  boneDice: ["boneDice", "Кістяні кості"]
};

export function createCreatorState() {
  return {
    step: 0,
    raceId: "",
    subraceId: "",
    raceVariant: "",
    raceChoices: {
      abilityScores: [],
      skills: [],
      featId: "",
      languages: [],
      tool: "",
      draconicAncestry: "",
      cantrip: ""
    },
    stats: Object.fromEntries(ABILITY_KEYS.map(key => [key, null])),
    classId: "",
    subclassId: "",
    classChoices: {
      skills: [],
      expertise: [],
      tools: {},
      fightingStyle: "",
      favoredEnemy: "",
      naturalExplorer: "",
      knowledgeExpertise: [],
      knowledgeLanguages: []
    },
    backgroundId: "",
    backgroundChoices: {
      languages: {},
      tools: {}
    },
    equipmentChoices: {},
    magicChoices: {
      cantrips: [],
      spells: []
    },
    name: "",
    error: ""
  };
}

function getAtLevel(table, level = 1) {
  if (!table) return null;

  const levels = Object.keys(table)
    .map(Number)
    .filter(Number.isFinite)
    .filter(value => value <= Number(level))
    .sort((a, b) => a - b);

  return levels.length ? table[levels[levels.length - 1]] : null;
}

function getClassData(state) {
  return CLASSES[state.classId] ?? null;
}

function getRaceData(state) {
  return RACES[state.raceId] ?? null;
}

function getRaceDetails(state) {
  return CREATOR_RACE_DETAILS[state.raceId] ?? {};
}

function getSubraceData(state) {
  return getRaceData(state)?.subraces?.[state.subraceId] ?? null;
}

function getSelectedHumanVariant(state) {
  return state.raceId === "human" && state.raceVariant
    ? getRaceData(state)?.variants?.[state.raceVariant] ?? null
    : null;
}

export function getRaceChoices(state) {
  const race = getRaceData(state);
  const detail = getRaceDetails(state);
  const groups = [];

  if (!race) return groups;

  if (race.toolProficienciesChoice?.count) {
    groups.push({
      id: "raceTool",
      title: "Вибір інструменту",
      kind: "categoryTools",
      count: Number(race.toolProficienciesChoice.count),
      options: resolveGenericChoiceOptions(race.toolProficienciesChoice.options)
    });
  }

  if (state.raceId === "human" && state.raceVariant === "variant") {
    groups.push({
      id: "humanAbilityScores",
      title: "Бонуси характеристик",
      kind: "stats",
      count: 2,
      unique: true,
      value: 1,
      options: ABILITY_KEYS.map(id => ({
        id,
        label: STATS[id]?.ukr ?? id
      }))
    });

    groups.push({
      id: "humanSkill",
      title: "Навичка",
      kind: "skills",
      count: 1,
      options: getAllSkillOptions()
    });

    groups.push({
      id: "humanFeat",
      title: "Риса",
      kind: "feat",
      count: 1,
      options: Object.values(FEATS).map(feat => ({
        id: feat.id,
        label: feat.ukr ?? feat.name
      }))
    });

    groups.push({
      id: "humanLanguage",
      title: "Додаткова мова",
      kind: "languages",
      count: 1,
      options: getLanguageOptions()
    });
  }

  if (state.raceId === "halfElf") {
    groups.push({
      id: "halfElfAbilityScores",
      title: "Два бонуси характеристик",
      kind: "stats",
      count: 2,
      value: 1,
      unique: true,
      options: ABILITY_KEYS.map(id => ({
        id,
        label: STATS[id]?.ukr ?? id
      }))
    });

    groups.push({
      id: "halfElfSkills",
      title: "Навички",
      kind: "skills",
      count: 2,
      unique: true,
      options: getAllSkillOptions()
    });
  }

  if (state.raceId === "dragonborn" && detail.choices?.draconicAncestry) {
    groups.push({
      id: "draconicAncestry",
      title: "Драконяче походження",
      kind: "single",
      count: 1,
      options: Object.entries(DRACONIC_ANCESTRY).map(([id, data]) => ({
        id,
        label: data.name,
        description: data.damageType
      }))
    });
  }

  if (state.raceId === "elf" && state.subraceId === "highElf") {
    groups.push({
      id: "highElfCantrip",
      title: "Заговор високого ельфа",
      kind: "single",
      count: 1,
      options: getSpellOptionsForClass("wizard", 0)
    });

    groups.push({
      id: "highElfLanguage",
      title: "Додаткова мова",
      kind: "languages",
      count: 1,
      options: getLanguageOptions()
    });
  }

  return groups;
}

export function getClassChoiceGroups(state) {
  const classData = getClassData(state);
  if (!classData) return [];

  const groups = [];

  if (classData.skillChoices?.count) {
    groups.push({
      id: "skills",
      title: "Навички",
      kind: "skills",
      count: Number(classData.skillChoices.count),
      unique: true,
      options: classData.skillChoices.options === "any"
        ? getAllSkillOptions()
        : resolveSkillOptions(classData.skillChoices.options)
    });
  }

  if (Array.isArray(classData.toolProficiencies) && classData.toolProficiencies.length) {
    groups.push({
      id: "fixedTools",
      title: "Володіння інструментами",
      kind: "info",
      count: 0,
      options: classData.toolProficiencies.map(id => ({
        id,
        label: formatToolName(id)
      }))
    });
  }

  if (classData.toolProficiencies && !Array.isArray(classData.toolProficiencies)) {
    const count = Number(classData.toolProficiencies.count ?? 0);
    const optionTypes = classData.toolProficiencies.options ?? [];

    if (count > 0) {
      groups.push({
        id: "tools",
        title: "Вибір інструментів",
        kind: "categoryTools",
        count,
        options: optionTypes.flatMap(type => resolveToolCategoryOptions(type))
      });
    }
  }

  if (CREATOR_CLASS_CHOICES[state.classId]?.fightingStyle) {
    groups.push({
      id: "fightingStyle",
      title: "Бойовий стиль",
      kind: "single",
      count: 1,
      options: CREATOR_CLASS_CHOICES[state.classId].fightingStyle.map(([id, label]) => ({ id, label }))
    });
  }

  if (CREATOR_CLASS_CHOICES[state.classId]?.favoredEnemy) {
    groups.push({
      id: "favoredEnemy",
      title: "Улюблений ворог",
      kind: "single",
      count: 1,
      options: CREATOR_CLASS_CHOICES[state.classId].favoredEnemy.map(([id, label]) => ({ id, label }))
    });
  }

  if (CREATOR_CLASS_CHOICES[state.classId]?.naturalExplorer) {
    groups.push({
      id: "naturalExplorer",
      title: "Дослідник природи",
      kind: "single",
      count: 1,
      options: CREATOR_CLASS_CHOICES[state.classId].naturalExplorer.map(([id, label]) => ({ id, label }))
    });
  }

  if ((classData.featuresByLevel?.[1] ?? []).includes("expertise")) {
    groups.push({
      id: "expertise",
      title: "Експертність",
      kind: "expertise",
      count: 2,
      unique: true,
      options: [
        ...getAllSkillOptions(),
        ...(state.classId === "rogue"
          ? [{ id: "thievesTools", label: "Злодійські інструменти" }]
          : [])
      ]
    });
  }

  const subclass = getSelectedSubclass(state);
  if (state.classId === "cleric" && subclass?.featuresByLevel?.[1]?.includes("blessingsOfKnowledge")) {
    groups.push({
      id: "knowledgeExpertise",
      title: "Благословення знання — експертність",
      kind: "skills",
      count: 2,
      unique: true,
      options: resolveSkillOptions(["arcana", "history", "nature", "religion"])
    });

    groups.push({
      id: "knowledgeLanguages",
      title: "Благословення знання — мови",
      kind: "languages",
      count: 2,
      unique: true,
      options: getLanguageOptions()
    });
  }

  return groups;
}

export function getBackgroundChoiceGroups(state) {
  const background = BACKGROUNDS[state.backgroundId];
  if (!background) return [];

  const groups = [];

  for (let index = 0; index < (background.languages?.choices ?? []).length; index += 1) {
    const choice = background.languages.choices[index];
    if (!choice) continue;

    groups.push({
      id: "language:" + index,
      title: "Мови — вибір " + (index + 1),
      kind: "languages",
      count: Number(choice.count ?? 1),
      unique: true,
      options: choice.options === "anyLanguage"
        ? getLanguageOptions()
        : resolveGenericChoiceOptions(choice.options)
    });
  }

  for (let index = 0; index < (background.toolProficiencies?.choices ?? []).length; index += 1) {
    const choice = background.toolProficiencies.choices[index];
    if (!choice) continue;

    groups.push({
      id: "tool:" + index,
      title: "Інструменти — вибір " + (index + 1),
      kind: "categoryTools",
      count: Number(choice.count ?? 1),
      unique: true,
      options: (choice.options ?? []).flatMap(resolveToolCategoryOptions)
    });
  }

  return groups;
}

export function getEquipmentChoiceGroups(state) {
  const groups = [];
  const classEquipment = CREATOR_CLASS_EQUIPMENT[state.classId];

  for (const choice of classEquipment?.choices ?? []) {
    groups.push({
      ...normalizeEquipmentChoice(choice),
      id: "class:" + choice.id,
      source: "class"
    });
  }

  const background = BACKGROUNDS[state.backgroundId];

  for (let index = 0; index < (background?.startingEquipment?.choices ?? []).length; index += 1) {
    const choice = background.startingEquipment.choices[index];
    groups.push({
      ...normalizeBackgroundEquipmentChoice(choice),
      id: "background:" + index,
      source: "background"
    });
  }

  return groups;
}

function normalizeEquipmentChoice(choice) {
  if (choice.pickFrom) {
    const options = Object.values(WEAPONS)
      .filter(WEAPON_PICKERS[choice.pickFrom] ?? (() => false))
      .map(item => ({
        id: item.id,
        label: item.ukr ?? item.name
      }));

    return {
      title: choice.label,
      kind: "catalogMulti",
      count: Number(choice.count ?? 1),
      unique: true,
      options
    };
  }

  return {
    title: choice.label,
    kind: "equipmentOption",
    count: 1,
    unique: true,
    options: (choice.options ?? []).map(option => ({
      id: option.id,
      label: option.label,
      description: formatEquipmentOptionDescription(option)
    }))
  };
}

function normalizeBackgroundEquipmentChoice(choice) {
  const options = (choice.options ?? []).flatMap(option => {
    if (CREATOR_TOOL_OPTIONS[option]) {
      return CREATOR_TOOL_OPTIONS[option].map(([id, label]) => ({
        id,
        label
      }));
    }

    if (SPECIAL_EQUIPMENT_OPTIONS[option]) {
      return [{
        id: SPECIAL_EQUIPMENT_OPTIONS[option][0],
        label: SPECIAL_EQUIPMENT_OPTIONS[option][1]
      }];
    }

    return [{
      id: option,
      label: option
    }];
  });

  return {
    title: "Початкове спорядження",
    kind: "equipmentOption",
    count: Number(choice.count ?? 1),
    unique: true,
    options
  };
}

function formatEquipmentOptionDescription(option) {
  const itemNames = (option.items ?? [])
    .map(item => resolveCatalogLabel(item.source, item.itemId))
    .filter(Boolean);

  return [
    option.pickFrom ? "Оберіть предмети з доступного списку." : "",
    itemNames.length ? itemNames.join(", ") : "",
    option.extraItems?.length
      ? option.extraItems.map(item => resolveCatalogLabel(item.source, item.itemId)).filter(Boolean).join(", ")
      : ""
  ].filter(Boolean).join(" · ");
}

export function getMagicRequirements(state) {
  const classData = getClassData(state);
  const spellcasting = classData?.spellcasting;

  if (!spellcasting) {
    return {
      required: false,
      cantrips: 0,
      spells: 0,
      spellListClassId: ""
    };
  }

  const cantrips = Number(getAtLevel(spellcasting.cantripsKnown, 1) ?? 0);
  let spells = 0;

  if (spellcasting.spellsKnown) {
    spells = Number(getAtLevel(spellcasting.spellsKnown, 1) ?? 0);
  } else if (CREATOR_STARTING_SPELLS[state.classId] != null) {
    spells = Number(CREATOR_STARTING_SPELLS[state.classId]);
  }

  return {
    required: cantrips > 0 || spells > 0,
    cantrips,
    spells,
    spellListClassId: spellcasting.spellListClassId ?? state.classId
  };
}

export function getClassSummary(state) {
  const classData = getClassData(state);
  if (!classData) return null;

  const featureIds = [
    ...(classData.featuresByLevel?.[1] ?? []),
    ...(getSelectedSubclass(state)?.featuresByLevel?.[1] ?? [])
  ];

  const resources = Object.entries(classData.resourcesByLevel ?? {})
    .map(([id, table]) => ({
      id,
      value: getAtLevel(table, 1)
    }))
    .filter(item =>
      typeof item.value === "number" &&
      item.value > 0
    );

  return {
    hitDie: classData.hitDie,
    savingThrows: classData.savingThrows ?? [],
    weaponProficiencies: classData.weaponProficiencies ?? [],
    armorProficiencies: classData.armorProficiencies ?? [],
    toolProficiencies: Array.isArray(classData.toolProficiencies)
      ? classData.toolProficiencies
      : [],
    toolChoices: !Array.isArray(classData.toolProficiencies)
      ? classData.toolProficiencies
      : null,
    spellcasting: classData.spellcasting
      ? [
          classData.spellcasting.ability
            ? "Модифікатор " + classData.spellcasting.ability
            : "",
          classData.spellcasting.preparation === "prepared"
            ? "підготовка заклять"
            : "відомі закляття",
          getAtLevel(classData.spellcasting.cantripsKnown, 1)
            ? "заговорів: " + getAtLevel(classData.spellcasting.cantripsKnown, 1)
            : ""
        ].filter(Boolean).join(" · ")
      : "",
    featureIds,
    features: featureIds
      .map(id => FEATURES[id])
      .filter(Boolean),
    resources
  };
}

export function getSubclassOptions(state) {
  const classData = getClassData(state);
  if (!classData) return [];

  return Object.values(classData.subclasses ?? {}).map(subclass => ({
    id: subclass.id,
    name: subclass.name ?? subclass.ukr ?? subclass.id,
    ukr: subclass.ukr ?? subclass.name ?? subclass.id,
    level1Features: (subclass.featuresByLevel?.[1] ?? [])
      .map(id => FEATURES[id])
      .filter(Boolean)
  }));
}

export function isSubclassRequiredAtLevel1(state) {
  const options = getSubclassOptions(state);
  return options.some(option => option.level1Features.length > 0);
}

export function getBackgroundOptions() {
  return BACKGROUND_ORDER
    .map(id => BACKGROUNDS[id])
    .filter(Boolean);
}

export function getRecommendedBackgroundId(state) {
  return getClassData(state)?.recommendedBackgroundId ?? "";
}

export function getRaceTraitSummary(state) {
  const race = getRaceData(state);
  const detail = getRaceDetails(state);
  const subrace = getSubraceData(state);
  const subDetail = detail.subraces?.[state.subraceId] ?? {};

  const traits = [
    ...(detail.traits ?? []),
    ...(subDetail.traits ?? [])
  ];

  return {
    size: subrace?.size ?? race?.size ?? null,
    speed: subrace?.speed ?? race?.speed ?? null,
    darkvision: subrace?.darkvision ?? race?.darkvision ?? null,
    traits,
    abilityScoreIncrease: getFinalRaceAbilityBonuses(state),
    languages: race?.languages ?? [],
    skillProficiencies: race?.skillProficiencies ?? [],
    weaponProficiencies: race?.weaponProficiencies ?? [],
    armorProficiencies: subrace?.armorProficiencies ?? [],
    toolProficiencies: race?.toolProficiencies ?? []
  };
}

export function getFinalRaceAbilityBonuses(state) {
  const race = getRaceData(state);
  if (!race) return {};

  if (state.raceId === "human" && state.raceVariant === "variant") {
    return Object.fromEntries(
      (state.raceChoices.abilityScores ?? []).map(id => [id, 1])
    );
  }

  const result = {
    ...(race.abilityScoreIncrease ?? {})
  };

  const subDetail = getRaceDetails(state).subraces?.[state.subraceId];
  for (const [id, value] of Object.entries(subDetail?.abilityScoreIncrease ?? {})) {
    result[id] = Number(result[id] ?? 0) + Number(value);
  }

  if (state.raceId === "halfElf") {
    for (const id of state.raceChoices.abilityScores ?? []) {
      result[id] = Number(result[id] ?? 0) + 1;
    }
  }

  return result;
}

export function validateCreatorStep(state, stepKey) {
  if (stepKey === "race") {
    if (!state.raceId) return "Оберіть расу.";

    const race = getRaceData(state);

    if (Object.keys(race.subraces ?? {}).length && !state.subraceId) {
      return "Оберіть підрасу.";
    }

    if (state.raceId === "human" && !state.raceVariant) {
      return "Оберіть варіант людини.";
    }

    const raceGroups = getRaceChoices(state);
    for (const group of raceGroups) {
      const value = getChoiceValue(state, group);
      if (!isChoiceComplete(group, value)) {
        return "Завершіть вибір: " + group.title;
      }
    }

    return "";
  }

  if (stepKey === "stats") {
    const values = ABILITY_KEYS.map(id => Number(state.stats[id]));
    if (values.some(value => !CREATOR_ABILITY_SCORE_ARRAY.includes(value))) {
      return "Розподіліть усі значення характеристик.";
    }

    if (new Set(values).size !== CREATOR_ABILITY_SCORE_ARRAY.length) {
      return "Кожне значення характеристики можна використати лише один раз.";
    }

    return "";
  }

  if (stepKey === "class") {
    if (!state.classId) return "Оберіть клас.";

    if (isSubclassRequiredAtLevel1(state) && !state.subclassId) {
      return "Оберіть підклас для 1 рівня.";
    }

    return "";
  }

  if (stepKey === "classChoices") {
    for (const group of getClassChoiceGroups(state)) {
      if (group.kind === "info") continue;

      const value = state.classChoices[group.id];
      if (!isChoiceComplete(group, value)) {
        return "Завершіть вибір: " + group.title;
      }
    }

    return "";
  }

  if (stepKey === "background") {
    if (!state.backgroundId) return "Оберіть походження.";

    for (const group of getBackgroundChoiceGroups(state)) {
      const value = getChoiceValue(state, group);
      if (!isChoiceComplete(group, value)) {
        return "Завершіть вибір: " + group.title;
      }
    }

    return "";
  }

  if (stepKey === "equipment") {
    for (const group of getEquipmentChoiceGroups(state)) {
      const value = state.equipmentChoices[group.id];
      if (!isChoiceComplete(group, value)) {
        return "Завершіть вибір: " + group.title;
      }
    }

    return "";
  }

  if (stepKey === "magic") {
    const requirements = getMagicRequirements(state);
    if (state.magicChoices.cantrips.length < requirements.cantrips) {
      return "Оберіть потрібну кількість заговорів.";
    }

    if (state.magicChoices.spells.length < requirements.spells) {
      return "Оберіть потрібну кількість заклять.";
    }

    if (
      new Set(state.magicChoices.cantrips).size !== state.magicChoices.cantrips.length ||
      new Set(state.magicChoices.spells).size !== state.magicChoices.spells.length
    ) {
      return "Не можна вибрати одне й те саме закляття двічі.";
    }

    return "";
  }

  if (stepKey === "name") {
    return String(state.name ?? "").trim()
      ? ""
      : "Введіть ім'я персонажа.";
  }

  return "";
}

export function getCreatorSteps(state) {
  const steps = [
    { key: "race", title: "Раса" },
    { key: "stats", title: "Характеристики" },
    { key: "class", title: "Клас" },
    { key: "classChoices", title: "Навички та вибори" },
    { key: "background", title: "Походження" },
    { key: "equipment", title: "Спорядження" }
  ];

  if (getMagicRequirements(state).required) {
    steps.push({ key: "magic", title: "Магія" });
  }

  steps.push({ key: "name", title: "Ім'я" });

  return steps;
}

export function getCurrentStep(state) {
  return getCreatorSteps(state)[state.step] ?? getCreatorSteps(state)[0];
}

export function getChoiceValue(state, group) {
  if (group.kind === "languages") {
    if (group.id.startsWith("language:")) {
      return state.backgroundChoices.languages[group.id] ?? [];
    }

    if (group.id === "humanLanguage" || group.id === "highElfLanguage") {
      return state.raceChoices.languages ?? [];
    }

    if (group.id === "knowledgeLanguages") {
      return state.classChoices.knowledgeLanguages ?? [];
    }
  }

  if (group.kind === "categoryTools") {
    if (group.id.startsWith("tool:")) {
      return state.backgroundChoices.tools[group.id] ?? [];
    }

    if (group.id === "raceTool") {
      return state.raceChoices.tool ? [state.raceChoices.tool] : [];
    }

    if (group.id === "tools") {
      return state.classChoices.tools.tools ?? [];
    }
  }

  if (group.id === "humanAbilityScores" || group.id === "halfElfAbilityScores") {
    return state.raceChoices.abilityScores ?? [];
  }

  if (group.id === "humanSkill" || group.id === "halfElfSkills") {
    return state.raceChoices.skills ?? [];
  }

  if (group.id === "humanFeat") {
    return state.raceChoices.featId ? [state.raceChoices.featId] : [];
  }

  if (group.id === "draconicAncestry") {
    return state.raceChoices.draconicAncestry ? [state.raceChoices.draconicAncestry] : [];
  }

  if (group.id === "highElfCantrip") {
    return state.raceChoices.cantrip ? [state.raceChoices.cantrip] : [];
  }

  return state.classChoices[group.id] ?? state.equipmentChoices[group.id] ?? [];
}

function isChoiceComplete(group, value) {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  if (group.kind === "info") return true;
  if (values.length < Number(group.count ?? 1)) return false;

  if (group.unique && new Set(values).size !== values.length) return false;

  return true;
}

function getSelectedSubclass(state) {
  return getClassData(state)?.subclasses?.[state.subclassId] ?? null;
}

function getAllSkillOptions() {
  return Object.entries(SKILLS)
    .filter(([, skill]) => skill.type === "skill")
    .map(([id, skill]) => ({
      id,
      label: skill.ukr ?? skill.name
    }));
}

function resolveSkillOptions(options) {
  return (options ?? []).map(id => ({
    id,
    label: SKILLS[id]?.ukr ?? id
  }));
}

function getLanguageOptions() {
  return CREATOR_LANGUAGE_OPTIONS.map(([id, label]) => ({
    id: label,
    label
  }));
}

function resolveGenericChoiceOptions(options) {
  if (options === "anyLanguage") return getLanguageOptions();
  if (Array.isArray(options)) {
    return options.flatMap(item => {
      if (CREATOR_TOOL_OPTIONS[item]) return resolveToolCategoryOptions(item);
      if (DRACONIC_ANCESTRY[item]) {
        return [{
          id: item,
          label: DRACONIC_ANCESTRY[item].name
        }];
      }
      return [{
        id: item,
        label: formatToolName(item)
      }];
    });
  }

  return [];
}

function resolveToolCategoryOptions(category) {
  return (CREATOR_TOOL_OPTIONS[category] ?? []).map(([id, label]) => ({
    id,
    label
  }));
}

function formatToolName(id) {
  return Object.values(CREATOR_TOOL_OPTIONS)
    .flat()
    .find(([toolId]) => toolId === id)?.[1] ?? id;
}

function getAllSkillOptionIds() {
  return getAllSkillOptions().map(option => option.id);
}

function getSpellOptionsForClass(classId, level) {
  return getAllSpells()
    .filter(spell =>
      Number(spell.level) === Number(level) &&
      Array.isArray(spell.classes) &&
      spell.classes.includes(classId)
    )
    .map(spell => ({
      id: spell.id,
      label: spell.ukr ?? spell.name,
      description: spell.name
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "uk"));
}

function resolveCatalogLabel(source, itemId) {
  if (source === "weapon") return WEAPONS[itemId]?.ukr ?? WEAPONS[itemId]?.name ?? itemId;
  if (source === "armor") return ARMOR[itemId]?.ukr ?? ARMOR[itemId]?.name ?? itemId;
  if (source === "other") return OTHER_ITEMS[itemId]?.ukr ?? OTHER_ITEMS[itemId]?.name ?? itemId;
  return itemId;
}

function resolveGenericItem(source, itemId) {
  if (source === "weapon" && WEAPONS[itemId]) {
    return {
      source,
      itemId,
      quantity: 1
    };
  }

  if (source === "armor" && ARMOR[itemId]) {
    return {
      source,
      itemId,
      quantity: 1
    };
  }

  if (source === "other" && OTHER_ITEMS[itemId]) {
    return {
      source,
      itemId,
      quantity: 1
    };
  }

  return null;
}

function toCustomItem(itemId, name, type = "other", quantity = 1, description = "") {
  return {
    source: "custom",
    itemId,
    quantity,
    customItem: {
      id: itemId,
      name,
      ukr: name,
      type,
      equipable: type === "armor" || type === "shield" || type === "weapon",
      equipmentSlot: type,
      description
    }
  };
}

function resolveBackgroundEquipmentItem(entry) {
  if (!entry) return null;

  const kind = entry.kind ?? "item";
  const typeMap = {
    weapon: "weapon",
    armor: "armor",
    shield: "shield",
    tool: "tool",
    item: "other",
    creature: "other"
  };

  const preferredSource = typeMap[kind];
  const catalog = resolveGenericItem(preferredSource, entry.id);

  if (catalog) return catalog;

  if (kind === "shield" && ARMOR[entry.id]) {
    return {
      source: "armor",
      itemId: entry.id,
      quantity: Number(entry.quantity ?? 1)
    };
  }

  return toCustomItem(
    entry.id,
    entry.name ?? entry.id,
    kind === "tool" ? "tool" : "other",
    Number(entry.quantity ?? 1)
  );
}

function addInventoryEntry(inventory, entry, token) {
  if (!entry) return;

  inventory.push({
    ...entry,
    instanceId: "creator-" + token + "-" + inventory.length,
    equipped: false,
    quantity: Number(entry.quantity ?? 1)
  });
}

function addChoiceItems(inventory, choice, selectedValue, token) {
  if (!choice) return;

  if (choice.pickFrom) {
    const values = Array.isArray(selectedValue)
      ? selectedValue
      : selectedValue ? [selectedValue] : [];

    for (const itemId of values) {
      addInventoryEntry(
        inventory,
        resolveGenericItem(
          "weapon",
          itemId
        ),
        token + "-" + itemId
      );
    }

    for (const extra of choice.extraItems ?? []) {
      addInventoryEntry(
        inventory,
        resolveGenericItem(extra.source, extra.itemId) ??
        toCustomItem(extra.itemId, extra.itemId),
        token + "-extra-" + extra.itemId
      );
    }

    return;
  }

  const option = (choice.options ?? []).find(item => item.id === selectedValue);
  if (!option) return;

  for (const item of option.items ?? []) {
    addInventoryEntry(
      inventory,
      resolveGenericItem(item.source, item.itemId) ??
      toCustomItem(item.itemId, item.itemId),
      token + "-" + item.itemId
    );
  }

  for (const item of option.extraItems ?? []) {
    addInventoryEntry(
      inventory,
      resolveGenericItem(item.source, item.itemId) ??
      toCustomItem(item.itemId, item.itemId),
      token + "-extra-" + item.itemId
    );
  }
}

function addBackgroundChoiceEquipment(inventory, state, background) {
  for (let index = 0; index < (background?.startingEquipment?.choices ?? []).length; index += 1) {
    const choice = background.startingEquipment.choices[index];
    const groupId = "background:" + index;
    const selected = state.equipmentChoices[groupId];
    const values = Array.isArray(selected) ? selected : selected ? [selected] : [];

    for (const id of values) {
      let custom = null;

      const toolOption = Object.values(CREATOR_TOOL_OPTIONS)
        .flat()
        .find(([toolId]) => toolId === id);

      if (toolOption) {
        const [toolId, label] = toolOption;
        custom = toCustomItem(toolId, label, "tool");
      } else if (SPECIAL_EQUIPMENT_OPTIONS[id]) {
        custom = toCustomItem(
          SPECIAL_EQUIPMENT_OPTIONS[id][0],
          SPECIAL_EQUIPMENT_OPTIONS[id][1]
        );
      } else {
        custom = toCustomItem(id, id);
      }

      addInventoryEntry(inventory, custom, "background-choice-" + index + "-" + id);
    }
  }
}

export function buildCharacterFromCreator(state, id) {
  const race = getRaceData(state);
  const subrace = getSubraceData(state);
  const classData = getClassData(state);
  const background = BACKGROUNDS[state.backgroundId];

  if (!race || !classData || !background) {
    throw new Error("Creator state is incomplete.");
  }

  const stats = { ...state.stats };
  const racialBonuses = getFinalRaceAbilityBonuses(state);

  for (const [stat, value] of Object.entries(racialBonuses)) {
    stats[stat] = Number(stats[stat] ?? 10) + Number(value ?? 0);
  }

  const skills = {};
  const addSkill = (id, proficiency) => {
    if (!id) return;
    skills[id] = Math.max(
      Number(skills[id] ?? PROFICIENCY.NONE),
      Number(proficiency)
    );
  };

  for (const id of race.skillProficiencies ?? []) {
    addSkill(id, PROFICIENCY.PROFICIENT);
  }

  for (const id of state.raceChoices.skills ?? []) {
    addSkill(id, PROFICIENCY.PROFICIENT);
  }

  for (const id of state.classChoices.skills ?? []) {
    addSkill(id, PROFICIENCY.PROFICIENT);
  }

  for (const id of state.backgroundChoices.skills ?? []) {
    addSkill(id, PROFICIENCY.PROFICIENT);
  }

  for (const id of state.classChoices.expertise ?? []) {
    if (id !== "thievesTools") addSkill(id, PROFICIENCY.EXPERTISE);
  }

  for (const id of state.classChoices.knowledgeExpertise ?? []) {
    addSkill(id, PROFICIENCY.EXPERTISE);
  }

  const tools = [];
  const addTool = id => {
    if (id && !tools.includes(id)) tools.push(id);
  };

  for (const id of classData.toolProficiencies ?? []) {
    addTool(id);
  }

  if (classData.toolProficiencies && !Array.isArray(classData.toolProficiencies)) {
    for (const id of state.classChoices.tools.tools ?? []) addTool(id);
  }

  for (const ids of Object.values(state.backgroundChoices.tools ?? {})) {
    for (const id of (Array.isArray(ids) ? ids : [ids])) addTool(id);
  }
  if (state.raceChoices.tool) addTool(state.raceChoices.tool);
  if (state.classChoices.expertise?.includes("thievesTools")) addTool("thievesTools");

  const languages = [...(race.languages ?? [])];
  const pushLanguage = language => {
    if (language && !languages.includes(language)) languages.push(language);
  };

  for (const id of state.raceChoices.languages ?? []) pushLanguage(id);
  for (const id of state.classChoices.knowledgeLanguages ?? []) pushLanguage(id);
  for (const id of Object.values(state.backgroundChoices.languages ?? {}).flat()) pushLanguage(id);

  const raceWeaponProficiencies = [
    ...(race.weaponProficiencies ?? [])
  ];

  if (state.raceId === "elf") {
    if (["highElf", "woodElf"].includes(state.subraceId)) {
      raceWeaponProficiencies.push(
        WEAPONS.longsword,
        WEAPONS.shortsword,
        WEAPONS.shortbow,
        WEAPONS.longbow
      );
    }

    if (state.subraceId === "drow") {
      raceWeaponProficiencies.push(
        WEAPONS.rapier,
        WEAPONS.shortsword,
        WEAPONS.handCrossbow
      );
    }
  }

  const armorProficiencies = [
    ...(classData.armorProficiencies ?? []),
    ...(subrace?.armorProficiencies ?? [])
  ];

  const inventory = [];
  const classEquipment = CREATOR_CLASS_EQUIPMENT[state.classId];

  for (const item of classEquipment?.fixed ?? []) {
    addInventoryEntry(
      inventory,
      item.source === "custom"
        ? item
        : resolveGenericItem(item.source, item.itemId) ?? item,
      "class-fixed-" + item.itemId
    );
  }

  for (const choice of classEquipment?.choices ?? []) {
    const selected = state.equipmentChoices["class:" + choice.id];
    addChoiceItems(
      inventory,
      choice,
      selected,
      "class-choice-" + choice.id
    );
  }

  for (const item of background?.startingEquipment?.fixed ?? []) {
    addInventoryEntry(
      inventory,
      resolveBackgroundEquipmentItem(item),
      "background-fixed-" + item.id
    );
  }

  addBackgroundChoiceEquipment(inventory, state, background);

  let weaponSlots = 0;
  for (const item of inventory) {
    const catalog = item.source === "weapon"
      ? WEAPONS[item.itemId]
      : item.source === "armor"
        ? ARMOR[item.itemId]
        : item.customItem;

    const type = catalog?.category === "shield"
      ? "shield"
      : catalog?.type ?? catalog?.category ?? "";

    if (type === "weapon" && weaponSlots < 2) {
      item.equipped = true;
      weaponSlots += 1;
    } else if (type === "armor" && !inventory.some(existing => existing.equipped && existing.source === "armor")) {
      item.equipped = true;
    } else if (type === "shield" && !inventory.some(existing => existing.equipped && (
      existing.source === "armor" && ARMOR[existing.itemId]?.category === "shield"
    ))) {
      item.equipped = true;
    }
  }

  const maxHpBase = Number(classData.hitDie ?? 0) +
    Math.floor((Number(stats.constitution ?? 10) - 10) / 2);

  const hillDwarfBonus = state.raceId === "dwarf" && state.subraceId === "hillDwarf"
    ? 1
    : 0;

  const maxHp = Math.max(1, maxHpBase + hillDwarfBonus);

  const feats = [];
  if (state.raceChoices.featId && FEATS[state.raceChoices.featId]) {
    feats.push({
      featId: state.raceChoices.featId,
      source: "race",
      level: 1
    });
  }

  const magicRequirements = getMagicRequirements(state);
  const magicEntries = [
    ...(state.magicChoices.cantrips ?? []),
    ...(state.magicChoices.spells ?? [])
  ].map(spellId => ({
    spellId,
    sourceClassId: state.classId,
    sourceClassIds: [state.classId],
    preparedSourceClassIds: [],
    autoKnown: false
  }));

  const firstLevelResourceState = {};
  for (const [resourceId, table] of Object.entries(classData.resourcesByLevel ?? {})) {
    const value = getAtLevel(table, 1);
    if (typeof value !== "number" || value <= 0) continue;
    firstLevelResourceState["classResource_" + state.classId + "_" + resourceId] = value;
  }

  const character = {
    id,
    name: String(state.name ?? "").trim(),
    race: {
      race,
      subrace: subrace ?? null
    },
    classes: [{
      classId: state.classId,
      level: 1,
      subclassId: state.subclassId || null
    }],
    stats,
    maxHp,
    inventory,
    skills,
    feats,
    backgroundId: state.backgroundId,
    backgroundFeatureId: background.feature?.id ?? null,
    racialTraits: [
      ...(getRaceDetails(state).traits ?? []).map(trait => trait[0]),
      ...((getRaceDetails(state).subraces?.[state.subraceId]?.traits ?? []).map(trait => trait[0]))
    ],
    proficiencies: {
      savingThrows: [...(classData.savingThrows ?? [])],
      skills,
      tools,
      languages,
      weaponProficiencies: raceWeaponProficiencies,
      armorProficiencies
    },
    choices: {
      race: state.raceChoices,
      class: {
        subclassId: state.subclassId || null,
        ...state.classChoices
      },
      background: state.backgroundChoices,
      equipment: state.equipmentChoices
    },
    magic: {
      spells: magicEntries,
      favoriteSpellIds: []
    },
    combat: {
      currentHp: maxHp,
      tempHp: 0,
      currentHitDice: 1,
      hitDiceByClass: {
        [state.classId]: 1
      },
      selectedHitDieClassId: state.classId,
      selectedHitDieType: Number(classData.hitDie ?? 0),
      deathSaves: {
        success: 0,
        fail: 0
      },
      inspiration: false,
      concentration: false,
      ...firstLevelResourceState
    }
  };

  return character;
}

export function getSpellOptionsForCreator(state, level) {
  const requirements = getMagicRequirements(state);
  if (!requirements.spellListClassId) return [];
  return getSpellOptionsForClass(requirements.spellListClassId, level);
}

function getChoiceStateTarget(state, group) {
  if (group.id.startsWith("background:")) return state.equipmentChoices[group.id];
  return getChoiceValue(state, group);
}

export { SPELLS };
