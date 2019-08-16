import GameData from "./GameData";
import Player from "./Player";
import Map from "./Map";
import Environnement from "./Environnement";

export default class Game {
    /**
     * Represents a Game instance.
     * @constructor
     */
    constructor() {
        this._gameData = new GameData();
        this._map;
        this._environnement;
        this._players = [];
    }

    get gameData() {
        return this._gameData;
    }

    set gameData(newGameData) {
        this._gameData = newGameData;
    }

    get map() {
        return this._map;
    }

    set map(newMap) {
        this._map = newMap;
    }

    get players() {
        return this._players;
    }

    set players(newPlayers) {
        this._players = newPlayers;
    }

    get environnement() {
        return this._environnement;
    }

    set environnement(newEnvironnement) {
        this._environnement = newEnvironnement;
    }

    initMap() {
        let size = 12;
        this.map = new Map(size);
        this.map.generateGrid("gamegrid");
    }

    addMapEnvironnement(environnementName) {
        this.environnement = new Environnement(this.map, this.gameData.blocks, this.gameData.items);
        this.environnement.createComposition(this.gameData.mapCompositions[environnementName]);
        this.environnement.buildMap();
    }

    addMapPattern(patternName) {
        this.environnement.placeBlockPattern(this.map.getRandomRow(1, (this.map.size - 7)), 0, this.gameData.mapPatterns[patternName]);
    }

    addMapItems(number) {
        this.environnement.placeItems(number);
    }

    addPlayer(playerName, playerCharacter) {
        this.players.push(new Player(`player-${(this.players.length) + 1}`, playerName, playerCharacter));
    }

    placePlayers() {
        this.players.forEach((player) => {
            player.initPlayer(this.map);
            this.map.addPlayerToCell(player);
        });
    }

    newGame(environnementName, patternName, itemsNumber, players) {
        this.initMap();
        this.addMapEnvironnement(environnementName);
        this.addMapPattern(patternName);
        this.addMapItems(itemsNumber);
        players.forEach((player) => {
            this.addPlayer(player[0], player[1])
        });
        this.placePlayers();       
        this.map.generateMovementGrid(this.players[0].xAxis, this.players[0].yAxis, this.players[0].character.properties.movementPoint);
        console.log(this.map);
    }
}