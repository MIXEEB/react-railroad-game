import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FacingDirection, Tile, Tunnels, Vector2 } from "../../models";
import { TileGenerator } from "../helpers/TileGenerator";

export interface Tunnel {
    position: Vector2,
    direction: FacingDirection
}

export interface TileMapState {
    tiles: Tile[][],
}

//tiles: TileGenerator
//TileGenerator.getEmptyTileMap({x: 5, y: 5}),
//deprecated

const getInitialState = (): TileMapState => {
    return {
        tiles: [],
    }
}

export const tileMapSlice = createSlice({
    name: 'tileMap',
    initialState: getInitialState(),
    reducers: {
        startGame: (state: TileMapState, action: PayloadAction<Vector2>) => {
            state.tiles = TileGenerator.getEmptyTileMap(action.payload);
        },

        rebuild: (state: TileMapState, action: PayloadAction<Tile[][]>) => {
            state.tiles = action.payload
        },
        placeRailTile: (state: TileMapState, action: PayloadAction<Tile>) => {
            const { position } = action.payload;
            state.tiles[position.x][position.y] = {...action.payload}
            
        }
    }
})

export const tileMapActions = tileMapSlice.actions