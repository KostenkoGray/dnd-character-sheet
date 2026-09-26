import { STATS, SKILLS, PROFICIENCY } from "../data/rulesData.js";
import {
  getStatModifier,
  getSkillBonus,
  getCharacterLevel,
  getArmorClass,
  getInitiative,
  getPassivePerception,
  getProficiencyBonus
} from "../services/characterCalculationsService.js";
import { CLASSES } from "../data/classesData.js";
import { bottomNavigation } from "../components/bottomNavigation.js";
import { renderDeathSaves } from "./combatScreen.js";

// ==================================================
// CHARACTER SHEET
// ==================================================


// ==================================================
// SHARED COMBAT-STYLE BLOCKS
// ==================================================

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function getHitDieLabel(character) {
  const primaryClass = (character.classes ?? []).reduce((best, current) => {
    if (!best || current.level > best.level) return current;
    return best;
  }, null);

  return primaryClass
    ? `d${CLASSES[primaryClass.classId]?.hitDie ?? "—"}`
    : "—";
}

function getHitDiceTotal(character) {
  return getCharacterLevel(character);
}

function renderCompactSavesAndSkills(character) {
  return Object.entries(STATS).map(([statKey, stat]) => {
    const saveBonus = getStatModifier(character.stats[statKey]) +
      (character.classes?.some(cls => CLASSES[cls.classId]?.savingThrows?.includes(statKey))
        ? getProficiencyBonus(character) : 0);

    const saveProficient = character.classes?.some(cls =>
      CLASSES[cls.classId]?.savingThrows?.includes(statKey)
    );

    const skills = Object.entries(SKILLS)
      .filter(([, skill]) => skill.stat === statKey && skill.type === "skill")
      .map(([skillKey, skill]) => {
        const proficiency = character.skills?.[skillKey] ?? PROFICIENCY.NONE;
        const bonus = getSkillBonus(character, skillKey, skill);
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

function renderWeapon(weapon, character) {
  const abilityModifier = getStatModifier(
    weapon.properties?.includes("finesse")
      ? Math.max(character.stats.strength, character.stats.dexterity)
      : weapon.type === "ranged"
        ? character.stats.dexterity
        : character.stats.strength
  );

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

function getResourceValue(resourceTable, classLevel) {
  const levels = Object.keys(resourceTable).map(Number)
    .filter(level => level <= classLevel)
    .sort((a, b) => a - b);

  return levels.length
    ? resourceTable[levels[levels.length - 1]]
    : null;
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

        character.combat ??= {};
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

function renderEquippedItems(character) {
  const items = [];

  if (character.armor) {
    items.push(`
      <div class="equipped-item">
        <strong>${character.armor.ukr}</strong>
        <span>AC ${character.armor.baseAC}</span>
      </div>
    `);
  }

  if (character.shield) {
    items.push(`
      <div class="equipped-item">
        <strong>${character.shield.ukr}</strong>
        <span>+${character.shield.acBonus} AC</span>
      </div>
    `);
  }

  for (const item of character.equippedItems ?? []) {
    items.push(`
      <div class="equipped-item">
        <strong>${item.ukr ?? item.name}</strong>
        <span>Equipped</span>
      </div>
    `);
  }

  return items.length
    ? items.join("")
    : "<p>Немає екіпірованих елементів.</p>";
}

export function characterSheetScreen(character) {

  const statsBlock = Object.entries(character.stats)
    .map(([key, value]) => {
      const modifier = getStatModifier(value);
      const sign = modifier >= 0 ? "+" : "";

      return `
        <div class="stat-card">
          <div class="stat-name">${STATS[key].short}</div>
          <div class="stat-value">${value}</div>
          <div class="stat-modifier">${sign}${modifier}</div>
        </div>
      `;
    })
    .join("");

  const skillsBlock = Object.keys(STATS)
    .map((statKey) => {
      const statSkills = Object.entries(SKILLS)
        .filter(([, skill]) => skill.stat === statKey)
        .map(([skillKey, skill]) => {
          const bonus = getSkillBonus(character, skillKey, skill);
          const sign = bonus >= 0 ? "+" : "";

          const proficiency =
            character.skills?.[skillKey] ?? PROFICIENCY.NONE;

          let mark = "○";
          if (proficiency === PROFICIENCY.PROFICIENT) mark = "●";
          if (proficiency === PROFICIENCY.EXPERTISE) mark = "◆";
          if (proficiency === PROFICIENCY.HALF) mark = "◐";

          return `
            <div class="skill-row">
              <span>${mark} ${skill.ukr}</span>
              <span>${sign}${bonus}</span>
            </div>
          `;
        })
        .join("");

      return `
        <section class="skills-group">
          <h3>${STATS[statKey].short}</h3>
          ${statSkills}
        </section>
      `;
    })
    .join("");

  const maxHp = character.maxHp ?? 0;
  const currentHp = character.combat?.currentHp ?? maxHp;
  const tempHp = character.combat?.tempHp ?? 0;
  const hitDiceTotal = getHitDiceTotal(character);
  const currentHitDice = character.combat?.currentHitDice ?? hitDiceTotal;
  const deathSaves = character.combat?.deathSaves ?? { success: 0, fail: 0 };
  const inspiration = character.combat?.inspiration ?? false;
  const armorClass = getArmorClass(character);
  const initiative = getInitiative(character);
  const passivePerception = getPassivePerception(character);
  const proficiency = getProficiencyBonus(character);
  const speedFeet = character.race.subrace?.speed ?? character.race.race.speed;
  const speedSquares = Math.floor(speedFeet / 5);

  const weaponsBlock = (character.weapons ?? []).length
    ? character.weapons.map(weapon => renderWeapon(weapon, character)).join("")
    : "<p>Немає спорядженої зброї.</p>";

  return `
    <div class="app">

      <div class="character-header-actions">
        <button
          id="close-character-sheet"
          class="close-character-sheet"
          aria-label="Повернутися до списку персонажів"
        >
          ×
        </button>

        <button
          id="camp-menu-open"
          class="camp-menu-open"
          type="button"
          aria-label="Відпочинок і підвищення рівня"
        >
          🔥
        </button>
      </div>

      <main>

        <div class="character-header">
          <div class="avatar large"></div>

          <div class="character-main-info">
            <h1>${character.name}</h1>

            <p>
              ${character.race.subrace
                ? character.race.subrace.ukr
                : character.race.race.ukr}
              •
              ${character.classes
                .map(c => CLASSES[c.classId].ukr)
                .join(" / ")}
            </p>

            <span>Рівень ${getCharacterLevel(character)}</span>
          </div>
        </div>

        <section class="stats-grid">
          ${statsBlock}
        </section>

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
          <button id="sheet-inspiration" class="combat-inspiration ${inspiration ? "active" : "inactive"}" type="button">
            <span>Inspiration</span>
            <strong>${inspiration ? "Inspiration" : "—"}</strong>
          </button>
        </section>

        <section class="combat-vitals">
          <section class="combat-hp">
            <h2>Hit Points</h2>
            <div class="hp-row">
              <button id="sheet-hp-minus" type="button" aria-label="Зменшити HP">−</button>
              <button id="sheet-hp-value-input" class="hp-value" type="button" aria-label="Ввести HP вручну">
                <strong>${currentHp}</strong>
                <span>/ ${maxHp}</span>
              </button>
              <button id="sheet-hp-plus" type="button" aria-label="Збільшити HP">+</button>
            </div>
            <div class="temp-hp">
              <span>Temporary HP</span>
              <div class="temp-hp-controls">
                <button id="sheet-temp-hp-minus" type="button" aria-label="Зменшити Temporary HP">−</button>
                <button id="sheet-temp-hp-value-input" class="temp-hp-value" type="button" aria-label="Ввести Temporary HP вручну">
                  <strong>${tempHp}</strong>
                </button>
                <button id="sheet-temp-hp-plus" type="button" aria-label="Збільшити Temporary HP">+</button>
              </div>
            </div>
          </section>

          <section class="combat-hit-dice">
            <button type="button" id="sheet-hit-dice-plus" class="hit-dice-plus" aria-label="Збільшити Hit Dice">+</button>
            <h2>Hit Dice</h2>
            <span class="hit-die-label">${getHitDieLabel(character)}</span>
            <strong class="hit-dice-value">${currentHitDice}/${hitDiceTotal}</strong>
            <button type="button" id="sheet-hit-dice-minus" class="hit-dice-minus" aria-label="Зменшити Hit Dice">−</button>
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
          <h2>Armor & Equipped Items</h2>
          <div class="combat-equipped-items">${renderEquippedItems(character)}</div>
        </section>

        <section class="combat-section">
          <h2>Saving Throws &amp; Skills</h2>
          <div class="combat-stats-skills-grid">${renderCompactSavesAndSkills(character)}</div>
        </section>

      </main>

      ${bottomNavigation("sheet")}

    </div>
  `;
}