export class Environnement {
    constructor(mapObject, blockArray) {
        this.map = mapObject;
        this.blockArray = blockArray;
    }

    generateBlock(time = 500) {
        let animationDelay = 0;
        let animationIncrement = time / this.map.size;
        for (let i = 0; i < this.map.size; i++) {
            for (let x = 0; x < this.map.size; x++) {
                let currentItem = document.getElementById("gamegrid__item-" + i + "-" + x);
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "gamegrid__item__content");
                let newBlock = document.createElement("img");
                let randomBlock = this.blockArray[Math.floor(Math.random() * Math.floor(this.blockArray.length))];
                if (randomBlock.empty) {
                    currentItem.classList.add("air_block");
                }
                newBlock.setAttribute("src", "game_assets/ground-blocks/" + randomBlock + ".png");
                newBlock.setAttribute("class", "gamegrid__item__content--block");
                newBlock.setAttribute("style", "animation-delay:" + (Math.floor(Math.random() * Math.floor(400)) + animationDelay) + "ms");
                newDiv.appendChild(newBlock);
                currentItem.appendChild(newDiv);
                animationDelay += animationIncrement;
            }
        }
    }
}