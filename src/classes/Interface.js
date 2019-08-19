import GameData from "./GameData";

export default class Interface {
    /**
     * Represents a the game Interface.
     * @constructor
     */
    constructor() {
        this._gameData = new GameData();
    }

    get gameData() {
        return this._gameData;
    }

    displayCharacterChoice() {
        const template = (character, item, standingBlock) => {
            return `
                <div class="character-choice-cards__card" id="character-choice-cards__card-${character.slug}">
                    <div class="character-choice-cards__card__background" style="
                    background-image: url(${standingBlock.getImageUrl()});">
                        <div class="character-choice-cards__card__background__sprite" style="${character.getSpriteStyle(3)}"></div>
                    </div>
                    <h2 class="character-choice-cards__card__title">${character.displayName}</h2>
                    <p class="character-choice-cards__card__description">${character.description}</p>
                    <ul class="properties">
                        <li>
                            <i class="fas fa-heart fa-fw"></i><span>${character.properties.life}</span>
                        </li>
                        <li>
                            <i class="fas fa-bolt fa-fw"></i><span>${character.properties.attack}</span>
                        </li>
                        <li>
                            <i class="fas fa-shield-alt fa-fw"></i><span>${character.properties.defense}</span>
                        </li>
                        <li>
                            <i class="fas fa-shoe-prints fa-fw"></i><span>${character.properties.movementPoint}</span>
                        </li>
                    </ul>
                    <div class="character-choice-cards__card__item">
                        <div class="character-choice-cards__card__item__image"><img src="${item.getImageUrl()}" /></div>
                        <div class="character-choice-cards__card__item__content">
                            <h4>${item.displayName}</h4>
                            <ul class="properties">
                                ${item.properties.attack !== 0 ? 
                                    `<li> <i class="fas fa-bolt fa-fw"> </i><span>
                                    ${item.properties.attack > 0 ? `+${item.properties.attack}` : `${item.properties.attack}`}
                                    </span></li>` 
                                : ''}
                                ${item.properties.defense !== 0 ? 
                                    `<li> <i class="fas fa-shield-alt fa-fw"> </i><span>
                                    ${item.properties.defense > 0 ? `+${item.properties.defense}` : `${item.properties.defense}`}
                                    </span></li>` 
                                : ''}
                                ${item.properties.movementPoint !== 0 ? 
                                    `<li> <i class="fas fa-shoe-prints fa-fw"> </i><span>
                                    ${item.properties.movementPoint > 0 ? `+${item.properties.movementPoint}` : `${item.properties.movementPoint}`}
                                    </span></li>` 
                                : ''}
                            </ul>
                        </div>
                    </div>
                    <div class="character-choice-cards__card__choices">
                        <div class="character-choice-cards__card__choices__choice character-choice-cards__card__choices__choice--player1" id="character-choice-card-${character.slug}-1">
                            Joueur 1
                        </div>
                        <div class="character-choice-cards__card__choices__choice character-choice-cards__card__choices__choice--player2" id="character-choice-card-${character.slug}-2">
                            Joueur 2
                        </div>
                    </div>
                </div>
            `;
        }
        let buildedTemplate = ``;
        const wrapper = document.querySelector('#character-selection-interface-wrapper');
        const starterItem = this.gameData.items.books[0];
        const characters = this.gameData.characters;
        const blocks = this.gameData.blocks;

        for (var i = 0; i < characters.length; i++) {
            buildedTemplate += template(characters[i], starterItem, blocks.stone[0]);
        }

        wrapper.innerHTML = buildedTemplate;
    }
}