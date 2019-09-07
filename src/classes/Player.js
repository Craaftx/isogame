export default class Player {
    /**
     * Represents a Player.
     * @constructor
     * @param {string} name - Player slug.
     * @param {string} displayName - Display name, used in interface.
     * @param {object} character - His character.
     * @param {object} [item=null] - Player item.
     */
    constructor(name, displayName, character, item = null) {
        this._name = name;
        this._displayName = displayName;
        this._character = character;
        this._item = item;
        this._xAxis;
        this._yAxis;
        this._life;
        this._tileSize = 48;
        this._$player = null;
    }

    get name() {
        return this._name;
    }

    get displayName() {
        return this._displayName;
    }

    get character() {
        return this._character;
    }

    get xAxis() {
      return this._xAxis;
    }

    get yAxis() {
      return this._yAxis;
    }

    get $player() {
        return this._$player;
    }

    set xAxis(newAxis) {
        this._xAxis = newAxis;
    }

    set yAxis(newAxis) {
        this._yAxis = newAxis;
    }
    
    get item() {
        return this._item;
    }
    
    set item(newItem) {
        this._item = newItem;
    }

    get life() {
        return this._life;
    }
    
    set life(newValue) {
        this._life = newValue;
    }

    /**
     * Init the player and add it to the DOM at the right position.
     */
    initPlayer(map) {
        let $parent = document.getElementById("players");
        let $newPlayer = document.createElement("div");

        $newPlayer.setAttribute("class", "players__player");
        $newPlayer.setAttribute("id", `players__player-${this.name}`);
        
        $parent.appendChild($newPlayer);

        this._$player = `players__player-${this.name}`;
        if(this.displayName === "Craaftx") {
            this.character.spriteList["walk"][2].drawSprite(this.$player);
        } else {
            this.character.spriteList["walk"][2].drawSprite(this.$player);
        }

        let xAxis, yAxis;
        do {
            xAxis = map.getRandomRow();
            yAxis = map.getRandomCol();
        } while (!map.isReachable(xAxis, yAxis) || map.isNearPlayers(xAxis, yAxis))
        this.updatePlayerPosition(xAxis, yAxis);
        this.initLifePoints();
    }

    /**
     * Move the player to the right position with animation.
     * @param {int} xAxis - The xAxis.
     * @param {int} yAxis - The yAxis.
     */
    movePlayer(xAxis, yAxis) {
        // TODO
        // - Change Sprite
        // - Animate Movement
        // - Select Orientation
        this.updatePlayerPosition(xAxis, yAxis);
    }

    /**
     * Update the player position in class and on the grid with CSS.
     * @param {int} xAxis - The xAxis.
     * @param {int} yAxis - The yAxis.
     */
    updatePlayerPosition(xAxis, yAxis) {
        const xValue = xAxis * this._tileSize;
        const yValue = yAxis * this._tileSize;
        this.xAxis = xAxis;
        this.yAxis = yAxis;

        let $aPlayer = document.getElementById(this.$player);
        $aPlayer.style.left = `${yValue}px`;
        $aPlayer.style.top = `${xValue}px`;
    }

    /**
     * Change the character orientation on X axis.
     */
    changeOrientation() {
        let $aPlayer = document.getElementById(this.$player);
        $aPlayer.classList.add("players__player--inverted");
    }

    /**
     * Rest the character orientation on X axis.
     */
    resetOrientation() {
        let $aPlayer = document.getElementById(this.$player);
        $aPlayer.classList.remove("players__player--inverted");
    }

    /**
     * Check if player is dead (life <= 0).
     * @return {bool} Response.
     */
    isDead() {
        return this.character.properties.life <= 0;
    }

    /**
     * Initialize player life point.
     * @return {int} The movement point amout.
     */
    initLifePoints() {
        if(this.character)
            this.life = this.character.properties.life;
    }

    /**
     * Calculate the attack power of the Character.
     * @return {int} The attackPower.
     */
    attackPower() {
        if(this.item) 
            return this.character.properties.attack + this.item.properties.attack;
        return this.character.properties.attack;
    }

    /**
     * Calculate the defense power of the Character.
     * @return {int} The defensePower.
     */
    defensePower() {
        if(this.item) 
            return this.character.properties.defense + this.item.properties.defense;
        return this.character.properties.defense;
    }

    /**
     * Calculate movement point of the Character.
     * @return {int} The movement point amout.
     */
    movementPointAmout() {
        if(this.item) 
            return this.character.properties.movementPoint + this.item.properties.movementPoint;
        return this.character.properties.movementPoint;
    }

}