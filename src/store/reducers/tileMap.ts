import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tile, Vector2 } from "../../models";
import { TileGenerator } from "../helpers/TileGenerator";

export interface TileMapState {
    tiles: Tile[][],
    entrance: Vector2,
    exit: Vector2
}

//transform rotate:
const getInitialState = (): TileMapState => {
    return {
        tiles: TileGenerator.getEmptyTileMap({x: 5, y: 5}),
        entrance: {x: 0, y: 0},
        exit: {x:4, y:4}   
    }
}

export const tileMapSlice = createSlice({
    name: 'tileMap',
    initialState: getInitialState(),//TileGenerator.getEmptyTileMap({x:5, y:5}),
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
