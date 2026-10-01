import { getPreparedSpells, getSpellcastingSources } from "../services/magicService.js";
import { collapsibleSection } from "./collapsibleSection.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatSpellLevel(level) {
  return Number(level) === 0 ? "Замови" : \`Рівень ${level}\`;
}

function renderFavoriteButton(spell) {
  return \`
    <button
      type="button"
      class="magic-favorite-button ${spell.favorite ? "is-favorite" : ""}"
      data-magic-favorite="${escapeHtml(spell.id)}"
      aria-pressed="${spell.favorite ? "true" : "false"}"
      aria-label="${spell.favorite ? "Прибрати з улюблених" : "Додати до улюблених"}"
      title="${spell.favorite ? "Прибрати з улюблених" : "Додати до улюблених"}"
    >${spell.favorite ? "★" : "☆"}</button>
  \`;
}

function renderSpellRow(spell) {
  return \`
    <article class="prepared-spell-row">
      <div>
        <strong>${escapeHtml(spell.ukr ?? spell.name)}</strong>
        <small>${escapeHtml(formatSpellLevel(spell.level))} · ${escapeHtml(spell.castingTime)}</small>
      </div>
      <div class="prepared-spell-row-actions">
        <span>${escapeHtml(spell.range)}</span>
        ${renderFavoriteButton(spell)}
      </div>
    </article>
  \`;
}

function groupSpells(spells) {
  const grouped = new Map();

  for (const spell of spells) {
    const level = Number(spell.level);
    if (!grouped.has(level)) grouped.set(level, []);
    grouped.get(level).push(spell);
  }

  return [...grouped.entries()].sort((a, b) => a[0] - b[0]);
}

function renderGroupedSpells(spells, collapsedLevels = {}) {
  return groupSpells(spells).map(([level, levelSpells]) =>
    collapsibleSection({
      id: \`prepared-level-${level}\`,
      title: \`${formatSpellLevel(level)} · ${levelSpells.length}\`,
      collapsed: Boolean(collapsedLevels[String(level)]),
      className: "prepared-spell-level-section",
      content: \`<div class="prepared-spells-list">${levelSpells.map(renderSpellRow).join("")}</div>\`
    })
  ).join("");
}

export function preparedSpellsBlock(
  character,
  collapsed = false,
  collapsedLevels = {}
) {
  const sources = getSpellcastingSources(character);
  if (!sources.length) return "";

  const spells = getPreparedSpells(character);
  const favoriteSpells = spells.filter(spell => spell.favorite);
  const regularSpells = spells.filter(spell => !spell.favorite);

  const favoriteBlock = favoriteSpells.length
    ? \`
      <section class="prepared-spells-favorites">
        <div class="prepared-spells-favorites-heading">
          <strong>★ Улюблені</strong>
          <span>${favoriteSpells.length}</span>
        </div>
        <div class="prepared-spells-list">
          ${favoriteSpells.map(renderSpellRow).join("")}
        </div>
      </section>
    \`
    : "";

  const levelContent = regularSpells.length
    ? renderGroupedSpells(regularSpells, collapsedLevels)
    : '<p class="inventory-empty">Немає інших підготовлених заклять.</p>';

  return collapsibleSection({
    id: "preparedSpells",
    title: "Prepared Spells",
    collapsed,
    className: "combat-section prepared-spells-block",
    content: favoriteBlock + levelContent
  });
}
