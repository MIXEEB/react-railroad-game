import { bindActionCreators, Middleware } from "@reduxjs/toolkit";
import { Tile, TileType, Vector2 } from "../../models";
import { DwarfCartAnimation } from "../reducers/dwarfCart";
import { EMPTY_VECTOR, railDirectionFactoryMap } from './railHelpers'

export const dwarfCartEngineMiddleware: Middleware = storeApi => next => action => {
    
    if (action.type !== 'dwarfCart/pushCartRequest'){
        return next(action);
    }

    
    const state = storeApi.getState();
    return next({
        type: 'dwarfCart/pushCart',
        payload: getNextPositionAndDirection(state.dwarfCart.position, state.dwarfCart.direction, state.tileMap.tiles)
    })

}

const getNextPositionAndDirection = (currentPosition: Vector2, currentDirection: Vector2, tileMap: Tile[][]): { position: Vector2, direction: Vector2 } => {
    const newPosition = updatePosition(currentPosition, currentDirection);
    const generatorFunction = railDirectionFactoryMap.get(tileMap[newPosition.x][newPosition.y].type);

    if (generatorFunction){
        return {
            position: newPosition,
            direction: generatorFunction(currentDirection)
        }
    }

    return {position: EMPTY_VECTOR, direction: EMPTY_VECTOR};
}

const updatePosition = (position: Vector2, direction: Vector2) => {
        return {
            x: position.x + direction.x,
            y: position.y + direction.y
        }
}