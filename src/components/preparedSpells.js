import { getPreparedSpells } from "../services/magicService.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function preparedSpellsBlock(character) {
  const spells = getPreparedSpells(character);

  if (!spells.length) {
    return `
      <section class="combat-section prepared-spells-block">
        <h2>Prepared Spells</h2>
        <p class="inventory-empty">Поки немає підготовлених заклинань.</p>
      </section>
    `;
  }

  const rows = spells.map(spell => `
    <article class="prepared-spell-row">
      <div>
        <strong>${escapeHtml(spell.ukr ?? spell.name)}</strong>
        <small>${spell.level === 0 ? "Замова" : `Рівень ${spell.level}`} · ${escapeHtml(spell.castingTime)}</small>
      </div>
      <span>${escapeHtml(spell.range)}</span>
    </article>
  `).join("");

  return `
    <section class="combat-section prepared-spells-block">
      <h2>Prepared Spells</h2>
      <div class="prepared-spells-list">${rows}</div>
    </section>
  `;
}
