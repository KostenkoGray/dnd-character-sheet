import {
  getArmorClass,
  getInitiative,
  getPassivePerception,
  getProficiencyBonus,
  getStatModifier,
  getCharacterLevel
} from "../services/characterCalculationsService.js";
import { STATS, SKILLS, PROFICIENCY } from "../data/rulesData.js";
import { CLASSES } from "../data/classesData.js";
import { bottomNavigation } from "../components/bottomNavigation.js";

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function getPrimaryClass(character) {
  return (character.classes ?? []).reduce((best, current) => {
    if (!best || current.level > best.level) return current;
    return best;
  }, null);
}

function getHitDieLabel(character) {
  const primaryClass = getPrimaryClass(character);
  return primaryClass ? `d${CLASSES[primaryClass.classId]?.hitDie ?? "—"}` : "—";
}

function getWeaponAbility(character, weapon) {
  const strength = character.stats.strength;
  const dexterity = character.stats.dexterity;

  if (weapon.properties?.includes("finesse")) {
    return Math.max(strength, dexterity);
  }

  return weapon.type === "ranged" ? dexterity : strength;
}

function renderWeapon(weapon, character) {
  const abilityModifier = getStatModifier(getWeaponAbility(character, weapon));
  const attackBonus = abilityModifier + getProficiencyBonus(character);
  const damage = weapon.damage
    ? `${weapon.damage} ${formatModifier(abilityModifier)}`
    : "Без шкоди";

  const properties = weapon.properties?.length
    ? weapon.properties.join(" • ")
    : "";

  return `
    <article class="combat-weapon">
      <div class="combat-weapon-main">
        <strong>${weapon.ukr}</strong>
        <span>${formatModifier(attackBonus)} атака</span>
      </div>
      <div class="combat-weapon-damage">
        <span>${damage} ${weapon.damageType ?? ""}</span>
        ${weapon.range ? `<small>${weapon.range} ft.</small>` : ""}
        ${properties ? `<small>${properties}</small>` : ""}
      </div>
    </article>
  `;
}

function renderDeathSaves(character) {
  const currentHp = Number(character.combat?.currentHp ?? character.maxHp ?? 0);
  if (currentHp !== 0) return "";

  const deathSaves = character.combat?.deathSaves ?? { success: 0, fail: 0 };

  return `
    <section class="death-saves-panel">
      <div class="death-saves-side">
        <span>Success</span>
        <div class="death-save-dots">
          ${renderDeathSaveDots("success", deathSaves.success)}
        </div>
      </div>

      <div class="death-saves-title">
        <strong>Death Saves</strong>
      </div>

      <div class="death-saves-side">
        <span>Failure</span>
        <div class="death-save-dots">
          ${renderDeathSaveDots("fail", deathSaves.fail)}
        </div>
      </div>
    </section>
  `;
}

function renderDeathSaveDots(type, value) {
  const filledMark = type === "success" ? "✓" : "✕";
  const className = type === "success" ? "death-save-success" : "death-save-fail";

  return [0, 1, 2].map(index => `
    <button
      type="button"
      class="${className} ${index < value ? "filled" : ""}"
      data-save-type="${type}"
      data-save-index="${index}"
      aria-label="${index < value
        ? (type === "success" ? "Очистити успіх" : "Очистити провал")
        : (type === "success" ? "Позначити успіх" : "Позначити провал")}"
    >${index < value ? filledMark : "○"}</button>
  `).join("");
}

function renderCompactSavesAndSkills(character) {
  return Object.entries(STATS).map(([statKey, stat]) => {
    const save = SKILLS[`${statKey}ST`];
    const saveBonus = getSaveBonusLocal(character, statKey);
    const saveProficient = character.classes?.some(cls =>
      CLASSES[cls.classId]?.savingThrows?.includes(statKey)
    );

    const skills = Object.entries(SKILLS)
      .filter(([, skill]) => skill.stat === statKey && skill.type === "skill")
      .map(([skillKey, skill]) => {
        const proficiency = character.skills?.[skillKey] ?? PROFICIENCY.NONE;
        const bonus = getSkillBonusLocal(character, skillKey, skill);
        const marker = proficiency === PROFICIENCY.EXPERTISE
          ? "◆"
          : proficiency === PROFICIENCY.PROFICIENT
            ? "●"
            : proficiency === PROFICIENCY.HALF
              ? "◐"
              : "○";

        const skillLabel = skillKey === "animalHandling"
          ? `${marker} Поводження<br>з тваринами`
          : `${marker} ${skill.ukr}`;

        return `
          <div class="combat-skill-row">
            <span class="${skillKey === "animalHandling" ? "animal-handling" : ""}">${skillLabel}</span>
            <strong>${formatModifier(bonus)}</strong>
          </div>
        `;
      }).join("");

    return `
      <section class="combat-stat-group">
        <h3>${stat.short}</h3>
        <div class="combat-save-row">
          <span>${saveProficient ? "●" : "○"} Ряткидок</span>
          <strong>${formatModifier(saveBonus)}</strong>
        </div>
        <div class="combat-skills-list">${skills}</div>
      </section>
    `;
  }).join("");
}

