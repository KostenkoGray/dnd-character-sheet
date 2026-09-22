// =========================================
// Нижня навігація
// =========================================

export function bottomNavigation(activeScreen) {

  const screens = [
    { id: "sheet", icon: "📋", label: "Sheet" },
    { id: "combat", icon: "⚔️", label: "Combat" },
    { id: "inventory", icon: "🎒", label: "Bag" },
    { id: "magic", icon: "✨", label: "Magic" },
    { id: "dice", icon: "🎲", label: "Dice" },
    { id: "notes", icon: "📝", label: "Notes" }
  ];

  return `
    <nav class="bottom-navigation">
      ${screens.map(screen => `
        <button
          class="nav-item ${activeScreen === screen.id ? "active" : ""}"
          data-screen="${screen.id}"
        >
          <span class="nav-icon">${screen.icon}</span>
          <span class="nav-label">${screen.label}</span>
        </button>
      `).join("")}
    </nav>
  `;
}