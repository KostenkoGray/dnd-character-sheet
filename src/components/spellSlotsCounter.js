import { getSpellSlotGroups, getTotalSpellSlots, getAvailableSpellSlots } from "../services/magicService.js";

function renderDots(level, current, max, pactMagic) {
  return Array.from({ length: max }, (_, index) => {
    const filled = index < current;
    return `
      <button
        type="button"
        class="spell-slot-dot ${filled ? "filled" : ""}"
        data-spell-slot-dot
        data-spell-slot-level="${level}"
        data-spell-slot-index="${index}"
        data-spell-slot-pact="${pactMagic ? "true" : "false"}"
        aria-label="${filled ? "Зменшити" : "Збільшити"} комірки рівня ${level}"
      >${filled ? "●" : "○"}</button>
    `;
  }).join("");
}

function renderSlotRow(slot, pactMagic = false) {
  const label = pactMagic
    ? `Рівень ${slot.level} · Pact`
    : `Рівень ${slot.level}`;

  return `
    <div class="spell-slot-row">
      <span class="spell-slot-level">${label}</span>
      <div class="spell-slot-dots" aria-label="${slot.current} з ${slot.max} комірок доступно">
        ${renderDots(slot.level, slot.current, slot.max, pactMagic)}
      </div>
    </div>
  `;
}

export function spellSlotsCounter(character, { title = "Магічні комірки", className = "" } = {}) {
  const groups = getSpellSlotGroups(character);
  const total = getTotalSpellSlots(character);
  const available = getAvailableSpellSlots(character);

  const rows = [
    ...groups.normal.map(slot => renderSlotRow(slot)),
    ...groups.pact.map(slot => renderSlotRow(slot, true))
  ].join("");

  if (!rows) return "";

  return `
    <section class="spell-slots-counter ${className}">
      <div class="spell-slots-counter-heading">
        <strong>${title}</strong>
        <span>${available}/${total}</span>
      </div>

      <button
        type="button"
        class="spell-concentration-button ${character.combat?.concentration ? "active" : "inactive"}"
        data-spell-concentration
        aria-pressed="${character.combat?.concentration ? "true" : "false"}"
      >
        <span>Концентрація</span>
        <strong>${character.combat?.concentration ? "Активна" : "—"}</strong>
      </button>

      <div class="spell-slots-counter-list">
        ${rows}
      </div>
    </section>
  `;
}
