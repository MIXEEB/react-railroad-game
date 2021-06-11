import { combineReducers } from 'redux'
import { dwarfCartSlice } from './dwarfCart'
import { tileQueueSlice } from './tileQueue'
import { tileMapSlice } from './tileMap'

export const reducer = combineReducers({
    dwarfCart: dwarfCartSlice.reducer,
    tileQueue: tileQueueSlice.reducer,
    tileMap: tileMapSlice.reducer
})