import {
  ITEM_TYPES,
  getEquippedArmor,
  getEquippedShield,
  getEquippedArtifacts
} from "../services/inventoryService.js";
import { collapsibleSection } from "./collapsibleSection.js";

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
      data-equipment-current-id="${escapeHtml(item?.instanceId ?? "")}"
      aria-label="${escapeHtml(label)}"
    >
      <span class="equipment-slot-label">${escapeHtml(label)}</span>
      <strong>${escapeHtml(item ? itemLabel(item) : emptyText)}</strong>
      ${item ? `<small>Натисніть, щоб змінити</small>` : "<small>Натисніть, щоб екіпірувати</small>"}
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
      data-equipment-current-id="${escapeHtml(item?.instanceId ?? "")}"
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

export function equipmentCard(character, collapsed = false) {
  const armor = getEquippedArmor(character);
  const shield = getEquippedShield(character);
  const artifacts = getEquippedArtifacts(character);

  const content = `
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

      <div class="equipment-artifacts">
        <div class="equipment-subheading">Артефакти</div>
        <div class="equipment-artifact-grid">
          ${renderArtifactSlots(artifacts)}
        </div>
      </div>
    </div>
  `;

  return collapsibleSection({
    id: "equipment",
    title: "Спорядження",
    collapsed,
    className: "combat-section equipment-section",
    content
  });
}
