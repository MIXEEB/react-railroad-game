import { createSlice, Action } from '@reduxjs/toolkit'
import { Tile } from '../../models';
import { TileGenerator } from '../helpers/TileGenerator'

export const tileQueueSlice = createSlice({
    name: 'tileQueue',
    initialState: TileGenerator.initQueue(),
    reducers: {
        pushForward: (state: Tile[], action: Action) => {
            state.splice(0, 1);
            state.push(TileGenerator.getRandomTile());
        }      
    }
})

export const tileQueueActions = tileQueueSlice.actions;