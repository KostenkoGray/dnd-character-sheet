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
import { inventoryScreen, renderInventoryList } from "./screens/inventoryScreen.js";
import { getStatModifier, getHitDiceTotal, clamp } from "./services/characterCalculationsService.js";
import { CLASSES } from "./data/classesData.js";
import {
  saveCharacters,
  loadSettings,
  saveSettings,
  loadUiState,
  saveUiState
} from "./services/storageService.js";
import { DEFAULT_SETTINGS, ACTION_PREFERENCE_VALUES } from "./data/settingsData.js";
import { bottomNavigation } from "./components/bottomNavigation.js";
import { FEATS } from "./data/featsData.js";
import { handleDeathSaveClick } from "./components/deathSaves.js";
import { ensureCombatState } from "./services/combatStateService.js";
import {
  ITEM_TYPES,
  ITEM_TYPE_LABELS,
  addItemToInventory,
  equipInventoryItem,
  unequipInventoryItem,
  removeItemFromInventory,
  getItemCatalog,
  getInventoryItems,
  getCatalogItem,
  getInventoryItem,
  ensureInventory
} from "./services/inventoryService.js";
import {
  REST_TYPES,
  HP_LEVEL_UP_METHODS,
  LONG_REST_HIT_DICE_RECOVERY,
  STATS
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
let undoState = null;
let inventoryFilter = { search: "", type: "all" };

const DEFAULT_COLLAPSE_STATE = {
  stats: false,
  equipment: false,
  features: false
};

const uiState = loadUiState({
  collapseByCharacter: {}
});

let collapseState = { ...DEFAULT_COLLAPSE_STATE };

function getCollapseState(characterId) {
  const saved = uiState.collapseByCharacter?.[String(characterId)] ?? {};

  return {
    ...DEFAULT_COLLAPSE_STATE,
    ...saved
  };
}

function persistCollapseState(characterId) {
  if (!characterId) return;

  uiState.collapseByCharacter ??= {};
  uiState.collapseByCharacter[String(characterId)] = {
    ...DEFAULT_COLLAPSE_STATE,
    ...collapseState
  };

  saveUiState(uiState);
}

function loadCollapseState(character) {
  collapseState = getCollapseState(character?.id);
}

function cloneCharacterState(character) {
  return typeof structuredClone === "function"
    ? structuredClone(character)
    : JSON.parse(JSON.stringify(character));
}

function getUndoLabel(character) {
  return undoState?.characterId === character?.id
    ? undoState.label
    : null;
}

function undoLastAction(character) {
  if (!undoState || undoState.characterId !== character.id) return false;

  const restored = cloneCharacterState(undoState.snapshot);

  Object.keys(character).forEach(key => delete character[key]);
  Object.assign(character, restored);

  undoState = null;
  return true;
}

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
    <button type="button" class="camp-action camp-action-undo" data-camp-action="undo" aria-label="Крок назад">
      <span>↩️</span><strong>Крок назад</strong>
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
      } else if (action === 'undo') {
        confirmUndoLastAction(currentCharacter);
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
    const shouldClose = onConfirm?.();

    if (shouldClose !== false) {
      closeCampDialog();
    }
  });
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeCampDialog();
    if (event.target.closest('[data-camp-dialog="cancel"]')) closeCampDialog();
  });
}

function confirmUndoLastAction(character) {
  const label = getUndoLabel(character);

  if (!label) {
    showCampDialog({
      title: "Крок назад",
      body: "<p>Немає завершеної дії, яку можна скасувати.</p>",
      confirmLabel: "Закрити"
    });
    return;
  }

  showCampDialog({
    title: "Скасувати останню дію?",
    body: `<p>Ви впевнені, що хочете скасувати <strong>${escapeHtml(label)}</strong>?</p>
      <p>Персонажа буде повністю повернуто до стану до цієї дії.</p>`,
    confirmLabel: "Скасувати дію",
    onConfirm: () => {
      if (!undoLastAction(character)) return false;

      persistCharacters();
      render();

      setTimeout(() => {
        showCampDialog({
          title: "Дію скасовано",
          body: `<p>Скасовано: <strong>${escapeHtml(label)}</strong>.</p>`,
          confirmLabel: "Готово"
        });
      }, 0);
    }
  });
}

function renderEquipmentPickerBody(character, allowedTypes, currentItemId = "") {
  const typeSet = new Set(allowedTypes);
  const items = getInventoryItems(character).filter(item => typeSet.has(item.type)).sort((a, b) => {
    if (a.equipped !== b.equipped) return a.equipped ? -1 : 1;
    return String(a.ukr ?? a.name).localeCompare(String(b.ukr ?? b.name), "uk");
  });

  const grouped = allowedTypes.map(type => {
    const groupItems = items.filter(item => item.type === type);
    if (!groupItems.length) {
      return `<section class="equipment-picker-group"><h3>${escapeHtml(ITEM_TYPE_LABELS[type])}</h3><p class="inventory-empty">Немає таких предметів в інвентарі.</p></section>`;
    }
    return `<section class="equipment-picker-group"><h3>${escapeHtml(ITEM_TYPE_LABELS[type])}</h3><div class="equipment-picker-list">${groupItems.map(item => {
      const isCurrent = item.instanceId === currentItemId;
      const action = item.equipped ? "Зняти" : "Екіпірувати";
      return `<article class="equipment-picker-item ${isCurrent ? "current" : ""}"><div class="equipment-picker-item-info"><strong>${escapeHtml(item.ukr ?? item.name)}</strong>${item.equipped ? `<span class="inventory-equipped-badge">Екіпіровано</span>` : ""}<small>${escapeHtml(item.description || "Опис відсутній.")}</small></div><button type="button" class="inventory-action-button ${item.equipped ? "secondary" : "primary"}" data-equipment-choice="${escapeHtml(item.instanceId)}">${action}</button></article>`;
    }).join("")}</div></section>`;
  }).join("");
  return `<div class="equipment-picker-hint">Оберіть предмет із вашого інвентаря.</div>${grouped}`;
}

