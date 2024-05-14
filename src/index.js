import Player from "./classes";
import homeScreen from "./DOM";
import "./style.css";
import "./DragDropTouch";

window.addEventListener("load", homeScreen(new Player("Player"), new Player()));

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


