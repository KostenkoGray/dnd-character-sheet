import { generateCharacterId } from "../data/charactersData.js";
import {
  CREATOR_STAT_METHODS,
  CREATOR_POINT_BUY_COST,
  CREATOR_POINT_BUY_BUDGET
} from "../data/characterCreatorData.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSelectedValues(select) {
  return Array.from(select?.selectedOptions ?? [])
    .map(option => option.value)
    .filter(Boolean);
}

function syncActiveStats(state) {
  state.stats = {
    ...(state.statsByMethod?.[state.statsMethod] ?? state.stats ?? {})
  };
}

function setStatsMethod(state, method) {
  if (!Object.values(CREATOR_STAT_METHODS).includes(method)) return;

  syncActiveStats(state);
  state.statsMethod = method;
  state.stats = {
    ...(state.statsByMethod?.[method] ?? state.stats ?? {})
  };
}

function updateStandardStat(state, key, value) {
  const stats = state.statsByMethod[CREATOR_STAT_METHODS.STANDARD];
  const nextValue = value === "" ? null : Number(value);

  if (nextValue !== null) {
    for (const otherKey of Object.keys(stats)) {
      if (otherKey !== key && Number(stats[otherKey]) === nextValue) {
        stats[otherKey] = null;
      }
    }
  }

  stats[key] = nextValue;
  syncActiveStats(state);
}

function updatePointBuyStat(state, key, delta) {
  const stats = state.statsByMethod[CREATOR_STAT_METHODS.POINT_BUY];
  const current = Number(stats[key] ?? 8);
  const next = Math.min(15, Math.max(8, current + Number(delta ?? 0)));
  if (next === current) return;
  
  const totalBefore = Object.entries(stats).reduce(
    (sum, [, value]) => sum + Number(CREATOR_POINT_BUY_COST[Number(value)] ?? 0),
    0
  );
  const currentCost = Number(CREATOR_POINT_BUY_COST[current] ?? 0);
  const nextCost = Number(CREATOR_POINT_BUY_COST[next] ?? 0);
  const totalAfter = totalBefore - currentCost + nextCost;

  if (totalAfter > 27) return;

  stats[key] = next;
  syncActiveStats(state);
}

function blankRaceChoices() {
  return {
    abilityScores: [],
    skills: [],
    featId: "",
    languages: [],
    tool: "",
    draconicAncestry: "",
    cantrip: ""
  };
}

function blankClassChoices() {
  return {
    skills: [],
    expertise: [],
    tools: {},
    fightingStyle: "",
    favoredEnemy: "",
    naturalExplorer: "",
    knowledgeExpertise: [],
    knowledgeLanguages: []
  };
}

function blankBackgroundChoices() {
  return {
    languages: {},
    tools: {}
  };
}

function resetBackgroundEquipmentChoices(state) {
  for (const key of Object.keys(state.equipmentChoices ?? {})) {
    if (key.startsWith("background:")) {
      delete state.equipmentChoices[key];
    }
  }
}

function resetClassEquipmentChoices(state) {
  for (const key of Object.keys(state.equipmentChoices ?? {})) {
    if (key.startsWith("class:")) {
      delete state.equipmentChoices[key];
    }
  }
}

function setCreatorChoiceValue(state, groupId, values, group) {
  const list = Array.isArray(values) ? values : values ? [values] : [];

  if (groupId === "raceTool") {
    state.raceChoices.tool = list[0] ?? "";
    return;
  }

  if (groupId === "humanAbilityScores" || groupId === "halfElfAbilityScores") {
    state.raceChoices.abilityScores = list;
    return;
  }

  if (groupId === "humanSkill" || groupId === "halfElfSkills") {
    state.raceChoices.skills = list;
    return;
  }

  if (groupId === "humanFeat") {
    state.raceChoices.featId = list[0] ?? "";
    return;
  }

  if (
    groupId === "humanLanguage" ||
    groupId === "highElfLanguage" ||
    groupId === "halfElfLanguage"
  ) {
    state.raceChoices.languages = list;
    return;
  }

  if (groupId === "draconicAncestry") {
    state.raceChoices.draconicAncestry = list[0] ?? "";
    return;
  }

  if (groupId === "highElfCantrip") {
    state.raceChoices.cantrip = list[0] ?? "";
    return;
  }

  if (groupId.startsWith("language:")) {
    state.backgroundChoices.languages[groupId] = list;
    return;
  }

  if (groupId.startsWith("tool:")) {
    state.backgroundChoices.tools[groupId] = list;
    return;
  }

  if (groupId === "knowledgeLanguages") {
    state.classChoices.knowledgeLanguages = list;
    return;
  }

  if (groupId === "tools") {
    state.classChoices.tools.tools = list;
    return;
  }

  if (groupId === "skills" || groupId === "expertise" || groupId === "knowledgeExpertise") {
    state.classChoices[groupId] = list;
    return;
  }

  if (group?.kind === "single" || group?.kind === "feat") {
    state.classChoices[groupId] = list[0] ?? "";
    return;
  }

  state.classChoices[groupId] = list.length === 1 && Number(group?.count ?? 1) === 1
    ? list[0]
    : list;
}

