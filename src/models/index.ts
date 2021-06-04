import railHorizontal from '../assets/railHorizontal.png';
import railVertical from '../assets/railVertical.png';
import railLeftUp from '../assets/railLeftUp.png';
import railRightUp from '../assets/railRightUp.png';
import railLeftDown from '../assets/railLeftDown.png';
import railRightDown from '../assets/railRightDown.png';
import ground from '../assets/ground.png';
import wall from '../assets/wall.png';
import tunnel from '../assets/tunnel.png';

export interface Vector2 {
    x: number,
    y: number
}

export const vector2Equals = (a: Vector2, b: Vector2) => a.x === b.x && a.y === b.y;

export const getOutboundVector2 = (): Vector2 => { return {x: -1, y: -1} }

export enum TileType {
    
    VERTICAL = 0, //"VERTICAL",
    HORIZONTAL = 1, //"HORIZONTAL",
    LEFTUP = 2,//"LEFTUP",
    RIGHTUP = 3,//"RIGHUP",
    LEFTDOWN = 4,//"LEFTDOWN",
    RIGHTDOWN = 5,//"RIGHTDOWN"
    TUNNEL = 6,
    WALL = 7,
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
    
        case TileType.TUNNEL:
            return tunnel

        case TileType.WALL:
            return wall;
        
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

export enum FacingDirection {
    right = 1,
    bottom = 2,
    left = 3,
    top = 4
};

export interface Tunnel{
    position: Vector2,
    facingDirection: FacingDirection
}

export interface Tunnels { 
    entrance: Tunnel,
    exit: Tunnel
}