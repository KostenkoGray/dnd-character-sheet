const STORAGE_KEY = "dnd-character-sheet.characters.v2";

export function loadCharacters(fallbackCharacters = []) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const initial = clone(fallbackCharacters);
      saveCharacters(initial);
      return initial;
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      const initial = clone(fallbackCharacters);
      saveCharacters(initial);
      return initial;
    }

    return parsed;
  } catch (error) {
    console.error("Не вдалося завантажити персонажів:", error);
    return clone(fallbackCharacters);
  }
}

export function saveCharacters(characters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error("Не вдалося зберегти персонажів:", error);
  }
}

export function resetCharacters() {
  localStorage.removeItem(STORAGE_KEY);
}

function clone(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}



const UI_STATE_KEY = "dnd-character-sheet.ui.v1";

export function loadUiState(fallbackState = {}) {
  try {
    const raw = localStorage.getItem(UI_STATE_KEY);
    if (!raw) {
      return clone(fallbackState);
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return clone(fallbackState);
    }

    return parsed;
  } catch (error) {
    console.error("Не вдалося завантажити стан інтерфейсу:", error);
    return clone(fallbackState);
  }
}

export function saveUiState(state) {
  try {
    localStorage.setItem(UI_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Не вдалося зберегти стан інтерфейсу:", error);
  }
}

const SETTINGS_KEY = "dnd-character-sheet.settings.v1";

export function loadSettings(fallbackSettings = { actionPreferences: {} }) {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      const initial = clone(fallbackSettings);
      saveSettings(initial);
      return initial;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      const initial = clone(fallbackSettings);
      saveSettings(initial);
      return initial;
    }

    parsed.actionPreferences ??= {};
    return parsed;
  } catch (error) {
    console.error("Не вдалося завантажити налаштування:", error);
    return clone(fallbackSettings);
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Не вдалося зберегти налаштування:", error);
  }
}
