export class Properties {
    /**
     * Represents properties of Item or Character. Value can be negative.
     * @constructor
     * @param {integer} attack - Attack power.
     * @param {integer} defense - Defense power.
     * @param {integer} level - Level power.
     */
    constructor(attack, defense, level) {
        this._attack = attack;
        this._defense = defense;
        this._level = level;
    }
}