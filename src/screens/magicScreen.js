import { bottomNavigation } from "../components/bottomNavigation.js";
import {
  getSpellcastingSources,
  getKnownSpellsForSource,
  getSpellLimits
} from "../services/magicService.js";
import {
  SPELL_SCHOOL_LABELS,
  SPELL_EFFECT_TYPE_LABELS
} from "../data/spellsData.js";
import { collapsibleSection } from "../components/collapsibleSection.js";
import { spellSlotsCounter } from "../components/spellSlotsCounter.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatComponents(components) {
  if (!components) return "—";

  const parts = [];
  if (components.verbal) parts.push("V");
  if (components.somatic) parts.push("S");
  if (components.material) parts.push("M");

  return parts.join(", ") || "—";
}

function formatSpellLevel(level) {
  return Number(level) === 0 ? "Замова" : `Рівень ${level}`;
}


function renderFavoriteButton(spell) {
  return `
    <button
      type="button"
      class="magic-favorite-button ${spell.favorite ? "is-favorite" : ""}"
      data-magic-favorite="${escapeHtml(spell.id)}"
      aria-pressed="${spell.favorite ? "true" : "false"}"
      aria-label="${spell.favorite ? "Прибрати з улюблених" : "Додати до улюблених"}"
      title="${spell.favorite ? "Прибрати з улюблених" : "Додати до улюблених"}"
    >${spell.favorite ? "★" : "☆"}</button>
  `;
}

function renderSpellActions(spell) {
  const deleteButton = spell.autoKnown
    ? ""
    : `
      <button
        type="button"
        class="inventory-action-button danger"
        data-magic-action="delete"
        data-spell-id="${escapeHtml(spell.id)}"
      >
        Видалити
      </button>
    `;

  if (spell.level === 0) {
    return `
      <span class="inventory-equipped-badge magic-cantrip-badge">
        Замова · завжди підготовлена
      </span>
      ${deleteButton}
    `;
  }

  if (spell.preparation === "known") {
    return `
      <span class="inventory-equipped-badge magic-cantrip-badge">
        Завжди підготовлено
      </span>
      ${deleteButton}
    `;
  }

  return `
    <button
      type="button"
      class="inventory-action-button ${spell.prepared ? "secondary" : "primary"}"
      data-magic-action="${spell.prepared ? "unprepare" : "prepare"}"
      data-spell-id="${escapeHtml(spell.id)}"
      data-magic-source-class-id="${escapeHtml(spell.sourceClassId ?? "")}"
    >
      ${spell.prepared ? "Зняти підготовку" : "Підготувати"}
    </button>
    ${deleteButton}
  `;
}

function renderSpellCard(spell) {
  const school = SPELL_SCHOOL_LABELS[spell.school] ?? spell.school;
  const effectType = SPELL_EFFECT_TYPE_LABELS[spell.effectType] ?? spell.effectType;

  return `
    <article class="magic-spell-card ${spell.prepared ? "prepared" : ""}" data-spell-details="${escapeHtml(spell.id)}" data-spell-source-class-id="${escapeHtml(spell.sourceClassId ?? "")}">
      <div class="magic-spell-heading">
        <div>
          <strong>${escapeHtml(spell.ukr ?? spell.name)}</strong>
          <small>${escapeHtml(spell.name)}</small>
        </div>
        <div class="magic-spell-heading-right">
          ${renderFavoriteButton(spell)}
          <span>${escapeHtml(formatSpellLevel(spell.level))}</span>
        </div>
      </div>

      <div class="magic-spell-meta">
        <span>${escapeHtml(school)}</span>
        <span>${escapeHtml(effectType)}</span>
        <span>${escapeHtml(spell.castingTime)}</span>
        <span>${escapeHtml(spell.range)}</span>
        <span>${escapeHtml(formatComponents(spell.components))}</span>
        <span>${spell.level === 0 ? "Без комірки" : "Комірка " + spell.level + "+"}</span>
      </div>

      <p>${escapeHtml(spell.description || "Опис ще не внесено до локального каталогу.")}</p>

      <div class="magic-spell-flags">
        ${spell.prepared ? '<span class="inventory-equipped-badge">Підготовлено</span>' : ""}
        ${spell.concentration ? "<span>Концентрація</span>" : ""}
        ${spell.ritual ? "<span>Ритуал</span>" : ""}
      </div>

      <div class="magic-spell-actions">
        ${renderSpellActions(spell)}
      </div>
    </article>
  `;
}

function groupSpells(spells) {
  const grouped = new Map();

  for (const spell of spells) {
    const key = Number(spell.level);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(spell);
  }

  return [...grouped.entries()].sort((a, b) => a[0] - b[0]);
}

