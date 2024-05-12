import  Player  from "./classes";
import  homeScreen  from "./DOM";
import "./style.css";
import './DragDropTouch'
//////////////////////////////////////////
// this is temporary for testing.
//const player1 = new Player("Player");
//const player2 = new Player("Player");
// player1.name = "jerry";
// player2.name = "kekw";
// const player1ShipPlacement = {
//   Carrier: ["A1", "A2", "A3", "A4", "A5"],
//   Battleship: ["H1", "H2", "H3", "H4"],
//   Destroyer: ["B1", "C1", "D1"],
//   Submarine: ["E6", "F6", "G6"],
//   Patrol_Boat: ["J9", "J10"],
// };
// const player2ShipPlacement = {
//   Carrier: ["B1", "B2", "B3", "B4", "B5"],
//   Battleship: ["E1", "E2", "E3", "E4"],
//   Destroyer: ["B6", "C6", "D6"],
//   Submarine: ["C2", "C3", "C4"],
//   Patrol_Boat: ["J1", "J2"],
// };
// for (let ship in player1.ships) {
//   player1.playerGameBoard.placeShip(
//     player1.ships[ship],
//     player1ShipPlacement[ship]
//   );
//   player2.playerGameBoard.placeShip(
//     player2.ships[ship],
//     player2ShipPlacement[ship]
//   );
// }
///////////////////////////////////////
window.addEventListener('load',homeScreen(new Player("Player"), new Player()))

const newGameButton = document.querySelector("#newGame");
newGameButton.addEventListener("click", () => {
  document.querySelector("dialog").showModal();
});

const startNewGameButton = document.querySelector("#confirmBtn");
startNewGameButton.addEventListener("click", (e) => {
  e.preventDefault();
  homeScreen(new Player("Player"), new Player());
  document.querySelector("dialog").close();
});
