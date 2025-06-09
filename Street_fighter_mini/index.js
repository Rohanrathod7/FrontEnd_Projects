let fighters = ["🐉", "🐥", "🐊","💩", "🦍", "🐢", "🐩", "🦭", "🦀", "🐝", "🤖", "🐘", "🐸", "🕷","🐆", "🦕", "🦁"];

let fighter1El = document.getElementById("fighter1");
let fighter2El = document.getElementById("fighter2");
let health1El = document.getElementById("health1");
let health2El = document.getElementById("health2");
let fightButton = document.getElementById("fightButton");
let winnerMessage = document.getElementById("winnerMessage");
let score1El = document.getElementById("score1");
let score2El = document.getElementById("score2");

let health1 = 100;
let health2 = 100;
let score1 = 0;
let score2 = 0;
let fightInProgress = false;

function pickFighters() {
  let i = Math.floor(Math.random() * fighters.length);
  let j;
  do {
    j = Math.floor(Math.random() * fighters.length);
  } while (j === i);  // avoid same fighter vs itself

  fighter1El.textContent = fighters[i];
  fighter2El.textContent = fighters[j];
  
  health1 = 100;
  health2 = 100;
  updateHealthBars();
  winnerMessage.textContent = "";
  fightButton.textContent = "Fight!";
  fightInProgress = true;
}

function updateHealthBars() {
  health1El.style.width = health1 + "%";
  health2El.style.width = health2 + "%";
  
  if (health1 <= 30) {
    health1El.style.background = "#e74c3c"; // red when low health
  } else {
    health1El.style.background = "#4caf50"; // green normal
  }
  
  if (health2 <= 30) {
    health2El.style.background = "#e74c3c";
  } else {
    health2El.style.background = "#4caf50";
  }
}

function shakeFighter(fighterEl) {
  fighterEl.classList.add("shake");
  setTimeout(() => {
    fighterEl.classList.remove("shake");
  }, 300);
}

function fightRound() {
  if (!fightInProgress) return;

  // Random damage from 5 to 20
  let damage1 = Math.floor(Math.random() * 16) + 5;
  let damage2 = Math.floor(Math.random() * 16) + 5;

  // Alternate turns - randomly choose who hits first
  if (Math.random() < 0.5) {
    health2 -= damage1;
    shakeFighter(fighter2El);
    if (health2 <= 0) {
      health2 = 0;
      fightInProgress = false;
      winnerMessage.textContent = "Player 1 Wins! 🎉";
      score1++;
      score1El.textContent = score1;
      fightButton.textContent = "Pick Fighters!";
      return;
    }

    health1 -= damage2;
    shakeFighter(fighter1El);
    if (health1 <= 0) {
      health1 = 0;
      fightInProgress = false;
      winnerMessage.textContent = "Player 2 Wins! 🎉";
      score2++;
      score2El.textContent = score2;
      fightButton.textContent = "Pick Fighters!";
      return;
    }
  } else {
    health1 -= damage2;
    shakeFighter(fighter1El);
    if (health1 <= 0) {
      health1 = 0;
      fightInProgress = false;
      winnerMessage.textContent = "Player 2 Wins! 🎉";
      score2++;
      score2El.textContent = score2;
      fightButton.textContent = "Pick Fighters!";
      return;
    }

    health2 -= damage1;
    shakeFighter(fighter2El);
    if (health2 <= 0) {
      health2 = 0;
      fightInProgress = false;
      winnerMessage.textContent = "Player 1 Wins! 🎉";
      score1++;
      score1El.textContent = score1;
      fightButton.textContent = "Pick Fighters!";
      return;
    }
  }
  
  updateHealthBars();
}

fightButton.addEventListener("click", () => {
  if (!fightInProgress) {
    pickFighters();
  } else {
    fightRound();
  }
});
