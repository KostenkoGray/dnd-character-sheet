import {
  ITEM_TYPES,
  getEquippedArmor,
  getEquippedShield,
  getEquippedArtifacts,
  getEquipmentBonuses
} from "../services/inventoryService.js";
import { STATS } from "../data/rulesData.js";
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

function formatSigned(value) {
  const number = Number(value ?? 0);
  return number > 0 ? `+${number}` : `${number}`;
}

function getItemBonusText(item, kind = "") {
  if (!item) return "";

  const parts = [];
  const effects = item.effects ?? {};

  if (kind === "armor" && typeof item.baseAC === "number") {
    parts.push(`AC ${item.baseAC}`);
  }

  if (kind === "shield" && Number(item.acBonus ?? 0)) {
    parts.push(`AC ${formatSigned(item.acBonus)}`);
  }

  if (Number(effects.acBonus ?? 0)) {
    parts.push(`AC ${formatSigned(effects.acBonus)}`);
  }

  for (const [statKey, value] of Object.entries(effects.statBonuses ?? {})) {
    if (!Number(value)) continue;
    parts.push(`${STATS[statKey]?.short ?? statKey.toUpperCase()} ${formatSigned(value)}`);
  }

  return parts.join(" · ");
}

function getEquipmentBonusSummary(character, shield) {
  const bonuses = getEquipmentBonuses(character);
  const parts = [];

  const acBonus = Number(shield?.acBonus ?? 0) + Number(bonuses.acBonus ?? 0);
  if (acBonus) parts.push(`AC ${formatSigned(acBonus)}`);

  for (const [statKey, value] of Object.entries(bonuses.statBonuses ?? {})) {
    if (!Number(value)) continue;
    parts.push(`${STATS[statKey]?.short ?? statKey.toUpperCase()} ${formatSigned(value)}`);
  }

  return parts.join(" · ");
}

function renderSlot({ label, item, types, kind = "", emptyText = "Не екіпіровано" }) {
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
      ${item
        ? `${getItemBonusText(item, kind) ? `<small class="equipment-slot-bonus">${escapeHtml(getItemBonusText(item, kind))}</small>` : ""}`
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
      data-equipment-current-id="${escapeHtml(item?.instanceId ?? "")}"
      aria-label="Артефакт"
    >
      <span class="equipment-slot-label">Артефакт</span>
      <strong>${escapeHtml(itemLabel(item))}</strong>
      ${getItemBonusText(item, "artifact") ? `<small class="equipment-slot-bonus">${escapeHtml(getItemBonusText(item, "artifact"))}</small>` : ""}
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
  const bonusSummary = getEquipmentBonusSummary(character, shield);

  const content = `
    <div class="equipment-grid">
      ${renderSlot({
        label: "Броня",
        item: armor,
        kind: "armor",
        types: [ITEM_TYPES.ARMOR, ITEM_TYPES.ARTIFACT]
      })}

      ${renderSlot({
        label: "Щит",
        item: shield,
        kind: "shield",
        types: [ITEM_TYPES.SHIELD]
      })}

      <div class="equipment-artifacts">
        <div class="equipment-subheading">Артефакти</div>
        <div class="equipment-artifact-grid">
          ${renderArtifactSlots(artifacts)}
        </div>
      </div>

      ${bonusSummary
        ? `<div class="equipment-bonus-summary"><span>Від спорядження</span><strong>${escapeHtml(bonusSummary)}</strong></div>`
        : ""}
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
