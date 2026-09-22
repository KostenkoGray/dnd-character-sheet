import { CLASSES } from "../data/classesData.js";

export function charactersScreen(characters) {

  const characterCards = characters.map(character => {

    const classNames = character.classes
      .map(c =>
        Object.values(CLASSES).find(cls => cls.id === c.classId)?.ukr ?? c.classId
      )
      .join(" / ");

    const totalLevel = character.classes.reduce(
      (sum, c) => sum + c.level,
      0
    );

    const raceName =
      character.race.subrace?.ukr ?? character.race.race.ukr;

    return `
      <div class="character-card" data-character-id="${character.id}">
        <div class="avatar"></div>

        <div class="character-info">
          <h2>${character.name}</h2>
          <p>${raceName} • ${classNames} • Lv.${totalLevel}</p>
        </div>

        <button class="gear-button">⚙</button>
      </div>
    `;
  }).join("");

  return `
    <div class="app">
      <header class="header">
        <p class="header-text">Who are you today?</p>
      </header>

      <main class="characters">
        ${characterCards}
      </main>

      <button class="create-button">
        + Створити персонажа
      </button>

      <button class="support-button">
        ❤️ Підтримати розробника
      </button>
    </div>
  `;
}