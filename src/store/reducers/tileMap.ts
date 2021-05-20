import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tile, Vector2 } from "../../models";
import { TileGenerator } from "../helpers/TileGenerator";

export const tileMapSlice = createSlice({
    name: 'tileMap',
    initialState: TileGenerator.getEmptyTileMap({x:5, y:5}),
    reducers: {
        rebuild: (state, action: PayloadAction<Tile[][]>) => action.payload,
        placeRailTile: (state: Tile[][], action: PayloadAction<Tile>) => {
            if (state) {
                const {position} = action.payload;
                state[position.x][position.y] = {...action.payload}
            }
        }
    }
})

export const tileMapActions = tileMapSlice.actions;
