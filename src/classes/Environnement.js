export class Environnement {
  /**
   * Represents the map environnement.
   * @constructor
   * @param {object} map - The map object.
   * @param {array} blocks - The game blocks.
   * @param {array} items - The game items.
   */
  constructor(map, blocks, items) {
    this._map = map;
    this._blocks = blocks;
    this._items = items;
    this._composition = [];
  }

  /**
   * Create the map block's composition.
   * @param {array} composition - Array with block associated of spawn chance.
   */

  //TODO refactor this
  createComposition(composition) {
    let keys = Object.keys(this._blocks);
    for (let wantedBlock in composition) {
      for (let i = 0; i < keys.length; i++) {
        for (let x = 0; x < composition[wantedBlock]; x++) {
          this._composition.push(
            this._blocks[keys[i]].filter(block => block.name == wantedBlock)
          );
        }
      }
    }
    this._composition = this._composition.flat();
  }

  /**
   * Place some blocks pattern on the map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} pattern - The pattern.
   */
  placeBlockPattern(row, col, pattern) {
      for (let x = 0; x < pattern.xSize; x++) {
        for (let y = 0; y < pattern.ySize; y++) {
          if(pattern.getBlockInCell(x, y)) {
            if(this._map.cellExist((row + x), (col + y))) {
              this.addBlockToCell((row + x), (col + y), pattern.getBlockInCell(x, y));
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
    this._map.addBlockToCell(row, col, block);
  }

  /**
   * Populate the grid with blocks and add to virtual grid the block properties.
   * @param {object} [mapPattern=null] - The pattern used for the map.
   * @param {bool} [time=500] - Max time for generate the map, used by animation.
   */
  buildMap(mapPattern = null, time = 500) {
    let usableBlocks =
      this._composition.length == 0 ? this._blocks : this._composition;
    let animationDelay = 0;
    let animationIncrement = time / this._map.size;
    for (let row = 0; row < this._map.size; row++) {
      for (let col = 0; col < this._map.size; col++) {
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

        this._map.addBlockToCell(row, col, block);
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
