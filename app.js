const SCREENS = document.querySelectorAll(".screen");
const CHOOSE_INSECT_BTNS = document.querySelectorAll(".choose-insect-btn");
const START_BTN = document.getElementById("start-btn");
const GAME_CONTAINER = document.getElementById("game-container");
const TIME_EL = document.getElementById("time");
const SCORE_EL = document.getElementById("score");
const MESSAGE = document.getElementById("message");
console.log(GAME_CONTAINER)

let seconds = 0,
  score = 0,
  selected_insect = {};

START_BTN.addEventListener("click", () => SCREENS[0].classList.add("up"));

CHOOSE_INSECT_BTNS.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_insect = { src, alt };
    SCREENS[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  TIME_EL.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createInsect() {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

  insect.addEventListener("click", catchInsect);

  GAME_CONTAINER.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchInsect() {
  this.classList.add("caught");
  increaseScore();
  setTimeout(() => this.remove(), 500);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1400);
}

function increaseScore() {
  score++;
  score > 19
    ? MESSAGE.classList.add("visible")
    : (SCORE_EL.innerHTML = `Score: ${score}`);
}
