import {AnyAction} from "redux";
import {ActionType} from "../Store";

export interface MainReducerType {
    devices: string[]
}

const initialState: MainReducerType = {
    devices: []
};

export default function MainReducer(
    state = initialState,
    action: AnyAction
): MainReducerType {
    switch (action.type) {
        case ActionType.ADD_DEVICE:
            return {
                ...state,
                devices: [...state.devices, action.payload]
            }
        default:
            return state
    }
}
