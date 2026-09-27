import {
  ITEM_TYPES,
  getEquippedArmor,
  getEquippedShield,
  getEquippedWeapons,
  getEquippedArtifacts
} from "../services/inventoryService.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function itemLabel(item) {
  return item?.ukr ?? item?.name ?? "—";
}

function renderSlot({ label, item, types, emptyText = "Не екіпіровано" }) {
  const typeAttribute = types.join(",");

  return `
    <button
      type="button"
      class="equipment-slot ${item ? "filled" : "empty"}"
      data-equipment-picker="${escapeHtml(types[0])}"
      data-equipment-types="${escapeHtml(typeAttribute)}"
      aria-label="${escapeHtml(label)}"
    >
      <span class="equipment-slot-label">${escapeHtml(label)}</span>
      <strong>${escapeHtml(item ? itemLabel(item) : emptyText)}</strong>
      ${item ? `<small>Натисніть, щоб змінити</small>` : "<small>Натисніть, щоб екіпірувати</small>"}
    </button>
  `;
}

function renderWeaponSlot(item, index) {
  return `
    <button
      type="button"
      class="equipment-slot equipment-weapon-slot ${item ? "filled" : "empty"}"
      data-equipment-picker="weapon"
      data-equipment-types="${ITEM_TYPES.WEAPON}"
      aria-label="Зброя ${index + 1}"
    >
      <span class="equipment-slot-label">Зброя ${index + 1}</span>
      <strong>${escapeHtml(item ? itemLabel(item) : "Порожньо")}</strong>
      ${item
        ? `<small>${escapeHtml(item.damage ?? "Без шкоди")} · натисніть, щоб змінити</small>`
        : "<small>Натисніть, щоб екіпірувати</small>"}
    </button>
  `;
}

function renderArtifactSlots(artifacts) {
  const filled = artifacts.map(item => `
    <button
      type="button"
      class="equipment-slot equipment-artifact-slot filled"
      data-equipment-picker="artifact"
      data-equipment-types="${ITEM_TYPES.ARTIFACT}"
      aria-label="Артефакт"
    >
      <span class="equipment-slot-label">Артефакт</span>
      <strong>${escapeHtml(itemLabel(item))}</strong>
      <small>Натисніть, щоб зняти або змінити</small>
    </button>
  `).join("");

  const empty = `
    <button
      type="button"
      class="equipment-slot equipment-artifact-slot empty"
      data-equipment-picker="artifact"
      data-equipment-types="${ITEM_TYPES.ARTIFACT}"
      aria-label="Додати артефакт"
    >
      <span class="equipment-slot-label">Артефакт</span>
      <strong>Порожньо</strong>
      <small>Натисніть, щоб екіпірувати</small>
    </button>
  `;

  return filled + empty;
}

export function equipmentCard(character) {
  const armor = getEquippedArmor(character);
  const shield = getEquippedShield(character);
  const weapons = getEquippedWeapons(character);
  const artifacts = getEquippedArtifacts(character);

  return `
    <section class="combat-section equipment-section">
      <div class="equipment-section-heading">
        <div>
          <h2>Спорядження</h2>
          <p>Натисніть на комірку, щоб екіпірувати або зняти предмет з інвентаря.</p>
        </div>
      </div>

      <div class="equipment-grid">
        ${renderSlot({
          label: "Броня",
          item: armor,
          types: [ITEM_TYPES.ARMOR, ITEM_TYPES.ARTIFACT]
        })}

        ${renderSlot({
          label: "Щит",
          item: shield,
          types: [ITEM_TYPES.SHIELD]
        })}

        ${renderWeaponSlot(weapons[0], 0)}
        ${renderWeaponSlot(weapons[1], 1)}

        <div class="equipment-artifacts">
          <div class="equipment-subheading">Артефакти</div>
          <div class="equipment-artifact-grid">
            ${renderArtifactSlots(artifacts)}
          </div>
        </div>
      </div>
    </section>
  `;
}
