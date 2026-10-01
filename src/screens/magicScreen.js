import { bottomNavigation } from "../components/bottomNavigation.js";
import {
  getSpellcastingSources,
  getKnownSpells,
  getPreparedSpells,
  getSpellLimits,
  getSpellSlotGroups,
  getTotalSpellSlots
} from "../services/magicService.js";
import {
  SPELL_SCHOOL_LABELS,
  SPELL_EFFECT_TYPE_LABELS
} from "../data/spellsData.js";

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

function renderSlotCard(slot, pact = false) {
  return `
    <article class="magic-slot-card ${pact ? "pact-slot-card" : ""}">
      <div class="magic-slot-heading">
        <div>
          <strong>${pact ? "Pact Magic" : formatSpellLevel(slot.level)}</strong>
          <span>${pact ? `Комірка ${slot.level} рівня` : "Комірки заклять"}</span>
        </div>
        <strong class="magic-slot-current">${slot.current}/${slot.max}</strong>
      </div>

      <div class="magic-slot-controls">
        <button
          type="button"
          class="inventory-action-button secondary"
          data-spell-slot-action="spend"
          data-spell-slot-level="${slot.level}"
          data-spell-slot-pact="${pact ? "true" : "false"}"
        >−</button>
        <span>доступно</span>
        <button
          type="button"
          class="inventory-action-button primary"
          data-spell-slot-action="restore"
          data-spell-slot-level="${slot.level}"
          data-spell-slot-pact="${pact ? "true" : "false"}"
        >+</button>
      </div>
    </article>
  `;
}

function renderSpellCard(spell) {
  const school = SPELL_SCHOOL_LABELS[spell.school] ?? spell.school;
  const effectType = SPELL_EFFECT_TYPE_LABELS[spell.effectType] ?? spell.effectType;

  return `
    <article class="magic-spell-card ${spell.prepared ? "prepared" : ""}" data-spell-details="${escapeHtml(spell.id)}">
      <div class="magic-spell-heading">
        <div>
          <strong>${escapeHtml(spell.ukr ?? spell.name)}</strong>
          <small>${escapeHtml(spell.name)}</small>
        </div>
        <span>${escapeHtml(formatSpellLevel(spell.level))}</span>
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
        ${spell.level === 0
          ? '<span class="inventory-equipped-badge magic-cantrip-badge">Замова · завжди доступна</span>'
          : `
            <button
              type="button"
              class="inventory-action-button ${spell.prepared ? "secondary" : "primary"}"
              data-magic-action="${spell.prepared ? "unprepare" : "prepare"}"
              data-spell-id="${escapeHtml(spell.id)}"
            >
              ${spell.prepared ? "Зняти підготовку" : "Підготувати"}
            </button>
          `
        }

        <button
          type="button"
          class="inventory-action-button danger"
          data-magic-action="delete"
          data-spell-id="${escapeHtml(spell.id)}"
        >
          Видалити
        </button>
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

export function renderMagicSpellsList(character, filter = {}) {
  const search = String(filter.search ?? "").trim().toLowerCase();

  const known = getKnownSpells(character).filter(spell => {
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
    return '<p class="inventory-empty">Немає відомих заклинань.</p>';
  }

  return groupSpells(known).map(([level, spells]) => `
    <section class="magic-level-section">
      <div class="magic-section-heading">
        <h3>${escapeHtml(formatSpellLevel(level))}</h3>
        <span>${spells.length}</span>
      </div>
      <div class="magic-spells-list">${spells.map(renderSpellCard).join("")}</div>
    </section>
  `).join("");
}

export function magicScreen(character, filter = {}) {
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

  const groups = getSpellSlotGroups(character);
  const totalSlots = getTotalSpellSlots(character);
  const known = getKnownSpells(character);
  const prepared = getPreparedSpells(character);
  const limits = getSpellLimits(character);

  const slotCards = [
    ...groups.normal.map(slot => renderSlotCard(slot)),
    ...groups.pact.map(slot => renderSlotCard(slot, true))
  ].join("");

  const sourceSummary = limits.map(limit => {
    const knownText = limit.knownLimit === null ? `${limit.known}` : `${limit.known}/${limit.knownLimit}`;
    const cantripText = limit.cantripsLimit === null ? `${limit.cantripsKnown}` : `${limit.cantripsKnown}/${limit.cantripsLimit}`;
    const preparedText = limit.preparedLimit === null ? `${limit.prepared}` : `${limit.prepared}/${limit.preparedLimit}`;

    return `
      <div class="magic-source-row">
        <strong>${escapeHtml(limit.className)}</strong>
        <span>Замови ${cantripText} · Відомі ${knownText} · Підготовлені ${preparedText}</span>
      </div>
    `;
  }).join("");

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

        <section class="magic-slots-section">
          <div class="magic-title-row">
            <div>
              <h2>Магічні комірки</h2>
              <span>Загалом ${totalSlots}</span>
            </div>
          </div>

          <div class="magic-slots-grid">
            ${slotCards || '<p class="inventory-empty">На поточному рівні немає доступних комірок.</p>'}
          </div>
        </section>

        <section class="combat-section magic-source-section">
          <h2>Spellcasting</h2>
          <div class="magic-source-list">${sourceSummary}</div>
        </section>

        <section class="combat-section">
          <div class="magic-title-row">
            <div>
              <h2>Заклинання</h2>
              <span>Підготовлено ${prepared.length} · Відомо ${known.length}</span>
            </div>
            <button type="button" id="magic-add-spell" class="inventory-add-button">
              <span>＋</span>
              Додати заклинання
            </button>
          </div>

          <label class="inventory-search magic-search">
            <span>Пошук</span>
            <input id="magic-search" type="search" value="${escapeHtml(filter.search ?? "")}" placeholder="Назва або опис..." autocomplete="off">
          </label>

          <div id="magic-spells-list" class="magic-spells-sections">
            ${renderMagicSpellsList(character, filter)}
          </div>
        </section>
      </main>
      ${bottomNavigation("magic")}
    </div>
  `;
}
