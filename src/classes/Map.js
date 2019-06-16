export class Map {
  /**
   * Represents a Map.
   * @constructor
   * @param {integer} size - The size of the map.
   */
  constructor(size) {
    this.size = size;
    this.virtualMap = [];
    for (let i = 0; i < size; i++) {
      this.virtualMap[i] = [];
      for (let x = 0; x < size; x++) {
        this.virtualMap[i][x] = {
          block: null,
          item: null,
          reachable: null,
        };
      }
    }
  }

  /**
   * Return an Array of the map.
   * @return {array} Map Array with rows and columns.
   */
  getVirtualMap() {
    return this.virtualMap;
  }

  /**
   * Generate the FrontEnd structure for the grid.
   * @param {integer} size - The size of the map.
   * @param {bool} [empty=false] - Generate a map without html id.
   */
  generateGrid(parentId, empty = false) {
    for (let i = 0; i < this.size; i++) {
      let newRowDiv = document.createElement("div");
      if (!empty) {
        newRowDiv.setAttribute("id", "gamegrid__row-" + i);
      }
      newRowDiv.setAttribute("class", "gamegrid__row");
      let currentDiv = document.getElementById(parentId);
      for (let x = 0; x < this.size; x++) {
        let newColDiv = document.createElement("div");
        if (!empty) {
          newColDiv.setAttribute("id", "gamegrid__item-" + i + "-" + x);
        }
        newColDiv.setAttribute("class", "gamegrid__item");
        newRowDiv.appendChild(newColDiv);
      }
      currentDiv.appendChild(newRowDiv);
    }
  }

  /**
   * Add a block to a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} block - The block present in this cell.
   */
  addBlockToCell(row, col, block) {
    this.virtualMap[row][col].block = block;
    this.virtualMap[row][col].reachable = block.reachable;
  }

  /**
   * Add an item to a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} item - The item present in this cell.
   */
  addItem(row, col, item) {
    this.virtualMap[row][col].item = item;
  }

  /**
   * Get a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {object} The params of this this cell.
   */
  getCell(row, col) {
    return this.virtualMap[row][col];
  }

  /**
   * Define if a cell is reachable (Is not an air_block or water-block).
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If is reachable return true instead return false.
   */
  isReachable(row, col) {
    return this.virtualMap[row][col].reachable;
  }

  /**
   * Define if a cell is an air block
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If is an air block return true instead return false.
   */
  isAirBlock(row, col) {
    return this.virtualMap[row][col].block.name === "air_block_1";
  }
}
