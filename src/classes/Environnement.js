export class Environnement {
  /**
   * Represents the map environnement.
   * @constructor
   * @param {object} map - The map object.
   * @param {array} blocks - The game blocks.
   * @param {array} items - The game items.
   */
  constructor(map, blocks, items) {
    this.map = map;
    this.blocks = blocks;
    this.items = items;
    this.composition = [];
  }

  /**
   * Create the map block's composition.
   * @param {array} composition - Array with block associated of spawn chance.
   */

  //TODO parcourir le tableau de blocks
  createComposition(composition) {
    this.composition = [];
    for (var wantedBlock in composition) {
      for (let x = 0; x < this.blocks.length; x++) {
        console.log(this.blocks[x]);
      }
    }
    this.composition = this.composition.flat();
  }

  /**
   * Place some blocks pattern on the map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} pattern - The pattern.
   * @param {object} block - The block used.
   */
  placeBlockPattern(row, col, pattern, block) {
      for (let x = 0; x < pattern.length; x++) {
        for (let y = 0; y < pattern[0].length; y++) {
          if(pattern[x][y] === 1) {
            if(this.map.cellExist((row + x), (col + y))) {
              this.addBlockToCell((row + x), (col + y), block);
            }
          }
        }
      }
  }

  /**
   * Add a block to a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} block - The block present in this cell.
   */
  addBlockToCell(row, col, block) {
    let currentItem = document.querySelector(
      "#gamegrid__item-" + row + "-" + col + " img"
    );
    currentItem.setAttribute(
      "src",
      "game_assets/ground-blocks/" + block.name + ".png"
    );
    this.map.addBlockToCell(row, col, block);
  }

  /**
   * Populate the grid with blocks and add to virtual grid the block properties.
   * @param {object} [mapPattern=null] - The pattern used for the map.
   * @param {bool} [time=500] - Max time for generate the map, used by animation.
   */
  buildMap(mapPattern = null, time = 500) {
    let usableBlocks =
      this.composition.length == 0 ? this.blocks : this.composition;
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
        if (mapPattern === null) {
          block =
            usableBlocks[
              Math.floor(Math.random() * Math.floor(usableBlocks.length))
            ];
        } else {
          block = mapPattern.getBlockInCell(row, col);
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

  /**
   * Populate the grid with items and add to virtual grid the items properties.
   * @param {bool} [delay=500] - Delay for generate the items, used by animation.
   */
  placeItems(number, delay = 500) {
    var currentGameItems = 0;
    for (var i = 0; i < virtualGrid.length; i++) {
      for (var x = 0; x < virtualGrid.length; x++) {
        var currentBlock = document.getElementById(
          "gamegrid__item-" + i + "-" + x
        );
        if (
          currentGameItems < maxNumber &&
          variation - 1 == getRandomInt(variation) &&
          !isAirBlock(currentBlock)
        ) {
          var currentItem = currentBlock.getElementsByClassName(
            "gamegrid__item__content"
          )[0];
          var newBlock = document.createElement("img");
          newBlock.setAttribute(
            "src",
            "../game_assets/ground-items/" +
              gameItems[getRandomInt(gameItems.length)] +
              ".png"
          );
          newBlock.setAttribute("class", "gamegrid__item__content--gameitem");
          newBlock.setAttribute(
            "style",
            "animation-delay:" + (globalBlockGenerationTime + 40) + "ms"
          );
          currentItem.appendChild(newBlock);
          currentGameItems++;
        }
      }
    }
  }
}
