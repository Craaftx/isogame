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
        this._gameData = GameData;
        this._interface = new Interface();
        this._map;
        this._virtualMap;
        this._environnement;
        this._players = [null, null];
        this._pattern = null;
        this._composition = null;
        this._turn = new Turn();
        this._fightMode = false;
        this._activePlayerMovementCounter = -1;
        this._fightStatus = -1;
        this._fightPlayerAction = [null, null];
        document.getElementById('homemenu-interface-validation').addEventListener('click', () => {
            this.startGame();
        });
        document.getElementById('gameend-newgame').addEventListener('click', () => {
            this.restartGame();
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

    get virtualMap() {
        return this._virtualMap;
    }

    set virtualMap(newVirtualMap) {
        this._virtualMap = newVirtualMap;
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

    set turn(newValue) {
        this._turn = newValue;
    }

    get fightMode() {
        return this._fightMode;
    }

    set fightMode(newValue) {
        this._fightMode = newValue;
    }

    get fightStatus() {
        return this._fightStatus;
    }

    set fightStatus(newFightStatus) {
        this._fightStatus = newFightStatus;
    }

    get fightPlayerAction() {
        return this._fightPlayerAction;
    }

    set fightPlayerAction(newValue) {
        this._fightPlayerAction = newValue;
    }

    /** 
     * Init map object
     */
    initMap() {
        let size = 12;
        this.map = new Map(size);
        this.map.generateGrid("gamegrid");
        this.map.initMovementGrid();
        this.virtualMap = this.map.virtualMap;
    }

    /**
     * Add an environnement to the game
     */
    addMapEnvironnement() {
        this.environnement = new Environnement(this.map, this.gameData.blocks, this.gameData.items);
        this.environnement.createComposition(this.gameData.mapCompositions[this.composition]);
        this.environnement.buildMap();
    }

    /**
     * Add a map pattern
     */
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

    /**
     * Add items to the map
     */
    addMapItems(number) {
        this.environnement.placeItems(number);
    }

    /**
     * Create an object player
     * @param {string} playerSlug - The player slug
     * @param {string} playerName - The player name
     * @param {string} playerCharacter - The player Character
     */
    addPlayer(playerSlug, playerName, playerCharacter) {
        this.players[playerSlug] = new Player(`player-${playerSlug + 1}`, playerName, this.gameData.characters[playerCharacter - 1]);
    }

    /**
     * Remove a player from the game
     * @param {string} playerSlug - The player slyug
     */
    removePlayer(playerSlug) {
        this.players[playerSlug] = null;
    }

    /**
     * Place Players on the map
     */
    placePlayers() {
        this.players.forEach((player) => {
            player.initPlayer(this.map);
            this.map.addPlayerToCell(player);
        });
    }

    /**
     * The round manager is used to manage the game turns logic
     * @param {bool} isSkiped - Used to skip a turn
     */
    roundManager(isSkiped) {
        let activePlayer = this.getActivePlayer();
        this.interface.updatePlayerBar(activePlayer);
        if(isSkiped) {
            this.map.movementEventReset(activePlayer);
            this.turn.next();
            this._activePlayerMovementCounter = this.getActivePlayer().movementPointAmout();
            this.roundManager();
        } else {
            if(this.map.isNearPlayers(activePlayer.xAxis, activePlayer.yAxis)) {
                this.fightMode = true;
                this.fightManager();
            } else {
                if(this._activePlayerMovementCounter < 0 ) {
                    this._activePlayerMovementCounter = activePlayer.movementPointAmout();
                }
    
                if(this.map.containItem(activePlayer.xAxis, activePlayer.yAxis) && this._activePlayerMovementCounter !== activePlayer.movementPointAmout()) {
                    let playerItem = activePlayer.item;
                    activePlayer.item = this.virtualMap[activePlayer.xAxis][activePlayer.yAxis].item;
                    this.environnement.generateItem(playerItem, activePlayer.xAxis, activePlayer.yAxis);
                    this.interface.displayPlayersStatus(this.players);
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
    }
    
    /**
     * The round manager is used to manage the game turns logic
     * @param {string} action - The player action
     */
    fightManager(action) {
        if(this.fightStatus === -1) {
            this.interface.displayFightIndicator();
            this.interface.displayFightButtons();
        }
        // Add player action
        if(action) {
            let activePlayer = this.turn.getActivePlayerValue();
            let inactivePlayer = this.turn.getInactivePlayerValue();
            this.interface.updatePlayerBar(this.players[inactivePlayer]);
            this.fightPlayerAction[activePlayer] = action; 
            // Calculate Damages, applies it and pass turn
            if(this.fightPlayerAction[activePlayer] && this.fightPlayerAction[inactivePlayer]) {
                this.calculateDamage(this.players[activePlayer], this.players[inactivePlayer], this.fightPlayerAction[activePlayer], this.fightPlayerAction[inactivePlayer]);
                this.calculateDamage(this.players[inactivePlayer], this.players[activePlayer], this.fightPlayerAction[inactivePlayer], this.fightPlayerAction[activePlayer]);
                this.fightPlayerAction[activePlayer] = null;
                this.fightPlayerAction[inactivePlayer] = null;
                this.fightStatus = 0;
                this.interface.displayPlayersStatus(this.players);
            }
            if(this.players[activePlayer].life <= 0 || this.players[inactivePlayer].life <= 0) {
                this.interface.displayEndGame(this.players[activePlayer].life <= 0 ? this.players[inactivePlayer] : this.players[activePlayer]);
            } else {
                this.turn.next();
            }
        }
    }

    /**
     * Calculate the damage and update the interface
     * @param {Object} attacker - Player who attack
     * @param {Object} defender - Player who defense
     * @param {string} attackerAction - The attacker action
     * @param {string} defenderAction - The defender action
     * @return {object} 
     */
    calculateDamage(attacker, defender, attackerAction, defenderAction) {
        if(attackerAction == 'attaque') {
            // Attacker make damage
            if(defenderAction == 'attaque') {
                // Defender take damage
                const damage = attacker.attackPower() - defender.defensePower();
                defender.life = Math.sign(damage) === 1 ? defender.life - damage : defender.life;
                this.interface.popUpDamagePlayer(defender, Math.sign(damage) === 1 ? damage : 0);
                this.interface.updatePlayerFightStatus(defender, defenderAction, Math.sign(damage) === 1 ? damage : 0, attacker.attackPower(), defender.defensePower());
            } else {
                // Defender take damage but reduced
                const damage = attacker.attackPower() - (defender.defensePower() * 2);
                defender.life = Math.sign(damage) === 1 ? defender.life - damage : defender.life;
                this.interface.popUpDamagePlayer(defender, Math.sign(damage) === 1 ? damage : 0)
                this.interface.updatePlayerFightStatus(defender, defenderAction, Math.sign(damage) === 1 ? damage : 0, attacker.attackPower(), (defender.defensePower() * 2));
                this.interface.updatePlayerFightStatus(attacker, attackerAction, 0, attacker.attackPower(), attacker.defensePower());
            }
        }
    }

    /**
     * Calculate the pointsUsed in movement
     * @param {integer} pointsUsed - Movement point used
     */
    playerMovementEnd(pointsUsed) {
        this._activePlayerMovementCounter = this._activePlayerMovementCounter - Math.abs(pointsUsed);
        this.roundManager();
    }

    getActivePlayer() {
        return this.turn.getActivePlayer(this.players);
    }

    /**
     * Create a new game by initialize object and values
     */
    newGame() {
        this.initMap();
        this.addMapEnvironnement();
        this.addMapPattern();
        this.addMapItems(4);
        this.players.forEach((player) => {
            this.addPlayer(player[0], player[1])
        });
        this.placePlayers();  
        this.interface.displayPlayersStatus(this.players);
        this.initializePlayerControlEvents();  
        this.roundManager();  
    }

    /**
     * Character Choice manager
     */
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
    
    /**
     * Pattern choice manager
     */
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

    /**
     * Used in frontend to start the game
     */
    startGame() {
        document.getElementById('homemenu-interface').style.display = 'none';
        document.getElementById('character-selection-interface').style.display = 'block';
        this.interface.displayCharacterChoice();
        this.characterChoice();
    }

    /**
     * Create Event listeners
     */
    initializePlayerControlEvents() {
        document.getElementById("game-bar__controls__button--turn").addEventListener("click", function() {
            this.roundManager(true);
        }.bind(this), false);
        
        document.getElementById("game-bar__controls__button--attaque").addEventListener("click", function() {
            this.fightManager('attaque');
        }.bind(this), false);
        
        document.getElementById("game-bar__controls__button--defense").addEventListener("click", function() {
            this.fightManager('defense');
        }.bind(this), false);
    }

    /**
     * Restart the game
     */
    restartGame() {
        document.location.reload(true);
    }
}