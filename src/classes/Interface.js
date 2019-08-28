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
        const wrapper = document.querySelector('#character-selection-interface-wrapper');
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
        const starterItem = this.gameData.items.books[0];
        const characters = this.gameData.characters;
        const blocks = this.gameData.blocks;

        let buildedTemplate = ``;
        for (var i = 0; i < characters.length; i++) {
            buildedTemplate += template(characters[i], starterItem, blocks.stone[0]);
        }

        wrapper.innerHTML = buildedTemplate;
    }

    displayPatternChoice() {
        const wrapper = document.querySelector('#pattern-selection-interface-wrapper');
        const template = (pattern, blocks) => {
            return `
                <div class="pattern-choice-cards__card" id="pattern-choice-cards__card-${pattern.slug}">
                    <div class="pattern-choice-cards__card__background">
                        <img class="pattern-choice-cards__card__background__pattern" src="${pattern.getImageUrl()}" />
                    </div>
                    <h2 class="pattern-choice-cards__card__title">${pattern.displayName}</h2>
                    <p class="pattern-choice-cards__card__description">${pattern.description}</p>
                    <h3 class="pattern-choice-cards__card__blocks-title">Séléctionnez un type de sol</h3>
                    <ul class="pattern-choice-cards__card__blocks">
                        <li class="pattern-choice-cards__card__blocks__block" id="pattern-choice-card-${pattern.slug}-grass">
                            <img src="${blocks[0].getImageUrl()}" />
                        </li>
                        <li class="pattern-choice-cards__card__blocks__block" id="pattern-choice-card-${pattern.slug}-burned">
                            <img src="${blocks[1].getImageUrl()}" />
                        </li>
                        <li class="pattern-choice-cards__card__blocks__block" id="pattern-choice-card-${pattern.slug}-stone">
                            <img src="${blocks[2].getImageUrl()}" />
                        </li>
                    </ul>
                </div>
            `;
        }
        const blocks = [
            this.gameData.blocks.grass[0],
            this.gameData.blocks.grass[3],
            this.gameData.blocks.stone[0],
        ];
        const patterns = this.gameData.mapPatterns;

        let buildedTemplate = ``;
        for (var i = 0; i < Object.keys(patterns).length; i++) {
            buildedTemplate += template(patterns[Object.keys(patterns)[i]], blocks);
        }

        wrapper.innerHTML = buildedTemplate;
    }

    displayPlayersStatus(players) {
        const wrapper = document.querySelector('#game-players-cards');    
        const template = (player, character, item) => {
            return `
                <div class="players-cards__card" id="player-status-${player.slug}">
                    <div class="players-cards__card__background">
                        <div class="players-cards__card__background__sprite" style="${character.getSpriteStyle(3)}"></div>
                    </div>
                    <h2 class="players-cards__card__title">${player.displayName}</h2>
                    <ul class="properties">
                        <li>
                            <i class="fas fa-heart fa-fw"></i><span>${character.properties.life}</span>
                        </li>
                        <li>
                            <i class="fas fa-bolt fa-fw"></i>
                            <span>
                                ${ player.attackPower() === character.properties.attack ? player.attackPower() : `<b>${player.attackPower()}</b>` }
                            </span>
                        </li>
                        <li>
                            <i class="fas fa-shield-alt fa-fw"></i>
                            <span>
                                ${ player.defensePower() === character.properties.defense ? player.defensePower() : `<b>${player.defensePower()}</b>` }
                            </span>
                        </li>
                        <li>
                            <i class="fas fa-shoe-prints fa-fw"></i>
                            <span>
                                ${ player.movementPointAmout() === character.properties.movementPoint ? player.movementPointAmout() : `<b>${player.movementPointAmout()}</b>` }
                            </span>
                        </li>
                    </ul>
                    <div class="players-cards__card__item">
                        <div class="players-cards__card__item__image"><img src="${item.getImageUrl()}" /></div>
                        <div class="players-cards__card__item__content">
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
                </div>
            `;
        }

        let buildedTemplate = ``;
        for (var i = 0; i < players.length; i++) {
            buildedTemplate += template(players[i], players[i].character, players[i].item);
        }

        wrapper.innerHTML = buildedTemplate;
    }

    displayFightIndicator() {
        const $indicator = document.querySelector('#game-fight-indicator');    
        $indicator.classList.add('animate');
    }
}