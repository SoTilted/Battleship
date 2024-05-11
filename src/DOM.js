const audio1 = require("./assets/water-plop.mp3");
const audio2 = require("./assets/boom.mp3");
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

function readyScreen(players, turn) {
  document.querySelector(".content").innerHTML = "";
  const readyScreenElement = document.createElement("div");
  readyScreenElement.classList.add("ready-screen");
  readyScreenElement.innerHTML = `
    <h1>${players[turn - 1].name}</h1>
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
    passDeviceScreen(readyButton.id, turn, players);
  });
}

function createEmptyBoard(grid, whichBoard = "") {
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
        gridCell.id = whichBoard + letters[i - 1] + j;
        gridCell.classList.add("cell");
        grid.append(gridCell);
      }
    }
  }
}

function passDeviceScreen(id, turn, players) {
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
      readyScreen(players, turn);
    } else {
      document.querySelector(".content").innerHTML = "";
      gameScreen(players, turn);
    }
  });
}

function gameScreen(players, turn) {
  const gameScreenElement = document.createElement("div");
  gameScreenElement.innerHTML = `
  <div class="myBoard"></div>
  <div class="enemyBoard"></div>
  `;

  const myGameboard = gameScreenElement.querySelector(".myBoard");
  const enemyGameboard = gameScreenElement.querySelector(".enemyBoard");
  const nextTurnButton = document.createElement("button");
  gameScreenElement.classList.add("game-screen");
  nextTurnButton.id = "next-turn";
  nextTurnButton.textContent = "Next Turn!";
  document.querySelector(".content").append(gameScreenElement);
  document.querySelector(".content").append(nextTurnButton);
  let played = false;
  nextTurnButton.addEventListener("click", () => {
    if (played) {
      turn++;
      passDeviceScreen(nextTurnButton.id, turn, players);
    } else {
      alert(`You haven't made a move yet!`);
    }
  });

  createEmptyBoard(myGameboard, "m");
  createEmptyBoard(enemyGameboard, "e");

  function currentlyPlaying(playing, notPlaying) {
    for (let cellLetter in players[playing].playerGameBoard.myBoard) {
      for (
        let cellNumber = 0;
        cellNumber <=
        players[playing].playerGameBoard.myBoard[cellLetter].length;
        cellNumber++
      ) {
        if (
          players[playing].playerGameBoard.myBoard[cellLetter][cellNumber] ===
            "hit" ||
          players[playing].playerGameBoard.myBoard[cellLetter][cellNumber] ===
            "miss"
        ) {
          myGameboard
            .querySelector(`#m${cellLetter + (cellNumber + 1)}`)
            .classList.add(
              players[playing].playerGameBoard.myBoard[cellLetter][cellNumber]
            );
        } else if (
          typeof players[playing].playerGameBoard.myBoard[cellLetter][
            cellNumber
          ] === "object"
        ) {
          myGameboard
            .querySelector(`#m${cellLetter + (cellNumber + 1)}`)
            .classList.add("boat");
        }

        if (
          players[notPlaying].playerGameBoard.myBoard[cellLetter][
            cellNumber
          ] === "hit" ||
          players[notPlaying].playerGameBoard.myBoard[cellLetter][
            cellNumber
          ] === "miss"
        ) {
          enemyGameboard
            .querySelector(`#e${cellLetter + (cellNumber + 1)}`)
            .classList.add(
              players[notPlaying].playerGameBoard.myBoard[cellLetter][
                cellNumber
              ]
            );
        }
      }
    }

    myGameboard.style.pointerEvents = "none";
    let allCells = enemyGameboard.querySelectorAll("[id^=e]");
    for (let clickableCell of allCells) {
      clickableCell.addEventListener("click", () => {
        let letter = clickableCell.id[1];
        let number = parseInt(clickableCell.id.substr(2));
        players[notPlaying].playerGameBoard.receiveAttack(letter, number);
        enemyGameboard
          .querySelector(`#e${letter + number}`)
          .classList.add(
            players[notPlaying].playerGameBoard.myBoard[letter][number - 1]
          );
        if (
          players[notPlaying].playerGameBoard.myBoard[letter][number - 1] ===
          "miss"
        ) {
          let missAudio = new Audio(audio1);
          missAudio.volume = 0.05;
          missAudio.play();
        } else {
          let hitAudio = new Audio(audio2);
          hitAudio.volume = 0.01;
          hitAudio.play();
        }
        enemyGameboard.style.pointerEvents = "none";
        played = true;
      });
    }
  }

  if (turn % 2 === 0) {
    currentlyPlaying(0, 1);
  } else {
    currentlyPlaying(1, 0);
  }
}

export { homeScreen, readyScreen, gameScreen };
