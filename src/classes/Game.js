import GameData from "./GameData";
import Player from "./Player";
import Map from "./Map";
import Turn from "./Turn";
import Environnement from "./Environnement";
import Interface from "./Interface";

export default class Game {
    /**
     * Represents a Game instance.
     * @constructor
     */
    constructor() {
        this._gameData = new GameData();
        this._interface = new Interface();
        this._map;
        this._environnement;
        this._players = [null, null];
        this._pattern = null;
        this._composition = null;
        this._turn = new Turn();
        this._activePlayerMovementCounter = -1;
        document.getElementById('homemenu-interface-validation').addEventListener('click', () => {
            this.startGame();
        });
    }

    get gameData() {
        return this._gameData;
    }

    get interface() {
        return this._interface;
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

    get pattern() {
        return this._pattern;
    }

    set pattern(newPattern) {
        this._pattern = newPattern;
    }

    get composition() {
        return this._composition;
    }

    set composition(newComposition) {
        this._composition = newComposition;
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

    addMapEnvironnement() {
        console.log('Composition : ' + this.composition);
        console.log(this.gameData.mapCompositions[this.composition]);
        this.environnement = new Environnement(this.map, this.gameData.blocks, this.gameData.items);
        this.environnement.createComposition(this.gameData.mapCompositions[this.composition]);
        this.environnement.buildMap();
    }

    addMapPattern() {
        if(this.pattern !== "random") {
            if(this.pattern === "lack") {
                this.environnement.placeBlockPattern(this.map.getRandomRow(1, (this.map.size - 7)), this.map.getRandomCol(1, (this.map.size - 7)), this.gameData.mapPatterns[this.pattern]);
            }
            else {
                this.environnement.placeBlockPattern(this.map.getRandomRow(1, (this.map.size - 7)), 0, this.gameData.mapPatterns[this.pattern]);
            }
        }
    }

    addMapItems(number) {
        this.environnement.placeItems(number);
    }

    addPlayer(playerSlug, playerName, playerCharacter) {
        this.players[playerSlug] = new Player(`player-${playerSlug + 1}`, playerName, this.gameData.characters[playerCharacter - 1]);
    }

    removePlayer(playerSlug) {
        this.players[playerSlug] = null;
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
                this._activePlayerMovementCounter = activePlayer.movementPointAmout();
            }
            if(this._activePlayerMovementCounter > 0) {
                this.map.playerMovementGrid(this._activePlayerMovementCounter, activePlayer, this);
            } else { 
                this.turn.next();
                this._activePlayerMovementCounter = this.getActivePlayer().movementPointAmout();
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

    newGame() {
        this.initMap();
        this.addMapEnvironnement();
        this.addMapPattern();
        this.addMapItems(4);
        this.players.forEach((player) => {
            this.addPlayer(player[0], player[1])
        });
        this.placePlayers();     
        this.roundManager();  
    }

    characterChoice() {
        const $wrapper = document.querySelector(`#character-selection-interface-wrapper`);
        const $validation = document.querySelector('#character-selection-interface-validation');
        $validation.addEventListener("click", function(){
            if(this.players[0] && this.players[1]) {
                this.players[0].item = this.gameData.items.books[0];
                this.players[1].item = this.gameData.items.books[0];
                document.getElementById('character-selection-interface').style.display = 'none';
                document.getElementById('pattern-selection-interface').style.display = 'block';
                this.interface.displayPatternChoice();
                this.patternChoice();
            }
        }.bind(this), false);

        const characters = this.gameData.characters;
        for (var i = 0; i < characters.length; i++) {
            let character = characters[i];
            const $player1Btn = document.querySelector(`#character-choice-card-${character.slug}-1`);
            $player1Btn.addEventListener("click", function(){
                if(this.players[0]) {
                    this.removePlayer(0);
                    $wrapper.querySelector(".character-choice-cards__card__choices__choice--player1--selected").classList.remove('character-choice-cards__card__choices__choice--player1--selected');
                    
                    this.addPlayer(0, 'Joueur 1', character.slug.slice(-1));
                    $player1Btn.classList.add('character-choice-cards__card__choices__choice--player1--selected');        
                } else {
                    this.addPlayer(0, 'Joueur 1', character.slug.slice(-1));
                    $player1Btn.classList.add('character-choice-cards__card__choices__choice--player1--selected');                
                }
            }.bind(this), false);
            const $player2Btn = document.querySelector(`#character-choice-card-${character.slug}-2`);
            $player2Btn.addEventListener("click", function(){
                if(this.players[1]) {
                    this.removePlayer(1);
                    document.querySelector(".character-choice-cards__card__choices__choice--player2--selected").classList.remove('character-choice-cards__card__choices__choice--player2--selected');
                
                    this.addPlayer(1, 'Joueur 2', character.slug.slice(-1));
                    $player2Btn.classList.add('character-choice-cards__card__choices__choice--player2--selected');
                } else {
                    this.addPlayer(1, 'Joueur 2', character.slug.slice(-1));    
                    $player2Btn.classList.add('character-choice-cards__card__choices__choice--player2--selected');
                }
            }.bind(this), false);
        }
    }

    patternChoice() {
        const $wrapper = document.querySelector(`#pattern-selection-interface-wrapper`);
        const $validation = document.querySelector('#pattern-selection-interface-validation');
        $validation.addEventListener("click", function(){
            if(this.pattern && this.composition) {
                document.getElementById('pattern-selection-interface').style.display = 'none';
                document.getElementById('game-interface').style.display = 'block';
                this.newGame();
            }
        }.bind(this), false);

        const patterns = this.gameData.mapPatterns;
        for (var i = 0; i < Object.keys(patterns).length; i++) {
            let pattern = patterns[Object.keys(patterns)[i]];
            const $firstBtn = document.querySelector(`#pattern-choice-card-${pattern.slug}-grass`);
            const $secondBtn = document.querySelector(`#pattern-choice-card-${pattern.slug}-burned`);
            const $thirdBtn = document.querySelector(`#pattern-choice-card-${pattern.slug}-stone`);
            $firstBtn.addEventListener("click", function(){
                if(this.pattern) {
                    this.pattern = null;
                    this.composition = null;
                    $wrapper.querySelector(".pattern-choice-cards__card__blocks__block--selected").classList.remove('pattern-choice-cards__card__blocks__block--selected');
                    
                    this.pattern = pattern.slug;
                    this.composition = this.pattern === 'random' ? 'random_grass' : 'grass';
                    $firstBtn.classList.add('pattern-choice-cards__card__blocks__block--selected');        
                } else {
                    this.pattern = pattern.slug;
                    this.composition = this.pattern === 'random' ? 'random_grass' : 'grass';
                    $firstBtn.classList.add('pattern-choice-cards__card__blocks__block--selected');               
                }
            }.bind(this), false);

            $secondBtn.addEventListener("click", function(){
                if(this.pattern) {
                    this.pattern = null;
                    this.composition = null;
                    $wrapper.querySelector(".pattern-choice-cards__card__blocks__block--selected").classList.remove('pattern-choice-cards__card__blocks__block--selected');
                    
                    this.pattern = pattern.slug;
                    this.composition = this.pattern === 'random' ? 'random_burned' : 'burned';
                    $secondBtn.classList.add('pattern-choice-cards__card__blocks__block--selected');        
                } else {
                    this.pattern = pattern.slug;
                    this.composition = this.pattern === 'random' ? 'random_burned' : 'burned';
                    $secondBtn.classList.add('pattern-choice-cards__card__blocks__block--selected');               
                }
            }.bind(this), false);

            $thirdBtn.addEventListener("click", function(){
                if(this.pattern) {
                    this.pattern = null;
                    this.composition = 'null';
                    $wrapper.querySelector(".pattern-choice-cards__card__blocks__block--selected").classList.remove('pattern-choice-cards__card__blocks__block--selected');
                    
                    this.pattern = pattern.slug;
                    this.composition = this.pattern === 'random' ? 'random_stone' : 'stone';
                    $thirdBtn.classList.add('pattern-choice-cards__card__blocks__block--selected');        
                } else {
                    this.pattern = pattern.slug;
                    this.composition = this.pattern === 'random' ? 'random_stone' : 'stone';
                    $thirdBtn.classList.add('pattern-choice-cards__card__blocks__block--selected');               
                }
            }.bind(this), false);
        }
    }

    startGame() {
        document.getElementById('homemenu-interface').style.display = 'none';
        document.getElementById('character-selection-interface').style.display = 'block';
        this.interface.displayCharacterChoice();
        this.characterChoice();
    }

}