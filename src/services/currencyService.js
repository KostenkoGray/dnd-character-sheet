import { COIN_ORDER, COINS, EMPTY_WALLET } from "../data/currencyData.js";

function normalizeAmount(value) {
  const number = Number(value);
  return Number.isFinite(number)
    ? Math.max(0, Math.floor(number))
    : 0;
}

export function ensureWallet(character) {
  if (!character || typeof character !== "object") {
    return character;
  }

  character.currency ??= {};

  for (const coinId of COIN_ORDER) {
    character.currency[coinId] = normalizeAmount(
      character.currency[coinId] ?? EMPTY_WALLET[coinId]
    );
  }

  return character;
}

export function getWallet(character) {
  ensureWallet(character);

  return COIN_ORDER.map(coinId => ({
    ...COINS[coinId],
    amount: character.currency[coinId]
  }));
}

export function adjustCoin(character, coinId, delta) {
  ensureWallet(character);

  if (!COINS[coinId]) {
    return {
      ok: false,
      message: "Невідомий номінал монети."
    };
  }

  const next = normalizeAmount(
    Number(character.currency[coinId] ?? 0) + Number(delta ?? 0)
  );

  character.currency[coinId] = next;

  return {
    ok: true,
    coinId,
    amount: next
  };
}

export function setCoinAmount(character, coinId, amount) {
  ensureWallet(character);

  if (!COINS[coinId]) {
    return {
      ok: false,
      message: "Невідомий номінал монети."
    };
  }

  const next = normalizeAmount(amount);
  character.currency[coinId] = next;

  return {
    ok: true,
    coinId,
    amount: next
  };
}

export function getWalletGoldValue(character) {
  ensureWallet(character);

  return COIN_ORDER.reduce(
    (total, coinId) =>
      total + character.currency[coinId] * COINS[coinId].goldValue,
    0
  );
}

export function setWalletCurrency(character, coins = {}) {
  character.currency = {
    ...EMPTY_WALLET,
    ...(coins ?? {})
  };

  ensureWallet(character);
  return character.currency;
}

export function getCoinDefinition(coinId) {
  return COINS[coinId] ?? null;
}
