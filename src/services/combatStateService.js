function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function ensureCombatState(character, getHitDiceTotal) {
  character.combat ??= {
    currentHp: character.maxHp ?? 0,
    tempHp: 0,
    currentHitDice: getHitDiceTotal(character),
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

  const hitDiceTotal = getHitDiceTotal(character);

  if (character.combat.currentHitDice == null) {
    const used = Number(character.combat.usedHitDice ?? 0);
    character.combat.currentHitDice = clamp(
      hitDiceTotal - used,
      0,
      hitDiceTotal
    );
    delete character.combat.usedHitDice;
  }

  character.combat.currentHitDice = clamp(
    Number(character.combat.currentHitDice ?? hitDiceTotal),
    0,
    hitDiceTotal
  );

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
}

export { clamp };
