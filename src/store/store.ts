import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { reducer } from './reducers'

export const store = configureStore({
    reducer
})

export interface State {
    tileMap: [][]
}

/*
export const tileMapSelector: TypedUseSelectorHook<State> = useSelector;
export const tiles = useSelector((state: State) => state.tiles);
*/