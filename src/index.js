import { Player } from "./classes";
import { homeScreen, readyScreen, gameScreen } from "./DOM";
import "./style.css";

// const player1 = new Player("Player");
// const player2 = new Player("Player");

//////////////////////////////////////////
// this is temporary for testing.
const player1ShipPlacement = {
  Carrier: ["A1", "A2", "A3", "A4", "A5"],
  Battleship: ["H1", "H2", "H3", "H4"],
  Destroyer: ["B1", "C1", "D1"],
  Submarine: ["E6", "F6", "G6"],
  Patrol_Boat: ["J9", "J10"],
};
const player2ShipPlacement = {
  Carrier: ["B1", "B2", "B3", "B4", "B5"],
  Battleship: ["E1", "E2", "E3", "E4"],
  Destroyer: ["B6", "C6", "D6"],
  Submarine: ["C2", "C3", "C4"],
  Patrol_Boat: ["J1", "J2"],
};

///////////////////////////////////////
let turn = 1;
homeScreen();

const startGame = document.querySelector("#Start");
startGame.addEventListener("click", () => {
  const playerType = document.querySelector("#Start").textContent;
  const player1 = new Player("Player");
  const player2 = new Player(playerType);
  player1.name = document.querySelector(".player1 input").value;
  player2.name = document.querySelector(".player2 input").value;
  for (let ship in player1.ships) {
    player1.playerGameBoard.placeShip(
      player1.ships[ship],
      player1ShipPlacement[ship]
    );
    player2.playerGameBoard.placeShip(
      player2.ships[ship],
      player2ShipPlacement[ship]
    );
  }
  readyScreen([player1, player2], turn);
});

// gameScreen([player1, player2], turn);
