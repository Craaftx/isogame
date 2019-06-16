import "./main.scss";
import { Block } from "./classes/Block.js";
import { Item } from "./classes/Item.js";
import { Properties } from "./classes/Properties.js";
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
  new Block("water_block_1", false),
  new Block("water_block_2", false),
  new Block("water_block_3", false),
  new Block("grass_block_1"),
  new Block("grass_block_2"),
  new Block("grass_block_3"),
  new Block("grass_block_4"),
  new Block("grass_block_5"),
  new Block("grass_block_6"),
  new Block("stone_block_1"),
  new Block("stone_block_2"),
  new Block("stone_block_3"),
  new Block("stone_block_4"),
  new Block("stone_block_5"),
  new Block("stone_block_6"),
];

let items = [
  new Item("spell_mystic_superior", "Livre de sort supérieur", "A utiliser avec précaution !", new Properties(10, 0, 3)),
  new Item("spell_sword_major", "Livre d'arme majeur", "A utiliser avec précaution !", new Properties(5, 5, 2)),
  new Item("spell_fire_superior", "Livre de pyromancie supérieur", "A utiliser avec précaution !", new Properties(15, -5, 3)),
  new Item("spell_bones_minor", "Livre de nécromancie mineur", "A utiliser avec précaution !", new Properties(0, 10, 1)),
]

let pattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0],
  [0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0],
  [0, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let patternBlocks = [
  blocks[1],
  blocks[2],
  blocks[11]
]

let size = 12;

let map = new Map(size);
let mapPattern = new MapPattern(map, pattern, patternBlocks);
map.generateGrid("gamegrid");

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
  water_block_1: 3
};

let environnement = new Environnement(map, blocks);
environnement.createComposition(composition);
environnement.buildMap();

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
