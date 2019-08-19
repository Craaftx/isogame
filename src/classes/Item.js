export default class Item {
  /**
   * Represents an Item.
   * @constructor
   * @param {string} name - Item name, used in src URL.
   * @param {string} displayName - Display name, used in interface.
   * @param {string} description - Description of the item.
   * @param {object} properties - The item properties.
   */
  constructor(name, displayName, description, properties) {
    this._name = name;
    this._displayName = displayName;
    this._description = description;
    this._properties = properties;
  }

  get name() {
    return this._name;
  }

  get displayName() {
    return this._displayName;
  }

  get description() {
    return this._description;
  }

  get properties() {
    return this._properties;
  }

  getImageUrl() {
    return `game_assets/ground-items/${this.name}.png`;
  }
}
