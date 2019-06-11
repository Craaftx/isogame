export class Properties {
    /**
     * Represents properties of Item or Character. Value can be negative.
     * @constructor
     * @param {integer} attack - Attack power.
     * @param {integer} defense - Defense power.
     * @param {integer} level - Level power.
     */
    constructor(attack, defense, level) {
        this.attack = attack;
        this.defense = defense;
        this.level = level;
    }
}