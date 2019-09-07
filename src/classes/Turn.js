export default class Turns {
    /**
     * Represents a Turns instance.
     * @constructor
     */
    constructor() {
        this._counter = 0;
    }

    get counter() {
        return this._counter;
    }

    getActivePlayer(players) {
        return players[ this.counter % 2 ];
    }

    getInactivePlayer(players) {
        return players[ (this.counter + 1) % 2 ];
    }

    getActivePlayerValue() {
        return this.counter % 2;
    }

    getInactivePlayerValue() {
        return (this.counter + 1) % 2;
    }

    next() {
        this._counter++;
    }

    reset() {
        this.counter = 0;
    }
}