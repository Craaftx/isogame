import Sprite from "./Sprite";

export default class Character {
    /**
     * Represents a Character.
     * @constructor
     * @param {string} slug - Monster slug, used in URL (ex 001).
     * @param {string} displayName - Display name, used in interface.
     * @param {string} description - Description of the Character
     * @param {object} properties - The Character properties.
     * @param {object} [item=null] - The Character item.
     */
    constructor(slug, displayName, description, properties, item = null) {
        this._slug = slug;
        this._displayName = displayName;
        this._description = description;
        this._properties = properties;
        this._item = item;
        this._spriteList = this.initSpriteList();
    }

    get slug() {
        return this._slug;
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

    initSpriteList() {
        const maxLevel = 3;
        const positionNames = ['idle', 'walk'];
        let characterSpriteList = {};
        for (var i = 0; i < positionNames.length; i++) {
            characterSpriteList[positionNames[i]] = [];
            for (var y = 0; y < maxLevel; y++) {
                let values;
                if (y === 0) {
                    values = [1, 200, 214, 0.8, 24];
                } else {
                    if (y === 1) {
                        values = [2, 202, 210, 0.8, 24];
                    } else {
                        values = [3, 293, 556, 1.4, 24];
                    }
                }
                characterSpriteList[positionNames[i]].push(
                    new Sprite(`level_${y + 1}_${positionNames[i]}_${this._slug}`, values[0], values[1], values[2], values[3], values[4], `/${this._slug}/level_${y + 1}/${positionNames[i]}.png`)
                );
            }
        }
        return characterSpriteList;
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
     * @return {int} The defensePower.
     */
    defensePower() {
        if(this._item) 
            return this._properties.defense + this._item.properties.defense;
        return this._properties.defense;
    }

    /**
     * Calculate movement point of the Character.
     * @return {int} The movement point amout.
     */
    movementPointAmout() {
        if(this._item) 
            return this._properties.movementPoint + this._item.properties.movementPoint;
        return this._properties.movementPoint;
    }
}