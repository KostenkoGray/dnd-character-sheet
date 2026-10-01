import { COIN_ORDER, COINS } from "../data/currencyData.js";
import { getWallet, getWalletGoldValue } from "../services/currencyService.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatGoldValue(value) {
  const rounded = Math.round(Number(value) * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export function wallet(character) {
  const coins = getWallet(character);
  const totalGold = getWalletGoldValue(character);

  const rows = COIN_ORDER.map(coinId => {
    const coin = COINS[coinId];
    const item = coins.find(entry => entry.id === coinId);

    return `
      <div class="wallet-coin-row">
        <div class="wallet-coin-name">
          <strong>${escapeHtml(coin.short)}</strong>
          <span>${escapeHtml(coin.ukr)}</span>
        </div>

        <div class="wallet-coin-counter">
          <button
            type="button"
            class="wallet-counter-button"
            data-wallet-action="minus"
            data-wallet-coin="${escapeHtml(coinId)}"
            aria-label="Зменшити ${escapeHtml(coin.ukr)}"
          >−</button>

          <button
            type="button"
            class="wallet-coin-amount"
            data-wallet-action="set"
            data-wallet-coin="${escapeHtml(coinId)}"
            aria-label="Ввести кількість ${escapeHtml(coin.ukr)}"
          >
            ${item.amount}
          </button>

          <button
            type="button"
            class="wallet-counter-button"
            data-wallet-action="plus"
            data-wallet-coin="${escapeHtml(coinId)}"
            aria-label="Збільшити ${escapeHtml(coin.ukr)}"
          >+</button>
        </div>
      </div>
    `;
  }).join("");

  return `
    <section class="combat-section wallet-section">
      <div class="wallet-header">
        <div>
          <h2>Гаманець</h2>
          <span>Загалом ≈ ${formatGoldValue(totalGold)} GP</span>
        </div>

        <button
          type="button"
          class="wallet-help-button"
          data-wallet-action="help"
          aria-label="Пояснення щодо монет"
        >?</button>
      </div>

      <div class="wallet-coin-list">
        ${rows}
      </div>
    </section>
  `;
}
