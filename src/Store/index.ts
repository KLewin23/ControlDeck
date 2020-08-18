import { Status } from './MainReducer';

export enum ActionType {
    SET_API_URL,
    SET_BARCODE_SCANNER_STATUS,
    ADD_DEVICE,
    SET_DEVICES,
    REMOVE_DEVICE,
    SET_ORIENTATION
}

export type Device = {
    name: string,
    status: Status,
    ip: string
}

export enum Orientation {
    Portrait,
    Landscape
}

export interface MainReducerType {
    orientation: Orientation
    apiUrl: string,
    scanningForBarcode: boolean
    devices: Device[],
    profiles: []
}
