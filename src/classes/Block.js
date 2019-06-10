export class Block {
    constructor(name, reachable = false) {
        this.name = name;
        this.reachable = reachable;
    }
}