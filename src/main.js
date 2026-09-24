import "./style.css";
import eruda from "eruda";
eruda.init();

window.onerror = (message, source, line, column, error) => {
  alert(message);
  console.error(error);
};

import {
  getCharacters,
  getCharacterById
} from "./data/charactersData.js";

import { charactersScreen } from "./screens/characterListScreen.js";
import { characterSheetScreen } from "./screens/characterSheetScreen.js";
import { combatScreen } from "./screens/combatScreen.js";
import { saveCharacters, loadSettings, saveSettings } from "./services/storageService.js";
import { DEFAULT_SETTINGS, ACTION_PREFERENCE_VALUES } from "./data/settingsData.js";
import { bottomNavigation } from "./components/bottomNavigation.js";
import {
  REST_TYPES,
  HP_LEVEL_UP_METHODS,
  LONG_REST_HIT_DICE_RECOVERY
} from "./data/rulesData.js";
import {
  getNextCharacterLevel,
  calculateRecommendedHpIncrease,
  getLevelUpOptions,
  applyLevelUp
} from "./services/levelUpService.js";

const app = document.querySelector("#app");

let currentCharacter = null;
let currentScreen = "list";

const settings = loadSettings(DEFAULT_SETTINGS);

function getActionPreference(key) {
  return settings.actionPreferences?.[key] ?? null;
}

function setActionPreference(key, value) {
  settings.actionPreferences ??= {};
  settings.actionPreferences[key] = value;
  saveSettings(settings);
}

function navigationForCurrentScreen() {
  return bottomNavigation(currentScreen);
}

function openCampMenu() {
  const existing = document.querySelector(".camp-fab-menu");
  if (existing) {
    closeCampMenu();
    return;
  }

  const menu = document.createElement("div");
  menu.className = "camp-fab-menu open";
  menu.innerHTML = `
    <button type="button" class="camp-action camp-action-short-rest" data-camp-action="short-rest" aria-label="Short Rest">
      <span>☀️</span><strong>Short Rest</strong>
    </button>
    <button type="button" class="camp-action camp-action-long-rest" data-camp-action="long-rest" aria-label="Long Rest">
      <span>🌙</span><strong>Long Rest</strong>
    </button>
    <button type="button" class="camp-action camp-action-level-up" data-camp-action="level-up" aria-label="Level Up">
      <span>⬆️</span><strong>Level Up</strong>
    </button>
  `;

  document.body.appendChild(menu);

  menu.querySelectorAll('[data-camp-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.campAction;
      closeCampMenu();

      if (!currentCharacter) return;

      if (action === 'short-rest') {
        showShortRest(currentCharacter);
      } else if (action === 'long-rest') {
        showLongRest(currentCharacter);
      } else if (action === 'level-up') {
        startLevelUp(currentCharacter);
      }
    });
  });
}

function closeCampMenu() {
  const menu = document.querySelector(".camp-fab-menu");
  if (!menu) return;
  menu.classList.remove("open");
  setTimeout(() => menu.remove(), 180);
}

function closeCampDialog() {
  document.querySelector(".camp-dialog-backdrop")?.remove();
}

function showCampDialog({ title, body, confirmLabel = "OK", onConfirm }) {
  closeCampDialog();

  const backdrop = document.createElement("div");
  backdrop.className = "camp-dialog-backdrop";
  backdrop.innerHTML = `
    <section class="camp-dialog" role="dialog" aria-modal="true" aria-label="${title}">
      <h2>${title}</h2>
      <div class="camp-dialog-body">${body}</div>
      <div class="camp-dialog-actions">
        <button type="button" class="camp-dialog-button" data-camp-dialog="cancel">Скасувати</button>
        <button type="button" class="camp-dialog-button primary" data-camp-dialog="confirm">${confirmLabel}</button>
      </div>
    </section>
  `;

  document.body.appendChild(backdrop);
  const confirm = backdrop.querySelector('[data-camp-dialog="confirm"]');
  confirm?.addEventListener("click", () => {
    onConfirm?.();
    closeCampDialog();
  });
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeCampDialog();
    if (event.target.closest('[data-camp-dialog="cancel"]')) closeCampDialog();
  });
}

function getPrimaryHitDie(character) {
  const primaryClass = (character.classes ?? [])
    .slice()
    .sort((a, b) => Number(b.level ?? 0) - Number(a.level ?? 0))[0];

  return Number(primaryClass ? (CLASSES[primaryClass.classId]?.hitDie ?? 0) : 0);
}

