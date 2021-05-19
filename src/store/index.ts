import { configureStore } from "@reduxjs/toolkit";
import { Tile } from "../models";
import { reducer } from "./reducers";


export interface State {
    default: State;
    tileMap: Tile[][],
    tileQueue: Tile[];
}

export const store = configureStore({
    reducer
});

/*import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Tile } from '../models'
export reducer from 'reducers'

import { combineReducers } from '@reduxjs/toolkit';
import { nextTilesSlice } from './nextTiles'
import { tileMapSlice } from './tileMap'
*/



/*
export const tileMapSelector: TypedUseSelectorHook<State> = useSelector;
export const tiles = useSelector((state: State) => state.tiles);
*/