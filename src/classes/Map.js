export default class Map {
  /**
   * Represents a Map.
   * @constructor
   * @param {integer} size - The size of the map.
   */
  constructor(size) {
    this._size = size;
    this._blocks = [];
    this._virtualMap = [];
    for (let i = 0; i < size; i++) {
      this._virtualMap[i] = [];
      for (let x = 0; x < size; x++) {
        this._virtualMap[i][x] = {
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
    return this._virtualMap;
  }

  /**
   * Generate the FrontEnd structure for the grid.
   * @param {integer} size - The size of the map.
   * @param {bool} [empty=false] - Generate a map without html id.
   */
  generateGrid(parentId, empty = false) {
    for (let i = 0; i < this._size; i++) {
      let newRowDiv = document.createElement("div");
      if (!empty) {
        newRowDiv.setAttribute("id", `gamegrid__row-${i}`);
      }
      newRowDiv.setAttribute("class", "gamegrid__row");
      let currentDiv = document.getElementById(parentId);
      for (let x = 0; x < this._size; x++) {
        let newColDiv = document.createElement("div");
        if (!empty) {
          newColDiv.setAttribute("id", `gamegrid__cell-${i}-${x}`);
        }
        newColDiv.setAttribute("class", "gamegrid__cell");
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
    this._virtualMap[row][col].block = block;
    this._virtualMap[row][col].reachable = block._reachable;
  }

  /**
   * Add an item to a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} item - The item present in this cell.
   */
  addItemToCell(row, col, item) {
    this._virtualMap[row][col].item = item;
  }

  /**
   * Get a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {object} The params of this this cell.
   */
  getCell(row, col) {
    return this._virtualMap[row][col];
  }

  /**
   * Return a random row of the map.
   * @param {integer} [min=0] - Min value.
   * @param {integer} [max=mapSize] - Max value.
   * @return {integer} The row index.
   */
  getRandomRow(min = 0, max = this._size - 1) {
      min = Math.ceil(min);
      max = Math.floor(max);
      const res = Math.floor(Math.random() * (max - min + 1)) + min;
      return res > this._size || res < 0 ? this._size - 1 : res;
  }

  /**
   * Return a random col of the map.
   * @param {integer} [min=0] - Min value.
   * @param {integer} [max=mapSize] - Max value.
   * @return {integer} The col index.
   */
  getRandomCol(min = 0, max = this._size - 1) { 
      min = Math.ceil(min);
      max = Math.floor(max);
      const res = Math.floor(Math.random() * (max - min + 1)) + min;
      return res > this._size || res < 0 ? this._size - 1 : res;
  }

  /**
   * Check if a cell exist.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If exist return true instead return false.
   */
  cellExist(row, col) {
    if(typeof this._virtualMap[row] == 'undefined') {
      return false;
    } else {
      if(typeof this._virtualMap[row][col] == 'undefined') {
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * Define if a cell is reachable (Is not an air_block or water-block).
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If is reachable return true instead return false.
   */
  isReachable(row, col) {
    return this._virtualMap[row][col].reachable;
  }

  /**
   * Define if a cell contain an item.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If contain an item return true instead return false.
   */
  containItem(row, col) {
    return this._virtualMap[row][col].item !== null;
  }

  /**
   * Define if a cell is an air block
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If is an air block return true instead return false.
   */
  isAirBlock(row, col) {
    return this._virtualMap[row][col].block._name === "air_block_1";
  }
}