function getShortRestRecommendedHealing(character) {
  const hitDie = getPrimaryHitDie(character);
  return hitDie ? Math.floor(hitDie / 2) + 1 : 0;
}

function applyShortRestHealing(character, mode, amount) {
  ensureCombatState(character);

  const maxHp = Number(character.maxHp ?? 0);
  const currentHp = Number(character.combat.currentHp ?? maxHp);
  const currentHitDice = Number(character.combat.currentHitDice ?? 0);

  if (currentHitDice <= 0 || currentHp >= maxHp) {
    return {
      healed: 0,
      hitDiceSpent: 0,
      currentHp,
      currentHitDice
    };
  }

  const maximumHealing = Math.max(0, maxHp - currentHp);
  let healing = 0;

  if (mode === ACTION_PREFERENCE_VALUES.AVERAGE) {
    healing = getShortRestRecommendedHealing(character);
  }

  if (mode === ACTION_PREFERENCE_VALUES.MANUAL) {
    healing = Math.max(0, Math.floor(Number(amount ?? 0)));
  }

  healing = Math.min(healing, maximumHealing);

  if (healing <= 0) {
    return {
      healed: 0,
      hitDiceSpent: 0,
      currentHp,
      currentHitDice
    };
  }

  character.combat.currentHp = Math.min(maxHp, currentHp + healing);
  character.combat.currentHitDice = Math.max(0, currentHitDice - 1);

  return {
    healed: healing,
    hitDiceSpent: 1,
    currentHp: character.combat.currentHp,
    currentHitDice: character.combat.currentHitDice
  };
}

function performShortRest(character, mode, amount) {
  return applyShortRestHealing(character, mode, amount);
}

function performLongRest(character) {
  ensureCombatState(character);

  const totalHitDice = getHitDiceTotal(character);
  const currentHitDice = Number(character.combat.currentHitDice ?? totalHitDice);
  const recoveredHitDice = Math.max(
    LONG_REST_HIT_DICE_RECOVERY.MINIMUM,
    Math.floor(totalHitDice * LONG_REST_HIT_DICE_RECOVERY.FRACTION)
  );

  character.combat.currentHp = Number(character.maxHp ?? 0);
  character.combat.tempHp = 0;
  character.combat.currentHitDice = clamp(
    currentHitDice + recoveredHitDice,
    0,
    totalHitDice
  );
  character.combat.deathSaves = { success: 0, fail: 0 };
  character.combat.inspiration = false;

  return {
    type: REST_TYPES.LONG,
    recoveredHitDice,
    currentHitDice: character.combat.currentHitDice
  };
}

function showShortRest(character) {
  closeCampMenu();
  ensureCombatState(character);

  const preferenceKey = "shortRestHealing";
  const savedMode = getActionPreference(preferenceKey);

  if (!savedMode) {
    showCampDialog({
      title: "Short Rest",
      body: `
        <p>Оберіть спосіб відновлення HP. Вибір буде автоматично збережено для наступних Short Rest.</p>
        <div class="rest-summary">
          <button type="button" class="camp-dialog-button short-rest-method" data-rest-method="average">
            Середнє значення Hit Die (+${getShortRestRecommendedHealing(character)})
          </button>
          <button type="button" class="camp-dialog-button short-rest-method" data-rest-method="manual">
            Ручне введення
          </button>
          <button type="button" class="camp-dialog-button" disabled>
            🎲 Кидок кубика — Скоро
          </button>
        </div>
      `,
      confirmLabel: "Скасувати"
    });
    bindShortRestMethodChoice(character);
    return;
  }

  renderShortRestAction(character, savedMode);
}

