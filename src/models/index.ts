export interface Vector2 {
    x: number,
    y: number
}

export enum TileType {
    EMPTY = "EMPTY",
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

export interface Tile {
    type: TileType;
    position: Vector2;
    

    onLeft?: Tile | null;
    onRight?: Tile | null;
    onTop?: Tile | null;
    onBottom?: Tile | null;
}



export class RandomTile implements Tile {
    
    constructor(position: Vector2){
        
        this.type = Math.floor(Math.random() * 10 ) > 5 ? TileType.HORIZONTAL : TileType.VERTICAL;
        this.position = position;
        /*this.type = TileType.EMPTY;
        const rnd = Math.floor(Math.random() * 10);  
        if (rnd === 6 || rnd === 7){
            this.type = TileType.HORIZONTAL;
        }
        if (rnd === 8 || rnd === 9){
            this.type = TileType.VERTICAL;
        }
        
        this.position = position
        */
    }

    type: TileType;
    position: Vector2;

    onLeft?: Tile | undefined;
    onRight?: Tile | undefined;
    onTop?: Tile | undefined;
    onBottom?: Tile | undefined;
}

export class EmptyTile implements Tile {
    constructor(position: Vector2) {
        this.position = position;
        this.type = TileType.EMPTY;
    }
    
    type: TileType;
    position: Vector2;

    onLeft?: Tile | undefined;
    onRight?: Tile | undefined;
    onTop?: Tile | undefined;
    onBottom?: Tile | undefined;
}