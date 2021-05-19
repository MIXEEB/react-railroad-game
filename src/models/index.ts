import railHorizontal from '../assets/railHorizontal.png';
import railVertical from '../assets/railVertical.png';
import ground from '../assets/ground.png';

export interface Vector2 {
    x: number,
    y: number
}

export const getOutboundVector2 = (): Vector2 => { return {x: -1, y: -1} }

export enum TileType {
    EMPTY = "EMPTY",
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

export const getTileTypeImage = (tileType: TileType) => { 
    switch(tileType) {
        case TileType.EMPTY:
            return ground;
        
        case TileType.HORIZONTAL:
            return railHorizontal;

        case TileType.VERTICAL:
            return railVertical;

        default:
            return ground;
    }
}


//unknow whether refrences are needed
/*    
    onLeft?: Tile | null;
    onRight?: Tile | null;
    onTop?: Tile | null;
    onBottom?: Tile | null;
*/
export interface Tile {
    id: string,
    type: TileType;
    position: Vector2;
}