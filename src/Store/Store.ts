import { createStore } from 'redux'
import MainReducer from "./MainReducer";

export const store = createStore(MainReducer)
