import { Vector2, Tile, getOutboundVector2, TileType } from "../../models";
import { v4 as uuidv4 } from 'uuid';
import random from 'random'

export class TileGenerator {
    
    static getTestTileMap(fieldSize: Vector2): Tile[][] {
        const tiles  = new Array(fieldSize.x);
        for (let column = 0; column < fieldSize.x; column++) {
            tiles[column] = new Array(fieldSize.y);
            for (let row = 0; row < fieldSize.y; row++) {
                const tileType = (row === 0 || column === 0 || row === fieldSize.y - 1 || column === fieldSize.y - 1) ? TileType.WALL : TileType.EMPTY; 
                tiles[column][row] = TileGenerator.getTile({x: column, y:row}, tileType);
            }
        }

        tiles[0][1] = {
            ...tiles[0][1],
            type: TileType.TUNNEL
        }

        tiles[fieldSize.x-1][1] = {
            ...tiles[fieldSize.x-1][1],
            type: TileType.TUNNEL
        }

        for(let testX = 1; testX < fieldSize.x - 1; testX++){
            tiles[testX][1] = {
                ...tiles[testX][1],
                type: TileType.HORIZONTAL
            };
        }


        /*
        tiles[fieldSize.x-1][fieldSize.y-2] = {
            ...tiles[fieldSize.x-1][fieldSize.y-1],
            type: TileType.TUNNEL
        }
        */

        /*
        tiles[1][1] = {
            ...tiles[1][1],
            type: TileType.HORIZONTAL
        }


        tiles[2][1] = {
            ...tiles[2][1],
            type: TileType.LEFTDOWN
        }

        tiles[2][2] = {
            ...tiles[2][2],
            type: TileType.RIGHTUP
        }

        tiles[3][2] = {
            ...tiles[3][2],
            type: TileType.HORIZONTAL
        }

        
        tiles[3][3] = {
            ...tiles[3][3],
            type: TileType.VERTICAL
        }
        */
        return tiles;
    }

    static getEmptyTileMap(fieldSize: Vector2): Tile[][] {
        const tiles  = new Array(fieldSize.x);
        for (let column = 0; column < fieldSize.x; column++) {
            tiles[column] = new Array(fieldSize.y);
            for (let row = 0; row < fieldSize.y; row++) {
                const tileType = (row === 0 || column === 0 || row === fieldSize.y - 1 || column === fieldSize.y - 1) ? TileType.WALL : TileType.EMPTY; 
                tiles[column][row] = TileGenerator.getTile({x: column, y:row}, tileType);
            }
        }
       
        tiles[0][1] = { 
            ...tiles[0][1],
            type: TileType.TUNNEL
        }

        tiles[fieldSize.x-2][fieldSize.y-1] = {
            ...tiles[fieldSize.x-2][fieldSize.y-1],
            type: TileType.TUNNEL
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

    static getTile(position: Vector2, type: TileType): Tile {
        return {
            id: uuidv4(),
            type,
            position,
        }
    }
/*
    static getEmptyTile(position: Vector2): Tile {
        return {
            id: uuidv4(),
            type: TileType.EMPTY,
            position
        };
    }
*/
    static getRandomRailTile(position: Vector2): Tile {
        const rnd = Math.random();
        return {
            id: uuidv4(),
            type: rnd > 0.5 ? TileType.HORIZONTAL : TileType.VERTICAL,
            position
        };
    }
}
