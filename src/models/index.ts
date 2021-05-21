import railHorizontal from '../assets/railHorizontal.png';
import railVertical from '../assets/railVertical.png';
import railLeftUp from '../assets/railLeftUp.png';
import railRightUp from '../assets/railRightUp.png';
import railLeftDown from '../assets/railLeftDown.png';
import railRightDown from '../assets/railRightDown.png';
import ground from '../assets/ground.png';

export interface Vector2 {
    x: number,
    y: number
}

export const getOutboundVector2 = (): Vector2 => { return {x: -1, y: -1} }

export enum TileType {
    
    VERTICAL = 0, //"VERTICAL",
    HORIZONTAL = 1, //"HORIZONTAL",
    LEFTUP = 2,//"LEFTUP",
    RIGHTUP = 3,//"RIGHUP",
    LEFTDOWN = 4,//"LEFTDOWN",
    RIGHTDOWN = 5,//"RIGHTDOWN"
    EMPTY = 100//, "EMPTY",
}

export const getTileTypeImage = (tileType: TileType) => { 
    switch(tileType) {
        case TileType.EMPTY:
            return ground;
        
        case TileType.HORIZONTAL:
            return railHorizontal;

        case TileType.VERTICAL:
            return railVertical;

        case TileType.LEFTUP:
            return railLeftUp;

        case TileType.RIGHTUP:
            return railRightUp;

        case TileType.LEFTDOWN:
            return railLeftDown;
    
        case TileType.RIGHTDOWN:
            return railRightDown;
    
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