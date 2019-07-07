export class Block {
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

    /**
     * Exemple avec des getter
     */
    get name() {
        return this._name
    }
}

/**
 * const block = new Block('test', false)
 * console.log(block.name) au lieu de block._name (alors ok, toutes les propriétés restent publiques en JS mais c'est un peu plus propre)
 */