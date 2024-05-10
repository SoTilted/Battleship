import { Ship, Gameboard, Player } from "./src/classes";

it("Tests if  ship has been hit.", () => {
  const ship1 = new Ship(5);
  ship1.hit();
  expect(ship1.hits).toBe(1);
});

it("Tests if ship has been sunk.", () => {
  const ship2 = new Ship(2);
  ship2.hit();
  ship2.hit();
  ship2.isSunk();
  expect(ship2.sunk).toBe(true);
});

it("Tests if ship has been placed.", () => {
  const ship3 = new Ship(3);
  const Gameboard1 = new Gameboard();
  Gameboard1.placeShip(ship3, ["A1", "A2", "A3"]);
  expect(Gameboard1.myBoard).toStrictEqual({
    A: [ship3, ship3, ship3, "", "", "", "", "", "", ""],
    B: ["", "", "", "", "", "", "", "", "", ""],
    C: ["", "", "", "", "", "", "", "", "", ""],
    D: ["", "", "", "", "", "", "", "", "", ""],
    E: ["", "", "", "", "", "", "", "", "", ""],
    F: ["", "", "", "", "", "", "", "", "", ""],
    G: ["", "", "", "", "", "", "", "", "", ""],
    H: ["", "", "", "", "", "", "", "", "", ""],
    I: ["", "", "", "", "", "", "", "", "", ""],
    J: ["", "", "", "", "", "", "", "", "", ""],
  });
});

it("Tests if received attack is registered correctly.", () => {
    const ship4 = new Ship(2);
    const Gameboard2 = new Gameboard();
    Gameboard2.placeShip(ship4,['A1','A2'])
    Gameboard2.receiveAttack('A',2);
    expect(ship4.hits).toBe(1);
});

it ("Tests if players are created correctly.",()=>{
    const player1 = new Player('real');
    const player2 = new Player('computer');
    player1.name ='Jerry';
    player1.playerGameBoard.placeShip(player1.ships['Carrier'],['A1','A2','A3','A4','A5',]);
    player1.playerGameBoard.receiveAttack('A',1);
    expect(player1.name).toBe('Jerry');
    expect(player1.ships['Carrier'].hits).toBe(1)
})