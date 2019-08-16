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
          player: null,
          reachable: null
        };
      }
    }
  }

  get size() {
    return this._size;
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
   */
  generateGrid(parentId) {
    for (let i = 0; i < this._size; i++) {
      let newRowDiv = document.createElement("div");
      newRowDiv.setAttribute("id", `gamegrid__row-${i}`);
      newRowDiv.setAttribute("class", "gamegrid__row");
      let currentDiv = document.getElementById(parentId);
      for (let x = 0; x < this._size; x++) {
        let newColDiv = document.createElement("div");
        newColDiv.setAttribute("id", `gamegrid__cell-${i}-${x}`);
        newColDiv.setAttribute("class", "gamegrid__cell");
        newRowDiv.appendChild(newColDiv);
      }
      currentDiv.appendChild(newRowDiv);
    }
  }

  generateMovementGrid(movementPoint, player, currentGame) {
    let row = player.xAxis;
    let col = player.yAxis;
    for (let y = 0; y < 4; y++) {
      for (let x = 1; x < (movementPoint + 1); x++) {
        if(y == 0) {
          if(this.addMovementEventToCell(row + x, col, player, currentGame)) {
            x = (movementPoint + 1);
          }
        }
        if(y == 1) {
          if(this.addMovementEventToCell(row, col + x, player, currentGame)) {
            x = (movementPoint + 1);
          }
        }
        if(y == 2) {
          if(this.addMovementEventToCell(row - x, col, player, currentGame)) {
            x = (movementPoint + 1);
          }
        }
        if(y == 3) {
          if(this.addMovementEventToCell(row, col - x, player, currentGame)) {
            x = (movementPoint + 1);
          }
        }
      }
    }
  }

  addMovementEventToCell(row, col, player, currentGame) {
    if(this.isReachable(row, col)) {
      let cell = document.getElementById(`gamegrid__cell-${row}-${col}`);
      cell.classList.add("gamegrid__cell--reachable");
      cell.addEventListener('click', function() { this.triggerMovementEvent(row, col, player, player.xAxis, player.yAxis, currentGame) }.bind(this));
      return false;
    }
    return true;
  }

  triggerMovementEvent(row, col, player, playerX, playerY, currentGame) {
    let xAxisMovement = playerX - row;
    let yAxisMovement = playerY - col;
    this.removePlayerFromCell(playerX, playerY,);
    this.movementEventReset(player);
    player.movePlayer(row, col);
    this.addPlayerToCell(player); 
    currentGame.playerMovementEnd(xAxisMovement !== 0 ? xAxisMovement : yAxisMovement);
  }

  /**
   * Reset all Event Listener and the movement cell display.
   * See https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
   * @param {object} player - The actual player.
   */
  movementEventReset(player) {
    let row = player.xAxis;
    let col = player.yAxis;
    for (let y = 0; y < 4; y++) {
      for (let x = 1; x < (player.character.properties.movementPoint + 1); x++) {
        if(this.cellExist(row + x, col) && y == 0) {
          let cell = document.getElementById(`gamegrid__cell-${row + x}-${col}`);
          cell.classList.remove("gamegrid__cell--reachable");
          let cellClone = cell.cloneNode(true);
          cell.parentNode.replaceChild(cellClone, cell);
        }
        if(this.cellExist(row, col + x) && y == 1) {
          let cell = document.getElementById(`gamegrid__cell-${row}-${col + x}`);
          cell.classList.remove("gamegrid__cell--reachable");
          let cellClone = cell.cloneNode(true);
          cell.parentNode.replaceChild(cellClone, cell);
        }
        if(this.cellExist(row - x, col) && y == 2) {
          let cell = document.getElementById(`gamegrid__cell-${row - x}-${col}`);
          cell.classList.remove("gamegrid__cell--reachable");
          let cellClone = cell.cloneNode(true);
          cell.parentNode.replaceChild(cellClone, cell);
        }
        if(this.cellExist(row, col - x) && y == 3) {
          let cell = document.getElementById(`gamegrid__cell-${row}-${col - x}`);
          cell.classList.remove("gamegrid__cell--reachable");
          let cellClone = cell.cloneNode(true);
          cell.parentNode.replaceChild(cellClone, cell);
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
    this._virtualMap[row][col].block = block;
    this._virtualMap[row][col].reachable = block._reachable;
  }

  /**
   * Add a player to a cell present in the virtual map.
   * @param {object} player - The block present in this cell.
   */
  addPlayerToCell(player) {
    this._virtualMap[player.xAxis][player.yAxis].player = player;
    this._virtualMap[player.xAxis][player.yAxis].reachable = false;
  }

  /**
   * Remove a player to a cell present in the virtual map.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @param {object} player - The block present in this cell.
   */
  removePlayerFromCell(row, col) {
    this._virtualMap[row][col].player = null;
    this._virtualMap[row][col].reachable = true;
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
    if (typeof this._virtualMap[row] == "undefined") {
      return false;
    } else {
      if (typeof this._virtualMap[row][col] == "undefined") {
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
    if(this.cellExist(row, col)) {
      return this._virtualMap[row][col].reachable;
    }
    return false;
  }

  /**
   * Define if a cell is reachable (Is not an air_block or water-block).
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If is reachable return true instead return false.
   */
  isNearPlayers(row, col) {
    if(this.cellExist(row, col)) {
      if (
        this.containPlayer((row + 1), col) ||
        this.containPlayer(row, (col + 1)) ||
        this.containPlayer(row, (col - 1)) ||
        this.containPlayer((row - 1), col)
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Define if a cell contain an item.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If contain an item return true instead return false.
   */
  containItem(row, col) {
    if(this.cellExist(row, col)) {
      return this._virtualMap[row][col].item !== null;
    }
    return false;
  }

  /**
   * Define if a cell contain an item.
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If contain an item return true instead return false.
   */
  containPlayer(row, col) {
    if(this.cellExist(row, col)) {
      return this._virtualMap[row][col].player !== null;
    }
    return false;
  }

  /**
   * Define if a cell is an air block
   * @param {integer} row - The row of the cell.
   * @param {integer} col - The column of the cell.
   * @return {bool} If is an air block return true instead return false.
   */
  isAirBlock(row, col) {
    if(this.cellExist(row, col)) {
      return this._virtualMap[row][col].block._name === "air_block_1";
    }
    return false;
  }
}
