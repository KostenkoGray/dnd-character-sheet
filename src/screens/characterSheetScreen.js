import { STATS, SKILLS, PROFICIENCY } from "../data/rulesData.js";
import {
  getStatModifier,
  getSkillBonus,
  getCharacterLevel
} from "../services/characterCalculationsService.js";
import { CLASSES } from "../data/classesData.js";
import { bottomNavigation } from "../components/bottomNavigation.js";

// ==================================================
// CHARACTER SHEET
// ==================================================

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

  return `
    <div class="app">

      <button
        id="close-character-sheet"
        class="close-character-sheet"
        aria-label="Повернутися до списку персонажів"
      >
        ×
      </button>

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

        <section class="skills-section">
          <h2>Saving Throws & Skills</h2>
          ${skillsBlock}
        </section>

      </main>

      ${bottomNavigation("sheet")}

    </div>
  `;
}