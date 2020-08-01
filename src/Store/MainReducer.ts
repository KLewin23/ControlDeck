import {AnyAction} from "redux";
import {ActionType, MainReducerType} from ".";
import AsyncStorage from '@react-native-community/async-storage';


const initialState: MainReducerType = {
    apiUrl: '',
    scanningForBarcodes: false,
    devices: [],
    profiles: []
};

export enum Status {
    connected,
    searching,
    disconnected
}

export default function MainReducer(state = initialState, action: AnyAction): MainReducerType {
    switch (action.type) {
        case ActionType.SET_API_URL:
            return {
                ...state,
                apiUrl: action.payload
            }
        case ActionType.SET_BARCODE_SCANNER_STATUS:
            return {
                ...state,
                scanningForBarcodes: action.payload
            }
        case ActionType.ADD_DEVICE:
            AsyncStorage.setItem('ControlDeck-Devices', JSON.stringify([...state.devices, action.payload])).then(r => {
            })
            return {
                ...state,
                devices: [...state.devices, action.payload]
            }
        case ActionType.SET_DEVICES:
            return {
                ...state,
                devices: action.payload
            }
        case ActionType.REMOVE_DEVICE:
            AsyncStorage.setItem('ControlDeck-Devices', JSON.stringify(state.devices.filter((cur, index) => index !== action.payload)))
                .then(r => {})
            return {
                ...state,
                devices: state.devices.filter((cur, index) => index !== action.payload)
            }
        default:
            return state;
    }
};
