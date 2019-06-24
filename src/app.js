import "./main.scss";
import { Block } from "./classes/Block.js";
import { Item } from "./classes/Item.js";
import { Properties } from "./classes/Properties.js";
import { Map } from "./classes/Map.js";
import { Pattern } from "./classes/Pattern.js";
import { Environnement } from "./classes/Environnement.js";

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

let pattern = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1],
  [1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1],
  [1, 2, 2, 3, 3, 3, 3, 3, 2, 2, 1, 1],
  [1, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1, 1],
  [1, 1, 2, 2, 2, 3, 2, 2, 2, 1, 1, 1],
  [1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
  [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

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

let patternBlocks = [
  null,
  blocks.water[0],
  blocks.grass[0],
  blocks.grass[1],
];

let lackBlocks = [
  null,
  blocks.water[1],
];

let riverBlocks = [
  null,
  blocks.water[0],
  blocks.wood[0]
];

let size = 12;

let map = new Map(size);
console.table(map.getVirtualMap());
map.generateGrid("gamegrid");

let lackPattern = new Pattern(lack, lackBlocks);
let riverPattern = new Pattern(river, riverBlocks);
let mapPattern = new Pattern(pattern, patternBlocks);

let environnement = new Environnement(map, blocks, items);
environnement.createComposition(composition);
environnement.buildMap();
environnement.placeBlockPattern(0, 0, mapPattern);


// environnement.placeBlockPattern(map.getRandomRow(1, (map._size - 7)), 0, riverPattern);
environnement.placeItems(5);
