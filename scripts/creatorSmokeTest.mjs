import { RACES } from "../src/data/racesData.js";
import { CLASSES } from "../src/data/classesData.js";
import {
  createCreatorState,
  getRaceChoices,
  getSubclassOptions,
  isSubclassRequiredAtLevel1,
  getClassChoiceGroups,
  getBackgroundChoiceGroups,
  getEquipmentChoiceGroups,
  getMagicRequirements,
  getSpellOptionsForCreator,
  validateCreatorState,
  buildCharacterFromCreator
} from "../src/services/characterCreatorService.js";

const ABILITY_ARRAY = [15, 14, 13, 12, 10, 8];
const backgroundIds = [
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

function firstIds(group) {
  const count = Math.max(1, Number(group.count ?? 1));
  return (group.options ?? []).slice(0, count).map(option => option.id);
}

function applyGroup(state, group) {
  const values = firstIds(group);

  if (group.id === "raceTool") {
    state.raceChoices.tool = values[0] ?? "";
    return;
  }

  if (group.id === "humanAbilityScores" || group.id === "halfElfAbilityScores") {
    state.raceChoices.abilityScores = values;
    return;
  }

  if (group.id === "humanSkill" || group.id === "halfElfSkills") {
    state.raceChoices.skills = values;
    return;
  }

  if (group.id === "humanFeat") {
    state.raceChoices.featId = values[0] ?? "";
    return;
  }

  if (group.id === "humanLanguage" || group.id === "highElfLanguage") {
    state.raceChoices.languages = values;
    return;
  }

  if (group.id === "highElfCantrip") {
    state.raceChoices.cantrip = values[0] ?? "";
    return;
  }

  if (group.id === "draconicAncestry") {
    state.raceChoices.draconicAncestry = values[0] ?? "";
    return;
  }

  if (group.id === "skills" || group.id === "expertise" || group.id === "knowledgeExpertise") {
    state.classChoices[group.id] = values;
    return;
  }

  if (group.id === "tools") {
    state.classChoices.tools.tools = values;
    return;
  }

  if (group.id === "knowledgeLanguages") {
    state.classChoices.knowledgeLanguages = values;
    return;
  }

  if (group.id.startsWith("language:")) {
    state.backgroundChoices.languages[group.id] = values;
    return;
  }

  if (group.id.startsWith("tool:")) {
    state.backgroundChoices.tools[group.id] = values;
    return;
  }

  if (group.id.startsWith("class:") || group.id.startsWith("background:")) {
    state.equipmentChoices[group.id] = values.length === 1 ? values[0] : values;
    return;
  }

  state.classChoices[group.id] = values.length === 1 ? values[0] : values;
}

function chooseRace(state, raceId) {
  const race = RACES[raceId];
  if (!race) throw new Error("Unknown race: " + raceId);

  state.raceId = raceId;

  const subraces = Object.values(race.subraces ?? {});
  if (subraces.length) {
    state.subraceId = subraces[0].id;
  }

  if (raceId === "human") {
    state.raceVariant = "standard";
  }

  for (const group of getRaceChoices(state)) {
    applyGroup(state, group);
  }
}

function chooseClass(state, classId) {
  const classData = CLASSES[classId];
  if (!classData) throw new Error("Unknown class: " + classId);

  state.classId = classId;

  if (isSubclassRequiredAtLevel1(state)) {
    const subclass = getSubclassOptions(state)[0];
    if (!subclass) throw new Error("No subclass option for " + classId);
    state.subclassId = subclass.id;
  }

  for (const group of getClassChoiceGroups(state)) {
    if (group.kind !== "info") applyGroup(state, group);
  }
}

function chooseBackground(state, backgroundId) {
  state.backgroundId = backgroundId;

  for (const group of getBackgroundChoiceGroups(state)) {
    applyGroup(state, group);
  }
}

function chooseEquipment(state) {
  for (const group of getEquipmentChoiceGroups(state)) {
    applyGroup(state, {
      ...group,
      // equipment pickFrom groups use actual catalog options and support multi-select.
      count: group.count ?? 1
    });
  }
}

function chooseMagic(state) {
  const requirements = getMagicRequirements(state);

  if (requirements.cantrips > 0) {
    const options = getSpellOptionsForCreator(state, 0);
    state.magicChoices.cantrips = options
      .slice(0, requirements.cantrips)
      .map(option => option.id);
  }

  if (requirements.spells > 0) {
    const options = getSpellOptionsForCreator(state, 1);
    state.magicChoices.spells = options
      .slice(0, requirements.spells)
      .map(option => option.id);
  }
}

let built = 0;

for (const raceId of Object.keys(RACES)) {
  for (const classId of Object.keys(CLASSES)) {
    const state = createCreatorState();

    chooseRace(state, raceId);

    state.stats = Object.fromEntries(
      Object.keys(state.stats).map((key, index) => [key, ABILITY_ARRAY[index]])
    );

    chooseClass(state, classId);

    const recommendedBackgroundId = CLASSES[classId].recommendedBackgroundId;
    chooseBackground(
      state,
      backgroundIds.includes(recommendedBackgroundId)
        ? recommendedBackgroundId
        : backgroundIds[0]
    );

    chooseEquipment(state);
    chooseMagic(state);
    state.name = "Smoke Test " + raceId + " " + classId;

    const validationError = validateCreatorState(state);
    if (validationError) {
      throw new Error(
        raceId + " + " + classId + " failed validation: " + validationError
      );
    }

    const character = buildCharacterFromCreator(state, built + 1);

    if (!character?.name || !character?.race || !character?.classes?.length) {
      throw new Error("Invalid character result for " + raceId + " + " + classId);
    }

    if (Number(character.maxHp) <= 0) {
      throw new Error("Invalid HP for " + raceId + " + " + classId);
    }

    built += 1;
  }
}

console.log("Character Creator smoke test passed:", built, "race/class combinations.");
