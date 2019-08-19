import Block from "./Block";
import Item from "./Item";
import Pattern from "./Pattern";
import Character from "./Character";
import Properties from "./Properties";

export default class GameData {
  /**
   * Represents all the Game data.
   * @constructor
   */
  constructor() {
    this._blocks = this.blocksData();
    this._items = this.itemsData();
    this._characters = this.charactersData();
    this._mapCompositions = this.mapCompositionsData();
    this._mapPatterns = this.mapPatternsData();
  }

  itemsData() {
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

  blocksData() {
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

  charactersData() {
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

  mapCompositionsData() {
    const data = {
      grass_field: {
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
      burned_grass_field: {
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
      }
    };
    return data;
  }

  mapPatternsData() {
    let island = [
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
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    let islandBlocks = [
      null,
      this.blocks.water[0],
      this.blocks.grass[0],
      this.blocks.grass[1]
    ];

    let lack = [
      [0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 0],
    ];
    let lackBlocks = [null, this.blocks.water[0]];

    let river = [
      [1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    ];
    let riverBlocks = [null, this.blocks.water[0], this.blocks.wood[0]];

    const data = {
      lack: new Pattern(lack, lackBlocks),
      river: new Pattern(river, riverBlocks),
      island: new Pattern(island, islandBlocks)
    };
    return data;
  }
  
  get blocks() {
    return this._blocks;
  }

  get items() {
    return this._items;
  }

  get characters() {
    return this._characters;
  }

  get mapCompositions() {
    return this._mapCompositions;
  }

  get mapPatterns() {
    return this._mapPatterns;
  }
}
