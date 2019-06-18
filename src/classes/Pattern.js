export class Pattern {
  /**
   * Represents a Pattern.
   * @constructor
   * @param {array} pattern - The pattern who applies to the map.
   * @param {array} blocks - Blocks used in the pattern.
   */
  constructor(pattern, blocks) {
    this.virtualMap = [];
    for (let i = 0; i < pattern.length; i++) {
      this.virtualMap[i] = [];
      for (let x = 0; x < pattern[0].length; x++) {
        if(pattern[i][x]) {
          this.virtualMap[i][x] = blocks[pattern[i][x]];
        }
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
