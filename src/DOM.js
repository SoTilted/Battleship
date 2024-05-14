// import interact from 'interactjs'
import { allowDrop, drag, drop, placedShips } from "./DragAndDrop";
const audio1 = require("./assets/water-plop.mp3");
const audio2 = require("./assets/boom.mp3");

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

function createReadyScreenDOM(players, turn) {
  let readyScreenElement = document.createElement("div");
  readyScreenElement.classList.add("ready-screen");
  readyScreenElement.innerHTML = `
    <div>
    <h1>${players[turn - 1].name}</h1>
    <div class="gameboard"></div>
    </div>
    <div>
    <div class="ships-list">
      <div id ="Carrier" class="draggable horizontal" draggable="true" value = 5></div>
      <div id ="Battleship" class="draggable horizontal"draggable="true" value = 4></div>
      <div id ="Destroyer" class="draggable horizontal"draggable="true" value = 3></div>
      <div id ="Submarine" class="draggable horizontal"draggable="true" value = 3></div>
      <div id ="Patrol_Boat" class="draggable horizontal"draggable="true"value = 2></div>
    </div>
    <div class="buttons">
      <button id="ready">Ready!</button>
      <button class="orientation horizontal">Change orientation</button>
      <button class="remove-ship">remove last ship</button>

    </div>
    </div>`;
  createEmptyBoard(readyScreenElement.querySelector(".gameboard"));
  const allCells = readyScreenElement.querySelectorAll(".cell");
  allCells.forEach((el) => {
    readyScreenElement;
    el.addEventListener("dragover", allowDrop);
    el.addEventListener("drop", drop);
  });

  const allShips = readyScreenElement.querySelectorAll(".draggable");
  allShips.forEach((el) => {
    el.addEventListener("dragstart", drag);
  });
  return readyScreenElement;
}

function createPassDeviceScreenDOM(id) {
  let passDeviceScreenElement = document.createElement("div");
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
  return continueButton;
}

function createGameScreenDOM() {
  const content = document.querySelector(".content");
  let gameScreenElement = document.createElement("div");
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
  gameScreenElement.classList.add("game-screen");
  const myGameboard = gameScreenElement.querySelector(".myBoard");
  const enemyGameboard = gameScreenElement.querySelector(".enemyBoard");
  createEmptyBoard(myGameboard, "m");
  createEmptyBoard(enemyGameboard, "e");
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
  content.append(gameScreenElement);

  return [myGameboard, enemyGameboard];
}

