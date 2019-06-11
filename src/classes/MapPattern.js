export class MapPattern {
    constructor(mapObject, pattern, blocks) {
      this.virtualMap = [];
      for (let i = 0; i < mapObject.size; i++) {
        this.virtualMap[i] = [];
        for (let x = 0; x < mapObject.size; x++) {
          this.virtualMap[i][x] = blocks[pattern[i][x]];
        }
      }
    }
    getCell(row, col) {
      return this.virtualMap[row][col];
    }
  }
  