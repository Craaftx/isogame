export default class Character {
    /**
     * Represents Character.
     * @constructor
     * @param {string} name - Character name, used in src URL.
     * @param {string} displayName - Display name, used in interface.
     * @param {string} description - Description of the Character
     * @param {object} properties - The Character properties.
     * @param {object} spriteList - Object of sprites used for animation.
     */
    constructor(name, displayName, description, properties, spriteList) {
        this._name = name;
        this._displayName = displayName;
        this._description = description;
        this._properties = properties;
        this._spriteList = spriteList;
    }
}