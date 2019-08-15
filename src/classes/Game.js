export default class Game {
    /**
     * Represents a Game instance.
     * @constructor
     * @param {string} name - Item name, used in src URL.
     * @param {string} map - Game map.
     * @param {string} players - Game players.
     * @param {object} properties - The item properties.
     */
    constructor(name, displayName, description, properties) {
        this._name = name;
        this._displayName = displayName;
        this._description = description;
        this._properties = properties;
    }

    get properties() {
        return this._properties;
    }
}