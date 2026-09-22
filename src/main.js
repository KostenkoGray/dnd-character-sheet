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

const app = document.querySelector("#app");

// =========================================
// Стан застосунку
// =========================================

let currentCharacter = null;
let currentScreen = "list";

// =========================================
// Рендер екранів
// =========================================

function render() {
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
        </div>
      `;
      break;
  }
}

// =========================================
// Глобальна навігація
// =========================================

app.addEventListener("click", (event) => {

  // ---------- Вибір персонажа ----------

  const card = event.target.closest(".character-card");

  if (card && currentScreen === "list") {
    const id = Number(card.dataset.characterId);

    currentCharacter = getCharacterById(id);

    currentScreen = "sheet";
    render();
    return;
  }

  // ---------- Хрестик Character Sheet ----------

  if (event.target.closest("#close-character-sheet")) {
    currentCharacter = null;
    currentScreen = "list";
    render();
    return;
  }

  // ---------- Нижня навігація ----------

  const nav = event.target.closest(".nav-item");

  if (!nav) return;

  currentScreen = nav.dataset.screen;
  render();
});

// =========================================
// Запуск застосунку
// =========================================

render();