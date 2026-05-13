let cards = [
  /* {
    id: 1,
    sender: "Persona 1",
    relation: "Te estima mucho",
    msg: "Mensaje de feliz cumpleaños",
    emoji: "💖",
    color: "rose"
  } */
];

function createParticles() {
  const container = document.getElementById("particles");
  const colors = ["#c9973a", "#f0ddb8", "#f9e0e6", "#d8f0e8", "#ece0f8"];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("div");
    el.className = "particle";
    const size = Math.random() * 18 + 6;
    el.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 18 + 12}s;
      animation-delay:${Math.random() * 14}s;
    `;
    container.appendChild(el);
  }
}

function updateHero() {
  document.getElementById("hero-date").textContent = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  updateCounter();
}

function updateCounter() {
  const n = cards.length;
  const label = n === 0
    ? "Sé la primera persona en escribirle"
    : `tenemos ${n} mensajes para Nicole, espero te gusten`;
  document.getElementById("hero-count").textContent = label;
}

function render() {
  const grid = document.getElementById("cards-grid");
  const emptyState = document.getElementById("empty-state");

  if (cards.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.add("visible");
    updateCounter();
    return;
  }

  emptyState.classList.remove("visible");
  grid.innerHTML = cards.map(c => `
    <div class="msg-card card-color-${c.color}">
      <span class="card-emoji">${c.emoji}</span>
      <div class="card-sender">${escapeHtml(c.sender)}</div>
      <div class="card-relation">${escapeHtml(c.relation)}</div>
      <div class="card-msg">${escapeHtml(c.msg)}</div>
    </div>
  `).join("");

  updateCounter();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", async () => {
  createParticles();
  updateHero();
  render();
});
