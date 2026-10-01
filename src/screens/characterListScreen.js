import { CLASSES } from "../data/classesData.js";
import { CHARACTER_LIST_PROMPTS } from "../data/characterListData.js";

function getRandomPrompt() {
  if (!CHARACTER_LIST_PROMPTS.length) return "";
  const index = Math.floor(Math.random() * CHARACTER_LIST_PROMPTS.length);
  return CHARACTER_LIST_PROMPTS[index];
}

export function charactersScreen(characters) {
  const prompt = getRandomPrompt();

  const characterCards = characters.map(character => {
    const classNames = (character.classes ?? [])
      .map(c =>
        Object.values(CLASSES).find(cls => cls.id === c.classId)?.ukr ?? c.classId
      )
      .join(" / ");

    const totalLevel = (character.classes ?? []).reduce(
      (sum, c) => sum + Number(c.level ?? 0),
      0
    );

    const raceName =
      character.race?.subrace?.ukr ?? character.race?.race?.ukr ?? "Невідома раса";

    const initial = String(character.name ?? "?").trim().charAt(0).toUpperCase();

    return `
      <article class="character-card" data-character-id="${character.id}">
        <div class="character-list-avatar" aria-hidden="true">
          <span>${initial || "?"}</span>
        </div>

        <div class="character-info">
          <h2>${character.name ?? "Без імені"}</h2>
          <p>${raceName} <span>•</span> ${classNames || "Без класу"} <span>•</span> Lv.${totalLevel}</p>
        </div>

        <button
          class="gear-button"
          type="button"
          aria-label="Налаштування персонажа ${character.name ?? ""}"
        >⚙</button>
      </article>
    `;
  }).join("");

  return `
    <div class="app character-list-app">
      <header class="character-list-header">
        <span class="character-list-kicker">D&amp;D CHARACTER SHEET</span>
        <h1 class="character-list-prompt">${prompt}</h1>
      </header>

      <main class="characters">
        <div class="character-list-section-title">
          <span>Персонажі</span>
          <span>${characters.length}</span>
        </div>

        <div class="character-list-cards">
          ${characterCards || '<p class="character-list-empty">Персонажів ще немає.</p>'}
        </div>
      </main>

      <button class="create-button" type="button">
        <span class="create-button-icon">+</span>
        <span>Створити персонажа</span>
      </button>

      <button class="support-button" type="button">
        <span>♥</span>
        <span>Підтримати розробника</span>
      </button>
    </div>
  `;
}
