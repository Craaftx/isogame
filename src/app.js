import "./main.scss";
import { Block } from "./classes/Block.js";
import { Map } from "./classes/Map.js";
import { MapPattern } from "./classes/MapPattern.js";
import { Environnement } from "./classes/Environnement.js";
/*
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
*/

let blocks = [
  new Block("air_block_1", false),
  new Block("grass_block_1", true),
  new Block("grass_block_2", true),
  new Block("grass_block_3", true),
  new Block("grass_block_4", true),
  new Block("grass_block_5", true),
  new Block("grass_block_6", true),
  new Block("stone_block_1", true),
  new Block("stone_block_2", true),
  new Block("stone_block_3", true),
  new Block("stone_block_4", true),
  new Block("stone_block_5", true),
  new Block("stone_block_6", true),
];

let pattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let patternBlocks = [
  blocks[0],
  blocks[1]
]

let size = 12;

let map = new Map(size);
let mapPattern = new MapPattern(map, pattern, patternBlocks);
map.generateGrid("gamegrid");
map.generateGrid("gamegrid_table", true);

let composition = {
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
  air_block_1: 8
};

let environnement = new Environnement(map, blocks);
environnement.createComposition(composition);
environnement.buildMap(mapPattern);

console.log(map.isReachable(0,0));

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
