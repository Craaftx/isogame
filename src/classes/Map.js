export class Map {
  constructor(size) {
    this.size = size;
    this.virtualMap = [];
    for (let i = 0; i < size; i++) {
      this.virtualMap[i] = [];
      for (let x = 0; x < size; x++) {
        this.virtualMap[i][x] = [];
      }
    }
  }

  getVirtualMap() {
    return this.virtualMap;
  }

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

  setCell(row, col, element) {
    this.virtualMap[row][col] = element;
  }

  getCell(row, col) {
    return this.virtualMap[row][col];
  }

  isReachable(row, col) {
    return this.virtualMap[row][col].reachable;
  }
}
