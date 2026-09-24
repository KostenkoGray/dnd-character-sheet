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
import { saveCharacters } from "./services/storageService.js";
import { bottomNavigation } from "./components/bottomNavigation.js";

const app = document.querySelector("#app");

let currentCharacter = null;
let currentScreen = "list";

function navigationForCurrentScreen() {
  return bottomNavigation(currentScreen);
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