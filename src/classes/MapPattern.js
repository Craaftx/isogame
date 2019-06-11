export class MapPattern {
  /**
   * Represents a Map Pattern.
   * @constructor
   * @param {object} map - The map object.
   * @param {array} pattern - The pattern who applies to the map.
   * @param {array} blocks - Blocks used in the pattern.
   */
  constructor(map, pattern, blocks) {
    this.virtualMap = [];
    for (let i = 0; i < map.size; i++) {
      this.virtualMap[i] = [];
      for (let x = 0; x < map.size; x++) {
        this.virtualMap[i][x] = blocks[pattern[i][x]];
      }
    }
  }

  /**
   * Get a block from cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {object} The block present in this cell.
   */
  getBlockInCell(row, col) {
    return this.virtualMap[row][col];
  }
}
