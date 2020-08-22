import { AnyAction } from "redux";
import { ActionType, store } from "../Store";
import path from "path";
import { Button } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");

export type Button = {
    name: string,
    imagePath: string,
    showText: boolean
    textColor: string,
    action: string
}

export type Profile = {
    name: string,
    type: number,
    columns: number,
    rows: number,
    pages: [
        Button[]
    ]
}

export type Device = {
    name: string,
    type: number,
    profile: number | null
}

export interface MainReducerType {
    devices: Device[],
    ip: string
    profiles: Profile[],
    pageStates: {
        profilePages: PageStatus
    }
}

export enum PageStatus {
    Add,
    Edit,
    Home
}

const configLocation = path.join(ipcRenderer.sendSync("getUserDataFolder"), "config.json");
const initialState: MainReducerType = (ipcRenderer.sendSync("checkFileExists", { path: configLocation }) === "NEXISTS") ?
    {
        devices: [],
        ip: ipcRenderer.sendSync("getIp"),
        profiles: [],
        pageStates: {
            profilePages: PageStatus.Home
        }
    } : {
        ...JSON.parse(ipcRenderer.sendSync("readFile", { path: configLocation })),
        ip: ipcRenderer.sendSync("getIp"),
        pageStates: {
            profilePages: PageStatus.Home
        }
    };

function updateConfig(state: MainReducerType) {
    const exists = ipcRenderer.sendSync("checkFileExists", { path: configLocation });
    const config = {
        devices: state.devices,
        profiles: state.profiles
    };
    if (exists === "NEXISTS") {
        ipcRenderer.sendSync("createFile", { path: configLocation, contents: JSON.stringify(config) });
    } else {
        ipcRenderer.sendSync("overwriteFile", { path: configLocation, contents: JSON.stringify(config) });
    }
}

ipcRenderer.on("getProfile", (event: any, name: { name: string }) => {
    const state = store.getState();
    const device = state.devices.find(cur => cur.name === name.name);
    ipcRenderer.sendSync("sendProfile", (device === undefined) ? "device not found" : (device.profile === null) ? "No profile setup for device" : state.profiles[device.profile]);
});

export default function MainReducer(
    state = initialState,
    action: AnyAction
): MainReducerType {
    switch (action.type) {
        case ActionType.ADD_PROFILE: {
            const payload = action.payload;
            if ("name" in payload && "type" in payload && "columns" in payload && "rows" in payload && "pages" in payload) {
                const newState = {
                    ...state,
                    profiles: [...state.profiles, payload]
                };
                updateConfig(newState);
                return newState;
            } else {
                return { ...state };
            }
        }
        case ActionType.MODIFY_PROFILE: {
            const profiles = [...state.profiles];
            profiles[action.payload.profileIndex] = {
                ...state.profiles[action.payload.profileIndex],
                ...action.payload.data
            };
            const newState = {
                ...state,
                profiles: profiles
            };
            updateConfig(newState);
            return newState;
        }
        case ActionType.ADD_BUTTON: {
            const profiles = [...state.profiles];
            profiles[action.payload.profileIndex].pages[action.payload.pageIndex].push(action.payload.button as Button)
            const newState = {
                ...state,
                profiles: profiles
            };
            updateConfig(newState);
            return newState;
        }
        case ActionType.MODIFY_BUTTON: {
            const profiles = [...state.profiles];
            profiles[action.payload.profileIndex].pages[action.payload.pageIndex][action.payload.buttonIndex] = action.payload.button as Button;
            const newState = {
                ...state,
                profiles: profiles
            };
            updateConfig(newState);
            return newState;
        }
        case ActionType.SET_PROFILE_PAGE_STATE: {
            return {
                ...state,
                pageStates: {
                    ...state.pageStates,
                    profilePages: action.payload
                }
            };
        }
        case ActionType.ADD_DEVICE: {
            const newState = {
                ...state,
                devices: [...state.devices, action.payload]
            };
            updateConfig(newState);
            return newState;
        }
        case ActionType.MODIFY_DEVICE: {
            const devices = [...state.devices];
            devices[action.payload.deviceIndex] = {
                ...state.devices[action.payload.deviceIndex],
                ...action.payload.data
            };
            const newState = {
                ...state,
                devices: devices
            };
            updateConfig(newState);
            return newState;
        }
        default:
            return state;
    }
}
