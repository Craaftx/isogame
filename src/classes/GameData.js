import Block from "./Block";
import Item from "./Item";
import Pattern from "./Pattern";
import Character from "./Character";
import Properties from "./Properties";

function itemsData() {
  const data = {
    books: [
      new Item(
        "spell_mystic_superior",
        "Livre de sort supérieur",
        "A utiliser avec précaution !",
        new Properties(10, -5, 0, 0, 3)
      ),
      new Item(
        "spell_sword_major",
        "Livre d'arme majeur",
        "A utiliser avec précaution !",
        new Properties(5, 5, 0, 0, 2)
      ),
      new Item(
        "spell_fire_superior",
        "Livre de pyromancie supérieur",
        "A utiliser avec précaution !",
        new Properties(15, -5, 0, 0, 3)
      ),
      new Item(
        "spell_bones_minor",
        "Livre de nécromancie mineur",
        "A utiliser avec précaution !",
        new Properties(0, 10, 0, 0, 1)
      ),
      new Item(
        "spell_fire_superior",
        "Livre de pyromancie supérieur",
        "A utiliser avec précaution !",
        new Properties(15, -5, 0, 0, 3)
      ),
      new Item(
        "spell_bones_minor",
        "Livre de nécromancie mineur",
        "A utiliser avec précaution !",
        new Properties(0, 20, 0, 0, 1)
      )
    ]
  };
  return data;
}

function blocksData() {
  const data = {
    air: [
      new Block("air_block_1", false)
    ],
    water: [
      new Block("water_block_1", false),
      new Block("water_block_2", false),
      new Block("water_block_3", false)
    ],
    wood: [
      new Block("wood_block_1"), 
      new Block("wood_block_2")
    ],
    grass: [
      new Block("grass_block_1"),
      new Block("grass_block_2"),
      new Block("grass_block_3"),
      new Block("grass_block_4"),
      new Block("grass_block_5"),
      new Block("grass_block_6")
    ],
    stone: [
      new Block("stone_block_1"),
      new Block("stone_block_2"),
      new Block("stone_block_3"),
      new Block("stone_block_4"),
      new Block("stone_block_5"),
      new Block("stone_block_6")
    ]
  };
  return data;
}

function charactersData() {
  const data = [
    new Character(
      "001",
      "Pike",
      "Équipé de piques tranchantes, il est vif et très rapide",
      new Properties(5, 5, 4, 100, 3)
    ),
    new Character(
      "002",
      "Sharp",
      "Tranchant comme une lame, il ne laisse rien de ses victimes",
      new Properties(10, 10, 3, 100, 3)
    ),
    new Character(
      "003",
      "Feeler",
      "Doté d'une force de constriction incroyable, il peut tout broyer",
      new Properties(10, 5, 3, 100, 3)
    ),
    new Character(
      "004",
      "Frozen",
      "Solide comme la glace il tue avec des pieux de glace",
      new Properties(5, 20, 2, 100, 3)
    ),
    new Character(
      "005",
      "Sunlight",
      "Aussi brulant qu'un soleil, ne vous fiez pas à sa beauté",
      new Properties(20, 0, 3, 100, 3)
    ),
  ];
  return data;
}

function mapCompositionsData() {
  const data = {
    grass: {
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
    },
    burned: {
      grass_block_1: 0,
      grass_block_2: 0,
      grass_block_3: 0,
      grass_block_4: 4,
      grass_block_5: 2,
      grass_block_6: 0,
      stone_block_1: 0,
      stone_block_2: 0,
      stone_block_3: 0,
      stone_block_4: 0,
      stone_block_5: 0,
      stone_block_6: 0,
      water_block_1: 0
    },
    stone: {
      grass_block_1: 5,
      grass_block_2: 3,
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
      water_block_1: 0
    },
    random_grass: {
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
      water_block_1: 1
    },
    random_burned: {
      grass_block_1: 0,
      grass_block_2: 0,
      grass_block_3: 0,
      grass_block_4: 4,
      grass_block_5: 2,
      grass_block_6: 0,
      stone_block_1: 0,
      stone_block_2: 0,
      stone_block_3: 0,
      stone_block_4: 0,
      stone_block_5: 0,
      stone_block_6: 0,
      water_block_1: 1
    },
    random_stone: {
      grass_block_1: 5,
      grass_block_2: 3,
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
      water_block_1: 1
    },
  };
  return data;
}

function mapPatternsData() {
  const blocks = blocksData();
  let lack = [
    [0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 0],
  ];
  let lackBlocks = [null, blocks.water[0]];

  let river = [
    [1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
  ];
  let riverBlocks = [null, blocks.water[0], blocks.wood[0]];

  let island = [
    [1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 2, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
  ];
  let islandBlocks = [null, blocks.air[0], blocks.stone[3]];

  let random = [0]
  let randomBlocks = [null, blocks.air[0]];
  
  const data = {
    island: new Pattern("island", "Iles Flotantes", "Deux iles suspendues dans les cieux tel un purgatoire céleste", island, islandBlocks),
    river: new Pattern("river", "Rivière", "Une rivière qui déchire avec beauté la terre en deux", river, riverBlocks),
    lack: new Pattern("lack", "Lac", "Un petit lac de montagne et une prairie pour une partie reposante", lack, lackBlocks),
    random: new Pattern("random", "Terres lointaines", "Un monde avec des paysages dirigés uniquement par la chance", random, randomBlocks),
  };
  return data;
}

export default Object.freeze({
  blocks: blocksData(),
  items: itemsData(),
  characters: charactersData(),
  mapCompositions: mapCompositionsData(),
  mapPatterns: mapPatternsData(),
});