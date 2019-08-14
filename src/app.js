import "./main.scss";
import Block from "./classes/Block";
import Item from "./classes/Item";
import Character from "./classes/Character";
import Player from "./classes/Player";
import Properties from "./classes/Properties";
import Map from "./classes/Map";
import Pattern from "./classes/Pattern";
import Environnement from "./classes/Environnement";
import Sprite from "./classes/Sprite";

let level_1_idle_001 = new Sprite("level_1_idle_001", 1, 200, 214, 0.8, 24, "/001/level_1/idle.png");
let level_2_walk_001 = new Sprite("level_2_walk_001", 2, 202, 210, 0.8, 24, "/001/level_2/walk.png");
let level_3_walk_001 = new Sprite("level_3_walk_001", 3, 293, 556, 1.4, 24, "/001/level_3/walk.png");

let level_1_idle_001_inverse = new Sprite("level_1_idle_001", 1, 200, 214, 0.8, 24, "/001/level_1/idle.png");

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
    new Item("spell_mystic_superior", "Livre de sort supérieur", "A utiliser avec précaution !", new Properties(10, 0, 0, 3)),
    new Item("spell_sword_major", "Livre d'arme majeur", "A utiliser avec précaution !", new Properties(5, 5, 0, 2)),
    new Item("spell_fire_superior", "Livre de pyromancie supérieur", "A utiliser avec précaution !", new Properties(15, -5, 0, 3)),
    new Item("spell_bones_minor", "Livre de nécromancie mineur", "A utiliser avec précaution !", new Properties(0, 10, 0, 1)),
    new Item("spell_fire_superior", "Livre de pyromancie supérieur", "A utiliser avec précaution !", new Properties(15, -5, 0, 3)),
    new Item("spell_bones_minor", "Livre de nécromancie mineur", "A utiliser avec précaution !", new Properties(0, 20, 0, 1)),
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
map.generateGrid("gamegrid");

let lackPattern = new Pattern(lack, lackBlocks);
let riverPattern = new Pattern(river, riverBlocks);
let mapPattern = new Pattern(pattern, patternBlocks);

let environnement = new Environnement(map, blocks, items);
environnement.createComposition(composition);
environnement.buildMap();
environnement.placeBlockPattern(map.getRandomRow(1, (map._size - 7)), 0, riverPattern);
environnement.placeItems(4);

let character1 = new Character("monster1", "Big Tooth", "Monstre très méchant", new Properties(10, 5, 20, 1), [level_1_idle_001, level_2_walk_001, level_3_walk_001]);
let player1 = new Player("player1", "Craaftx", character1, map.getRandomRow(), map.getRandomCol());

let character2 = new Character("monster2", "Big Tooth", "Monstre très méchant", new Properties(10, 5, 20, 1), [level_1_idle_001_inverse, level_2_walk_001, level_3_walk_001]);
let player2 = new Player("player2", "Bot", character2, map.getRandomRow(), map.getRandomCol());

player1.initPlayer();
map.addPlayerToCell(player1);
console.log(map.getVirtualMap()[player1.xAxis][player1.yAxis]);
player2.initPlayer();
map.addPlayerToCell(player2);
console.log(map.getVirtualMap()[player2.xAxis][player2.yAxis]);

console.log(player1.character.defensePower());
console.log(player1.character.item);
console.log('----------------------------------');

player1.character.item = items.books[5];

console.log(player1.character.defensePower());
console.log(player1.character.item);

player1.changeOrientation();
setTimeout(function(){ 
  player1.resetOrientation();
}, 4000);
 setTimeout(function(){ 
  player1.changeOrientation();
}, 6000);
setTimeout(function(){ 
 player1.resetOrientation();
}, 8000);