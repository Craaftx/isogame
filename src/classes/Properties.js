export class Properties {
    /**
     * Represents properties of Item or Character. Value can be negative.
     * @constructor
     * @param {integer} attack - Attack power.
     * @param {integer} defense - Defense power.
     * @param {integer} life - Life amout.
     * @param {integer} level - Level power.
     */
    constructor(attack, defense, life, level) {
        this._attack = attack;
        this._defense = defense;
        this._life = life;
        this._level = level;
    }
}