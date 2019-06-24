import "./main.scss";
import { Block } from "./classes/Block.js";
import { Item } from "./classes/Item.js";
import { Properties } from "./classes/Properties.js";
import { Map } from "./classes/Map.js";
import { Pattern } from "./classes/Pattern.js";
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

let blocks = {
  air: [
    new Block("air_block_1", false),
  ],
  water: [
    new Block("water_block_1", false),
    new Block("water_block_2", false),
    new Block("water_block_3", false),
  ],
  wood: [
    new Block("wood_block_1"),
    new Block("wood_block_2"),
  ],
  grass: [
    new Block("grass_block_1"),
    new Block("grass_block_2"),
    new Block("grass_block_3"),
    new Block("grass_block_4"),
    new Block("grass_block_5"),
    new Block("grass_block_6"),
  ],
  stone: [
    new Block("stone_block_1"),
    new Block("stone_block_2"),
    new Block("stone_block_3"),
    new Block("stone_block_4"),
    new Block("stone_block_5"),
    new Block("stone_block_6"),
  ],
};

let items = {
  books: [
    new Item("spell_mystic_superior", "Livre de sort supérieur", "A utiliser avec précaution !", new Properties(10, 0, 3)),
    new Item("spell_sword_major", "Livre d'arme majeur", "A utiliser avec précaution !", new Properties(5, 5, 2)),
    new Item("spell_fire_superior", "Livre de pyromancie supérieur", "A utiliser avec précaution !", new Properties(15, -5, 3)),
    new Item("spell_bones_minor", "Livre de nécromancie mineur", "A utiliser avec précaution !", new Properties(0, 10, 1)),
    new Item("spell_fire_superior", "Livre de pyromancie supérieur", "A utiliser avec précaution !", new Properties(15, -5, 3)),
    new Item("spell_bones_minor", "Livre de nécromancie mineur", "A utiliser avec précaution !", new Properties(0, 10, 1)),
  ],
}

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

let size = 12;

let map = new Map(size);
map.generateGrid("gamegrid");

let composition = {
  grass_block_1: 4,
  grass_block_2: 2,
  grass_block_3: 0,
  grass_block_4: 0,
  grass_block_5: 0,
  grass_block_6: 0,
  stone_block_1: 0,
  stone_block_2: 0,
  stone_block_3: 0,
  stone_block_4: 0,
  stone_block_5: 0,
  stone_block_6: 0,
  water_block_1: 0
};

let environnement = new Environnement(map, blocks, items);
environnement.createComposition(composition);
// environnement.chooseItems(number, list);
environnement.buildMap();

let lack = [
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1],
  [0, 1, 1, 1, 1],
  [0, 0, 1, 1, 1],
  [0, 0, 1, 1, 0],
];

let river = [
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
];

let lackBlocks = [
  null,
  blocks.water[0],
];

let riverBlocks = [
  null,
  blocks.water[0],
  blocks.wood[0]
];

let lackPattern = new Pattern(lack, lackBlocks);
let riverPattern = new Pattern(river, riverBlocks);

environnement.placeBlockPattern(map.getRandomRow(1, (map._size - 7)), 0, riverPattern);
environnement.placeItems(5);

console.table(map.getVirtualMap());