function renderShortRestAction(character, mode) {
  ensureCombatState(character);

  const availableHitDice = Number(character.combat.currentHitDice ?? 0);
  const currentHp = Number(character.combat.currentHp ?? 0);
  const maxHp = Number(character.maxHp ?? 0);

  if (availableHitDice <= 0) {
    showCampDialog({
      title: "Short Rest",
      body: `
        <p>Немає доступних Hit Dice для лікування.</p>
        <div class="rest-summary">
          <div class="rest-row"><span>HP</span><strong>${currentHp}/${maxHp}</strong></div>
          <div class="rest-row"><span>Hit Dice</span><strong>0</strong></div>
        </div>
      `,
      confirmLabel: "Закрити"
    });
    return;
  }

  if (currentHp >= maxHp) {
    showCampDialog({
      title: "Short Rest",
      body: `
        <p>HP вже повністю відновлено.</p>
        <div class="rest-summary">
          <div class="rest-row"><span>HP</span><strong>${currentHp}/${maxHp}</strong></div>
          <div class="rest-row"><span>Hit Dice</span><strong>${availableHitDice}</strong></div>
        </div>
      `,
      confirmLabel: "Закрити"
    });
    return;
  }

  const automaticHealing = mode === ACTION_PREFERENCE_VALUES.AVERAGE
    ? getShortRestRecommendedHealing(character)
    : null;

  showCampDialog({
    title: "Short Rest",
    body: `
      <p>Режим: <strong>${mode === ACTION_PREFERENCE_VALUES.AVERAGE ? "Середнє значення" : "Ручне введення"}</strong>.</p>
      <div class="rest-summary">
        <div class="rest-row"><span>HP</span><strong>${currentHp}/${maxHp}</strong></div>
        <div class="rest-row"><span>Hit Dice</span><strong>${availableHitDice}</strong></div>
        <div class="rest-row"><span>Лікування за 1 Hit Die</span><strong>${mode === ACTION_PREFERENCE_VALUES.AVERAGE ? "+" + automaticHealing : "ввести"}</strong></div>
      </div>
      <div class="rest-summary">
        <button type="button" class="camp-dialog-button" id="short-rest-change-method">Змінити спосіб</button>
      </div>
    `,
    confirmLabel: mode === ACTION_PREFERENCE_VALUES.MANUAL ? "Ввести лікування" : "Використати 1 Hit Die",
    onConfirm: () => {
      if (mode === ACTION_PREFERENCE_VALUES.MANUAL) {
        showShortRestManualAmountDialog(character);
        return;
      }

      finishShortRest(character, mode);
    }
  });

  bindShortRestChangeMethod(character);
}

function showShortRestManualAmountDialog(character) {
  ensureCombatState(character);

  const suggested = getShortRestRecommendedHealing(character);

  showCampDialog({
    title: "Short Rest — ручне лікування",
    body: `
      <p>Вкажіть кількість HP, яку відновлюємо за 1 Hit Die.</p>
      <div class="rest-summary">
        <div class="rest-row"><span>Поточне HP</span><strong>${character.combat.currentHp}/${character.maxHp}</strong></div>
        <div class="rest-row"><span>Доступні Hit Dice</span><strong>${character.combat.currentHitDice}</strong></div>
        <label class="rest-row" style="gap:12px;align-items:center">
          <span>Лікування</span>
          <input id="short-rest-healing-input" type="number" min="0" step="1" value="${suggested}" inputmode="numeric" style="max-width:110px;text-align:center">
        </label>
      </div>
    `,
    confirmLabel: "Відновити HP",
    onConfirm: () => {
      const input = document.querySelector("#short-rest-healing-input");
      const value = Number(input?.value);

      if (!Number.isFinite(value) || value < 0) {
        showCampDialog({
          title: "Short Rest",
          body: "<p>Вкажіть коректну невід'ємну кількість HP.</p>",
          confirmLabel: "Закрити"
        });
        return;
      }

      finishShortRest(character, ACTION_PREFERENCE_VALUES.MANUAL, value);
    }
  });
}

function finishShortRest(character, mode, amount) {
  const result = performShortRest(character, mode, amount);

  persistCharacters();
  render();

  showCampDialog({
    title: "Short Rest завершено",
    body: `
      <div class="rest-summary">
        <div class="rest-row"><span>Відновлено HP</span><strong>+${result.healed}</strong></div>
        <div class="rest-row"><span>HP</span><strong>${result.currentHp}/${character.maxHp}</strong></div>
        <div class="rest-row"><span>Hit Dice</span><strong>${result.currentHitDice}</strong></div>
      </div>
    `,
    confirmLabel: "Готово"
  });
}

