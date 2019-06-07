
function createGrid(parentId, size) {
  for (var i = 0; i < size; i++) {
    var newRowDiv = document.createElement("div");
    newRowDiv.setAttribute("id", "gamegrid__row-" + i);
    newRowDiv.setAttribute("class", "gamegrid__row");
    var currentDiv = document.getElementById(parentId);
    for (var x = 0; x < size; x++) {
        var newColDiv = document.createElement("div");
        newColDiv.setAttribute("id", "gamegrid__item-" + i + "-" + x);
        newColDiv.setAttribute("class", "gamegrid__item");
        newRowDiv.appendChild(newColDiv);
    }
    currentDiv.appendChild(newRowDiv);
  }
}

function createEmptyGrid(parentId, size) {
  for (var i = 0; i < size; i++) {
    var newRowDiv = document.createElement("div");
    newRowDiv.setAttribute("class", "gamegrid__row");
    var currentDiv = document.getElementById(parentId);
    for (var x = 0; x < size; x++) {
        var newColDiv = document.createElement("div");
        newColDiv.setAttribute("class", "gamegrid__item");
        newRowDiv.appendChild(newColDiv);
    }
    currentDiv.appendChild(newRowDiv);
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

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}

function randomBlocks(virtualGrid, blocks) {
  for (var i = 0; i < virtualGrid.length; i++) {
    for (var x = 0; x < virtualGrid.length; x++) {
      var currentItem = document.getElementById("gamegrid__item-" + i + "-" + x);
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "gamegrid__item__content");
      var newBlock = document.createElement("img");
      var randomBlock = blocks[getRandomInt(blocks.length)];
      if(randomBlock == "air_block_1") {
        currentItem.classList.add("air_block");
      }
      newBlock.setAttribute("src", "../game_assets/ground-blocks/" + randomBlock + ".png");
      newBlock.setAttribute("class", "gamegrid__item__content--block");
      newDiv.appendChild(newBlock);
      currentItem.appendChild(newDiv);
    }
  }
}

// TODO : Change Generation Placement
function randomItems(virtualGrid, maxNumber, variation, gameItems) {
   var currentGameItems = 0;
   for (var i = 0; i < virtualGrid.length; i++) {
      for (var x = 0; x < virtualGrid.length; x++) {
        var currentBlock = document.getElementById("gamegrid__item-" + i + "-" + x);
         if(currentGameItems < maxNumber && (variation - 1) == getRandomInt(variation) && !isAirBlock(currentBlock)) {
            var currentItem = currentBlock.getElementsByClassName("gamegrid__item__content")[0];
            var newBlock = document.createElement("img");
            newBlock.setAttribute("src", "../game_assets/ground-items/" + gameItems[getRandomInt(gameItems.length)] + ".png");
            newBlock.setAttribute("class", "gamegrid__item__content--gameitem");
            currentItem.appendChild(newBlock);
            currentGameItems++;
         }
      }
   }
}

function isAirBlock(block) {
  if(block == null) 
    return true;
  return block.classList.contains("air_block");
}

function arrayComposition(composition) {
  newArray = [];
   for (var block in composition) {
      for (var i = 0; i < composition[block]; i++) {
        newArray.push(block);
      }
    }
   return newArray;
}

let size = 12;
createEmptyGrid("gamegrid_table", size);
createGrid("gamegrid", size);
let virtualGrid = createVirtualGrid(size);

randomBlocks(virtualGrid, arrayComposition({
   grass_block_1: 2,
   grass_block_2: 1,
   grass_block_3: 0,
   grass_block_4: 0,
   grass_block_5: 0,
   grass_block_6: 0,
   stone_block_1: 2,
   stone_block_2: 1,
   stone_block_3: 0,
   stone_block_4: 0,
   stone_block_5: 0,
   stone_block_6: 0,
   air_block_1: 3,
}));

randomItems(virtualGrid, 4, 30, arrayComposition({
  backpack: 0, 
  belt: 1, 
  bomb: 1, 
  book: 1, 
  bronze_coin: 0, 
  ring: 1, 
  scroll: 0, 
  sword: 0
}));