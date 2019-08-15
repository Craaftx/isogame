import "./main.scss";
import GameData from "./classes/GameData";
import Game from "./classes/Game";

const gameData = new GameData();
const game = new Game();

const players = [
  ["Craaftx", gameData.characters[0]],
  ["Player2", gameData.characters[0]],
];

game.newGame("grass_field", "lack", 4, players);