function showShortRestChoice(character) {
  showCampDialog({
    title: "Спосіб Short Rest",
    body: `
      <p>Новий вибір буде автоматично збережено.</p>
      <div class="rest-summary">
        <button type="button" class="camp-dialog-button short-rest-method" data-rest-method="average">Середнє значення Hit Die</button>
        <button type="button" class="camp-dialog-button short-rest-method" data-rest-method="manual">Ручне введення</button>
        <button type="button" class="camp-dialog-button" disabled>🎲 Кидок кубика — Скоро</button>
      </div>
    `,
    confirmLabel: "Скасувати"
  });

  bindShortRestMethodChoice(character);
}

function bindShortRestMethodChoice(character) {
  const backdrop = document.querySelector(".camp-dialog-backdrop");
  backdrop?.addEventListener("click", event => {
    const methodButton = event.target.closest("[data-rest-method]");
    if (!methodButton) return;

    const mode = methodButton.dataset.restMethod;
    setActionPreference("shortRestHealing", mode);
    closeCampDialog();
    setTimeout(() => showShortRest(character), 0);
  });
}

function bindShortRestChangeMethod(character) {
  const backdrop = document.querySelector(".camp-dialog-backdrop");
  backdrop?.addEventListener("click", event => {
    if (!event.target.closest("#short-rest-change-method")) return;
    closeCampDialog();
    setTimeout(() => showShortRestChoice(character), 0);
  });
}

function showLongRest(character) {
  closeCampMenu();

  showCampDialog({
    title: "Long Rest",
    body: `
      <p>Відновити HP та частину витрачених Hit Dice.</p>
    `,
    confirmLabel: "Відпочити",
    onConfirm: () => {
      performLongRest(character);
      persistCharacters();
      render();
    }
  });
}

function startLevelUp(character) {
  closeCampMenu();

  const classes = character.classes ?? [];
  const currentClassId = classes.length === 1 ? classes[0].classId : "";
  const options = Object.values(CLASSES).map(cls =>
    `<option value="${cls.id}" ${cls.id === currentClassId ? "selected" : ""}>${cls.ukr}</option>`
  ).join("");

  showCampDialog({
    title: `Level Up → рівень ${getNextCharacterLevel(character)}`,
    body: `
      <label>Клас
        <select id="level-up-class" style="width:100%;margin-top:6px;padding:10px;border-radius:10px;background:var(--surface-light);color:var(--text);border:1px solid var(--border)">
          ${options}
        </select>
      </label>
      <div id="level-up-details" class="rest-summary"></div>
    `,
    confirmLabel: "Далі",
    onConfirm: () => {
      const selected = document.querySelector("#level-up-class")?.value;
      if (selected) chooseHpMethod(character, selected);
    }
  });

  updateLevelUpDetails(character, currentClassId || Object.values(CLASSES)[0]?.id);
}

function updateLevelUpDetails(character, classId) {
  const details = document.querySelector("#level-up-details");
  if (!details || !classId) return;

  const result = getLevelUpOptions(character, classId);
  details.innerHTML = `
    <div class="rest-row"><span>Новий рівень класу</span><strong>${result.nextLevel}</strong></div>
    <div class="rest-row"><span>Нові можливості</span><strong>${result.features.length}</strong></div>
    <div class="rest-row"><span>ASI / Feat</span><strong>${result.abilityScoreImprovement ? "Так" : "Ні"}</strong></div>
  `;

  const select = document.querySelector("#level-up-class");
  if (select && !select.dataset.bound) {
    select.dataset.bound = "1";
    select.addEventListener("change", event => updateLevelUpDetails(character, event.target.value));
  }
}

