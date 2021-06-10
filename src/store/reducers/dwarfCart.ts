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
    animation: DwarfCartAnimation
}

const getInitialState = (): DwarfCartState => {
    return {
        position: { x: 0, y: 1},
        direction: { x: 1, y: 0},
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
        },
        pushCart: (state: DwarfCartState, action: PayloadAction<DwarfCartState>) => {
            state.position = action.payload.position;
            state.direction = action.payload.direction;

        }
    }
})

export const dwarfCartActions = {
    ...dwarfCartSlice.actions, 
    pushCartRequest: createAction('dwarfCart/pushCartRequest')
}