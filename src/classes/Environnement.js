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
    this._itemsFlatten = [];
    this.flattenItems();
  }

  /**
   * Create the map block's composition.
   * @param {array} composition - Array with block associated of spawn chance.
   */
  createComposition(composition) {
    let keys = Object.keys(this._blocks);
    for (let wantedBlock in composition) {
      for (let i = 0; i < keys.length; i++) {
        for (let x = 0; x < composition[wantedBlock]; x++) {
          this._composition.push(
            this._blocks[keys[i]].filter(block => block._name == wantedBlock)
          );
        }
      }
    }
    this._composition = this._composition.flat();
  }

  /**
   * Flat the map items's to remove object names.
   */
  flattenItems() {
    let keys = Object.keys(this._items);
    for (let i = 0; i < keys.length; i++) {
      for (let x = 0; x < this._items[keys[i]].length; x++) {
        this._itemsFlatten.push(this._items[keys[i]][x]);
      }
    }
  }

  /**
   * Shuffle flatten items.
   */
  shuffleItems() {
    this._itemsFlatten.sort(function() {
      return 0.5 - Math.random();
    });
  }

  /**
   * Place some blocks pattern on the map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} pattern - The pattern.
   */
  placeBlockPattern(row, col, pattern) {
    for (let x = 0; x < pattern._xSize; x++) {
      for (let y = 0; y < pattern._ySize; y++) {
        if (pattern.getBlockInCell(x, y)) {
          if (this._map.cellExist(row + x, col + y)) {
            this.addBlockToCell(row + x, col + y, pattern.getBlockInCell(x, y));
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
      "#gamegrid__item-" + row + "-" + col + " .gamegrid__item__content--block"
    );
    currentItem.setAttribute(
      "src",
      "game_assets/ground-blocks/" + block._name + ".png"
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
    for (let row = 0; row < this._map._size; row++) {
      for (let col = 0; col < this._map._size; col++) {
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
          "game_assets/ground-blocks/" + block._name + ".png"
        );
        newBlock.setAttribute("class", "gamegrid__item__content--block");

        newDiv.appendChild(newBlock);
        currentItem.appendChild(newDiv);
      }
    }
  }

  /**
   * Place items on the grid by quarter of grid.
   * @param {integer} number - Number of items placed.
   */
  placeItems(number) {
    const mapSize = this._map._size - 1;
    const halfSize = this._map._size / 2 - 1;
    const mapParts = [
      [ [0, halfSize], [0, halfSize] ],
      [ [halfSize, mapSize], [0, halfSize] ],
      [ [halfSize, 0], [halfSize, mapSize] ],
      [ [halfSize, mapSize], [halfSize, mapSize] ]
    ];
    const mapCenter = [
      [halfSize - 1, halfSize + 1], [0, mapSize]
    ];

    this.shuffleItems();

    let numberCount = number;
    while (numberCount > 0) {
      if ((numberCount - 4) >= 0) {
        for (var x = 0; x < 4; x++) {
          let cell;
          do {
            cell = [
              this._map.getRandomRow(mapParts[x][0][0], mapParts[x][0][1]),
              this._map.getRandomCol(mapParts[x][1][0], mapParts[x][1][1])
            ];
          } while (!this._map.isReachable(cell[0], cell[1]) || this._map.containItem(cell[0], cell[1]));
          console.log('Place Item | number - 4 | From number :' + numberCount + " To map part : " + mapParts[x]);
          this.generateItem(this._itemsFlatten[numberCount], cell[0], cell[1]);
          numberCount--;
        }
      } else {
        if (numberCount - 2 > 0) {
          for (var x = 0; x < 2; x++) {
            let cell;
            do {
              let newIndex = (x == 2 ? x = 1 : x);
              cell = [
                this._map.getRandomRow(mapParts[newIndex][0][0], mapParts[newIndex][0][1]),
                this._map.getRandomCol(mapParts[newIndex][1][0], mapParts[newIndex][1][1])
              ];
            } while (!this._map.isReachable(cell[0], cell[1]) || this._map.containItem(cell[0], cell[1]));
            console.log('Place Item | number - 2 | From number :' + numberCount + " To map part : " + mapParts[x]);
            this.generateItem(this._itemsFlatten[numberCount], cell[0], cell[1]);
            numberCount--;
          }
        } else {
          for (var x = 0; x < numberCount; x++) {
            let cell;
            do {
              cell = [
                this._map.getRandomRow(mapCenter[0][0], mapCenter[0][1]),
                this._map.getRandomCol(mapCenter[1][0], mapCenter[1][1])
              ];
            } while (!this._map.isReachable(cell[0], cell[1]) || this._map.containItem(cell[0], cell[1]));
            console.log('Place Item | Center | From number :' + numberCount + " To : " + cell[0] + " " + cell[1]);
            this.generateItem(this._itemsFlatten[numberCount], cell[0], cell[1]);
            numberCount--;
          }
        }
      }
    }

    if (number % 2 === 0) {
      let itemCount = 0;
    }
  }

  /**
   * Generate item on HTML and add it to Virtual Grid.
   * @param {object} item - The item.
   * @param {integer} row - The row of the item.
   * @param {integer} col - The col of the item.
   * @param {bool} [delay=200] - Delay for generate the items, used by animation.
   */
  generateItem(item, row, col, delay = 400) {
    let currentBlock = document.getElementById(
      "gamegrid__item-" + row + "-" + col
    );
    var currentContent = currentBlock.getElementsByClassName(
      "gamegrid__item__content"
    )[0];
    var newItem = document.createElement("img");
    newItem.setAttribute(
      "src",
      "game_assets/ground-items/" + item._name + ".png"
    );
    newItem.setAttribute("class", "gamegrid__item__content--gameitem");
    newItem.setAttribute(
      "style",
      "animation-delay:" +
        (Math.floor(Math.random() * Math.floor(400)) + delay) +
        "ms"
    );
    currentContent.appendChild(newItem);
    this._map.addItemToCell(row, col, item);
  }
}