export function renderMagicSpellsList(
  character,
  filter = {},
  collapsedLevels = {},
  sourceClassId = ""
) {
  const search = String(filter.search ?? "").trim().toLowerCase();

  const known = getKnownSpellsForSource(character, sourceClassId).filter(spell => {
    if (!search) return true;

    const haystack = [
      spell.ukr,
      spell.name,
      spell.description,
      SPELL_SCHOOL_LABELS[spell.school] ?? "",
      SPELL_EFFECT_TYPE_LABELS[spell.effectType] ?? ""
    ].join(" ").toLowerCase();

    return haystack.includes(search);
  });

  if (!known.length) {
    return '<p class="inventory-empty">Немає відомих заклинань для цього класу.</p>';
  }

  const sourceKey = String(sourceClassId ?? "");
  const favoriteSpells = known.filter(spell => spell.favorite);
  const regularSpells = known.filter(spell => !spell.favorite);

  const favoriteBlock = favoriteSpells.length
    ? `
      <section class="magic-favorites-section">
        <div class="magic-favorites-heading">
          <strong>★ Улюблені</strong>
          <span>${favoriteSpells.length}</span>
        </div>
        <div class="magic-spells-list">
          ${favoriteSpells.map(renderSpellCard).join("")}
        </div>
      </section>
    `
    : "";

  const levelBlocks = groupSpells(regularSpells).map(([level, spells]) =>
    collapsibleSection({
      id: `magic-level-${sourceKey}-${level}`,
      title: `${formatSpellLevel(level)} · ${spells.length}`,
      collapsed: Boolean(
        collapsedLevels[`${sourceKey}-${level}`] ??
        collapsedLevels[String(level)]
      ),
      className: "magic-level-section",
      content: `<div class="magic-spells-list">${spells.map(renderSpellCard).join("")}</div>`
    })
  ).join("");

  return favoriteBlock + levelBlocks;
}

export function renderMagicSpellsLists(
  character,
  filter = {},
  collapsedLevels = {}
) {
  const limits = getSpellLimits(character);

  return getSpellcastingSources(character).map(source => {
    const sourceId = source.classEntry.classId;
    const known = getKnownSpellsForSource(character, sourceId);
    const limit = limits.find(item => item.classId === sourceId);

    const cantripsKnown = known.filter(spell => spell.level === 0).length;
    const levelledKnown = known.filter(spell => spell.level > 0).length;

    const knownText = limit?.knownLimit == null
      ? String(levelledKnown)
      : `${levelledKnown}/${limit.knownLimit}`;

    const cantripText = limit?.cantripsLimit == null
      ? String(cantripsKnown)
      : `${cantripsKnown}/${limit.cantripsLimit}`;

    return `
      <section class="combat-section magic-known-source-section">
        <div class="magic-title-row">
          <div>
            <h2>${escapeHtml(source.displayName ?? source.classData.ukr)}</h2>
            <span>Замови ${cantripText} · Відомі ${knownText}</span>
          </div>
          <button
            type="button"
            class="inventory-add-button"
            data-magic-add-source-class-id="${escapeHtml(sourceId)}"
          >
            <span>＋</span>
            Додати
          </button>
        </div>

        <div class="magic-spells-sections">
          ${renderMagicSpellsList(
            character,
            filter,
            collapsedLevels,
            sourceId
          )}
        </div>
      </section>
    `;
  }).join("");
}

export function magicScreen(character, filter = {}, collapsedLevels = {}) {
  const sources = getSpellcastingSources(character);

  if (!sources.length) {
    return `
      <div class="app">
        <main class="magic-main">
          <div class="magic-header">
            <div>
              <h1>Магія</h1>
              <p>${escapeHtml(character.name)}</p>
            </div>
            <button type="button" id="close-magic" class="close-character-sheet" aria-label="Повернутися до Character Sheet">×</button>
          </div>
          <section class="combat-section magic-empty-state">
            <h2>Заклинання недоступні</h2>
            <p>У персонажа немає класу або підкласу зі spellcasting.</p>
          </section>
        </main>
        ${bottomNavigation("magic")}
      </div>
    `;
  }

  return `
    <div class="app">
      <main class="magic-main">
        <div class="magic-header">
          <div>
            <h1>Магія</h1>
            <p>${escapeHtml(character.name)}</p>
          </div>
          <button type="button" id="close-magic" class="close-character-sheet" aria-label="Повернутися до Character Sheet">×</button>
        </div>

        ${spellSlotsCounter(character, { className: "magic-slots-section" })}

        <label class="inventory-search magic-search">
          <span>Пошук</span>
          <input id="magic-search" type="search" value="${escapeHtml(filter.search ?? "")}" placeholder="Назва або опис..." autocomplete="off">
        </label>

        <div id="magic-spells-list" class="magic-spells-sections">
          ${renderMagicSpellsLists(character, filter, collapsedLevels)}
        </div>
      </main>
      ${bottomNavigation("magic")}
    </div>
  `;
}
