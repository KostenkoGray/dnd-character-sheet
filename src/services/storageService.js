const STORAGE_KEY = "dnd-character-sheet.characters.v1";

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
