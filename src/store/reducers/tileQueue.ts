import { createSlice, Action } from '@reduxjs/toolkit'
import { Tile } from '../../models';
import { TileGenerator } from '../helpers/TileGenerator'

export const tileQueueSlice = createSlice({
    name: 'tileQueue',
    initialState: TileGenerator.initQueue(),
    reducers: {
        pushForward: (state: Tile[], action: Action) => {
            const newState = state.splice(0, 1);
            newState.push(TileGenerator.getRandomTile());
            return newState;
        }      
    }
})


/*const nextTilesSlice = createSlice({
    name: 'nextTiles',
    initialState: TileGenerator.getFirst 

})
*/


/*
import { combineReducers, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RandomTile, Tile, Vector2 } from "../../models";
import { TileGenerator } from "../TileGenerator";


const tileMapSlice = createSlice({
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

export const reducer = combineReducers({
    tileMap: tileMapSlice.reducer
});

export const actions = tileMapSlice.actions;

*/

/*
const getInitialState = () => {
    const tileGenerator = new TileGenerator({x:4, y:5});
    return tileGenerator.getNewTiles();
}*/
