import { clamp } from "../services/combatStateService.js";

export function renderDeathSaves(character) {
  const currentHp = Number(character.combat?.currentHp ?? character.maxHp ?? 0);
  if (currentHp !== 0) return "";

  const deathSaves = character.combat?.deathSaves ?? { success: 0, fail: 0 };

  return `
    <section class="death-saves-panel" data-death-saves>
      <div class="death-saves-side">
        <span>Success</span>
        <div class="death-save-dots">
          ${renderDeathSaveDots("success", deathSaves.success)}
        </div>
      </div>

      <div class="death-saves-title">
        <strong>Death Saves</strong>
      </div>

      <div class="death-saves-side">
        <span>Failure</span>
        <div class="death-save-dots">
          ${renderDeathSaveDots("fail", deathSaves.fail)}
        </div>
      </div>
    </section>
  `;
}

function renderDeathSaveDots(type, value) {
  const safeValue = clamp(Number(value ?? 0), 0, 3);
  const filledMark = type === "success" ? "✓" : "✕";
  const className = type === "success" ? "death-save-success" : "death-save-fail";

  return [0, 1, 2].map(index => `
    <button
      type="button"
      class="${className} ${index < safeValue ? "filled" : ""}"
      data-death-save-dot
      data-save-type="${type}"
      data-save-index="${index}"
      aria-label="${index < safeValue
        ? (type === "success" ? "Очистити успіх" : "Очистити провал")
        : (type === "success" ? "Позначити успіх" : "Позначити провал")}"
    >${index < safeValue ? filledMark : "○"}</button>
  `).join("");
}

export function handleDeathSaveClick(character, target, ensureCombatState) {
  const deathSaveDot = target?.closest?.("[data-death-save-dot]");
  if (!deathSaveDot || !character) return false;

  ensureCombatState(character);

  if (Number(character.combat.currentHp) !== 0) return true;

  const type = deathSaveDot.dataset.saveType;
  const index = Number(deathSaveDot.dataset.saveIndex);

  if (!["success", "fail"].includes(type) || !Number.isInteger(index)) return true;
  if (index < 0 || index > 2) return true;

  const currentValue = clamp(
    Number(character.combat.deathSaves?.[type] ?? 0),
    0,
    3
  );

  character.combat.deathSaves[type] =
    currentValue === index + 1 ? index : index + 1;

  if (
    type === "success" &&
    character.combat.deathSaves.success === 3
  ) {
    character.combat.currentHp = 1;
    character.combat.deathSaves.success = 0;
    character.combat.deathSaves.fail = 0;
  }

  return true;
}
