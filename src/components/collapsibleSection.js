function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function collapsibleSection({
  id,
  title,
  content,
  collapsed = false,
  className = ""
}) {
  const safeId = escapeHtml(id);
  const safeTitle = escapeHtml(title);

  return `
    <section class="collapsible-section ${escapeHtml(className)} ${collapsed ? "is-collapsed" : ""}">
      <button
        type="button"
        class="collapsible-section-header"
        data-collapse-section="${safeId}"
        aria-expanded="${collapsed ? "false" : "true"}"
        aria-label="${collapsed ? "Розгорнути" : "Згорнути"} блок ${safeTitle}"
      >
        <strong>${safeTitle}</strong>
        <span class="collapsible-section-toggle" aria-hidden="true">${collapsed ? "›" : "⌄"}</span>
      </button>

      <div
        class="collapsible-section-content"
        data-collapse-content="${safeId}"
        ${collapsed ? "hidden" : ""}
      >
        ${content}
      </div>
    </section>
  `;
}
