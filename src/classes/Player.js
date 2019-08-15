export default class Player {
    /**
     * Represents a Player.
     * @constructor
     * @param {string} name - Player slug.
     * @param {string} displayName - Display name, used in interface.
     * @param {object} character - His character.
     * @param {int} xAxis - The xAxis.
     * @param {int} yAxis - The yAxis.
     */
    constructor(name, displayName, character, xAxis, yAxis) {
        this._name = name;
        this._displayName = displayName;
        this._character = character;
        this._xAxis = xAxis;
        this._yAxis = yAxis;

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

    /**
     * Init the player and add it to the DOM at the right position.
     */
    initPlayer() {
        let $parent = document.getElementById("players");
        let $newPlayer = document.createElement("div");

        $newPlayer.setAttribute("class", "players__player");
        $newPlayer.setAttribute("id", `players__player-${this.name}`);

        $parent.appendChild($newPlayer);

        this._$player = `players__player-${this.name}`;
        this.updatePlayerPosition(this.xAxis, this.yAxis);
        this.character.spriteList["idle"][0].drawSprite(this.$player);
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
        if(yAxis > this.yAxis) {
        }
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
        $aPlayer.style.left = `${xValue}px`;
        $aPlayer.style.top = `${yValue}px`;
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
}