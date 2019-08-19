import Sprite from "./Sprite";

export default class Character {
    /**
     * Represents a Character.
     * @constructor
     * @param {string} slug - Monster slug, used in URL (ex 001).
     * @param {string} displayName - Display name, used in interface.
     * @param {string} description - Description of the Character
     * @param {object} properties - The Character properties.
     */
    constructor(slug, displayName, description, properties) {
        this._slug = slug;
        this._displayName = displayName;
        this._description = description;
        this._properties = properties;
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

    set properties(newProperties) {
        return this._properties = newProperties;
    }

    set spriteList(list) {
        this._spriteList = list;
    }

    getSpriteStyle(level) {
        let initialSprite = this.spriteList.idle[level - 1];
        return `
        background: url('game_assets/monsters${initialSprite._frameMapUrl}') no-repeat top left; 
        width: ${initialSprite._spriteWidth}px;
        height: ${initialSprite._spriteHeight}px; 
        animation: animate_sprite_${initialSprite._frameNumber}_level_${initialSprite._level}${this.slug === '004' || this.slug === '005' ? '_modified' : ''} ${initialSprite._frameSpeed}s steps(${initialSprite._frameNumber}, end) infinite;
      `;
    }

    initSpriteList() {
        const maxLevel = 3;
        const positionNames = ['idle', 'walk', 'attack', 'death'];
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
                        if(this.slug === '004' || this.slug === '005') {
                            values = [3, 294, 556, 1.4, 24];
                        } else {
                            values = [3, 293, 556, 1.4, 24];
                        }
                    }
                }
                characterSpriteList[positionNames[i]].push(
                    new Sprite(`level_${y + 1}_${positionNames[i]}_${this._slug}`, values[0], values[1], values[2], values[3], values[4], `/${this._slug}/level_${y + 1}/${positionNames[i]}.png`)
                );
            }
        }
        return characterSpriteList;
    }
}