function openEquipmentPicker(character, allowedTypes, currentItemId = "") {
  const uniqueTypes = [...new Set(allowedTypes)];
  showCampDialog({
    title: uniqueTypes.length === 1 ? `Екіпірування — ${ITEM_TYPE_LABELS[uniqueTypes[0]]}` : "Екіпірування",
    body: renderEquipmentPickerBody(character, uniqueTypes, currentItemId),
    confirmLabel: "Готово"
  });

  const backdrop = document.querySelector(".camp-dialog-backdrop");
  if (!backdrop) return;

  backdrop.addEventListener("click", event => {
    const button = event.target.closest("[data-equipment-choice]");
    if (!button) return;
    const instanceId = button.dataset.equipmentChoice;
    const item = getInventoryItem(character, instanceId);
    if (!item) return;

    if (item.equipped) {
      const result = unequipInventoryItem(character, instanceId);
      if (!result.ok) {
        showCampDialog({ title: "Не вдалося зняти предмет", body: `<p>${escapeHtml(result.message)}</p>`, confirmLabel: "Закрити" });
        return;
      }
    } else {
      if (currentItemId && currentItemId !== instanceId) {
        const current = getInventoryItem(character, currentItemId);
        if (current?.equipped) {
          const currentCatalog = getCatalogItem(current.source, current.itemId);
          if (currentCatalog?.type === ITEM_TYPES.WEAPON && item.type === ITEM_TYPES.WEAPON) {
            unequipInventoryItem(character, currentItemId);
          }
        }
      }
      const result = equipInventoryItem(character, instanceId);
      if (!result.ok) {
        showCampDialog({ title: "Не вдалося екіпірувати", body: `<p>${escapeHtml(result.message)}</p>`, confirmLabel: "Закрити" });
        return;
      }
    }

    persistCharacters();
    render();
    setTimeout(() => openEquipmentPicker(character, uniqueTypes, ""), 0);
  });
}

function renderAddItemBody(state) {
  const search = String(state.search ?? "").trim().toLowerCase();
  const typeFilter = state.type ?? "all";
  const catalog = getItemCatalog().filter(item => typeFilter === "all" || item.type === typeFilter).filter(item => {
    if (!search) return true;
    return [item.ukr, item.name, item.description].join(" ").toLowerCase().includes(search);
  }).sort((a, b) => String(a.ukr ?? a.name).localeCompare(String(b.ukr ?? b.name), "uk"));

  const results = catalog.length ? catalog.map(item => `<article class="inventory-add-result"><div class="inventory-add-result-info"><strong>${escapeHtml(item.ukr ?? item.name)}</strong><span>${escapeHtml(ITEM_TYPE_LABELS[item.type])}</span><small>${escapeHtml(item.description || "Опис відсутній.")}</small></div><button type="button" class="inventory-action-button primary" data-add-item-source="${escapeHtml(item.source)}" data-add-item-id="${escapeHtml(item.itemId)}">Додати</button></article>`).join("") : `<p class="inventory-empty">Нічого не знайдено.</p>`;

  return `<section class="inventory-add-filters"><label class="inventory-search"><span>Пошук</span><input id="inventory-add-search" type="search" value="${escapeHtml(state.search ?? "")}" placeholder="Назва предмета..." autocomplete="off"></label><label class="inventory-type-filter"><span>Тип</span><select id="inventory-add-type"><option value="all" ${typeFilter === "all" ? "selected" : ""}>Усі типи</option>${Object.values(ITEM_TYPES).map(type => `<option value="${type}" ${typeFilter === type ? "selected" : ""}>${escapeHtml(ITEM_TYPE_LABELS[type])}</option>`).join("")}</select></label></section><div class="inventory-add-results">${results}</div>`;
}

function openAddItemDialog(character) {
  const state = { search: "", type: "all" };
  showCampDialog({ title: "Додати предмет", body: renderAddItemBody(state), confirmLabel: "Готово" });

  const backdrop = document.querySelector(".camp-dialog-backdrop");
  if (!backdrop) return;

  const rerenderBody = focusSearch => {
    const body = backdrop.querySelector(".camp-dialog-body");
    if (!body) return;
    body.innerHTML = renderAddItemBody(state);
    if (focusSearch) {
      const input = body.querySelector("#inventory-add-search");
      input?.focus();
      input?.setSelectionRange(state.search.length, state.search.length);
    }
  };

  backdrop.addEventListener("input", event => {
    if (event.target.id !== "inventory-add-search") return;
    state.search = event.target.value;
    rerenderBody(true);
  });

  backdrop.addEventListener("change", event => {
    if (event.target.id !== "inventory-add-type") return;
    state.type = event.target.value;
    rerenderBody(false);
  });

  backdrop.addEventListener("click", event => {
    const button = event.target.closest("[data-add-item-source]");
    if (!button) return;
    const result = addItemToInventory(character, button.dataset.addItemSource, button.dataset.addItemId);
    if (!result.ok) {
      showCampDialog({ title: "Не вдалося додати", body: `<p>${escapeHtml(result.message)}</p>`, confirmLabel: "Закрити" });
      return;
    }
    persistCharacters();
    render();
  });
}

function confirmDeleteInventoryItem(character, instanceId) {
  const item = getInventoryItems(character).find(entry => entry.instanceId === instanceId);
  if (!item) return;

  showCampDialog({
    title: "Видалити предмет?",
    body: `<p>Ви впевнені, що хочете видалити <strong>${escapeHtml(item.ukr ?? item.name)}</strong> з інвентаря?</p>`,
    confirmLabel: "Видалити",
    onConfirm: () => {
      const result = removeItemFromInventory(character, instanceId);
      if (!result.ok) {
        showCampDialog({ title: "Не вдалося видалити", body: `<p>${escapeHtml(result.message)}</p>`, confirmLabel: "Закрити" });
        return false;
      }
      persistCharacters();
      render();
    }
  });
}

