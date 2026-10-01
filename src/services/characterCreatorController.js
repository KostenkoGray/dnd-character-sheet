import { generateCharacterId } from "../data/charactersData.js";

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
      state.subclassId = subclassButton.dataset.creatorSubclass ?? "";
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
      const key = statSelect.dataset.creatorStat ?? "";
      state.stats[key] = statSelect.value === ""
        ? null
        : Number(statSelect.value);
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