function chooseHpMethod(character, classId) {
  const result = getLevelUpOptions(character, classId);
  const recommended = calculateRecommendedHpIncrease(character, classId);

  character.levelUp ??= {};
  const savedMethod = character.levelUp.hpIncreaseMethod ?? HP_LEVEL_UP_METHODS.AVERAGE;

  showCampDialog({
    title: "Збільшення HP",
    body: `
      <p>Оберіть метод, який використовуватиметься для підвищення HP.</p>
      <div class="rest-summary">
        <label class="rest-row"><span>Рекомендоване середнє (+${recommended})</span><input type="radio" name="hp-method" value="average" ${savedMethod === "average" ? "checked" : ""}></label>
        <label class="rest-row"><span>Кидок кубика (пізніше)</span><input type="radio" name="hp-method" value="roll" ${savedMethod === "roll" ? "checked" : ""}></label>
        <label class="rest-row"><span>Ввести вручну</span><input type="radio" name="hp-method" value="manual" ${savedMethod === "manual" ? "checked" : ""}></label>
      </div>
      <div class="rest-row"><span>Hit Die</span><strong>d${CLASSES[classId].hitDie}</strong></div>
    `,
    confirmLabel: "Застосувати",
    onConfirm: () => {
      const method = document.querySelector('input[name="hp-method"]:checked')?.value ?? HP_LEVEL_UP_METHODS.AVERAGE;
      character.levelUp.hpIncreaseMethod = method;
      character.levelUp.hpIncreaseMethodLocked = true;

      let hpIncrease = recommended;
      if (method === HP_LEVEL_UP_METHODS.MANUAL) {
        const value = Number(prompt("Введіть приріст HP", String(recommended)));
        if (Number.isFinite(value) && value >= 0) hpIncrease = Math.floor(value);
      }

      finishLevelUp(character, classId, hpIncrease);
    }
  });
}

function finishLevelUp(character, classId, hpIncrease) {
  const beforeLevel = getNextCharacterLevel(character) - 1;
  const preview = applyLevelUp(character, classId, hpIncrease);

  character.levelUp ??= {};
  character.levelUp.lastLevelUp = {
    classId,
    level: preview.nextLevel,
    hpIncrease,
    date: new Date().toISOString()
  };

  const featureNames = preview.features.map(feature => feature.data?.ukr ?? feature.id);
  const lines = [
    `Рівень ${beforeLevel} → ${preview.nextLevel}`,
    `Макс. HP: ${Number(character.maxHp) - hpIncrease} → ${character.maxHp}`,
    hpIncrease ? `HP +${hpIncrease}` : "HP без змін",
    featureNames.length ? `Нові можливості: ${featureNames.join(", ")}` : "Нових можливостей за даними класу не знайдено.",
    preview.abilityScoreImprovement ? "Доступний ASI / Feat." : "ASI / Feat на цьому рівні немає."
  ];

  persistCharacters();
  render();

  setTimeout(() => {
    showCampDialog({
      title: "Рівень підвищено",
      body: `<div class="rest-summary">${lines.map(line => `<div class="rest-row"><span>${line}</span></div>`).join("")}</div>`,
      confirmLabel: "Готово"
    });
  }, 0);
}

function resetDeathSavesWhenAlive(character) {
  if (!character?.combat) return;

  if (Number(character.combat.currentHp) > 0) {
    character.combat.deathSaves ??= { success: 0, fail: 0 };
    character.combat.deathSaves.success = 0;
    character.combat.deathSaves.fail = 0;
  }
}

function persistCharacters() {
  saveCharacters(getCharacters());
}

