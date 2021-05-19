import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tile, Vector2 } from "../../models";
import { TileGenerator } from "../helpers/TileGenerator";

/*
const getInitialState = () => {
    const tileGenerator = new TileGenerator({x:4, y:5});
    return tileGenerator.getNewTiles();
}*/

export const tileMapSlice = createSlice({
    name: 'tileMap',
    initialState: TileGenerator.getEmptyTileMap({x:0, y:0}),
    reducers: {
        rebuild: (state, action: PayloadAction<Tile[][]>) => action.payload,
        placeRailTile: (state: Tile[][], action: PayloadAction<Vector2>) => {
            //create tile generator ere:
            if (state) {
                const {x, y} = action.payload;
                state[x][y] = TileGenerator.getRandomRailTile({x, y})
            }
        }
    }
})

export const actions = tileMapSlice.actions;
