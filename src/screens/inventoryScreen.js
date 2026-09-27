import {
  ITEM_TYPES,
  ITEM_TYPE_LABELS,
  getInventoryItems
} from "../services/inventoryService.js";
import { bottomNavigation } from "../components/bottomNavigation.js";

const TYPE_ORDER = [
  ITEM_TYPES.ARMOR,
  ITEM_TYPES.SHIELD,
  ITEM_TYPES.WEAPON,
  ITEM_TYPES.ARTIFACT,
  ITEM_TYPES.TOOL,
  ITEM_TYPES.OTHER
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatEffects(item) {
  const effects = item.effects ?? {};
  const parts = [];

  if (effects.acBonus) {
    parts.push(`${effects.acBonus >= 0 ? "+" : ""}${effects.acBonus} AC`);
  }

  if (effects.initiativeBonus) {
    parts.push(`${effects.initiativeBonus >= 0 ? "+" : ""}${effects.initiativeBonus} Initiative`);
  }

  for (const [stat, value] of Object.entries(effects.statBonuses ?? {})) {
    parts.push(`${stat.toUpperCase()} ${value >= 0 ? "+" : ""}${value}`);
  }

  for (const [skill, value] of Object.entries(effects.skillBonuses ?? {})) {
    parts.push(`Навичка ${skill} ${value >= 0 ? "+" : ""}${value}`);
  }

  for (const [skill, proficiency] of Object.entries(effects.skillProficiencies ?? {})) {
    parts.push(`Володіння: ${skill} (${proficiency})`);
  }

  return parts;
}

function renderCharacteristics(item) {
  if (item.type === ITEM_TYPES.ARMOR) {
    const dexText =
      item.dexModifier === "full"
        ? "DEX повністю"
        : item.dexModifier === "max2"
          ? "DEX до +2"
          : "без DEX";

    return [
      `AC ${item.baseAC}`,
      dexText,
      item.stealthDisadvantage ? "Невигідність Stealth" : ""
    ].filter(Boolean);
  }

  if (item.type === ITEM_TYPES.SHIELD) {
    return [`+${item.acBonus} AC`];
  }

  if (item.type === ITEM_TYPES.WEAPON) {
    return [
      item.damage ? `Шкода ${item.damage}` : "Без шкоди",
      item.damageType ?? "",
      item.range ? `${item.range} ft.` : "",
      ...(item.properties ?? [])
    ].filter(Boolean);
  }

  if (item.type === ITEM_TYPES.ARTIFACT) {
    return formatEffects(item);
  }

  return [
    item.weight ? `Вага ${item.weight}` : "",
    item.description ?? ""
  ].filter(Boolean);
}

function renderInventoryItem(item) {
  const characteristics = renderCharacteristics(item);
  const effectText =
    characteristics.length > 0
      ? `<div class="inventory-item-characteristics">${characteristics.map(value => `<span>${escapeHtml(value)}</span>`).join("")}</div>`
      : "";

  return `
    <article class="inventory-item-card ${item.equipped ? "equipped" : ""}">
      <div class="inventory-item-heading">
        <div>
          <div class="inventory-item-title-row">
            <h3>${escapeHtml(item.ukr ?? item.name)}</h3>
            ${item.equipped ? `<span class="inventory-equipped-badge">Екіпіровано</span>` : ""}
          </div>
          <span class="inventory-item-type">${escapeHtml(ITEM_TYPE_LABELS[item.type])}</span>
        </div>
      </div>

      <p class="inventory-item-description">
        ${escapeHtml(item.description || "Опис відсутній.")}
      </p>

      ${effectText}

      <div class="inventory-item-actions">
        ${item.equipable
          ? `<button type="button" class="inventory-action-button ${item.equipped ? "secondary" : "primary"}" data-inventory-action="${item.equipped ? "unequip" : "equip"}" data-inventory-id="${escapeHtml(item.instanceId)}">
              ${item.equipped ? "Зняти" : "Екіпірувати"}
            </button>`
          : ""}
        <button
          type="button"
          class="inventory-action-button danger"
          data-inventory-action="delete"
          data-inventory-id="${escapeHtml(item.instanceId)}"
        >
          Видалити
        </button>
      </div>
    </article>
  `;
}

export function renderInventoryList(character, filter = {}) {
  const search = String(filter.search ?? "").trim().toLowerCase();
  const typeFilter = filter.type ?? "all";

  const inventory = getInventoryItems(character);

  return TYPE_ORDER.map(type => {
    const items = inventory
      .filter(item => item.type === type)
      .filter(item => typeFilter === "all" || type === typeFilter)
      .filter(item => {
        if (!search) return true;

        const haystack = [
          item.ukr,
          item.name,
          item.description,
          ...(renderCharacteristics(item) ?? [])
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(search);
      })
      .sort((a, b) => {
        if (a.equipped !== b.equipped) {
          return a.equipped ? -1 : 1;
        }

        return String(a.ukr ?? a.name).localeCompare(
          String(b.ukr ?? b.name),
          "uk"
        );
      });

    const content = items.length
      ? items.map(renderInventoryItem).join("")
      : `<p class="inventory-empty">Немає предметів цього типу.</p>`;

    return `
      <section class="inventory-type-section">
        <div class="inventory-section-heading">
          <h2>${escapeHtml(ITEM_TYPE_LABELS[type])}</h2>
          <span>${items.length}</span>
        </div>
        <div class="inventory-item-list">${content}</div>
      </section>
    `;
  }).join("");
}

export function inventoryScreen(character, filter = {}) {
  const inventory = getInventoryItems(character);

  return `
    <div class="app">
      <main class="inventory-main">
        <div class="inventory-header">
          <div>
            <span class="inventory-kicker">Персонаж</span>
            <h1>Інвентар</h1>
            <p>${escapeHtml(character.name)} · ${inventory.length} предметів</p>
          </div>

          <button
            type="button"
            id="inventory-add-item"
            class="inventory-add-button"
          >
            <span>＋</span>
            Додати предмет
          </button>
        </div>

        <section class="inventory-filters">
          <label class="inventory-search">
            <span>Пошук</span>
            <input
              id="inventory-search"
              type="search"
              value="${escapeHtml(filter.search ?? "")}"
              placeholder="Назва предмета..."
              autocomplete="off"
            >
          </label>

          <label class="inventory-type-filter">
            <span>Тип</span>
            <select id="inventory-type">
              <option value="all" ${!filter.type || filter.type === "all" ? "selected" : ""}>Усі типи</option>
              ${TYPE_ORDER.map(type => `
                <option value="${type}" ${filter.type === type ? "selected" : ""}>
                  ${escapeHtml(ITEM_TYPE_LABELS[type])}
                </option>
              `).join("")}
            </select>
          </label>
        </section>

        <div class="inventory-sections">
          ${renderInventoryList(character, filter)}
        </div>
      </main>

      ${bottomNavigation("inventory")} </nav>
    </div>
  `;
}
