// import interact from 'interactjs'
const audio1 = require("./assets/water-plop.mp3");
const audio2 = require("./assets/boom.mp3");
export default function homeScreen(player1, player2) {
  document.querySelector(".content").innerHTML = "";
  let turn = 1;
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
  const startGameButton = document.querySelector("#Start");
  startGameButton.addEventListener("click", () => {
    player2.playerType = playerType.textContent;
    player1.name = document.querySelector(".player1 input").value;
    player2.name = document.querySelector(".player2 input").value;
    readyScreen([player1, player2], turn);
  });
}

function readyScreen(players, turn) {
  document.querySelector(".content").innerHTML = "";
  const readyScreenElement = document.createElement("div");
  readyScreenElement.classList.add("ready-screen");
  readyScreenElement.innerHTML = `
    <div>
    <h1>${players[turn - 1].name}</h1>
    <div class="gameboard"></div>
    </div>
    <div>
    <div class="ships-list">
      <div id ="Carrier" class="draggable" draggable="true" value = 5></div>
      <div id ="Battleship" class="draggable "draggable="true" value = 4></div>
      <div id ="Destroyer" class="draggable "draggable="true" value = 3></div>
      <div id ="Submarine" class="draggable "draggable="true" value = 3></div>
      <div id ="Patrol_Boat" class="draggable "draggable="true"value = 2></div>
    </div>
    <div class="buttons">
      <button id="ready">Ready!</button>
      <button class="orientation">Change orientation</button>
    </div>
    </div>`;
  createEmptyBoard(readyScreenElement.querySelector(".gameboard"));
  document.querySelector(".content").append(readyScreenElement);

  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", () => {
    passDeviceScreen(readyButton.id, turn, players);
  });

  const orientationButton = document.querySelector(".orientation");
  orientationButton.addEventListener("click", () => {
    let ships = document
      .querySelector(".ships-list")
      .querySelectorAll(".draggable");
    document.querySelector(".ships-list").style.flexDirection === "row"
      ? (document.querySelector(".ships-list").style.flexDirection = "column")
      : (document.querySelector(".ships-list").style.flexDirection = "row");
    for (let ship of ships) {
      let temp = ship.offsetHeight;
      ship.style.height = ship.offsetWidth + "px";
      ship.style.width = temp + "px";
    }
  });

  const allCells = document.querySelectorAll(".cell");
  const allShips = document.querySelectorAll(".draggable");
  allCells.forEach((el) => {
    document
    el.addEventListener("dragover", allowDrop);
    el.addEventListener("drop", drop);
  });

  allShips.forEach((el) => {
    el.addEventListener("dragstart", drag);
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
  <button id="myBoard">My Board</button>
  <div>
  <h1></h1>
  <div class="myBoard"></div>
  </div>
  <div>
  <h1></h1>
  <div class="enemyBoard"></div>
  </div>
  `;
  const showBoard = gameScreenElement.querySelector("button");
  showBoard.addEventListener("click", () => {
    if (showBoard.id === "myBoard") {
      myGameboard.parentElement.style.display = "none";
      enemyGameboard.parentElement.style.display = "block";
      showBoard.id = "enemyBoard";
      showBoard.textContent = " Enemy Board";
    } else {
      enemyGameboard.parentElement.style.display = "none";
      myGameboard.parentElement.style.display = "block";
      showBoard.id = "myBoard";
      showBoard.textContent = " My Board";
    }
  });
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
    myGameboard.previousElementSibling.textContent = players[playing].name;
    enemyGameboard.previousElementSibling.textContent =
      players[notPlaying].name;

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
          missAudio.volume = 0.1;
          missAudio.play();
        } else {
          let hitAudio = new Audio(audio2);
          hitAudio.volume = 0.04;
          hitAudio.play();
        }
        enemyGameboard.style.pointerEvents = "none";
        played = true;
        if (
          players[playing].playerGameBoard.gameOver() ||
          players[notPlaying].playerGameBoard.gameOver()
        ) {
          alert(
            players[playing].playerGameBoard.gameOver()
              ? `${players[playing].name} won!\nPress the bottom-right button to start a new game!`
              : `${players[notPlaying].name} won!\nPress the bottom-right button to start a new game!`
          );
          document.querySelector(".content").style.pointerEvents = "none";
        }
      });
    }
  }

  if (turn % 2 === 0) {
    currentlyPlaying(0, 1);
  } else {
    currentlyPlaying(1, 0);
  }
}

// testing drag and drop
function allowDrop(ev) {
  ev.preventDefault();
  if (ev.target.classList[0] === "cell") {
  }
}

function drag(ev) {
  // Get the target
  const target = ev.target;

  // Get the bounding rectangle of target
  const rect = target.getBoundingClientRect();

  // Mouse position
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;


  let pointOfContact = Math.floor((x / rect.width) * parseInt(ev.target.attributes['value'].value) + 1);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (
    ev.target.classList[0] === "cell"
  ) {
    //console.log(ev.target.id)
    //console.log(document.getElementById(data))
    document.getElementById(data).draggable = false;
    ev.target.appendChild(document.getElementById(data));
  }
}