function render() {
  persistCharacters();
  switch (currentScreen) {
    case "list":
      app.innerHTML = charactersScreen(getCharacters());
      break;

    case "sheet":
      app.innerHTML = characterSheetScreen(currentCharacter);
      break;

    case "combat":
      app.innerHTML = combatScreen(currentCharacter);
      break;

    case "inventory":
    case "magic":
    case "dice":
    case "notes":
      app.innerHTML = `
        <div class="app">
          <main>
            <h1>${currentScreen}</h1>
            <p>Екран ще в розробці.</p>
          </main>
          ${navigationForCurrentScreen()}
        </div>
      `;
      break;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function ensureCombatState(character) {
  if (!character.combat) {
    character.combat = {
      currentHp: character.maxHp ?? 0,
      tempHp: 0,
      currentHitDice: getHitDiceTotal(character),
      deathSaves: { success: 0, fail: 0 },
      inspiration: false
    };
  }

  character.combat.currentHp = clamp(
    Number(character.combat.currentHp ?? character.maxHp ?? 0),
    0,
    Number(character.maxHp ?? 0)
  );

  character.combat.tempHp = Math.max(
    0,
    Number(character.combat.tempHp ?? 0)
  );

  const hitDiceTotal = getHitDiceTotal(character);

  if (character.combat.currentHitDice == null) {
    const used = Number(character.combat.usedHitDice ?? 0);
    character.combat.currentHitDice = clamp(
      hitDiceTotal - used,
      0,
      hitDiceTotal
    );
    delete character.combat.usedHitDice;
  }

  character.combat.currentHitDice = clamp(
    Number(character.combat.currentHitDice ?? hitDiceTotal),
    0,
    hitDiceTotal
  );

  character.combat.deathSaves ??= { success: 0, fail: 0 };

  character.combat.deathSaves.success = clamp(
    Number(character.combat.deathSaves.success ?? 0),
    0,
    3
  );

  character.combat.deathSaves.fail = clamp(
    Number(character.combat.deathSaves.fail ?? 0),
    0,
    3
  );

  character.combat.inspiration = Boolean(character.combat.inspiration);
}

function getHitDiceTotal(character) {
  return (character.classes ?? []).reduce(
    (sum, cls) => sum + Number(cls.level ?? 0),
    0
  );
}

app.addEventListener("click", (event) => {
  const card = event.target.closest(".character-card");

  if (card && currentScreen === "list") {
    const id = Number(card.dataset.characterId);
    currentCharacter = getCharacterById(id);
    currentScreen = "sheet";
    render();
    return;
  }

  if (currentScreen === "sheet" && currentCharacter && event.target.closest("#camp-menu-open")) {
    ensureCombatState(currentCharacter);
    openCampMenu();
    return;
  }

  const openCampButton = event.target.closest("#camp-menu-open");
  const fabMenu = event.target.closest(".camp-fab-menu");

  if (document.querySelector(".camp-fab-menu.open") && !openCampButton && !fabMenu) {
    closeCampMenu();
  }

  if (event.target.closest("#close-character-sheet")) {
    persistCharacters();
    currentCharacter = null;
    currentScreen = "list";
    render();
    return;
  }

  if (currentScreen === "sheet" && currentCharacter) {
    ensureCombatState(currentCharacter);

    if (event.target.closest("#sheet-hp-minus")) {
      currentCharacter.combat.currentHp = clamp(
        currentCharacter.combat.currentHp - 1,
        0,
        currentCharacter.maxHp
      );
      resetDeathSavesWhenAlive(currentCharacter);
      render();
      return;
    }

    if (event.target.closest("#sheet-hp-plus")) {
      currentCharacter.combat.currentHp = clamp(
        currentCharacter.combat.currentHp + 1,
        0,
        currentCharacter.maxHp
      );
      resetDeathSavesWhenAlive(currentCharacter);
      render();
      return;
    }

    if (event.target.closest("#sheet-temp-hp-minus")) {
      currentCharacter.combat.tempHp = Math.max(0,currentCharacter.combat.tempHp - 1);
      render();
      return;
    }

    if (event.target.closest("#sheet-temp-hp-plus")) {
      currentCharacter.combat.tempHp += 1;
      render();
      return;
    }

    if (event.target.closest("#sheet-temp-hp-value-input")) {
      const input = prompt("Введіть Temporary HP",String(currentCharacter.combat.tempHp));
      if (input !== null && input.trim() !== "") {
        const value = Number(input);
        if (Number.isFinite(value)) {
          currentCharacter.combat.tempHp = Math.max(0,Math.floor(value));
          render();
        }
      }
      return;
    }

    if (event.target.closest("#sheet-hp-value-input")) {
      const input = prompt(`Введіть поточне HP (0–${currentCharacter.maxHp})`,String(currentCharacter.combat.currentHp));
      if (input !== null && input.trim() !== "") {
        const value = Number(input);
        if (Number.isFinite(value)) {
          currentCharacter.combat.currentHp = clamp(
            Math.floor(value),0,Number(currentCharacter.maxHp ?? 0)
          );
          resetDeathSavesWhenAlive(currentCharacter);
          render();
        }
      }
      return;
    }

    if (event.target.closest("#sheet-inspiration")) {
      currentCharacter.combat.inspiration = !currentCharacter.combat.inspiration;
      render();
      return;
    }

    if (event.target.closest("#sheet-hit-dice-minus")) {
      currentCharacter.combat.currentHitDice = clamp(
        currentCharacter.combat.currentHitDice - 1,
        0,
        getHitDiceTotal(currentCharacter)
      );
      render();
      return;
    }

    if (event.target.closest("#sheet-hit-dice-plus")) {
      currentCharacter.combat.currentHitDice = clamp(
        currentCharacter.combat.currentHitDice + 1,
        0,
        getHitDiceTotal(currentCharacter)
      );
      render();
      return;
    }
  }

  if (currentScreen === "combat" && currentCharacter) {
    ensureCombatState(currentCharacter);

    if (event.target.closest("#hp-minus")) {
      currentCharacter.combat.currentHp = clamp(
        currentCharacter.combat.currentHp - 1,
        0,
        currentCharacter.maxHp
      );
      resetDeathSavesWhenAlive(currentCharacter);
      render();
      return;
    }

    if (event.target.closest("#hp-plus")) {
      currentCharacter.combat.currentHp = clamp(
        currentCharacter.combat.currentHp + 1,
        0,
        currentCharacter.maxHp
      );
      resetDeathSavesWhenAlive(currentCharacter);
      render();
      return;
    }

    if (event.target.closest("#temp-hp-minus")) {
      currentCharacter.combat.tempHp = Math.max(0, currentCharacter.combat.tempHp - 1);
      render();
      return;
    }

    if (event.target.closest("#temp-hp-plus")) {
      currentCharacter.combat.tempHp += 1;
      render();
      return;
    }

    if (event.target.closest("#temp-hp-value-input")) {
      const input = prompt(
        "Введіть Temporary HP",
        String(currentCharacter.combat.tempHp)
      );

      if (input !== null && input.trim() !== "") {
        const value = Number(input);
        if (Number.isFinite(value)) {
          currentCharacter.combat.tempHp = Math.max(0, Math.floor(value));
          render();
        }
      }
      return;
    }

    if (event.target.closest("#hp-value-input")) {
      const input = prompt(
        `Введіть поточне HP (0–${currentCharacter.maxHp})`,
        String(currentCharacter.combat.currentHp)
      );

      if (input !== null && input.trim() !== "") {
        const value = Number(input);

        if (Number.isFinite(value)) {
          currentCharacter.combat.currentHp = clamp(
            Math.floor(value),
            0,
            Number(currentCharacter.maxHp ?? 0)
          );
          render();
        }
      }
      return;
    }

    if (event.target.closest("#combat-inspiration")) {
      currentCharacter.combat.inspiration =
        !currentCharacter.combat.inspiration;
      render();
      return;
    }

    if (event.target.closest("#hit-dice-minus")) {
      currentCharacter.combat.currentHitDice = clamp(
        currentCharacter.combat.currentHitDice - 1,
        0,
        getHitDiceTotal(currentCharacter)
      );
      render();
      return;
    }

    if (event.target.closest("#hit-dice-plus")) {
      currentCharacter.combat.currentHitDice = clamp(
        currentCharacter.combat.currentHitDice + 1,
        0,
        getHitDiceTotal(currentCharacter)
      );
      render();
      return;
    }

    const deathSaveDot = event.target.closest("[data-save-type]");

    if (deathSaveDot && (currentScreen === "combat" || currentScreen === "sheet") && currentCharacter.combat.currentHp === 0) {
      const type = deathSaveDot.dataset.saveType;
      const index = Number(deathSaveDot.dataset.saveIndex);
      const currentValue = currentCharacter.combat.deathSaves[type];

      currentCharacter.combat.deathSaves[type] =
        currentValue === index + 1 ? index : index + 1;

      if (type === "success" && currentCharacter.combat.deathSaves.success === 3) {
        currentCharacter.combat.currentHp = 1;
        currentCharacter.combat.deathSaves.success = 0;
        currentCharacter.combat.deathSaves.fail = 0;
      }

      render();
      return;
    }
  }

  const classResourceButton = event.target.closest("[data-class-resource]");

  if ((currentScreen === "combat" || currentScreen === "sheet") && currentCharacter && classResourceButton) {
    const key = classResourceButton.dataset.resourceKey;
    const maximum = Number(classResourceButton.dataset.resourceMax);
    const delta = classResourceButton.dataset.classResource === "plus" ? 1 : -1;

    currentCharacter.combat[key] = clamp(
      Number(currentCharacter.combat[key] ?? maximum) + delta,
      0,
      maximum
    );

    render();
    return;
  }

  if (
    currentScreen === "combat" &&
    currentCharacter &&
    currentCharacter.combat.currentHp > 0
  ) {
    currentCharacter.combat.deathSaves.success = 0;
    currentCharacter.combat.deathSaves.fail = 0;
  }

  const nav = event.target.closest(".nav-item");

  if (!nav) return;

  currentScreen = nav.dataset.screen;
  render();
});

window.addEventListener("pagehide", persistCharacters);

render();