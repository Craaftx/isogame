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
     * @param {bool} reachable - The cell is reachable.
     */
    constructor(topCell, bottomCell, leftCell, rightCell, xAxis, yAxis, block, reachable, item) {
      this._topCell = topCell;
      this._bottomCell = bottomCell;
      this._leftCell = leftCell;
      this._rightCell = rightCell;
      this._xAxis = xAxis;
      this._yAxis = yAxis;
    }
  }
  