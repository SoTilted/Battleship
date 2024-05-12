class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.sunk) {
      this.hits++;
    }
    this.isSunk();
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }
}

class Gameboard {
  constructor() {
    this.myBoard = {
      A: ["", "", "", "", "", "", "", "", "", ""],
      B: ["", "", "", "", "", "", "", "", "", ""],
      C: ["", "", "", "", "", "", "", "", "", ""],
      D: ["", "", "", "", "", "", "", "", "", ""],
      E: ["", "", "", "", "", "", "", "", "", ""],
      F: ["", "", "", "", "", "", "", "", "", ""],
      G: ["", "", "", "", "", "", "", "", "", ""],
      H: ["", "", "", "", "", "", "", "", "", ""],
      I: ["", "", "", "", "", "", "", "", "", ""],
      J: ["", "", "", "", "", "", "", "", "", ""],
    };
    this.ships = 5;
  }
  placeShip(ship, coordinates) {
    for (let counter = 0; counter < ship.length; counter++) {
      this.myBoard[coordinates[counter][0]][
        parseInt(coordinates[counter].substr(1) - 1)
      ] = ship;
    }
  }
  receiveAttack(letter, number) {
    if (typeof this.myBoard[letter][number - 1] === "object") {
      this.myBoard[letter][number - 1].hit();
      if (this.myBoard[letter][number - 1].sunk) {
        this.ships--;
      }
      this.myBoard[letter][number - 1] = "hit";
    } else {
      this.myBoard[letter][number - 1] = "miss";
    }
  }
  gameOver() {
    if (this.ships === 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default class Player {
  constructor(playerType) {
    this.playerType = playerType;
    this.playerGameBoard = new Gameboard();
    this.name;
    this.ships = {
      Carrier: new Ship(5),
      Battleship: new Ship(4),
      Destroyer: new Ship(3),
      Submarine: new Ship(3),
      Patrol_Boat: new Ship(2),
    };
  }
}

