import "./main.scss";
import GameData from "./classes/GameData";
import Player from "./classes/Player";
import Map from "./classes/Map";
import Environnement from "./classes/Environnement";

const gameData = new GameData();
let size = 12;

let map = new Map(size);
map.generateGrid("gamegrid");

let environnement = new Environnement(map, gameData.blocks, gameData.items);
environnement.createComposition(gameData.mapCompositions.grass_field);
environnement.buildMap();
environnement.placeBlockPattern(map.getRandomRow(1, (map.size - 7)), 0, gameData.mapPatterns.river);
environnement.placeItems(4);

let player1 = new Player("player1", "Craaftx", gameData.characters[0], map.getRandomRow(), map.getRandomCol());
let player2 = new Player("player2", "Bot", gameData.characters[0], map.getRandomRow(), map.getRandomCol());

/* Game logic */
player1.initPlayer();
map.addPlayerToCell(player1);
console.log(map.getVirtualMap()[player1.xAxis][player1.yAxis]);
player2.initPlayer();
map.addPlayerToCell(player2);
console.log(map.getVirtualMap()[player2.xAxis][player2.yAxis]);

console.log(player1.character.defensePower());
console.log(player1.character.item);
console.log('----------------------------------');

player1.character.item = gameData.items.books[5];

console.log(player1.character.defensePower());
console.log(player1.character.item);

player1.changeOrientation();
setTimeout(function(){ 
  player1.resetOrientation();
}, 4000);
 setTimeout(function(){ 
  player1.changeOrientation();
}, 6000);
setTimeout(function(){ 
 player1.resetOrientation();
}, 8000);