function homeScreen() {
  const homeScreenElement = document.createElement("div");
  homeScreenElement.classList.add("home-screen");
  homeScreenElement.innerHTML = `
    <div class="player1">
        <h2>Player 1</h2>
        <input type="text" minlength="4">
    </div>
    <div class="player2">
        <h2>Player 2</h2>
        <input type="text" minlength="4">
        <button id="playertype">Player</button>
    </div>
  <button id="Start">Start</button>`;
  document.querySelector(".content").append(homeScreenElement);
  const playerType = homeScreenElement.querySelector("#playertype");
  playerType.addEventListener("click", () => {
    if (playerType.textContent === "Player") {
      playerType.textContent = "Computer";
      playerType.previousElementSibling.previousElementSibling.textContent =
        "Computer";
      playerType.previousElementSibling.style.display = "none";
      playerType.previousElementSibling.value = "computer";
    } else {
      playerType.textContent = "Player";
      playerType.previousElementSibling.previousElementSibling.textContent =
        "Player 2";
      playerType.previousElementSibling.style.display = "block";
      playerType.previousElementSibling.value = "";
    }
  });
}

function readyScreen(playerNames, turn) {
  document.querySelector(".content").innerHTML = "";
  const readyScreenElement = document.createElement("div");
  readyScreenElement.classList.add("ready-screen");
  readyScreenElement.innerHTML = `
    <h1>${playerNames[turn - 1]}</h1>
    <div class="gameboard"></div>
    <div class="ships-list"></div>
    <div class="buttons">
      <button id="ready">Ready!</button>
      <button class="orientation">Change orientation</button>
    </div>`;
  createEmptyBoard(readyScreenElement.querySelector(".gameboard"));
  document.querySelector(".content").append(readyScreenElement);
  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", () => {
    console.log(turn);
    passDeviceScreen(readyButton.id, turn, playerNames, readyScreen);
  });
}

function createEmptyBoard(grid) {
  const size = 10;
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      if (i === 0) {
        let gridCell = document.createElement("div");
        gridCell.id = j;
        let text = document.createElement("p");
        gridCell.style.pointerEvents = "none";
        text.textContent = j;
        gridCell.append(text);
        gridCell.classList.add("cell");
        grid.append(gridCell);
      } else if (j === 0) {
        let gridCell = document.createElement("div");
        gridCell.style.pointerEvents = "none";
        gridCell.id = letters[i - 1];
        let text = document.createElement("p");
        text.textContent = letters[i - 1];
        gridCell.append(text);
        gridCell.classList.add("cell");
        grid.append(gridCell);
      } else {
        let gridCell = document.createElement("div");
        gridCell.id = letters[i - 1] + j;
        gridCell.classList.add("cell");
        grid.append(gridCell);
      }
    }
  }
}

function passDeviceScreen(id, turn, playerNames, screen) {
  document.querySelector(".content").innerHTML = "";
  const passDeviceScreenElement = document.createElement("div");
  passDeviceScreenElement.classList.add("passDevice-screen");
  const label = document.createElement("div");
  label.classList.add("label");
  label.innerHTML = `<p>PASS DEVICE</p>`;
  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.id = id;
  continueButton.classList.add("Continue");
  document.querySelector(".content").appendChild(passDeviceScreenElement);
  passDeviceScreenElement.append(label, continueButton);
  continueButton.addEventListener("click", () => {
    if (continueButton.id === "ready" && turn === 1) {
      // passDeviceScreenElement.style.animation = "fadeOut 1s";
      turn++;
      screen(playerNames, turn);
    } else if (continueButton.id === "ready" && turn === 2) {
      continueButton.id = "nextPlayer";
    }
  });
}

export { homeScreen, readyScreen };
