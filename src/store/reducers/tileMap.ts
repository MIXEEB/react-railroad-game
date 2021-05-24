import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FacingDirection, Tile, Vector2 } from "../../models";
import { TileGenerator } from "../helpers/TileGenerator";

export interface Tunnel {
    position: Vector2,
    direction: FacingDirection
}

export interface TileMapState {
    tiles: Tile[][],
    entrance: Tunnel,
    exit: Tunnel
}

//e//xport interface Tile

const getInitialState = (): TileMapState => {
    return {
        tiles: TileGenerator.getEmptyTileMap({x: 5, y: 5}),
        entrance: {
            position: {x: 0, y: 0},
            direction: FacingDirection.DOWN
        },
        exit: {
            position: {x:4, y:4},
            direction: FacingDirection.LEFT
        }   
    }
}

export const tileMapSlice = createSlice({
    name: 'tileMap',
    initialState: getInitialState(),
    reducers: {
        rebuild: (state: TileMapState, action: PayloadAction<Tile[][]>) => {
            state.tiles = action.payload
        },
        placeRailTile: (state: TileMapState, action: PayloadAction<Tile>) => {
            const { position } = action.payload;
            state.tiles[position.x][position.y] = {...action.payload}
            /*(if (state) {
                const {position} = action.payload;
                state[position.x][position.y] = {...action.payload}
            }*/
        }
    }
})

export const tileMapActions = tileMapSlice.actions;