function getSaveBonusLocal(character, statKey) {
  const modifier = getStatModifier(character.stats[statKey]);
  const proficiency = character.classes?.some(cls =>
    CLASSES[cls.classId]?.savingThrows?.includes(statKey)
  );
  return modifier + (proficiency ? getProficiencyBonus(character) : 0);
}

function getSkillBonusLocal(character, skillKey, skillData) {
  const modifier = getStatModifier(character.stats[skillData.stat]);
  const proficiencyBonus = getProficiencyBonus(character);
  const proficiency = character.skills?.[skillKey] ?? PROFICIENCY.NONE;

  if (proficiency === PROFICIENCY.EXPERTISE) return modifier + proficiencyBonus * 2;
  if (proficiency === PROFICIENCY.PROFICIENT) return modifier + proficiencyBonus;
  if (proficiency === PROFICIENCY.HALF) return modifier + Math.floor(proficiencyBonus / 2);
  return modifier;
}

function getResourceValue(resourceTable, classLevel) {
  const levels = Object.keys(resourceTable)
    .map(Number)
    .filter(level => level <= classLevel)
    .sort((a, b) => a - b);

  return levels.length ? resourceTable[levels[levels.length - 1]] : null;
}

function formatResourceName(key) {
  const names = {
    rage: "Rage",
    bardicInspiration: "Bardic Inspiration",
    channelDivinity: "Channel Divinity",
    wildShape: "Wild Shape",
    secondWind: "Second Wind",
    actionSurge: "Action Surge",
    ki: "Ki",
    layOnHands: "Lay on Hands",
    sorceryPoints: "Sorcery Points",
    invocationsKnown: "Invocations"
  };

  return names[key] ?? key;
}

function renderClassResources(character) {
  const ignored = new Set([
    "rageDamageBonus",
    "brutalCriticalDice",
    "bardicInspirationDie",
    "destroyUndeadCR",
    "wildShapeCR",
    "martialArtsDie",
    "unarmoredMovement",
    "extraAttacks",
    "sneakAttackDice"
  ]);

  const blocks = (character.classes ?? []).flatMap(cls => {
    const tables = CLASSES[cls.classId]?.resourcesByLevel ?? {};

    return Object.entries(tables)
      .filter(([key, table]) =>
        !ignored.has(key) &&
        table &&
        typeof table === "object" &&
        !Array.isArray(table)
      )
      .map(([key, table]) => {
        const maximum = getResourceValue(table, cls.level);

        if (typeof maximum !== "number" || maximum <= 0) return "";

        const stateKey = `classResource_${cls.classId}_${key}`;
        const current = Math.min(
          Math.max(Number(character.combat?.[stateKey] ?? maximum), 0),
          maximum
        );

        character.combat[stateKey] = current;

        return `
          <div class="combat-resource class-resource">
            <span>${formatResourceName(key)}</span>
            <div class="resource-counter">
              <button type="button"
                data-class-resource="minus"
                data-resource-key="${stateKey}"
                data-resource-max="${maximum}">−</button>
              <strong>${current}/${maximum}</strong>
              <button type="button"
                data-class-resource="plus"
                data-resource-key="${stateKey}"
                data-resource-max="${maximum}">+</button>
            </div>
          </div>
        `;
      })
      .filter(Boolean);
  });

  if (!blocks.length) return "";

  return `
    <section class="combat-section combat-class-resources">
      <h2>Class Resources</h2>
      <div class="combat-resources">${blocks.join("")}</div>
    </section>
  `;
}

