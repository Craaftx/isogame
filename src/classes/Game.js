import GameData from "./GameData";
import Player from "./Player";
import Map from "./Map";
import Turn from "./Turn";
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
        this._turn = new Turn();
        this._activePlayerMovementCounter = -1;
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

    get turn() {
        return this._turn;
    }

    initMap() {
        let size = 12;
        this.map = new Map(size);
        this.map.generateGrid("gamegrid");
        this.map.initMovementGrid();
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

    roundManager() {
        if(this.players[0].isDead() || this.players[1].isDead()) {
            console.log("Match terminé");
        } else {
            let activePlayer = this.getActivePlayer();
            if(this._activePlayerMovementCounter < 0 ) {
                this._activePlayerMovementCounter = activePlayer.character.movementPointAmout();
                console.log(`C'est au tour de ${this.getActivePlayer().displayName}`);
            }
            console.log(`ActivePlayer : ${activePlayer.displayName}, ${this._activePlayerMovementCounter}`);
            if(this._activePlayerMovementCounter > 0) {
                this.map.playerMovementGrid(this._activePlayerMovementCounter, activePlayer, this);
            } else { 
                this.turn.next();
                this._activePlayerMovementCounter = this.getActivePlayer().character.movementPointAmout();
                console.log('');
                console.log(`C'est au tour de ${this.getActivePlayer().displayName}`);
                this.roundManager();
            }
        }
    }

    playerMovementEnd(pointsUsed) {
        this._activePlayerMovementCounter = this._activePlayerMovementCounter - Math.abs(pointsUsed);
        this.roundManager();
    }

    getActivePlayer() {
        return this.turn.getActivePlayer(this.players);
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
        this.roundManager();  
        console.log(this.map.getVirtualMap());
    }
}