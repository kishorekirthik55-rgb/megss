// ===== audio play / pause =====
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const iconPlay = playBtn.querySelector(".icon-play");
const iconPause = playBtn.querySelector(".icon-pause");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playBtn.classList.add("is-playing");
  iconPlay.style.display = "none";
  iconPause.style.display = "block";
  playBtn.setAttribute("aria-label", "Pause the message");
});

function setToPaused() {
  playBtn.classList.remove("is-playing");
  iconPlay.style.display = "block";
  iconPause.style.display = "none";
  playBtn.setAttribute("aria-label", "Play the message");
}

audio.addEventListener("pause", setToPaused);
audio.addEventListener("ended", setToPaused);

// ===== ambient particles =====
const field = document.getElementById("particles");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const items = [
  { type: "emoji", value: "🤍" },
  { type: "emoji", value: "🌸" },
  { type: "emoji", value: "🦋" },
  { type: "emoji", value: "💗 " }
];

const COUNT = reduceMotion ? 0 : (window.innerWidth < 500 ? 14 : 22);

function spawnParticle() {
  const item = items[Math.floor(Math.random() * items.length)];
  let el;

  if (item.type === "image") {
    el = document.createElement("img");
    el.src = item.src;
    el.className = "particle heart-png";
  } else {
    el = document.createElement("span");
    el.className = "particle";
    el.textContent = item.value;
  }

  const size = 10 + Math.random() * 16;
  const left = Math.random() * 100;
  const duration = 10 + Math.random() * 12;
  const delay = Math.random() * -20;
  const drift = (Math.random() * 60 - 30) + "px";

  el.style.left = left + "vw";
  if (item.type === "image") {
    el.style.width = size + "px";
  } else {
    el.style.fontSize = size + "px";
  }
  el.style.setProperty("--drift", drift);
  el.style.animationDuration = duration + "s";
  el.style.animationDelay = delay + "s";

  field.appendChild(el);
}

for (let i = 0; i < COUNT; i++) spawnParticle();