import { Status } from './MainReducer';

export enum ActionType {
    SET_API_URL,
    SET_BARCODE_SCANNER_STATUS,
    ADD_DEVICE,
    SET_DEVICES,
    REMOVE_DEVICE
}

export type Device = {
    name: string,
    status: Status,
    ip: string
}

export interface MainReducerType {
    apiUrl: string,
    scanningForBarcodes: boolean
    devices: Device[],
    profiles: []
}
