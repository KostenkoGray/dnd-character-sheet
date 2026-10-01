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

export function preparedSpellsBlock(character, collapsed = false) {
  const sources = getSpellcastingSources(character);
  if (!sources.length) return "";

  const spells = getPreparedSpells(character);

  const rows = spells.length
    ? spells.map(spell => \`
        <article class="prepared-spell-row">
          <div>
            <strong>\${escapeHtml(spell.ukr ?? spell.name)}</strong>
            <small>Рівень \${spell.level} · \${escapeHtml(spell.castingTime)}</small>
          </div>
          <span>\${escapeHtml(spell.range)}</span>
        </article>
      \`).join("")
    : '<p class="inventory-empty">Поки немає підготовлених заклинань.</p>';

  return collapsibleSection({
    id: "prepared-spells",
    title: "Prepared Spells",
    collapsed,
    className: "combat-section prepared-spells-block",
    content: \`<div class="prepared-spells-list">\${rows}</div>\`
  });
}  return `
    <section class="combat-section prepared-spells-block">
      <h2>Prepared Spells</h2>
      <div class="prepared-spells-list">${rows}</div>
    </section>
  `;
}
