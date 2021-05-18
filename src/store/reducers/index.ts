import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RandomTile, Tile, Vector2 } from "../../models";
import { TileGenerator } from "../TileGenerator";

export enum ActionTypes {
    REBUILD = 'rebuild'
}

/*create action */
//const rebuildAction = createAction()

const getInitialState = () => {
    const tileGenerator = new TileGenerator({x:4, y:5});
    return tileGenerator.getNewTiles();
}

const tileMapSlice = createSlice({
    name: 'tileMap',
    initialState: getInitialState(),
    reducers: {
        rebuild: (state, action: PayloadAction<Tile[][]>) => action.payload,
        placeRailTile: (state: Tile[][], action: PayloadAction<Vector2>) => {
            if (state){
                const {x, y} = action.payload;
                state[x][y] = new RandomTile({x, y});
            }
        }
    }
})

export const reducer = combineReducers({
    tileMap: tileMapSlice.reducer
});

export const actions = tileMapSlice.actions;
