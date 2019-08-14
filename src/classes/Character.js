export default class Character {
    /**
     * Represents a Character.
     * @constructor
     * @param {string} name - Monster slug, used in URL.
     * @param {string} displayName - Display name, used in interface.
     * @param {string} description - Description of the Character
     * @param {object} properties - The Character properties.
     * @param {array} spriteList - Array of sprites used for animation.
     * @param {object} [item=null] - The Character item.
     */
    constructor(name, displayName, description, properties, spriteList, item = null) {
        this._name = name;
        this._displayName = displayName;
        this._description = description;
        this._properties = properties;
        this._spriteList = spriteList;
        this._item = item;
    }

    get displayName() {
        return this._displayName;
    }

    get description() {
        return this._description;
    }

    get properties() {
        return this._properties;
    }
    
    get spriteList() {
        return this._spriteList;
    }
    
    get item() {
        return this._item;
    }

    set properties(newProperties) {
        return this._properties = newProperties;
    }

    set spriteList(list) {
        this._spriteList = list;
    }
    
    set item(newItem) {
        this._item = newItem;
    }

    /**
     * Calculate the attack power of the Character.
     * @return {int} The attackPower.
     */
    attackPower() {
        if(this._item) 
            return this._properties.attack + this._item.properties.attack;
        return this._properties.attack;
    }

    /**
     * Calculate the defense power of the Character.
     * @return {int} The attackPower.
     */
    defensePower() {
        if(this._item) 
            return this._properties.defense + this._item.properties.defense;
        return this._properties.defense;
    }
}