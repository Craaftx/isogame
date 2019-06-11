export class Environnement {
    /**
     * Represents the map environnement.
     * @constructor
     * @param {object} size - The size of the map.
     * @param {integer} size - The size of the map.
     */
  constructor(map, blocks) {
    this.map = map;
    this.blocks = blocks;
    this.composition = [];
  }

  /**
   * Create the map block's composition.
   * @param {array} composition - Array with block associated of spawn chance.
   */
  createComposition(composition) {
    this.composition = [];
    for (var wantedBlock in composition) {
      for (var i = 0; i < composition[wantedBlock]; i++) {
        this.composition.push(
          this.blocks.filter(block => block.name == wantedBlock)
        );
      }
    }
    this.composition = this.composition.flat();
  }

  /**
   * Populate the grid with blocks and add to virtual grid the block properties.
   * @param {integer} [mapPattern=null] - The pattern used for the map.
   * @param {bool} [time=500] - Max time for generate the map, used by animation.
   */
  buildMap(mapPattern = null, time = 500) {
    let usableBlocks = this.composition.length == 0 ? this.blocks : this.composition;
    let animationDelay = 0;
    let animationIncrement = time / this.map.size;
    for (let row = 0; row < this.map.size; row++) {
      for (let col = 0; col < this.map.size; col++) {
        let currentItem = document.getElementById(
          "gamegrid__item-" + row + "-" + col
        );

        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "gamegrid__item__content");

        let block;
        if(mapPattern === null) {
            block =
            usableBlocks[
              Math.floor(Math.random() * Math.floor(usableBlocks.length))
            ];
        } else {
            block = mapPattern.getBlockInCell(row,col);
        }

        this.map.addBlockToCell(row, col, block);
        let newBlock = document.createElement("img");
        newBlock.setAttribute(
          "src",
          "game_assets/ground-blocks/" + block.name + ".png"
        );
        newBlock.setAttribute("class", "gamegrid__item__content--block");
        newBlock.setAttribute(
          "style",
          "animation-delay:" +
            (Math.floor(Math.random() * Math.floor(400)) + animationDelay) +
            "ms"
        );

        newDiv.appendChild(newBlock);
        currentItem.appendChild(newDiv);

        animationDelay += animationIncrement;
      }
    }
  }
}
