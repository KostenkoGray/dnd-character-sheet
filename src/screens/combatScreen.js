import {
  getArmorClass,
  getInitiative,
  getPassivePerception,
  getProficiencyBonus
} from "../services/characterCalculationsService.js";

import { bottomNavigation } from "../components/bottomNavigation.js";

export function combatScreen(character) {
  const initiative = getInitiative(character);
  const initiativeSign = initiative >= 0 ? "+" : "";

  const proficiency = getProficiencyBonus(character);
  const armorClass = getArmorClass(character);
  const passivePerception = getPassivePerception(character);

  const speed = character.race.race.speed;

  return `
    <div class="app">

      <main>

        <section class="combat-main-stats">

          <div class="combat-stat">
            <span>AC</span>
            <strong>${armorClass}</strong>
          </div>

          <div class="combat-stat">
            <span>Initiative</span>
            <strong>${initiativeSign}${initiative}</strong>
          </div>

          <div class="combat-stat">
            <span>Speed</span>
            <strong>${speed} ft.</strong>
          </div>

        </section>

        <section class="combat-hp">

          <h2>Hit Points</h2>

          <div class="hp-row">

            <button id="hp-minus">−</button>

            <div class="hp-value">
              <strong>${character.combat.currentHp}</strong>
              <span>/ ${character.maxHp}</span>
            </div>

            <button id="hp-plus">+</button>

          </div>

          <div class="temp-hp">
            <span>Temporary HP</span>
            <strong>${character.combat.tempHp}</strong>
          </div>

        </section>

        <section class="combat-resources">

          <div class="combat-resource">
            <span>Hit Dice</span>
            <strong>${character.combat.usedHitDice}</strong>
          </div>

          <div class="combat-resource">
            <span>Death Saves</span>
            <strong>
              ${character.combat.deathSaves.success}
              /
              ${character.combat.deathSaves.fail}
            </strong>
          </div>

        </section>

        <section class="combat-summary">

          <div>
            <span>Proficiency</span>
            <strong>+${proficiency}</strong>
          </div>

          <div>
            <span>Passive Perception</span>
            <strong>${passivePerception}</strong>
          </div>

          <div>
            <span>Inspiration</span>
            <strong>${character.combat.inspiration ? "✓" : "—"}</strong>
          </div>

        </section>

        <section class="combat-section">
          <h2>Weapons</h2>
          <p>Поки немає спорядженої зброї.</p>
        </section>

        <section class="combat-section">
          <h2>Prepared Spells</h2>
          <p>Поки немає підготовлених заклинань.</p>
        </section>

        <section class="combat-section">
          <h2>Saving Throws & Skills</h2>
          <p>Компактний список буде тут.</p>
        </section>

      </main>

      ${bottomNavigation("combat")}

    </div>
  `;
}