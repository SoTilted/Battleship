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
    this.PreviousShots = [];
  }
  attack() {
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let hasAttacked = false;
    if (this.playerType === "Computer") {
      while (!hasAttacked) {
        let randomLetter = letters[Math.floor(Math.random() * 10)];
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        if (this.PreviousShots.indexOf(randomLetter + randomNumber) !== -1) {
          randomLetter = letters[Math.floor(Math.random() * 10)];
          randomNumber = Math.floor(Math.random() * 10);
        } else {
          hasAttacked = true;
          return [randomLetter, randomNumber];
        }
      }
    }
  }

  randomShipPlacement() {
    let randomStartingLetter = "";
    let randomStartingNumber = -1;
    let shipLength = -1;
    let randomOrientation = -1;
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let ship in this.ships) {
      let coordinates = [];
      let availability = false;
      shipLength = this.ships[ship].length;
      while (!availability) {
        randomOrientation = Math.floor(Math.random() * 2);
        if (randomOrientation === 0) {
          randomStartingLetter = Math.floor(Math.random() * 10);
          randomStartingNumber = Math.floor(Math.random() * (10 - shipLength));
        } else {
          randomStartingLetter = Math.floor(Math.random() * (10 - shipLength));
          randomStartingNumber = Math.floor(Math.random() * 10);
        }
        for (let i = 0; i < shipLength; i++) {
          if (randomOrientation === 0) {
            if (
              this.playerGameBoard.myBoard[letters[randomStartingLetter]][
                randomStartingNumber + i
              ] === ""
            ) {
              coordinates.push(
                letters[randomStartingLetter] + (randomStartingNumber + i + 1)
              );
            } else {
              coordinates = [];
              availability = false;
              break;
            }
            availability = true;
          } else {
            if (
              this.playerGameBoard.myBoard[letters[randomStartingLetter + i]][
                randomStartingNumber
              ] === ""
            ) {
              coordinates.push(
                letters[randomStartingLetter + i] + (randomStartingNumber + 1)
              );
            } else {
              coordinates = [];
              availability = false;
              break;
            }
            availability = true;
          }
        }
      }
      this.playerGameBoard.placeShip(this.ships[ship], coordinates);
    }
  }
}
