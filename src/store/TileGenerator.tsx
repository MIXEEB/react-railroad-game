import { Vector2, Tile, RandomTile, EmptyTile } from "../models";



export class TileGenerator {
    private tiles: Tile[][];

    constructor(private fieldSize: Vector2) {
        this.tiles  = new Array(fieldSize.x);
        for (let column = 0; column < fieldSize.x; column++){
            this.tiles[column] = new Array(fieldSize.y);
        }
    }

    getNewTiles() : Tile[][] {
        this.generate();
        return JSON.parse(JSON.stringify(this.tiles));
    }

    private generate() {
        for(let x = 0; x < this.fieldSize.x; x++){
            for(let y = 0; y < this.fieldSize.y; y++) {
                this.tiles[x][y] = new EmptyTile({x, y}); 
            }
        }
    }
}
