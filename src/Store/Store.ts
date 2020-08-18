import {createStore} from "redux";
import MainReducer from "./Reducers/mainReducer";

export enum ActionType {
    ADD_PROFILE,
    MODIFY_PROFILE,
    MODIFY_BUTTON,
    SET_PROFILE_PAGE_STATE,
    ADD_DEVICE,
    MODIFY_DEVICE
}

//const rootReducer = combineReducers({userReducer: UserInfoReducer,buildScreenReducer: BuildScreenReducer})
export const store = createStore(MainReducer);

export type RootState = ReturnType<typeof MainReducer>
