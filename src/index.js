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

const content = document.querySelector(".content");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");

content.addEventListener("dragend", mouseOutOfBounds);
header.addEventListener("dragend", mouseOutOfBounds);
footer.addEventListener("dragend", mouseOutOfBounds);

function mouseOutOfBounds() {
  // When a ship is dragged over the grid and out of bounds, it clears
  // the classes so the grid doesn't stay wrongly coloured.
  const allCells = document.querySelectorAll(".cell");
  if (allCells !== null) {
    allCells.forEach((element) => {
      let classList = [...element.classList];
      if (classList.includes("draggedOverNegative")) {
        element.classList.remove("draggedOverNegative");
      }
      if (classList.includes("draggedOver")) {
        element.classList.remove("draggedOver");
      }
    });
  }
}
