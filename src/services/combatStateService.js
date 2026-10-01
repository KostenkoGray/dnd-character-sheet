import { clamp } from "./characterCalculationsService.js";
import { ensureHitDiceState } from "./hitDiceService.js";


export function ensureCombatState(character) {
  character.combat ??= {
    currentHp: character.maxHp ?? 0,
    tempHp: 0,
    deathSaves: { success: 0, fail: 0 },
    inspiration: false
  };

  character.combat.currentHp = clamp(
    Number(character.combat.currentHp ?? character.maxHp ?? 0),
    0,
    Number(character.maxHp ?? 0)
  );

  character.combat.tempHp = Math.max(
    0,
    Number(character.combat.tempHp ?? 0)
  );

  ensureHitDiceState(character);
  character.combat.deathSaves ??= { success: 0, fail: 0 };

  character.combat.deathSaves.success = clamp(
    Number(character.combat.deathSaves.success ?? 0),
    0,
    3
  );

  character.combat.deathSaves.fail = clamp(
    Number(character.combat.deathSaves.fail ?? 0),
    0,
    3
  );

  character.combat.inspiration = Boolean(character.combat.inspiration);
  character.combat.concentration = Boolean(character.combat.concentration);

  character.combat.currentSpellSlots ??= {};
  if (!character.combat.currentSpellSlots || typeof character.combat.currentSpellSlots !== "object") {
    character.combat.currentSpellSlots = {};
  }

  if (character.combat.currentPactMagicSlots != null) {
    character.combat.currentPactMagicSlots = Math.max(
      0,
      Number(character.combat.currentPactMagicSlots ?? 0)
    );
  }
}