function renderError(app, error) {
  const message = error?.message
    ? String(error.message)
    : "Не вдалося відкрити створення персонажа.";

  app.innerHTML =
    '<div class="app character-creator-app">' +
      '<main class="character-creator">' +
        '<div class="creator-error">' +
          '<strong>Не вдалося відкрити Creator</strong>' +
          '<p>' + escapeHtml(message) + '</p>' +
        '</div>' +
      '</main>' +
    '</div>';
}

export async function startCharacterCreator({ app, onCancel, onCreate, onError }) {
  if (!app) {
    throw new Error("Character Creator: app root not found.");
  }

  let creatorScreen;
  let creatorService;

  try {
    const [screenModule, serviceModule] = await Promise.all([
      import("../screens/characterCreatorScreen.js"),
      import("./characterCreatorService.js")
    ]);

    creatorScreen = screenModule.characterCreatorScreen;
    creatorService = serviceModule;
  } catch (error) {
    console.error("Character Creator import failed:", error);
    if (onError) {
      onError(error);
    } else {
      renderError(app, error);
    }
    return null;
  }

  const {
    createCreatorState,
    validateCreatorStep,
    getCreatorSteps,
    buildCharacterFromCreator
  } = creatorService;

  const state = createCreatorState();
  let active = true;

  const cleanup = () => {
    if (!active) return;
    active = false;
    app.removeEventListener("click", handleClick);
    app.removeEventListener("change", handleChange);
    app.removeEventListener("input", handleInput);
    document.removeEventListener("keydown", handleKeydown);
  };

  const safeRender = () => {
    if (!active) return;

    try {
      const steps = getCreatorSteps(state);
      if (!steps.length) {
        state.step = 0;
      } else {
        state.step = Math.min(
          Math.max(Number(state.step ?? 0), 0),
          steps.length - 1
        );
      }

      app.innerHTML = creatorScreen(state);
    } catch (error) {
      console.error("Character Creator render failed:", error);
      cleanup();
      if (onError) {
        onError(error);
      } else {
        renderError(app, error);
      }
    }
  };

  const cancel = () => {
    if (!active) return;
    cleanup();
    onCancel?.();
  };

  const validateAllSteps = () => {
    const steps = getCreatorSteps(state);

    for (let index = 0; index < steps.length; index += 1) {
      const error = validateCreatorStep(state, steps[index].key);
      if (error) {
        state.step = index;
        state.error = error;
        return false;
      }
    }

    state.error = "";
    return true;
  };

  function handleClick(event) {
    if (!active) return;

    const actionButton = event.target.closest("[data-creator-action]");
    if (actionButton) {
      const action = actionButton.dataset.creatorAction;

      if (action === "cancel") {
        cancel();
        return;
      }

      if (action === "back") {
        state.error = "";
        state.step = Math.max(0, Number(state.step ?? 0) - 1);
        safeRender();
        return;
      }

      if (action === "next") {
        const steps = getCreatorSteps(state);
        const currentStep = steps[state.step];

        if (!currentStep) {
          state.step = 0;
          safeRender();
          return;
        }

        const error = validateCreatorStep(state, currentStep.key);
        if (error) {
          state.error = error;
          safeRender();
          return;
        }

        state.error = "";
        state.step = Math.min(
          Number(state.step ?? 0) + 1,
          steps.length - 1
        );
        safeRender();
        return;
      }

      if (action === "create") {
        if (!validateAllSteps()) {
          safeRender();
          return;
        }

        try {
          const id = generateCharacterId();

          const character = buildCharacterFromCreator(state, id);
          cleanup();
          onCreate?.(character);
        } catch (error) {
          console.error("Character Creator build failed:", error);
          state.error = error?.message || "Не вдалося створити персонажа.";
          safeRender();
        }

        return;
      }
    }

    const statMethodButton = event.target.closest("[data-creator-stat-method]");
    if (statMethodButton) {
      setStatsMethod(
        state,
        statMethodButton.dataset.creatorStatMethod ?? CREATOR_STAT_METHODS.STANDARD
      );
      state.error = "";
      safeRender();
      return;
    }

    const pointBuyButton = event.target.closest("[data-creator-pointbuy]");
    if (pointBuyButton) {
      if (state.statsMethod !== CREATOR_STAT_METHODS.POINT_BUY) {
        setStatsMethod(state, CREATOR_STAT_METHODS.POINT_BUY);
      }
      updatePointBuyStat(
        state,
        pointBuyButton.dataset.creatorPointbuy ?? "",
        Number(pointBuyButton.dataset.creatorPointbuyDelta ?? 0)
      );
      state.error = "";
      safeRender();
      return;
    }

    const skillRow = event.target.closest("[data-creator-skill-choice-row]");
    if (skillRow) {
      const skillChoice = skillRow.querySelector("[data-creator-skill-choice]");
      if (!skillChoice) return;

      const group = creatorService.getClassChoiceGroups?.(state)?.find(item => item.id === "skills");
      const max = Number(group?.count ?? 0);
      const selected = new Set(state.classChoices.skills ?? []);

      if (skillChoice.checked && selected.size >= max && !selected.has(skillChoice.value)) {
        state.error = "Можна вибрати не більше " + max + " навичок.";
        safeRender();
        return;
      }

      if (skillChoice.checked) {
        selected.add(skillChoice.value);
      } else {
        selected.delete(skillChoice.value);
      }

      state.classChoices.skills = [...selected];
      state.classChoices.expertise =
        (state.classChoices.expertise ?? []).filter(id => selected.has(id));
      state.error = "";
      safeRender();
      return;
    }

    const expertiseRow = event.target.closest("[data-creator-expertise-choice-row]");
    if (expertiseRow) {
      const expertiseChoice = expertiseRow.querySelector("[data-creator-expertise-choice]");
      if (!expertiseChoice) return;

      const group = creatorService.getClassChoiceGroups?.(state)?.find(item => item.id === "expertise");
      const max = Number(group?.count ?? 0);
      const selected = new Set(state.classChoices.expertise ?? []);

      if (expertiseChoice.checked && (max <= 0 || selected.size >= max) && !selected.has(expertiseChoice.value)) {
        state.error = "Можна вибрати не більше " + max + " експертностей.";
        safeRender();
        return;
      }

      if (expertiseChoice.checked) {
        selected.add(expertiseChoice.value);
      } else {
        selected.delete(expertiseChoice.value);
      }

      state.classChoices.expertise = [...selected];
      state.error = "";
      safeRender();
      return;
    }
    const raceButton = event.target.closest("[data-creator-race]");
    if (raceButton) {
      const raceId = raceButton.dataset.creatorRace ?? "";
      if (raceId !== state.raceId) {
        state.raceId = raceId;
        state.subraceId = "";
        state.raceVariant = "";
        state.raceChoices = blankRaceChoices();
        state.error = "";
      }
      safeRender();
      return;
    }

    const subraceButton = event.target.closest("[data-creator-subrace]");
    if (subraceButton) {
      const nextSubrace = subraceButton.dataset.creatorSubrace ?? "";
      const previousSubrace = state.subraceId;

      state.subraceId = nextSubrace;
      state.raceChoices.cantrip = "";

      if (previousSubrace === "highElf" || nextSubrace !== "highElf") {
        state.raceChoices.languages = [];
      }

      state.error = "";
      safeRender();
      return;
    }

    const variantButton = event.target.closest("[data-creator-race-variant]");
    if (variantButton) {
      const variant = variantButton.dataset.creatorRaceVariant ?? "";
      if (state.raceVariant !== variant) {
        state.raceVariant = variant;
        state.raceChoices.abilityScores = [];
        state.raceChoices.skills = [];
        state.raceChoices.featId = "";
        state.raceChoices.languages = [];
      }
      state.error = "";
      safeRender();
      return;
    }

    const classButton = event.target.closest("[data-creator-class]");
    if (classButton) {
      const classId = classButton.dataset.creatorClass ?? "";
      if (classId !== state.classId) {
        state.classId = classId;
        state.subclassId = "";
        state.classChoices = blankClassChoices();
        resetClassEquipmentChoices(state);
        state.magicChoices = {
          cantrips: [],
          spells: []
        };
      }
      state.error = "";
      safeRender();
      return;
    }

    const subclassButton = event.target.closest("[data-creator-subclass]");
    if (subclassButton) {
      const nextSubclass = subclassButton.dataset.creatorSubclass ?? "";

      state.subclassId = nextSubclass;
      state.classChoices.knowledgeExpertise = [];
      state.classChoices.knowledgeLanguages = [];
      state.classChoices.natureCantrip = "";
      state.classChoices.dragonAncestor = "";
      state.error = "";
      safeRender();
      return;
    }

    const backgroundButton = event.target.closest("[data-creator-background]");
    if (backgroundButton) {
      const backgroundId = backgroundButton.dataset.creatorBackground ?? "";
      if (backgroundId !== state.backgroundId) {
        state.backgroundId = backgroundId;
        state.backgroundChoices = blankBackgroundChoices();
        resetBackgroundEquipmentChoices(state);
      }
      state.error = "";
      safeRender();
      return;
    }

    const equipmentButton = event.target.closest("[data-creator-equipment-choice]");
    if (equipmentButton) {
      const input = equipmentButton.querySelector('input[type="radio"]');
      const value = input?.value ?? "";

      if (value) {
        state.equipmentChoices[equipmentButton.dataset.creatorEquipmentChoice] = value;
        state.error = "";
        safeRender();
      }

      return;
    }
  }

  function handleChange(event) {
    if (!active) return;

    const statSelect = event.target.closest("[data-creator-stat]");
    if (statSelect) {
      if (state.statsMethod !== CREATOR_STAT_METHODS.STANDARD) {
        setStatsMethod(state, CREATOR_STAT_METHODS.STANDARD);
      }
      updateStandardStat(
        state,
        statSelect.dataset.creatorStat ?? "",
        statSelect.value
      );
      state.error = "";
      safeRender();
      return;
    }

    const manualStat = event.target.closest("[data-creator-manual-stat]");
    if (manualStat) {
      if (state.statsMethod !== CREATOR_STAT_METHODS.MANUAL) {
        setStatsMethod(state, CREATOR_STAT_METHODS.MANUAL);
      }
      const key = manualStat.dataset.creatorManualStat ?? "";
      const value = manualStat.value.trim();
      state.statsByMethod[CREATOR_STAT_METHODS.MANUAL][key] =
        value === "" ? null : Number(value);
      syncActiveStats(state);
      state.error = "";
      safeRender();
      return;
    }

    const equipmentMode = event.target.closest("[data-creator-equipment-mode]");
    if (equipmentMode) {
      state.equipmentMode = equipmentMode.value;
      if (state.equipmentMode !== "gold") {
        state.startingGoldGp = null;
      }
      state.error = "";
      safeRender();
      return;
    }

    const choiceSelect = event.target.closest("[data-creator-choice-select]");
    if (choiceSelect) {
      const groupId = choiceSelect.dataset.creatorChoiceSelect ?? "";
      const currentStep = getCreatorSteps(state)[state.step];
      const groups =
        currentStep?.key === "race"
          ? creatorService.getRaceChoices?.(state) ?? []
          : currentStep?.key === "classChoices"
            ? creatorService.getClassChoiceGroups?.(state) ?? []
            : currentStep?.key === "background"
              ? creatorService.getBackgroundChoiceGroups?.(state) ?? []
              : [];

      const group =
        groups.find(item => item.id === groupId) ??
        {
          id: groupId,
          kind: choiceSelect.dataset.creatorChoiceKind ?? "",
          count: Number(choiceSelect.dataset.creatorChoiceCount ?? 1)
        };

      const values = getSelectedValues(choiceSelect);
      setCreatorChoiceValue(state, groupId, values, group);
      state.error = "";
      safeRender();
      return;
    }

    const equipmentMulti = event.target.closest("[data-creator-equipment-multi]");
    if (equipmentMulti) {
      state.equipmentChoices[equipmentMulti.dataset.creatorEquipmentMulti] =
        getSelectedValues(equipmentMulti);
      state.error = "";
      safeRender();
      return;
    }

    const magicSelect = event.target.closest("[data-creator-magic]");
    if (magicSelect) {
      state.magicChoices[magicSelect.dataset.creatorMagic] =
        getSelectedValues(magicSelect);
      state.error = "";
      safeRender();
    }
  }

  function handleInput(event) {
    if (!active) return;

    const nameInput = event.target.closest("[data-creator-name]");
    if (nameInput) {
      state.name = nameInput.value;
      state.error = "";
      return;
    }

    const startingGold = event.target.closest("[data-creator-starting-gold]");
    if (startingGold) {
      const value = startingGold.value.trim();
      state.startingGoldGp = value === "" ? null : Number(value);
      state.error = "";
    }
  }

  function handleKeydown(event) {
    if (!active) return;
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  }

  app.addEventListener("click", handleClick);
  app.addEventListener("change", handleChange);
  app.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeydown);

  safeRender();

  return {
    state,
    cleanup
  };
}
