export default class Cell {
    /**
     * Represents a map cell.
     * @constructor
     * @param {object} topCell - The adjacent cell on top.
     * @param {object} bottomCell - The adjacent cell on bottom.
     * @param {object} leftCell - The adjacent cell on the left.
     * @param {object} rightCell - The adjacent cell on the right.
     * @param {integer} xAxis - x position on the map.
     * @param {integer} yAxis - y position on the map.
     * @param {object} block - The block type of the cell.
     * @param {object} contains - The contains of the cell (items, characters).
     * @param {bool} isReachable - The cell is reachable.
     */
    constructor(topCell, bottomCell, leftCell, rightCell, xAxis, yAxis, block, contains = null, isReachable = true) {
      this._topCell = topCell;
      this._bottomCell = bottomCell;
      this._leftCell = leftCell;
      this._rightCell = rightCell;
      this._xAxis = xAxis;
      this._yAxis = yAxis;
      this._block = block;
      this._contains = contains;
      this._isReachable = isReachable;
    }

    get topCell() {
      return this._topCell;
    }

    get bottomCell() {
      return this._bottomCell;
    }

    get leftCell() {
      return this._leftCell;
    }

    get rightCell() {
      return this._rightCell;
    }

    get xAxis() {
      return this._xAxis;
    }

    get yAxis() {
      return this._yAxis;
    }

    get isReachable() {
      return this._isReachable;
    }
  }
  
