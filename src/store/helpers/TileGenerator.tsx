import { Vector2, Tile, getOutboundVector2, TileType } from "../../models";
import { v4 as uuidv4 } from 'uuid';

export class TileGenerator {
    
    static getEmptyTileMap(fieldSize: Vector2): Tile[][] {
        const tiles  = new Array(fieldSize.x);
        for (let column = 0; column < fieldSize.x; column++) {
            tiles[column] = new Array(fieldSize.y);
            for (let row = 0; row < fieldSize.y; row++) {
                tiles[column][row] = TileGenerator.getEmptyTile({x: column, y:row})
            }
        }
        return tiles;
    }

    static initQueue(): Tile[] {
        const tiles: Tile[] = [];
        for(let tileIndex = 0; tileIndex < 3; tileIndex++){
            tiles.push({
                id: uuidv4(),
                type: TileGenerator.getRandomTileType(),
                position: getOutboundVector2()
            })
        }

        return tiles;
    }

    static getRandomTile(): Tile {
        return {
            id: uuidv4(),
            type: TileGenerator.getRandomTileType(),
            position: getOutboundVector2()
        };
    }

    static getRandomTileType(): TileType { 
        const rnd = Math.floor(Math.random() * 6);
        const typeKey = TileType[rnd];
        return TileType[typeKey as keyof typeof TileType];
       }

    static getEmptyTile(position: Vector2): Tile {
        return {
            id: uuidv4(),
            type: TileType.EMPTY,
            position
        };
    }

    static getRandomRailTile(position: Vector2): Tile {
        const rnd = Math.random();
        return {
            id: uuidv4(),
            type: rnd > 0.5 ? TileType.HORIZONTAL : TileType.VERTICAL,
            position
        };
    }
}
