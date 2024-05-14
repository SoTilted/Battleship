// drag and drop
let pointOfContact = 0;
let placedShips = [];
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
function allowDrop(ev) {
  // Responsible of coloring the grid on dragover depending on the leggallity of the move.
  ev.preventDefault();
  let ship;
  if (
    // checks if its a touch device(datatrasfer holds different values than originally)
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  ) {
    ship = document.querySelector(`#${ev.dataTransfer._data.text}`);
  } else {
    ship = ev.dataTransfer.mozSourceNode;
  }
  let [result, coordinates] = checkCellsAvailability(ship, [
    ev.target.id[0],
    parseInt(ev.target.id.slice(1)),
  ]);
  document.querySelectorAll(".cell").forEach((element) => {
    // checks all cells,then adds or removes the correct classes accordingly
    let classList = [...element.classList];
    if (coordinates.includes(element)) {
      if (classList.includes("draggedOverNegative")) {
        element.classList.remove("draggedOverNegative");
      }
      if (classList.includes("draggedOver")) {
        element.classList.remove("draggedOver");
      }
      result
        ? element.classList.add("draggedOver")
        : element.classList.add("draggedOverNegative");
    } else {
      if (classList.includes("draggedOverNegative")) {
        element.classList.remove("draggedOverNegative");
      }
      if (classList.includes("draggedOver")) {
        element.classList.remove("draggedOver");
      }
    }
  });
}

function drag(ev) {
  // Responsible for setting where you grabbed the ship
  // Get the target
  const target = ev.target;

  // Get the bounding rectangle of target
  const rect = target.getBoundingClientRect();

  // Mouse position
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;
  if (document.querySelector(".orientation").classList[1] === "horizontal") {
    pointOfContact = Math.floor(
      (x / rect.width) * parseInt(ev.target.attributes["value"].value) + 1
    );
  } else {
    pointOfContact = Math.floor(
      (y / rect.height) * parseInt(ev.target.attributes["value"].value) + 1
    );
  }
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  // Responsible for dropping the dragged element if it passes the availability function check
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.classList[0] === "cell") {
    let ship = document.getElementById(data);
    let [result, coordinates] = checkCellsAvailability(ship, [
      ev.target.id[0],
      parseInt(ev.target.id.slice(1)),
    ]);

    if (result) {
      placedShips.push(ship);
      ship.draggable = false;
      ship.classList.remove("draggable");
      ship.parentElement.removeChild(ship);
      coordinates.forEach((element) => {
        element.classList.remove("draggedOver");
        element.classList.add("occupied");
        element.value = ship.id;
      });
    } else {
      coordinates.forEach((element) => {
        if (element !== null) {
          element.classList.remove("draggedOverNegative");
        }
      });
    }
  }
}

function checkCellsAvailability(ship, cell) {
  let result = false;
  let counter = 0;
  const columnCoordinates = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const shipLength = parseInt(ship.attributes["value"].value);
  const shipOrientation = document.querySelector(".orientation").classList[1];
  const finalCoordinates = [];

  if (shipOrientation === "horizontal") {
    for (let i = -pointOfContact + 1; i <= shipLength - pointOfContact; i++) {
      finalCoordinates.push(
        document.querySelector(`#${cell[0] + (cell[1] + i)}`)
      ); // I push the coordinates regardless of legal or illegal moves
      // because i want to know them for the dragover
      if (document.querySelector(`#${cell[0] + (cell[1] + i)}`) === null) {
        counter++; // I don't break and set result to false from here
        continue; // because i want the wrong coordinates for the dragover
      }
      if (
        // check if i am out of bounds or if a cell is already occupied.
        cell[1] + i >= 0 &&
        cell[1] + i <= 10 &&
        ![
          ...document.querySelector(`#${cell[0] + (cell[1] + i)}`).classList,
        ].includes("occupied")
      ) {
        result = true;
      } else {
        counter++;
      }
    }
    if (counter === 0) {
    } else {
      result = false;
    }
    return [result, finalCoordinates];
  } else {
    //same thing for vertical orientation
    for (let i = -pointOfContact + 1; i <= shipLength - pointOfContact; i++) {
      finalCoordinates.push(
        document.querySelector(
          `#${
            columnCoordinates[columnCoordinates.indexOf(cell[0]) + i] + cell[1]
          }`
        )
      );
      if (
        document.querySelector(
          `#${
            columnCoordinates[columnCoordinates.indexOf(cell[0]) + i] + cell[1]
          }`
        ) === null
      ) {
        counter++;
        continue;
      }
      if (
        columnCoordinates.indexOf(cell[0]) + i >= 0 &&
        columnCoordinates.indexOf(cell[0]) + i <= 10 &&
        ![
          ...document.querySelector(
            `#${
              columnCoordinates[columnCoordinates.indexOf(cell[0]) + i] +
              cell[1]
            }`
          ).classList,
        ].includes("occupied")
      ) {
        result = true;
      } else {
        counter++;
      }
    }
    if (counter === 0) {
    } else {
      result = false;
    }
    return [result, finalCoordinates];
  }
}

export { allowDrop, drag, drop, placedShips };
