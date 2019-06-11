import "./main.scss";
import { Block } from "./classes/Block.js";
import { Map } from "./classes/Map.js";
import { Environnement } from "./classes/Environnement.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var globalBlockGenerationTime = 0;

function randomBlocks(virtualGrid, blocks) {
  var animationDelay = 0;
  for (var i = 0; i < virtualGrid.length; i++) {
    for (var x = 0; x < virtualGrid.length; x++) {
      var currentItem = document.getElementById(
        "gamegrid__item-" + i + "-" + x
      );
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "gamegrid__item__content");
      var newBlock = document.createElement("img");
      var randomBlock = blocks[getRandomInt(blocks.length)];
      if (randomBlock == "air_block_1") {
        currentItem.classList.add("air_block");
      }
      newBlock.setAttribute(
        "src",
        "../game_assets/ground-blocks/" + randomBlock + ".png"
      );
      newBlock.setAttribute("class", "gamegrid__item__content--block");
      newBlock.setAttribute(
        "style",
        "animation-delay:" + (getRandomInt(400) + animationDelay) + "ms"
      );
      newDiv.appendChild(newBlock);
      currentItem.appendChild(newDiv);
      animationDelay += 20;
    }
  }
  globalBlockGenerationTime = animationDelay;
}

// TODO : Change Generation Placement
function randomItems(virtualGrid, maxNumber, variation, gameItems) {
  var currentGameItems = 0;
  for (var i = 0; i < virtualGrid.length; i++) {
    for (var x = 0; x < virtualGrid.length; x++) {
      var currentBlock = document.getElementById(
        "gamegrid__item-" + i + "-" + x
      );
      if (
        currentGameItems < maxNumber &&
        variation - 1 == getRandomInt(variation) &&
        !isAirBlock(currentBlock)
      ) {
        var currentItem = currentBlock.getElementsByClassName(
          "gamegrid__item__content"
        )[0];
        var newBlock = document.createElement("img");
        newBlock.setAttribute(
          "src",
          "../game_assets/ground-items/" +
            gameItems[getRandomInt(gameItems.length)] +
            ".png"
        );
        newBlock.setAttribute("class", "gamegrid__item__content--gameitem");
        newBlock.setAttribute(
          "style",
          "animation-delay:" + (globalBlockGenerationTime + 40) + "ms"
        );
        currentItem.appendChild(newBlock);
        currentGameItems++;
      }
    }
  }
}

function isAirBlock(block) {
  if (block == null) return true;
  return block.classList.contains("air_block");
}

function arrayComposition(composition) {
  let newArray = [];
  for (var block in composition) {
    for (var i = 0; i < composition[block]; i++) {
      newArray.push(block);
    }
  }
  return newArray;
}

let size = 12;

let map = new Map(size);
map.generateGrid("gamegrid");
map.generateGrid("gamegrid_table", true);

let composition = arrayComposition({
  grass_block_1: 4,
  grass_block_2: 2,
  grass_block_3: 0,
  grass_block_4: 0,
  grass_block_5: 0,
  grass_block_6: 0,
  stone_block_1: 2,
  stone_block_2: 0,
  stone_block_3: 0,
  stone_block_4: 0,
  stone_block_5: 1,
  stone_block_6: 0,
  air_block_1: 1
});

let environnement = new Environnement(map, composition);

environnement.generateBlock();

/*randomItems(virtualGrid, 4, 30, arrayComposition({
  backpack: 0, 
  belt: 1, 
  bomb: 1, 
  book: 1, 
  bronze_coin: 0, 
  ring: 1, 
  scroll: 0, 
  sword: 0
}));*/
