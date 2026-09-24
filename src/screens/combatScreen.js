import {
  getArmorClass,
  getInitiative,
  getPassivePerception,
  getProficiencyBonus,
  getStatModifier
} from "../services/characterCalculationsService.js";
import { CLASSES } from "../data/classesData.js";
import { bottomNavigation } from "../components/bottomNavigation.js";

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function getPrimaryClass(character) {
  if (!character.classes?.length) return null;

  return character.classes.reduce((best, current) => {
    if (!best || current.level > best.level) return current;
    return best;
  }, null);
}

function getHitDieLabel(character) {
  const primaryClass = getPrimaryClass(character);
  if (!primaryClass) return "—";

  return `d${CLASSES[primaryClass.classId]?.hitDie ?? "—"}`;
}

function getWeaponAbility(character, weapon) {
  const strength = character.stats.strength;
  const dexterity = character.stats.dexterity;

  if (weapon.properties?.includes("finesse")) {
    return Math.max(strength, dexterity);
  }

  if (weapon.type === "ranged") {
    return dexterity;
  }

  return strength;
}

function getWeaponAttackBonus(character, weapon) {
  const abilityModifier = getStatModifier(getWeaponAbility(character, weapon));
  return abilityModifier + getProficiencyBonus(character);
}

function getWeaponDamageBonus(character, weapon) {
  return getStatModifier(getWeaponAbility(character, weapon));
}

function renderWeapon(weapon, character) {
  const attackBonus = getWeaponAttackBonus(character, weapon);
  const damageBonus = getWeaponDamageBonus(character, weapon);

  const attackText = formatModifier(attackBonus);
  const damageText = formatModifier(damageBonus);
  const damage = weapon.damage ? `${weapon.damage} ${damageText}` : "Без шкоди";
  const damageType = weapon.damageType ?? "";

  return `
    <article class="combat-weapon">
      <div class="combat-weapon-main">
        <strong>${weapon.ukr}</strong>
        <span>${attackText} атака</span>
      </div>
      <div class="combat-weapon-damage">
        <span>${damage} ${damageType}</span>
      </div>
    </article>
  `;
}

function renderDeathSaveRow(label, value, symbol) {
  return `
    <div class="death-save-row">
      <span>${label}</span>
      <div class="death-save-dots" aria-label="${label}: ${value}">
        ${[0, 1, 2].map(index => `
          <span class="death-save-dot ${index < value ? "filled" : ""}">${index < value ? symbol : "○"}</span>
        `).join("")}
      </div>
    </div>
  `;
}

export function combatScreen(character) {
  const initiative = getInitiative(character);
  const proficiency = getProficiencyBonus(character);
  const armorClass = getArmorClass(character);
  const passivePerception = getPassivePerception(character);

  const speed =
    character.race.subrace?.speed ??
    character.race.race.speed;

  const maxHp = character.maxHp ?? 0;
  const currentHp = character.combat?.currentHp ?? maxHp;
  const tempHp = character.combat?.tempHp ?? 0;
  const usedHitDice = character.combat?.usedHitDice ?? 0;
  const deathSaves = character.combat?.deathSaves ?? { success: 0, fail: 0 };
  const inspiration = character.combat?.inspiration ?? false;

  const hitDie = getHitDieLabel(character);
  const primaryClass = getPrimaryClass(character);
  const hitDiceTotal = primaryClass?.level ?? getCharacterLevelFallback(character);

  const weapons = character.weapons ?? [];
  const weaponsBlock = weapons.length
    ? weapons.map(weapon => renderWeapon(weapon, character)).join("")
    : "<p>Немає спорядженої зброї.</p>";

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
            <strong>${formatModifier(initiative)}</strong>
          </div>
          <div class="combat-stat">
            <span>Speed</span>
            <strong>${speed} ft.</strong>
          </div>
        </section>

        <section class="combat-hp">
          <h2>Hit Points</h2>
          <div class="hp-row">
            <button id="hp-minus" type="button" aria-label="Зменшити HP">−</button>
            <div class="hp-value">
              <strong>${currentHp}</strong>
              <span>/ ${maxHp}</span>
            </div>
            <button id="hp-plus" type="button" aria-label="Збільшити HP">+</button>
          </div>
          <div class="temp-hp">
            <span>Temporary HP</span>
            <strong>${tempHp}</strong>
          </div>
        </section>

        <section class="combat-resources">
          <div class="combat-resource">
            <span>Hit Dice</span>
            <strong>${hitDie} · ${usedHitDice}/${hitDiceTotal}</strong>
          </div>
          <div class="combat-resource death-saves-resource">
            <span>Death Saves</span>
            ${renderDeathSaveRow("Success", deathSaves.success, "✓")}
            ${renderDeathSaveRow("Failure", deathSaves.fail, "✕")}
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
            <strong>${inspiration ? "✓" : "—"}</strong>
          </div>
        </section>

        <section class="combat-section">
          <div class="combat-section-header">
            <h2>Weapons</h2>
          </div>
          <div class="combat-weapons-list">
            ${weaponsBlock}
          </div>
        </section>

        <section class="combat-section">
          <div class="combat-section-header">
            <h2>Prepared Spells</h2>
          </div>
          <p>Поки немає підготовлених заклинань.</p>
        </section>

        <section class="combat-section">
          <div class="combat-section-header">
            <h2>Saving Throws &amp; Skills</h2>
          </div>
          <p>Компактний список буде додано на наступному етапі.</p>
        </section>
      </main>
      ${bottomNavigation("combat")}
    </div>
  `;
}

function getCharacterLevelFallback(character) {
  return (character.classes ?? []).reduce((sum, cls) => sum + cls.level, 0);
}
