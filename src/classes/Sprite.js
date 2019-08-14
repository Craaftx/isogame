export default class Sprite {
    /**
     * Represents a sprite.
     * @constructor
     * @param {string} name - Identifier name.
     * @param {integer} spriteWidth - Width of a frame sprite.
     * @param {integer} spriteHeight - Height of a frame sprite.
     * @param {integer} frameSpeed - Frame speed in seconds for animation speed
     * @param {integer} frameNumber - Number of frame for the animation
     * @param {string} frameMapUrl - URL of the frameMap.
     * @param {bool} [inverse=false] - Set to true to inverse the sprite on the X axe.
     */
    constructor(name, level, spriteWidth, spriteHeight, frameSpeed, frameNumber, frameMapUrl, inverse = false) {
        this._name = name;
        this._level = level;
        this._inverse = inverse;
        this._spriteWidth = spriteWidth;
        this._spriteHeight = spriteHeight;
        this._frameSpeed = frameSpeed;
        this._frameNumber = frameNumber;
        this._frameMapUrl = frameMapUrl;
        this._inverse = inverse;
    }

    /**
     * Draw a sprite and add it to the DOM.
     * @param {string} parentId - The DOM parent.
     */
    drawSprite($parentId) {
      let $parent = document.querySelector(`#${$parentId}`);

      let $newSprite = document.createElement("div");
      $newSprite.setAttribute("id", `players__player__sprite-${this._name}`);
      $newSprite.setAttribute("class", 
      `players__player__sprite 
        ${this._inverse ? "--sprite-inverse" : ""} 
        --sprite-level-${this._level}`);
      $newSprite.style.cssText = `
        background: url('game_assets/monsters/${this._frameMapUrl}') no-repeat top left; 
        width: ${this._spriteWidth}px;
        height: ${this._spriteHeight}px; 
        animation: animate_sprite_${this._frameNumber}_level_${this._level} ${this._frameSpeed}s steps(${this._frameNumber}, end) infinite;
      `;
      
      $parent.appendChild($newSprite);
    }
}