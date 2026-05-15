let cards = [
  /* {
    id: 1,
    sender: "Persona 1",
    relation: "Te estima mucho",
    msg: "Mensaje de feliz cumpleaños",
    emoji: "💖",
    color: "rose"
  } */
    {
      id:1,
      sender:"Justin David",
      relation:"Traductor de mentirosos(amigo)",
      msg:"Nicol, desde esa vez que dijiste para hacer grupo y sacaste ese cúter, no dude ni una vez que la amistad que se formaría sería la más loca y creo que pura que pueda tener, eres una buena amiga, muchas veces estuviste ahí escuchando jsjsjs.Quiero desearte en este día tan especial un feliz cumpleaños, mereces todo lo bueno, sientete orgullosa de todo lo que has avanzado a pesar de muchas cosas, esas cosas que no cuentas y te las guardas, eres una exelente mujer y una muy buena persona. FELIZ CUMPLEAÑOS 🎂!!!!",
      emoji:"🎉",
      color:"gold"
    },
    {
      id:2,
      sender:"Anibal",
      relation:"El abuelo de FC",
      msg:"Nicole, Feliz cumple espero q la pases super en esos días. Que sigas esforzándote como siempre, se admira tu dedicación y empeño q le pones a tus estudios. Una anécdota más loca contigo es los maltratos que propicias a mi pata Steven...Ya suéltalo mano eso es maltrato JAJAJAJAJA. Ya a fin de año q liquide o antes, salimos otra vez para una comida con el grupito, dile a Ethan q se deje de hechar semen en la cabeza.... JAJAJAJA ",
      emoji:"🎂",
      color:"sky"
    },
    {
      id:3,
      sender:"Jose",
      relation:"Wawa",
      msg:"¡Feliz cumple, Nicole!  Espero que disfrutes mucho tu día. Eres una gran amiga y una persona increíble. Fue de lo más divertido llevar lab contigo y Justino; ojalá se repita pronto para volver a bajar pepita y, ni qué decir, de esos días de amanecida, aquella ves que fuimos al cine con el código o  al tontito FC, simplemente  diversión pura jsisj ＼(￣▽￣)／   Espero que te haya ido súper bien en los parciales. ¡Un abrazote! (っ.❛ ─ ❛.)っ    P.D.: Piedad con mis cachetes, no los aplastes tan fuerte que me lele... (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)ゞ*",
      emoji:"⭐",
      color:"rose"
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
