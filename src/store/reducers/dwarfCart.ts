import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Vector2 } from "../../models";

export interface DwarfCartAnimation { 
    isHorizontal: boolean,
    isAscending: boolean,
    value: number
}

export interface DwarfCartState {
    position: Vector2,
    direction: Vector2,
    win: boolean,
    animation: DwarfCartAnimation
}

const getInitialState = (): DwarfCartState => {
    return {
        position: { x: 0, y: 1},
        direction: { x: 1, y: 0},
        win: false,
        animation: {
            isHorizontal: true,
            isAscending: true,
            value: 0
        }
    }
}
 
const STEP = 16;

export const dwarfCartSlice = createSlice({
    name: 'dwarfCart',
    initialState: getInitialState(),
    reducers: {
        reset: (state: DwarfCartState, action: PayloadAction) => {
            const initState = getInitialState()            
            state.position = initState.position;
            state.direction = initState.direction;
            state.win = false;
        },
        pushCart: (state: DwarfCartState, action: PayloadAction<DwarfCartState>) => {
            state.position = action.payload.position;
            state.direction = action.payload.direction;
            state.win = action.payload.win;
        }
    }
})

export const dwarfCartActions = {
    ...dwarfCartSlice.actions, 
    pushCartRequest: createAction('dwarfCart/pushCartRequest')
}