function handleInventoryAction(character, action, instanceId) {
  if (action === "delete") {
    confirmDeleteInventoryItem(character, instanceId);
    return;
  }

  const result = action === "equip" ? equipInventoryItem(character, instanceId) : unequipInventoryItem(character, instanceId);
  if (!result.ok) {
    showCampDialog({ title: action === "equip" ? "Не вдалося екіпірувати" : "Не вдалося зняти предмет", body: `<p>${escapeHtml(result.message)}</p>`, confirmLabel: "Закрити" });
    return;
  }
  persistCharacters();
  render();
}
function getPrimaryHitDie(character) {
  const primaryClass = (character.classes ?? [])
    .slice()
    .sort((a, b) => Number(b.level ?? 0) - Number(a.level ?? 0))[0];

  return Number(primaryClass ? (CLASSES[primaryClass.classId]?.hitDie ?? 0) : 0);
}

function getShortRestHealingPerDie(character, mode, manualAmount) {
  if (mode === ACTION_PREFERENCE_VALUES.MANUAL) {
    return Math.max(0, Math.floor(Number(manualAmount ?? 0)));
  }

  const hitDie = getPrimaryHitDie(character);
  if (!hitDie) return 0;

  return Math.max(0, Math.floor(hitDie / 2) + 1 + getStatModifier(character.stats?.constitution ?? 10));
}

function getShortRestPreview(character, mode, hitDiceSpent, manualAmount) {
  ensureCombatState(character);

  const currentHp = Number(character.combat.currentHp ?? 0);
  const maxHp = Number(character.maxHp ?? 0);
  const availableHitDice = Number(character.combat.currentHitDice ?? 0);
  const spent = clamp(Number(hitDiceSpent ?? 0), 0, availableHitDice);
  const healingPerDie = getShortRestHealingPerDie(character, mode, manualAmount);
  const healing = Math.min(
    Math.max(0, maxHp - currentHp),
    mode === ACTION_PREFERENCE_VALUES.MANUAL
      ? (spent > 0 ? healingPerDie : 0)
      : spent * healingPerDie
  );

  return {
    currentHp,
    maxHp,
    availableHitDice,
    hitDiceSpent: spent,
    healingPerDie,
    healing,
    resultingHp: Math.min(maxHp, currentHp + healing)
  };
}

function applyShortRestHealing(character, mode, hitDiceSpent, manualAmount) {
  const preview = getShortRestPreview(character, mode, hitDiceSpent, manualAmount);

  if (preview.hitDiceSpent <= 0) {
    return { ...preview, healing: 0, resultingHp: preview.currentHp };
  }

  character.combat.currentHp = preview.resultingHp;
  character.combat.currentHitDice = Math.max(
    0,
    preview.availableHitDice - preview.hitDiceSpent
  );

  return {
    ...preview,
    currentHp: character.combat.currentHp
  };
}

function performShortRest(character, mode, hitDiceSpent, manualAmount) {
  return applyShortRestHealing(character, mode, hitDiceSpent, manualAmount);
}

function restoreLongRestResources(character) {
  character.combat ??= {};

  for (const cls of character.classes ?? []) {
    const classData = CLASSES[cls.classId];
    const tables = classData?.resourcesByLevel ?? {};
    const recoveryMetadata = classData?.resourceRecovery ?? {};

    for (const [key, table] of Object.entries(tables)) {
      if (!table || typeof table !== "object" || Array.isArray(table)) continue;

      const recovery = recoveryMetadata[key];
      const restoresOnLongRest =
        recovery === REST_TYPES.LONG ||
        recovery === "shortOrLongRest";

      if (!restoresOnLongRest) continue;

      const maximum = getResourceValue(table, cls.level);
      if (typeof maximum !== "number" || maximum <= 0) continue;

      character.combat[`classResource_${cls.classId}_${key}`] = maximum;
    }
  }

  restoreLongRestSpellSlots(character);
}

function restoreLongRestSpellSlots(character) {
  character.combat ??= {};

  for (const cls of character.classes ?? []) {
    const spellcasting = CLASSES[cls.classId]?.spellcasting;
    const slotsTable = spellcasting?.slotsTable;

    if (!slotsTable || typeof slotsTable !== "object") continue;

    const levelData =
      slotsTable[cls.level] ??
      slotsTable[String(cls.level)];

    if (!levelData || typeof levelData !== "object") continue;

    const maxSlots = Number(levelData.slots);
    if (!Number.isFinite(maxSlots) || maxSlots <= 0) continue;

    if (spellcasting.pactMagic) {
      character.combat.pactMagicSlots = maxSlots;
      character.combat.currentPactMagicSlots = maxSlots;
      character.combat.pactMagicSlotLevel = Number(levelData.slotLevel) || 0;
      continue;
    }

    const spellSlotLevels = Object.keys(levelData)
      .filter(key => /^\d+$/.test(key))
      .reduce((result, key) => {
        const level = Number(key);
        const value = Number(levelData[key]);
        if (Number.isFinite(value)) result[level] = value;
        return result;
      }, {});

    character.combat.spellSlots = spellSlotLevels;
    character.combat.currentSpellSlots = { ...spellSlotLevels };
  }
}

function performLongRest(character) {
  const beforeAction = cloneCharacterState(character);
  ensureCombatState(character);

  restoreShortRestResources(character);
  restoreLongRestResources(character);

  const totalHitDice = getHitDiceTotal(character);

  character.combat.currentHp = Number(character.maxHp ?? 0);
  character.combat.tempHp = 0;
  character.combat.currentHitDice = totalHitDice;
  character.combat.deathSaves = { success: 0, fail: 0 };
  character.combat.inspiration = false;

  undoState = {
    characterId: character.id,
    label: "Long Rest",
    snapshot: beforeAction
  };

  return {
    type: REST_TYPES.LONG,
    recoveredHitDice: Math.max(
      0,
      totalHitDice - Number(character.combat.currentHitDice ?? totalHitDice)
    ),
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
      title: "Short Rest — спосіб лікування",
      body: `
        <p>Оберіть спосіб лікування. Вибір зберігається автоматично.</p>
        <div class="rest-summary">
          <button type="button" class="camp-dialog-button short-rest-method" data-rest-method="average">Середнє значення <strong>(рекомендовано)</strong></button>
          <button type="button" class="camp-dialog-button" disabled>🎲 Кидок кубика — Скоро</button>
          <button type="button" class="camp-dialog-button" disabled>🛠️ Мануальне введення — Скоро</button>
        </div>
      `,
      confirmLabel: "Скасувати"
    });
    bindShortRestMethodChoice(character);
    return;
  }

  renderShortRestAction(character, savedMode, 0);
}

