export class Block {
    /**
     * Represents a Block.
     * @constructor
     * @param {integer} name - Block name, used in src URL.
     * @param {bool} [reachable=true] - This block is reachable by characters or objects.
     */
    constructor(name, reachable = true) {
        this.name = name;
        this.reachable = reachable;
    }
}