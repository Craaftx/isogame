export default class Properties {
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

    get attack() {
        return this._attack;
    }

    get defense() {
        return this._defense;
    }

    get life() {
        return this._life; 
    }

    get level() {
        return this._level;
    }

    set attack(newAttack) {
        return this._attack = newAttack;
    }

    set defense(newDefense) {
        return this._defense = newDefense;
    }

    set life(newLife) {
        this._life = newLife; 
    }

    set level(newLevel) {
        this._level = newLevel;
    }
}