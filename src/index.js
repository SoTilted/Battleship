import { Ship, Gameboard, Player } from "./classes";
import {homeScreen,readyScreen} from "./DOM";
import "./style.css";

homeScreen();

const startGame = document.querySelector("#Start");
startGame.addEventListener("click", () => {
  const player1 = new Player("Player");
  player1.name = document.querySelector(".player1 input").value;
  const playerType = document.querySelector("#Start").textContent;
  const player2 = new Player(playerType);
  player2.name = document.querySelector(".player2 input").value;
  readyScreen([player1.name, player2.name], 1);
});
