function createGrid(parentId, size) {
  for (var i = 0; i < size; i++) {
    var newRowDiv = document.createElement("div");
    newRowDiv.setAttribute("id", "gamegrid__row-" + i);
    newRowDiv.setAttribute("class", "gamegrid__row");
    var currentDiv = document.getElementById(parentId);
    currentDiv.appendChild(newRowDiv);
    for (var x = 0; x < size; x++) {
        var newColDiv = document.createElement("div");
        newColDiv.setAttribute("id", "gamegrid__item-" + i + "-" + x);
        newColDiv.setAttribute("class", "gamegrid__item");
        var currentRowDiv = document.getElementById("gamegrid__row-" + i);
        currentRowDiv.appendChild(newColDiv);
    }
  }
}

function createVirtualGrid(size) {
  let virtualGrid = [];
  for (var i = 0; i < size; i++) {
    virtualGrid[i] = [];
    for (var x = 0; x < size; x++) {
      virtualGrid[i][x] = x;
    }
  }
  return virtualGrid;
}

function randomBlocks(blocks, virtualGrid) {
  for (var i = 0; i < virtualGrid.length; i++) {
    for (var x = 0; x < virtualGrid.length; x++) {
      var currentItem = document.getElementById("gamegrid__item-" + i + "-" + x);
      var newBlock = document.createElement("img");
      newBlock.setAttribute("src", "../game_assets/ground-blocks/" + blocks[getRandomInt(blocks.length)] + ".png");
      newBlock.style.marginTop = '-' + x + '0px';
      currentItem.appendChild(newBlock);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

createGrid("gamegrid", 6);
let virtualGrid = createVirtualGrid(6);
let blocks = ['grass-block-4','grass-block-5','stone-block-3'];
randomBlocks(blocks, virtualGrid);