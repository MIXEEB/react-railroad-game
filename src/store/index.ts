import { configureStore } from "@reduxjs/toolkit";
import { Tile } from "../models";
import { reducer } from "./reducers";
import { TileMapState } from "./reducers/tileMap";


export interface State {
    //default: State;
    tileMap: TileMapState,
    tileQueue: Tile[];
}

export const store = configureStore({
    reducer
});