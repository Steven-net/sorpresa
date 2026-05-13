let cardId = 1;
let cards = [
  {
    id: cardId,
    sender: "Persona 1",
    relation: "Te estima mucho",
    msg: "Mensaje de feliz cumpleaños",
    emoji: "💖",
    color: "rose"
  }
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
  const name = document.getElementById("inp-name").value.trim() || "Nicole";
  const date = document.getElementById("inp-date").value.trim() || "";
  document.getElementById("hero-name").textContent = name;
  document.getElementById("hero-date").textContent = date;
  updateCounter();
}

function updateCounter() {
  const n = cards.length;
  const name = document.getElementById("inp-name")?.value.trim() || "Nicole";
  const label = n === 0
    ? "Sé la primera persona en escribirle"
    : n === 1
    ? `tenemos 1 mensajes para ${name}, espero te gusten `
    : `tenemos ${n} mensajes para ${name}, espero te gusten`;
  document.getElementById("hero-count").textContent = label;
}

async function addCard() {
  const sender   = document.getElementById("inp-sender").value.trim();
  const relation = document.getElementById("inp-relation").value.trim();
  const msg      = document.getElementById("inp-msg").value.trim();
  const emoji    = document.getElementById("inp-emoji").value;
  const color    = document.getElementById("inp-color").value;

  if (!sender || !msg) {
    alert("Por favor escribe el nombre y el mensaje.");
    return;
  }

  cardId++;
  cards.push({ cardId, sender, relation, msg, emoji, color });

  // Limpiar formulario
  document.getElementById("inp-sender").value   = "";
  document.getElementById("inp-relation").value = "";
  document.getElementById("inp-msg").value      = "";

  render();
  toggleAdmin();
  document.getElementById("cards-grid").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteCard(id) {
  if (!confirm("¿Eliminar este mensaje?")) return;
  cards = cards.filter(c => c.id !== id);
  render();
}

function render() {
  const grid       = document.getElementById("cards-grid");
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
      <button class="card-delete" onclick="deleteCard(${c.id})" title="Eliminar mensaje">✕</button>
      <span class="card-emoji">${c.emoji}</span>
      <div class="card-sender">${escapeHtml(c.sender)}</div>
      ${c.relation ? `<div class="card-relation">${escapeHtml(c.relation)}</div>` : ""}
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
});