function readyScreen(players, turn) {
  const content = document.querySelector(".content");
  content.innerHTML = "";
  const readyScreenElement = createReadyScreenDOM(players, turn);
  content.append(readyScreenElement);
  // Add listeners/functionallity
  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", () => {
    if (placedShips.length === 5) {
      let allShipCoordinates = document.querySelectorAll(".occupied");
      allShipCoordinates.forEach((element) => {
        let letter = element.id[0];
        let number = element.id.slice(1);
        players[turn - 1].playerGameBoard.myBoard[letter][number - 1] =
          players[turn - 1].ships[element.value];
      });
      for (let i = 0; i < 5; i++) {
        // cannot do placedShips =[] because I import it.
        placedShips.pop();
      }
      if (players[1].playerType === "Computer") {
        content.innerHTML = "";
        players[1].randomShipPlacement();
        gameScreenVsComputer(players, turn);
      } else {
        passDeviceScreen(readyButton.id, turn, players);
      }
    } else {
      alert(`You haven't placed all your ships!`);
    }
  });
  const orientationButton = document.querySelector(".orientation");
  orientationButton.addEventListener("click", () => {
    if (orientationButton.classList[1] === "horizontal") {
      document.querySelectorAll(".horizontal").forEach((element) => {
        element.classList.remove("horizontal");
        element.classList.add("vertical");
      });
    } else {
      document.querySelectorAll(".vertical").forEach((element) => {
        element.classList.remove("vertical");
        element.classList.add("horizontal");
      });
    }

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
  const deleteLastShipButton = document.querySelector(".remove-ship");
  deleteLastShipButton.addEventListener("click", () => {
    if (placedShips.length > 0) {
      let ship = placedShips.pop();
      const helper = () => ship; // i need this to pass ship to forEach.
      document.querySelector(".ships-list").appendChild(ship);
      ship.draggable = true;
      if (
        ship.classList[0] !==
        document.querySelector(".orientation").classList[1]
      ) {
        ship.classList.remove(ship.classList[0]);
        ship.classList.add(document.querySelector(".orientation").classList[1]);
        let temp = ship.offsetHeight;
        ship.style.height = ship.offsetWidth + "px";
        ship.style.width = temp + "px";
      }
      ship.classList.add("draggable");
      let allCells = document.querySelectorAll(".cell");
      allCells.forEach((element) => {
        ship = helper(ship);
        if (element.value === ship.id) {
          element.classList.remove("occupied");
        }
      });
    }
  });
}

function passDeviceScreen(id, turn, players) {
  const content = document.querySelector(".content");
  content.innerHTML = "";
  const continueButton = createPassDeviceScreenDOM(id);
  continueButton.addEventListener("click", () => {
    if (continueButton.id === "ready" && turn === 1) {
      turn++;
      readyScreen(players, turn);
    } else {
      content.innerHTML = "";
      gameScreen(players, turn);
    }
  });
}

function gameScreen(players, turn) {
  const [myGameboard, enemyGameboard] = createGameScreenDOM();

  let played = false;
  const nextTurnButton = document.createElement("button");
  nextTurnButton.id = "next-turn";
  nextTurnButton.textContent = "Next Turn!";
  document.querySelector(".content").append(nextTurnButton);
  nextTurnButton.addEventListener("click", () => {
    if (played) {
      turn++;
      passDeviceScreen(nextTurnButton.id, turn, players);
    } else {
      alert(`You haven't made a move yet!`);
    }
  });

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
              ? `${players[notPlaying].name} won!\nPress the bottom-right button to start a new game!`
              : `${players[playing].name} won!\nPress the bottom-right button to start a new game!`
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

function gameScreenVsComputer(players) {
  const [myGameboard, enemyGameboard] = createGameScreenDOM();
  myGameboard.previousElementSibling.textContent = players[0].name;
  enemyGameboard.previousElementSibling.textContent = players[1].name;
  myGameboard.style.pointerEvents = "none";
  for (let cellLetter in players[0].playerGameBoard.myBoard) {
    for (
      let cellNumber = 0;
      cellNumber <= players[0].playerGameBoard.myBoard[cellLetter].length;
      cellNumber++
    ) {
      if (
        typeof players[0].playerGameBoard.myBoard[cellLetter][cellNumber] ===
        "object"
      ) {
        myGameboard
          .querySelector(`#m${cellLetter + (cellNumber + 1)}`)
          .classList.add("boat");
      }
    }
  }
  const allCells = enemyGameboard.querySelectorAll("[id^=e]");
  allCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      let letter = cell.id[1];
      let number = parseInt(cell.id.substr(2));
      players[1].playerGameBoard.receiveAttack(letter, number);
      enemyGameboard
        .querySelector(`#e${letter + number}`)
        .classList.add(players[1].playerGameBoard.myBoard[letter][number - 1]);
      if (players[1].playerGameBoard.myBoard[letter][number - 1] === "miss") {
        let missAudio = new Audio(audio1);
        missAudio.volume = 0.1;
        missAudio.play();
      } else {
        let hitAudio = new Audio(audio2);
        hitAudio.volume = 0.04;
        hitAudio.play();
      }
      enemyGameboard.style.pointerEvents = "none";
      // played = true;
      if (
        players[0].playerGameBoard.gameOver() ||
        players[1].playerGameBoard.gameOver()
      ) {
        alert(
          players[0].playerGameBoard.gameOver()
            ? `${players[1].name} won!\nPress the bottom-right button to start a new game!`
            : `${players[0].name} won!\nPress the bottom-right button to start a new game!`
        );

        document.querySelector(".content").style.pointerEvents = "none";
      } else {
        setTimeout(() => {
          computerAttacks(players[0], players[1]);
        }, 2000);
      }
    });
  });
}
function computerAttacks(player, computer) {
  let [letter, number] = computer.attack();
  computer.PreviousShots.push(letter + number);
  player.playerGameBoard.receiveAttack(letter, number);
  document
    .querySelector(`#m${letter + number}`)
    .classList.add(player.playerGameBoard.myBoard[letter][number - 1]);
  if (player.playerGameBoard.myBoard[letter][number - 1] === "miss") {
    let missAudio = new Audio(audio1);
    missAudio.volume = 0.1;
    missAudio.play();
  } else {
    let hitAudio = new Audio(audio2);
    hitAudio.volume = 0.04;
    hitAudio.play();
  }
  if (
    player.playerGameBoard.gameOver() ||
    computer.playerGameBoard.gameOver()
  ) {
    alert(
      player.playerGameBoard.gameOver()
        ? `${computer.name} won!\nPress the bottom-right button to start a new game!`
        : `${player.name} won!\nPress the bottom-right button to start a new game!`
    );
    document.querySelector(".enemyBoard").style.pointerEvents = "none";
  }
  document.querySelector(".enemyBoard").style.pointerEvents = "";
}

export default function homeScreen(player1, player2) {
  document.querySelector(".content").innerHTML = "";
  let turn = 1;
  const homeScreenElement = document.createElement("div");
  homeScreenElement.classList.add("home-screen");
  homeScreenElement.innerHTML = `
    <div class="player1">
        <h2>Player 1</h2>
        <input type="text" maxlength="12">
    </div>
    <div class="player2">
        <h2>Player 2</h2>
        <input type="text" maxlength="12">
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
    if (
      player1.name.length === 0 ||
      player2.name.length === 0 ||
      player1.name.match(/^ *$/) !== null ||
      player2.name.match(/^ *$/) !== null
    ) {
      alert("You cannot have a blank name!");
    } else {
      readyScreen([player1, player2], turn);
    }
  });
}
