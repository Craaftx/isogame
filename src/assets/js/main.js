
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
      newBlock.setAttribute("src", "../game_assets/ground-blocks/" + blocks[getRandomInt(blocks.length)] + ".png");
      newBlock.setAttribute("class", "gamegrid__item__content--block");
      newDiv.appendChild(newBlock);
      currentItem.appendChild(newDiv);
    }
  }
}

function randomItems(virtualGrid, maxNumber, variation, gameItems) {
   var currentGameItems = 0;
   for (var i = 0; i < virtualGrid.length; i++) {
      for (var x = 0; x < virtualGrid.length; x++) {
         console.log(getRandomInt(variation));
         if(currentGameItems < maxNumber && (variation - 1) == getRandomInt(variation)) {
            var currentItem = document.getElementById("gamegrid__item-" + i + "-" + x).getElementsByClassName("gamegrid__item__content")[0];
            var newBlock = document.createElement("img");
            newBlock.setAttribute("src", "../game_assets/ground-items/" + gameItems[getRandomInt(gameItems.length)] + ".png");
            newBlock.setAttribute("class", "gamegrid__item__content--gameitem");
            currentItem.appendChild(newBlock);
            console.log(gameItems[getRandomInt(gameItems.length)]);
            currentGameItems++;
         }
      }
   }
}

function environnementComposition(composition) {
   environnement = [];
   for (var block in composition) {
      for (var i = 0; i < composition[block]; i++) {
         environnement.push(block);
      }
    }
   return environnement;
}

let size = 12;
createGrid("gamegrid", size);
let virtualGrid = createVirtualGrid(size);

randomBlocks(virtualGrid, environnementComposition({
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
   air_block_1: 1,
}));

randomItems(virtualGrid, 4, 20, ['backpack', 'belt', 'bomb', 'book', 'bronze_coin', 'ring', 'scroll', 'sword']);