export function combatScreen(character) {
  const armorClass = getArmorClass(character);
  const initiative = getInitiative(character);
  const proficiency = getProficiencyBonus(character);
  const passivePerception = getPassivePerception(character);

  const speedFeet = character.race.subrace?.speed ?? character.race.race.speed;
  const speedSquares = Math.floor(speedFeet / 5);

  const maxHp = character.maxHp ?? 0;
  const currentHp = character.combat?.currentHp ?? maxHp;
  const tempHp = character.combat?.tempHp ?? 0;
  const currentHitDice = character.combat?.currentHitDice ?? getCharacterLevel(character);
  const deathSaves = character.combat?.deathSaves ?? { success: 0, fail: 0 };
  const inspiration = character.combat?.inspiration ?? false;

  const hitDie = getHitDieLabel(character);
  const primaryClass = getPrimaryClass(character);
  const hitDiceTotal = getCharacterLevel(character);

  const weaponsBlock = (character.weapons ?? []).length
    ? character.weapons.map(weapon => renderWeapon(weapon, character)).join("")
    : "<p>Немає спорядженої зброї.</p>";

  return `
    <div class="app">
      <main>
        <section class="combat-top-panel">
          <div class="combat-main-stat combat-accent-blue">
            <span>Armor Class</span>
            <strong>${armorClass}</strong>
          </div>
          <div class="combat-main-stat combat-accent-orange">
            <span>Initiative</span>
            <strong>${formatModifier(initiative)}</strong>
          </div>
          <div class="combat-main-stat combat-accent-green">
            <span>Speed</span>
            <strong>${speedSquares}<small> sq</small></strong>
            <em>${speedFeet} ft.</em>
          </div>
        </section>

        <section class="combat-compact-summary">
          <div><span>Passive Perception</span><strong>${passivePerception}</strong></div>
          <div><span>Proficiency</span><strong>+${proficiency}</strong></div>
          <button id="combat-inspiration" class="combat-inspiration ${inspiration ? "active" : "inactive"}" type="button">
            <span>Inspiration</span>
            <strong>${inspiration ? "Inspiration" : "—"}</strong>
          </button>
        </section>

        <section class="combat-vitals">
        <section class="combat-hp">
          <h2>Hit Points</h2>
          <div class="hp-row">
            <button id="hp-minus" type="button" aria-label="Зменшити HP">−</button>
            <button id="hp-value-input" class="hp-value" type="button" aria-label="Ввести HP вручну">
              <strong>${currentHp}</strong>
              <span>/ ${maxHp}</span>
            </button>
            <button id="hp-plus" type="button" aria-label="Збільшити HP">+</button>
          </div>
          <div class="temp-hp">
            <span>Temporary HP</span>
            <div class="temp-hp-controls">
              <button id="temp-hp-minus" type="button" aria-label="Зменшити Temporary HP">−</button>
              <button id="temp-hp-value-input" class="temp-hp-value" type="button" aria-label="Ввести Temporary HP вручну">
                <strong>${tempHp}</strong>
              </button>
              <button id="temp-hp-plus" type="button" aria-label="Збільшити Temporary HP">+</button>
            </div>
          </div>
        </section>

          <section class="combat-hit-dice">
            <button type="button" id="hit-dice-plus" class="hit-dice-plus" aria-label="Збільшити Hit Dice">+</button>
            <h2>Hit Dice</h2>
            <span class="hit-die-label">${hitDie}</span>
            <strong class="hit-dice-value">${currentHitDice}/${hitDiceTotal}</strong>
            <button type="button" id="hit-dice-minus" class="hit-dice-minus" aria-label="Зменшити Hit Dice">−</button>
          </section>
        </section>

        ${renderDeathSaves(character)}

        ${renderClassResources(character)}

        <section class="combat-section">
          <h2>Weapons</h2>
          <div class="combat-weapons-list">${weaponsBlock}</div>
        </section>

        <section class="combat-section">
          <h2>Prepared Spells</h2>
          <p>Поки немає підготовлених заклинань.</p>
        </section>

        <section class="combat-section">
          <h2>Saving Throws &amp; Skills</h2>
          <div class="combat-stats-skills-grid">${renderCompactSavesAndSkills(character)}</div>
        </section>
      </main>
      ${bottomNavigation("combat")}
    </div>
  `;
}
