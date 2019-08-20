export default class Pattern {
  /**
   * Represents a Pattern.
   * @constructor
   * @param {string} slug - Monster slug, used in URL (ex 001).
   * @param {string} displayName - Display name, used in interface.
   * @param {string} description - Description of the Pattern.
   * @param {array} pattern - (Multidimensional array) The pattern who applies to the map.
   * @param {array} blocks - Blocks used in the pattern.
   */
  constructor(slug, displayName, description, pattern, blocks) {
    this._slug = slug;
    this._displayName = displayName;
    this._description = description;
    this._virtualMap = [];
    this._xSize = pattern.length;
    this._ySize = pattern[0].length;
    for (let i = 0; i < this._xSize; i++) {
      this._virtualMap[i] = [];
      for (let x = 0; x < this._ySize; x++) {
        if(pattern[i][x]) {
          this._virtualMap[i][x] = blocks[pattern[i][x]];
        }
      }
    }
  }

  get slug() {
      return this._slug;
  }

  get displayName() {
      return this._displayName;
  }

  get description() {
      return this._description;
  }

  getImageUrl() {
    return `game_assets/map-set/${this.slug}.png`;
  }

  /**
   * Get a block from cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {object} The block present in this cell.
   */
  getBlockInCell(row, col) {
    return this._virtualMap[row][col];
  }
}