function renderShortRestAction(character, mode, spentHitDice = 0) {
  ensureCombatState(character);

  const preview = getShortRestPreview(
    character,
    ACTION_PREFERENCE_VALUES.AVERAGE,
    spentHitDice,
    null
  );
  const canSpend = preview.availableHitDice > 0 && preview.currentHp < preview.maxHp;

  showCampDialog({
    title: "Short Rest",
    body: `
      <div class="rest-summary">
        <div class="short-rest-layout">
          <div class="short-rest-panel current">
            <span>HP зараз</span>
            <strong>${preview.currentHp}/${preview.maxHp}</strong>
          </div>
          <div class="short-rest-panel dice">
            <span>Hit Dice</span>
            <strong>${preview.availableHitDice}</strong>
            <small>d${getPrimaryHitDie(character)}</small>
            <div class="short-rest-counter">
              <button type="button" class="camp-dialog-button" data-short-rest-delta="-1" ${spentHitDice <= 0 ? "disabled" : ""}>−</button>
              <strong>${spentHitDice}</strong>
              <button type="button" class="camp-dialog-button" data-short-rest-delta="1" ${!canSpend || spentHitDice >= preview.availableHitDice ? "disabled" : ""}>+</button>
            </div>
            <small>використати</small>
          </div>
          <div class="short-rest-panel after">
            <span>HP після</span>
            <strong>${preview.resultingHp}/${preview.maxHp}</strong>
          </div>
        </div>
      </div>
      <div class="short-rest-change-wrap">
        <button type="button" class="camp-dialog-button" id="short-rest-change-method">Змінити спосіб</button>
      </div>
    `,
    confirmLabel: "Відпочити",
    onConfirm: () => {
      finishShortRest(
        character,
        ACTION_PREFERENCE_VALUES.AVERAGE,
        spentHitDice,
        null
      );
    }
  });

  bindShortRestChangeMethod(character);
  bindShortRestHitDiceCounter(character, spentHitDice);
}

function bindShortRestChangeMethod(character) {
  const backdrop = document.querySelector(".camp-dialog-backdrop");
  backdrop?.addEventListener("click", event => {
    if (!event.target.closest("#short-rest-change-method")) return;
    closeCampDialog();
    setTimeout(() => showShortRestChoice(character), 0);
  });
}

function bindShortRestHitDiceCounter(character, spentHitDice) {
  const backdrop = document.querySelector(".camp-dialog-backdrop");
  backdrop?.addEventListener("click", event => {
    const button = event.target.closest("[data-short-rest-delta]");
    if (!button) return;

    const delta = Number(button.dataset.shortRestDelta);
    const maxDice = Number(character.combat.currentHitDice ?? 0);
    const nextSpent = clamp(spentHitDice + delta, 0, maxDice);

    renderShortRestAction(character, ACTION_PREFERENCE_VALUES.AVERAGE, nextSpent);
  });
}

function restoreShortRestResources(character) {
  character.combat ??= {};

  const fallbackShortRestResources = new Set([
    "ki",
    "channelDivinity",
    "secondWind",
    "actionSurge",
    "wildShape",
    "invocationsKnown"
  ]);

  for (const cls of character.classes ?? []) {
    const classData = CLASSES[cls.classId];
    const tables = classData?.resourcesByLevel ?? {};
    const recoveryMetadata = classData?.resourceRecovery ?? {};

    for (const [key, table] of Object.entries(tables)) {
      if (!table || typeof table !== "object" || Array.isArray(table)) continue;

      const recovery = recoveryMetadata[key];
      const restoresOnShortRest =
        recovery === REST_TYPES.SHORT ||
        recovery === "shortOrLongRest" ||
        (!recovery && fallbackShortRestResources.has(key));

      if (!restoresOnShortRest) continue;

      const maximum = getResourceValue(table, cls.level);
      if (typeof maximum !== "number" || maximum <= 0) continue;

      character.combat[`classResource_${cls.classId}_${key}`] = maximum;
    }

    restoreWarlockPactMagicSlots(character, cls);
  }
}

function restoreWarlockPactMagicSlots(character, cls) {
  if (cls.classId !== "warlock") return;

  const spellSlots = CLASSES[cls.classId]?.spellcasting?.slotsTable;
  if (!spellSlots || typeof spellSlots !== "object") return;

  const levelData =
    spellSlots[cls.level] ??
    spellSlots[String(cls.level)];

  if (!levelData || typeof levelData !== "object") return;

  const pactSlots = Number(levelData.slots);
  const pactSlotLevel = Number(levelData.slotLevel);

  if (!Number.isFinite(pactSlots) || pactSlots <= 0) return;
  if (!Number.isFinite(pactSlotLevel) || pactSlotLevel <= 0) return;

  character.combat.pactMagicSlots = pactSlots;
  character.combat.pactMagicSlotLevel = pactSlotLevel;
  character.combat.currentPactMagicSlots = pactSlots;
}

function getResourceValue(table, level) {
  const levels = Object.keys(table)
    .map(Number)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  let value = null;
  for (const tableLevel of levels) {
    if (tableLevel <= Number(level)) value = table[tableLevel];
  }

  return value;
}

