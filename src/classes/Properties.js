export default class Properties {
    /**
     * Represents properties of Item or Character. Value can be negative.
     * @constructor
     * @param {integer} attack - Attack power.
     * @param {integer} defense - Defense power.
     * @param {integer} motion - Motion points amout (1 motion = 1 cell).
     * @param {integer} life - Life amout.
     * @param {integer} level - Level power.
     */
    constructor(attack, defense, motion, life, level) {
        this._attack = attack;
        this._defense = defense;
        this._life = life;
        this._motion = motion;
        this._level = level;
    }

    get attack() {
        return this._attack;
    }

    get defense() {
        return this._defense;
    }

    get motion() {
        return this._motion;
    }

    get life() {
        return this._life; 
    }

    get level() {
        return this._level;
    }

    set attack(newAttack) {
        this._attack = newAttack;
    }

    set defense(newDefense) {
        this._defense = newDefense;
    }

    set motion(newMotion) {
        this._motion = newMotion;
    }

    set life(newLife) {
        this._life = newLife; 
    }

    set level(newLevel) {
        this._level = newLevel;
    }
}