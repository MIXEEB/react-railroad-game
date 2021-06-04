import { configureStore } from "@reduxjs/toolkit";
import { Tile } from "../models";
import { dwarfCartEngineMiddleware } from "./middleware/dwarfCartEngine";
import { reducer } from "./reducers";
import { DwarfCartState } from "./reducers/dwarfCart";
import { TileMapState } from "./reducers/tileMap";

//import middlewares:


export interface State {
    dwarfCart: DwarfCartState
    tileMap: TileMapState,
    tileQueue: Tile[];
}

export const store = configureStore({
    reducer,
    middleware: [dwarfCartEngineMiddleware]
});