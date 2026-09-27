import { STATS, SKILLS, PROFICIENCY } from "../data/rulesData.js";
import {
  getStatModifier,
  getSkillBonus,
  getSaveBonus,
  getCharacterLevel,
  getArmorClass,
  getInitiative,
  getPassivePerception,
  getProficiencyBonus,
  getEffectiveAbilityScore,
  getWeaponAttackBonus,
  getWeaponDamageBonus,
  getEquipmentBonuses
} from "../services/characterCalculationsService.js";
import { CLASSES } from "../data/classesData.js";
import { FEATURES } from "../data/featuresData.js";
import { bottomNavigation } from "../components/bottomNavigation.js";
import { renderDeathSaves } from "../components/deathSaves.js";
import { equipmentCard } from "../components/equipmentCard.js";
import { getInventoryFeatureEntries } from "../services/inventoryService.js";

// ==================================================
// CHARACTER SHEET
// ==================================================

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\u0027/g, "&#039;");
}



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
    const saveBonus = getSaveBonus(character, statKey);

    const saveProficient = character.classes?.some(cls =>
      CLASSES[cls.classId]?.savingThrows?.includes(statKey)
    );

    const skills = Object.entries(SKILLS)
      .filter(([, skill]) => skill.stat === statKey && skill.type === "skill")
      .map(([skillKey, skill]) => {
        const equipmentProficiencies = getEquipmentBonuses(character).skillProficiencies ?? {};
        const proficiency = character.skills?.[skillKey] ?? equipmentProficiencies[skillKey] ?? PROFICIENCY.NONE;
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
  const attackBonus = getWeaponAttackBonus(character, weapon);
  const damageBonus = getWeaponDamageBonus(character, weapon);
  const damage = weapon.damage
    ? `${weapon.damage} ${formatModifier(damageBonus)}`
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

function renderCharacterFeatures(character) {
  const groups = [];

  const race = character.race?.race;
  const subrace = character.race?.subrace;
  const raceEntries = [];

  if (race?.darkvision || subrace?.darkvision) {
    raceEntries.push({
      ukr: "Темний зір",
      short: `${race?.darkvision ?? subrace?.darkvision} футів`
    });
  }

  if (race?.speed || subrace?.speed) {
    raceEntries.push({
      ukr: "Швидкість",
      short: `${race?.speed ?? subrace?.speed} футів`
    });
  }

  if ((race?.languages ?? []).length) {
    raceEntries.push({
      ukr: "Мови",
      short: race.languages.join(", ")
    });
  }

  if ((race?.skillProficiencies ?? []).length) {
    raceEntries.push({
      ukr: "Володіння навичками",
      short: race.skillProficiencies.join(", ")
    });
  }

  if ((race?.weaponProficiencies ?? []).length) {
    raceEntries.push({
      ukr: "Володіння зброєю",
      short: race.weaponProficiencies.map(item => item?.ukr ?? item?.name ?? item).join(", ")
    });
  }

  if (race?.abilityScoreIncrease && Object.keys(race.abilityScoreIncrease).length) {
    raceEntries.push({
      ukr: "Збільшення характеристик",
      short: Object.entries(race.abilityScoreIncrease).map(([stat, value]) => `${STATS[stat]?.short ?? stat} +${value}`).join(", ")
    });
  }

  if (subrace?.armorProficiencies?.length) {
    raceEntries.push({
      ukr: "Володіння бронею",
      short: subrace.armorProficiencies.join(", ")
    });
  }

  if (raceEntries.length) {
    groups.push({
      title: subrace?.ukr ? `${race?.ukr ?? "Раса"} — ${subrace.ukr}` : (race?.ukr ?? "Раса"),
      entries: raceEntries.map(feature => ({ feature, race: true }))
    });
  }
  for (const cls of character.classes ?? []) {
    const classData = CLASSES[cls.classId];
    if (!classData) continue;

    const entries = [];
    for (const [levelKey, featureIds] of Object.entries(classData.featuresByLevel ?? {})) {
      if (Number(levelKey) > Number(cls.level ?? 0)) continue;
      for (const featureId of featureIds ?? []) {
        const feature = FEATURES[featureId];
        if (feature) entries.push({ feature, level: Number(levelKey) });
      }
    }

    const subclass = cls.subclassId ? classData.subclasses?.[cls.subclassId] : null;
    for (const [levelKey, featureIds] of Object.entries(subclass?.featuresByLevel ?? {})) {
      if (Number(levelKey) > Number(cls.level ?? 0)) continue;
      for (const featureId of featureIds ?? []) {
        const feature = FEATURES[featureId];
        if (feature) entries.push({ feature, level: Number(levelKey), subclass: true });
      }
    }

    const unique = [];
    const seen = new Set();
    for (const entry of entries) {
      const key = entry.feature.id + (entry.subclass ? ":subclass" : ":class");
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(entry);
    }

    if (unique.length) groups.push({ title: classData.ukr, entries: unique });
  }

  const itemFeatures = getInventoryFeatureEntries(character);
  if (itemFeatures.length) {
    groups.push({ title: "Від спорядження", entries: itemFeatures.map(feature => ({ feature, item: true })) });
  }

  const groupHtml = groups.map(group => `
    <section class="character-features-group">
      <div class="character-features-group-heading">${escapeHtml(group.title)}</div>
      ${group.entries.map(entry => {
        const feature = entry.feature;
        const source = entry.item ? "Предмет" : entry.race ? "Раса" : entry.subclass ? "Підклас" : "Клас";
        const levelText = entry.level ? `Рівень ${entry.level}` : "";
        return `<article class="character-feature-row">
          <div class="character-feature-main"><strong>${escapeHtml(feature.ukr ?? feature.name ?? feature.id)}</strong><span>${escapeHtml(source)}${levelText ? ` · ${levelText}` : ""}</span></div>
          <p>${escapeHtml(feature.short ?? "")}</p>
        </article>`;
      }).join("")}
    </section>
  `).join("");

  return `
    <section class="combat-section character-features-section">
      <h2>Здібності та властивості</h2>
      ${groupHtml || "<p class=\"inventory-empty\">Немає записаних здібностей.</p>"}
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
      const effectiveValue = getEffectiveAbilityScore(character, key);
      const modifier = getStatModifier(effectiveValue);
      const sign = modifier >= 0 ? "+" : "";
      const itemBonus = effectiveValue - Number(value);

      return `
        <div class="stat-card">
          <div class="stat-name">${STATS[key].short}</div>
          <div class="stat-value">${effectiveValue}</div>
          <div class="stat-modifier">${sign}${modifier}</div>
          ${itemBonus ? `<small class="stat-equipment-bonus">${itemBonus > 0 ? "+" : ""}${itemBonus} від спорядження</small>` : ""}
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
  const baseSpeedFeet = character.race.subrace?.speed ?? character.race.race.speed;
  const speedFeet = baseSpeedFeet + Number(getEquipmentBonuses(character).speedBonus ?? 0);
  const speedSquares = Math.floor(speedFeet / 5);



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

        ${equipmentCard(character)}

        <section class="combat-section">
          <h2>Prepared Spells</h2>
          <p>Поки немає підготовлених заклинань.</p>
        </section>



        ${renderCharacterFeatures(character)}

        <section class="combat-section">
          <h2>Saving Throws &amp; Skills</h2>
          <div class="combat-stats-skills-grid">${renderCompactSavesAndSkills(character)}</div>
        </section>

      </main>

      ${bottomNavigation("sheet")}

    </div>
  `;
}