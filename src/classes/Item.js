export class Item {
    /**
     * Represents an Item.
     * @constructor
     * @param {string} name - Item name, used in src URL.
     * @param {string} displayNem - Display name, used in interface.
     * @param {string} description - Description of the item.
     * @param {object} properties - The item properties.
     */
    constructor(name, displayName, description, properties) {
        this._name = name;
        this._displayName = displayName;
        this._description = description;
        this._properties = properties;
    }
}