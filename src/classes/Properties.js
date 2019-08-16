export default class Properties {
    /**
     * Represents properties of Item or Character. Value can be negative.
     * @constructor
     * @param {integer} attack - Attack power.
     * @param {integer} defense - Defense power.
     * @param {integer} movementPoint - Movement points amout (1 movement = 1 cell).
     * @param {integer} life - Life amout.
     * @param {integer} level - Level power.
     */
    constructor(attack, defense, movementPoint, life, level) {
        this._attack = attack;
        this._defense = defense;
        this._life = life;
        this._movementPoint = movementPoint;
        this._level = level;
    }

    get attack() {
        return this._attack;
    }

    get defense() {
        return this._defense;
    }

    get movementPoint() {
        return this._movementPoint;
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

    set movementPoint(newMovementPoint) {
        this._movementPoint = newMovementPoint;
    }

    set life(newLife) {
        this._life = newLife; 
    }

    set level(newLevel) {
        this._level = newLevel;
    }
}