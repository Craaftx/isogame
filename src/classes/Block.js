export default class Block {
    /**
     * Represents a Block.
     * @constructor
     * @param {integer} name - Block name, used in src URL.
     * @param {bool} [reachable=true] - This block is reachable by characters or objects.
     */
    constructor(name, reachable = true) {
        this._name = name;
        this._reachable = reachable;
    }

    get name() {
        return this._name;
    }

    get reachable() {
        return this._reachable;
    }

    getImageUrl() {
        return `game_assets/ground-blocks/${this.name}.png`;
    }
}