function finishShortRest(character, mode, hitDiceSpent, manualAmount) {
  const beforeAction = cloneCharacterState(character);
  const result = performShortRest(
    character,
    ACTION_PREFERENCE_VALUES.AVERAGE,
    hitDiceSpent,
    null
  );

  restoreShortRestResources(character);
  undoState = {
    characterId: character.id,
    label: "Short Rest",
    snapshot: beforeAction
  };
  persistCharacters();
  render();

  showCampDialog({
    title: "Short Rest завершено",
    body: `
      <div class="rest-summary">
        <div class="rest-row"><span>Використано Hit Dice</span><strong>${result.hitDiceSpent}</strong></div>
        <div class="rest-row"><span>Відновлено HP</span><strong>+${result.healing}</strong></div>
        <div class="rest-row"><span>HP</span><strong>${result.currentHp}/${result.maxHp}</strong></div>
        <div class="rest-row"><span>Hit Dice залишилось</span><strong>${result.availableHitDice - result.hitDiceSpent}</strong></div>
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
        <button type="button" class="camp-dialog-button short-rest-method" data-rest-method="average">Середнє значення <strong>(рекомендовано)</strong></button>
        <button type="button" class="camp-dialog-button" disabled>🎲 Кидок кубика — Скоро</button>
        <button type="button" class="camp-dialog-button" disabled>🛠️ Мануальне введення — Скоро</button>
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
    if (mode !== ACTION_PREFERENCE_VALUES.AVERAGE) return;

    setActionPreference("shortRestHealing", mode);
    closeCampDialog();
    setTimeout(() => showShortRest(character), 0);
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

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatLevelUpResourceName(key) {
  const names = {
    rage: "Лютість",
    bardicInspiration: "Натхнення барда",
    channelDivinity: "Божественний канал",
    wildShape: "Перевтілення",
    secondWind: "Друге дихання",
    actionSurge: "Порив до дії",
    ki: "Кі",
    layOnHands: "Покладання рук",
    sorceryPoints: "Очки чаклунства",
    invocationsKnown: "Містичні інвокації",
    indomitable: "Незламність"
  };

  return names[key] ?? key;
}

function getStatChoiceOptions(character, selected, amount) {
  return Object.entries(character.stats ?? {})
    .map(([key, value]) => {
      const stat = STATS[key];
      const numericValue = Number(value);
      const blocked = numericValue + amount > 20;

      return `
        <option value="${key}" ${key === selected ? "selected" : ""} ${blocked ? "disabled" : ""}>
          ${stat?.short ?? key.toUpperCase()} — ${stat?.ukr ?? key} (${numericValue})${blocked ? " — максимум" : ` → ${numericValue + amount}`}
        </option>
      `;
    })
    .join("");
}

function renderLevelUpFeatures(result) {
  const featureItems = result.features.map(feature => {
    const title = feature.data?.ukr ?? feature.data?.name ?? feature.id;
    const short = feature.data?.short ?? "Опис можливості ще не додано.";
    const type = feature.data?.type === "choice" ? "Потрібен вибір" : "Можливість";
    const source = feature.source === "subclass" ? "Підклас" : "Клас";

    return `
      <div class="level-up-feature ${feature.data?.type === "choice" ? "level-up-feature-choice" : ""}">
        <div class="level-up-feature-heading">
          <strong>${escapeHtml(title)}</strong>
          <span>${source} · ${type}</span>
        </div>
        <p>${escapeHtml(short)}</p>
      </div>
    `;
  });

  for (const change of result.resourceChanges ?? []) {
    featureItems.push(`
      <div class="level-up-feature level-up-feature-resource">
        <div class="level-up-feature-heading">
          <strong>${escapeHtml(formatLevelUpResourceName(change.key))}</strong>
          <span>Ресурс</span>
        </div>
        <p>${escapeHtml(String(change.before))} → ${escapeHtml(String(change.after))}</p>
      </div>
    `);
  }

  if (JSON.stringify(result.spellcastingBefore ?? null) !== JSON.stringify(result.spellcastingAfter ?? null)) {
    featureItems.push(`
      <div class="level-up-feature level-up-feature-resource">
        <div class="level-up-feature-heading">
          <strong>Заклинання</strong>
          <span>Прогресія</span>
        </div>
        <p>Комірки заклять оновляться відповідно до нового рівня.</p>
      </div>
    `);
  }

  if (!featureItems.length) {
    return `<p class="level-up-empty">Нових можливостей у даних цього рівня не зазначено.</p>`;
  }

  return `<div class="level-up-feature-list">${featureItems.join("")}</div>`;
}

function renderLevelUpAsi(character, result, draft) {
  if (!result.abilityScoreImprovement) return "";

  const asi = draft.asi;
  const selectedFeat = FEATS[asi.featId];

  const statOptionsPlus2 = getStatChoiceOptions(character, asi.stat1, 2);
  const statOptionsSplit = getStatChoiceOptions(character, asi.stat1, 1);
  const statOptionsSplitSecond = getStatChoiceOptions(character, asi.stat2, 1);

  let body = "";

  if (asi.mode === "feat") {
    const featOptions = Object.values(FEATS)
      .map(feat => `
        <option value="${feat.id}" ${feat.id === asi.featId ? "selected" : ""}>
          ${escapeHtml(feat.ukr)} · ${escapeHtml(feat.name)}
        </option>
      `)
      .join("");

    body = `
      <label class="level-up-select-label">
        Риса
        <select id="level-up-feat" class="level-up-select">
          <option value="">Оберіть рису</option>
          ${featOptions}
        </select>
      </label>
      <div class="level-up-feat-description">
        ${
          selectedFeat
            ? `<strong>${escapeHtml(selectedFeat.ukr)}</strong><p>${escapeHtml(selectedFeat.short)}</p>`
            : `<p>Оберіть рису зі списку.</p>`
        }
        <small>Перевірка передумов буде додана окремим етапом.</small>
      </div>
    `;
  } else if (asi.scoreMode === "split") {
    body = `
      <div class="level-up-two-stat-grid">
        <label class="level-up-select-label">
          Перша характеристика
          <select id="level-up-asi-stat1" class="level-up-select">
            <option value="">Оберіть</option>
            ${statOptionsSplit}
          </select>
        </label>
        <label class="level-up-select-label">
          Друга характеристика
          <select id="level-up-asi-stat2" class="level-up-select">
            <option value="">Оберіть</option>
            ${statOptionsSplitSecond}
          </select>
        </label>
      </div>
      <p class="level-up-asi-preview">
        ${
          asi.stat1 && asi.stat2
            ? `+1 ${STATS[asi.stat1]?.short ?? asi.stat1} · +1 ${STATS[asi.stat2]?.short ?? asi.stat2}`
            : "Оберіть дві різні характеристики."
        }
      </p>
    `;
  } else {
    body = `
      <label class="level-up-select-label">
        Характеристика
        <select id="level-up-asi-stat1" class="level-up-select">
          <option value="">Оберіть характеристику</option>
          ${statOptionsPlus2}
        </select>
      </label>
      <p class="level-up-asi-preview">
        ${
          asi.stat1
            ? `+2 ${STATS[asi.stat1]?.short ?? asi.stat1}`
            : "Оберіть характеристику для +2."
        }
      </p>
    `;
  }

  return `
    <section class="level-up-section level-up-asi-section">
      <div class="level-up-section-title">
        <div>
          <strong>Покращення характеристик / Риса</strong>
          <p><b>ASI</b> — це Ability Score Improvement: +2 до однієї характеристики або +1 до двох різних. Замість ASI можна взяти <b>рису</b>, коли правила дозволяють.</p>
        </div>
      </div>

      <div class="level-up-radio-grid">
        <label class="level-up-radio-card ${asi.mode === "scores" && asi.scoreMode === "plus2" ? "selected" : ""}">
          <input type="radio" name="level-up-asi-mode" value="plus2" ${asi.mode === "scores" && asi.scoreMode === "plus2" ? "checked" : ""}>
          <span>+2 до однієї</span>
          <small>Одна характеристика</small>
        </label>
        <label class="level-up-radio-card ${asi.mode === "scores" && asi.scoreMode === "split" ? "selected" : ""}">
          <input type="radio" name="level-up-asi-mode" value="split" ${asi.mode === "scores" && asi.scoreMode === "split" ? "checked" : ""}>
          <span>+1 / +1</span>
          <small>Дві різні характеристики</small>
        </label>
        <label class="level-up-radio-card ${asi.mode === "feat" ? "selected" : ""}">
          <input type="radio" name="level-up-asi-mode" value="feat" ${asi.mode === "feat" ? "checked" : ""}>
          <span>Взяти рису</span>
          <small>Замість ASI</small>
        </label>
      </div>

      <div class="level-up-asi-body">${body}</div>
    </section>
  `;
}

function getDefaultLevelUpDraft(character, classId) {
  const currentClass = character.classes.find(cls => cls.classId === classId);

  return {
    classId,
    subclassId: currentClass?.subclassId ?? "",
    asi: {
      mode: "scores",
      scoreMode: "plus2",
      stat1: "",
      stat2: "",
      featId: ""
    },
    hpMethod: character.levelUp?.hpIncreaseMethod ?? HP_LEVEL_UP_METHODS.AVERAGE,
    manualHp: calculateRecommendedHpIncrease(character, classId)
  };
}

function renderLevelUpBody(character, draft) {
  const classData = CLASSES[draft.classId];
  const result = getLevelUpOptions(character, draft.classId, {
    subclassId: draft.subclassId || null
  });

  const classOptions = Object.values(CLASSES)
    .map(cls => `
      <option value="${cls.id}" ${cls.id === draft.classId ? "selected" : ""}>${escapeHtml(cls.ukr)}</option>
    `)
    .join("");

  const subclassBlock = result.subclassRequired
    ? `
      <section class="level-up-section level-up-choice-section">
        <div class="level-up-section-title">
          <div>
            <strong>Підклас</strong>
            <p>На цьому рівні потрібно обрати архетип класу.</p>
          </div>
        </div>

        <select id="level-up-subclass" class="level-up-select">
          <option value="">Оберіть підклас</option>
          ${result.subclassOptions.map(subclass => `
            <option value="${subclass.id}" ${subclass.id === draft.subclassId ? "selected" : ""}>
              ${escapeHtml(subclass.ukr)}
            </option>
          `).join("")}
        </select>
      </section>
    `
    : result.subclassId
      ? `
        <section class="level-up-section level-up-choice-section">
          <div class="level-up-section-title">
            <div>
              <strong>Підклас</strong>
              <p>${escapeHtml(result.subclassOptions.find(option => option.id === result.subclassId)?.ukr ?? result.subclassId)}</p>
            </div>
          </div>
        </section>
      `
      : "";

  const recommendedHp = calculateRecommendedHpIncrease(character, draft.classId);
  const hpMethod = draft.hpMethod ?? HP_LEVEL_UP_METHODS.AVERAGE;

  return `
    <div class="level-up-content">
      <div class="level-up-section level-up-class-section">
        <div class="level-up-section-title">
          <div>
            <strong>Новий рівень в класі:</strong>
            <p>Оберіть клас, у який вкладається цей рівень.</p>
          </div>
        </div>

        <div class="level-up-class-picker">
          <label class="level-up-class-cell">
            <span>Клас</span>
            <select id="level-up-class" class="level-up-select">${classOptions}</select>
          </label>

          <div class="level-up-class-level-cell">
            <span>Рівень</span>
            <strong>${result.nextLevel}</strong>
            <small>${result.isNewClass ? "новий клас" : "наступний рівень"}</small>
          </div>
        </div>

        <div class="level-up-total-line">
          Загальний рівень: <strong>${result.totalLevelBefore} → ${result.totalLevelAfter}</strong>
        </div>
      </div>

      ${result.totalLevelAfter > 20
        ? `<div class="level-up-error">Загальний рівень персонажа не може перевищувати 20.</div>`
        : ""}

      ${subclassBlock}

      <section class="level-up-section">
        <div class="level-up-section-title">
          <div>
            <strong>Нові можливості</strong>
            <p>Короткий список того, що персонаж отримує на рівні ${result.nextLevel} цього класу.</p>
          </div>
        </div>

        ${renderLevelUpFeatures(result)}
      </section>

      ${renderLevelUpAsi(character, result, draft)}

      <section class="level-up-section">
        <div class="level-up-section-title">
          <div>
            <strong>Збільшення HP</strong>
            <p>Hit Die: d${classData.hitDie} · рекомендовано +${recommendedHp}</p>
          </div>
        </div>

        <div class="level-up-radio-grid level-up-hp-grid">
          <label class="level-up-radio-card ${hpMethod === HP_LEVEL_UP_METHODS.AVERAGE ? "selected" : ""}">
            <input type="radio" name="level-up-hp-method" value="average" ${hpMethod === HP_LEVEL_UP_METHODS.AVERAGE ? "checked" : ""}>
            <span>Середнє</span>
            <small>+${recommendedHp}</small>
          </label>

          <label class="level-up-radio-card ${hpMethod === HP_LEVEL_UP_METHODS.MANUAL ? "selected" : ""}">
            <input type="radio" name="level-up-hp-method" value="manual" ${hpMethod === HP_LEVEL_UP_METHODS.MANUAL ? "checked" : ""}>
            <span>Вручну</span>
            <small>Ввести приріст</small>
          </label>

          <label class="level-up-radio-card disabled">
            <input type="radio" name="level-up-hp-method" value="roll" disabled>
            <span>Кидок</span>
            <small>Пізніше</small>
          </label>
        </div>

        ${hpMethod === HP_LEVEL_UP_METHODS.MANUAL
          ? `
            <label class="level-up-select-label level-up-manual-hp">
              Приріст HP
              <input
                id="level-up-manual-hp"
                class="level-up-number-input"
                type="number"
                min="0"
                step="1"
                value="${Math.max(0, Math.floor(Number(draft.manualHp ?? recommendedHp)))}"
              >
            </label>
          `
          : ""}
      </section>
    </div>
  `;
}

function showLevelUpError(message) {
  const body = document.querySelector(".level-up-content");
  if (!body) return;

  const existing = body.querySelector(".level-up-error");

  if (existing) {
    existing.textContent = message;
    return;
  }

  body.insertAdjacentHTML(
    "afterbegin",
    `<div class="level-up-error">${escapeHtml(message)}</div>`
  );
}

function startLevelUp(character) {
  closeCampMenu();

  const firstClassId =
    character.classes?.[0]?.classId ??
    Object.values(CLASSES)[0]?.id;

  const draft = getDefaultLevelUpDraft(character, firstClassId);

  showCampDialog({
    title: "Підвищення рівня",
    body: renderLevelUpBody(character, draft),
    confirmLabel: "Підняти рівень",

    onConfirm: () => {
      const hpInput = document.querySelector("#level-up-manual-hp");

      if (hpInput) {
        draft.manualHp = Number(hpInput.value);
      }

      let hpIncrease = calculateRecommendedHpIncrease(character, draft.classId);

      if (draft.hpMethod === HP_LEVEL_UP_METHODS.MANUAL) {
        hpIncrease = Math.max(
          0,
          Math.floor(Number(draft.manualHp ?? hpIncrease))
        );
      }

      try {
        finishLevelUp(character, draft.classId, hpIncrease, draft);
        return true;
      } catch (error) {
        showLevelUpError(
          error.message ?? "Не вдалося завершити Level Up."
        );
        return false;
      }
    }
  });

  const backdrop = document.querySelector(".camp-dialog-backdrop");
  if (!backdrop) return;

  const rerender = () => {
    backdrop.querySelector(".camp-dialog-body").innerHTML =
      renderLevelUpBody(character, draft);
  };

  backdrop.addEventListener("change", event => {
    const target = event.target;

    if (target.id === "level-up-class") {
      draft.classId = target.value;

      const currentClass = character.classes.find(
        cls => cls.classId === draft.classId
      );

      draft.subclassId = currentClass?.subclassId ?? "";
      draft.asi = {
        mode: "scores",
        scoreMode: "plus2",
        stat1: "",
        stat2: "",
        featId: ""
      };
      draft.manualHp = calculateRecommendedHpIncrease(
        character,
        draft.classId
      );

      rerender();
      return;
    }

    if (target.id === "level-up-subclass") {
      draft.subclassId = target.value;
      rerender();
      return;
    }

    if (target.name === "level-up-asi-mode") {
      const mode = target.value;

      if (mode === "feat") {
        draft.asi.mode = "feat";
      } else {
        draft.asi.mode = "scores";
        draft.asi.scoreMode =
          mode === "split" ? "split" : "plus2";
      }

      rerender();
      return;
    }

    if (target.id === "level-up-asi-stat1") {
      draft.asi.stat1 = target.value;
      rerender();
      return;
    }

    if (target.id === "level-up-asi-stat2") {
      draft.asi.stat2 = target.value;
      rerender();
      return;
    }

    if (target.id === "level-up-feat") {
      draft.asi.featId = target.value;
      rerender();
      return;
    }

    if (target.name === "level-up-hp-method") {
      if (target.value !== HP_LEVEL_UP_METHODS.ROLL) {
        const manualInput =
          backdrop.querySelector("#level-up-manual-hp");

        if (manualInput) {
          draft.manualHp = Number(manualInput.value);
        }

        draft.hpMethod = target.value;
      }

      rerender();
    }
  });

  backdrop.addEventListener("input", event => {
    if (event.target.id === "level-up-manual-hp") {
      draft.manualHp = Number(event.target.value);
    }
  });
}

function finishLevelUp(character, classId, hpIncrease, draft) {
  const beforeAction = cloneCharacterState(character);
  const beforeTotalLevel = getNextCharacterLevel(character) - 1;

  const preview = applyLevelUp(
    character,
    classId,
    hpIncrease,
    {
      subclassId: draft.subclassId || null,
      asi: draft.asi
    }
  );

  character.levelUp ??= {};
  character.levelUp.hpIncreaseMethod = draft.hpMethod;
  character.levelUp.lastLevelUp = {
    classId,
    level: preview.nextLevel,
    hpIncrease,
    subclassId: draft.subclassId || null,
    asi: preview.abilityScoreImprovement
      ? { ...draft.asi }
      : null,
    date: new Date().toISOString()
  };

  const lines = [
    `Загальний рівень ${beforeTotalLevel} → ${preview.totalLevelAfter}`,
    `${CLASSES[classId].ukr}: ${preview.currentLevel || 0} → ${preview.nextLevel}`,
    `Макс. HP: ${Number(character.maxHp) - hpIncrease} → ${character.maxHp}`,
    hpIncrease ? `HP +${hpIncrease}` : "HP без змін"
  ];

  if (draft.subclassId) {
    const subclass =
      CLASSES[classId].subclasses?.[draft.subclassId];

    if (subclass) {
      lines.push(`Підклас: ${subclass.ukr}`);
    }
  }

  const featureNames = preview.features.map(feature =>
    feature.data?.ukr ?? feature.data?.name ?? feature.id
  );

  if (featureNames.length) {
    lines.push(
      `Нові можливості: ${featureNames.join(", ")}`
    );
  }

  if (preview.abilityScoreImprovement) {
    if (draft.asi.mode === "feat") {
      lines.push(
        `Риса: ${FEATS[draft.asi.featId]?.ukr ?? draft.asi.featId}`
      );
    } else if (draft.asi.scoreMode === "split") {
      lines.push(
        `Характеристики: +1 ${STATS[draft.asi.stat1]?.short ?? draft.asi.stat1}, +1 ${STATS[draft.asi.stat2]?.short ?? draft.asi.stat2}`
      );
    } else {
      lines.push(
        `Характеристика: +2 ${STATS[draft.asi.stat1]?.short ?? draft.asi.stat1}`
      );
    }
  }

  undoState = {
    characterId: character.id,
    label: `Підвищення рівня ${CLASSES[classId].ukr} ${beforeTotalLevel} → ${preview.totalLevelAfter}`,
    snapshot: beforeAction
  };

  persistCharacters();
  render();

  setTimeout(() => {
    showCampDialog({
      title: "Рівень підвищено",
      body: `<div class="rest-summary">${lines.map(line => `<div class="rest-row"><span>${escapeHtml(line)}</span></div>`).join("")}</div>`,
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
  if (currentCharacter) ensureInventory(currentCharacter);
  persistCharacters();
  switch (currentScreen) {
    case "list":
      app.innerHTML = charactersScreen(getCharacters());
      break;

    case "sheet":
      app.innerHTML = characterSheetScreen(currentCharacter, collapseState);
      break;

    case "combat":
      app.innerHTML = combatScreen(currentCharacter, collapseState);
      break;

    case "inventory":
      app.innerHTML = inventoryScreen(currentCharacter, inventoryFilter);
      break;

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

app.addEventListener("input", event => {
  if (currentScreen !== "inventory" || event.target.id !== "inventory-search") return;
  inventoryFilter.search = event.target.value;
  const sections = document.querySelector(".inventory-sections");
  if (sections) sections.innerHTML = renderInventoryList(currentCharacter, inventoryFilter);
});

app.addEventListener("change", event => {
  if (currentScreen !== "inventory" || event.target.id !== "inventory-type") return;
  inventoryFilter.type = event.target.value;
  const sections = document.querySelector(".inventory-sections");
  if (sections) sections.innerHTML = renderInventoryList(currentCharacter, inventoryFilter);
});

app.addEventListener("click", (event) => {
  if (currentScreen === "inventory" && currentCharacter) {
    const addButton = event.target.closest("#inventory-add-item");
    if (addButton) {
      openAddItemDialog(currentCharacter);
      return;
    }

    const inventoryAction = event.target.closest("[data-inventory-action]");
    if (inventoryAction) {
      handleInventoryAction(currentCharacter, inventoryAction.dataset.inventoryAction, inventoryAction.dataset.inventoryId);
      return;
    }
  }

  if ((currentScreen === "sheet" || currentScreen === "combat") && currentCharacter) {
    const collapseButton = event.target.closest("[data-collapse-section]");
    if (collapseButton) {
      const sectionId = collapseButton.dataset.collapseSection;
      if (Object.prototype.hasOwnProperty.call(collapseState, sectionId)) {
        collapseState[sectionId] = !collapseState[sectionId];
        persistCollapseState(currentCharacter.id);
        render();
      }
      return;
    }

    const weaponPicker = event.target.closest("[data-weapon-picker]");
    if (weaponPicker) {
      openEquipmentPicker(
        currentCharacter,
        [ITEM_TYPES.WEAPON],
        weaponPicker.dataset.weaponCurrentId ?? ""
      );
      return;
    }
  }

  const equipmentPicker = event.target.closest("[data-equipment-picker]");
  if ((currentScreen === "sheet" || currentScreen === "combat") && currentCharacter && equipmentPicker) {
    const allowedTypes = String(equipmentPicker.dataset.equipmentTypes ?? "").split(",").map(value => value.trim()).filter(Boolean);
    openEquipmentPicker(currentCharacter, allowedTypes, equipmentPicker.dataset.equipmentCurrentId ?? "");
    return;
  }

  
  const card = event.target.closest(".character-card");

  if (card && currentScreen === "list") {
    const id = Number(card.dataset.characterId);
    currentCharacter = getCharacterById(id);
    currentScreen = "sheet";
    loadCollapseState(currentCharacter);
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

  if (event.target.closest("#close-inventory")) {
    persistCollapseState(currentCharacter?.id);
    persistCharacters();
    currentScreen = "sheet";
    loadCollapseState(currentCharacter);
    render();
    return;
  }

  if (event.target.closest("#close-character-sheet")) {
    persistCollapseState(currentCharacter?.id);
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

  if (currentCharacter && event.target.closest("[data-death-save-dot]")) {
    const handled = handleDeathSaveClick(
      currentCharacter,
      event.target,
      ensureCombatState
    );

    if (handled) {
      persistCharacters();
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
  if (currentScreen !== "inventory") inventoryFilter = { search: "", type: "all" };
  render();
});

window.addEventListener("pagehide", persistCharacters);

render();