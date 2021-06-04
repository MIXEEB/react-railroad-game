import { TileType, Vector2 } from "../../models";

export const EMPTY_VECTOR : Vector2 = {x: 0, y: 0}
export const railDirectionFactoryMap = new Map<TileType, (entryDirection: Vector2) => Vector2>();

railDirectionFactoryMap.set(TileType.HORIZONTAL, (entryDirection: Vector2) => {
    const {x, y} = entryDirection;
    if (y === 0 && Math.abs(x) === 1) {
        return {x, y}
    }
    return EMPTY_VECTOR;
})

railDirectionFactoryMap.set(TileType.VERTICAL, (entryDirection: Vector2) => {
    const {x, y} = entryDirection;
    if (x === 0 && Math.abs(y) === 1) {
        return {x, y}
    }
    return EMPTY_VECTOR;
})

railDirectionFactoryMap.set(TileType.LEFTDOWN, (entryDirection: Vector2) => {
    const {x, y} = entryDirection;
    if (x === 1 && y === 0){
        return {x: 0, y: 1}
    }

    if (x === 0 && y === 1){
        return {x: 1, y: 0}
    }

    return EMPTY_VECTOR;
})