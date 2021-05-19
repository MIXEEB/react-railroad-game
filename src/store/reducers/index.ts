import { combineReducers } from 'redux'
import { tileQueueSlice } from './tileQueue'
import { tileMapSlice } from './tileMap'

export const reducer = combineReducers({
    tileQueue: tileQueueSlice.reducer,
    tileMap: tileMapSlice.reducer
})