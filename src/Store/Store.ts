import {createStore} from "redux";
import MainReducer from "./Reducers/mainReducer";

export enum ActionType {
    ADD_DEVICE
}

//const rootReducer = combineReducers({userReducer: UserInfoReducer,buildScreenReducer: BuildScreenReducer})
export const store = createStore(MainReducer);

export type RootState = ReturnType<typeof MainReducer>
