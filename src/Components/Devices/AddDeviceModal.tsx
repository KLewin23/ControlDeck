import React, { useEffect, useState } from "react";
import { Button, CircularProgress, makeStyles, TextField, Typography } from "@material-ui/core";
import QRCode from "qrcode.react";
import { ActionType, store } from "../../Store";
import { Device } from "../../Store/Reducers/mainReducer";
import ProfileTypes from "../../Config/ProfileTypes";
import { CustomModal } from "../Multi/CustomModal";

const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
    textBlock: {
        color: "white",
        fontSize: "13px",
        fontWeight: "bold",
        paddingTop: "15px",
        paddingLeft: "12px",
        paddingRight: "12px"
    },
    qrCode: {
        margin: "10px auto 10px auto"
    },
    button: {
        backgroundColor: "#0E6D0E",
        marginTop: "15px",
        textTransform: "capitalize",
        color: "white",
        margin: "auto",
        verticalAlign: 'center',
        '&:hover': {
            backgroundColor: "#149614",
        }
    },
    textFieldText: {
        color: "white"
    }
}));

type DeviceAPI = {
    name: string,
    width: number,
    height: number
}

interface Props {
    open: boolean
    onClose: () => void,
    ip: string
}

export default function AddDeviceModal(props: Props) {
    const classes = useStyles();
    const [device, setDevice] = useState<Device | null>(null);

    console.log(props.ip)

    useEffect(() => {
        ipcRenderer.on("addDevice", (event: any, data: DeviceAPI) => {
            console.log(data)
            const type = ProfileTypes.findIndex((value) => {
                return data.height >= value.deviceSizeLimits.height && data.width >= value.deviceSizeLimits.width;
            });
            setDevice({
                name: data.name,
                type: type || 0,
                profile: null
            });
        });
        ipcRenderer.on("resetState", () => closeModal());
    });

    const bottomContent = (device === null) ? (
        <div style={{ color: "white", margin: "10px auto", width: "fit-content" }}>
            <Typography style={{ display: "initial" }}>Waiting for device</Typography>
            <CircularProgress color={"inherit"} style={{ verticalAlign: "middle", marginLeft: "6px" }} size={20}/>
        </div>
    ) : <TextField value={device.name} InputProps={{ classes: { formControl: classes.textFieldText } }}/>;

    function addDevice() {
        store.dispatch({ type: ActionType.ADD_DEVICE, payload: device });
        ipcRenderer.sendSync("addedDevice");
        closeModal();
    }

    function closeModal() {
        setDevice(null);
        props.onClose();
    }

    return (
        <CustomModal open={props.open} onClose={() => props.onClose()} title={"Add Device"}>
            <Typography className={classes.textBlock}>
                To add a device install the Control Deck app
                and then whilst on the same network scan
                the QR code below
            </Typography>
            <QRCode value={`CD:${props.ip}`} style={{
                height: "85px",
                width: "85px"
            }} className={classes.qrCode}/>
            <div style={{ padding: "0 40px 0 40px" }}>
                {bottomContent}
                {(device !== null) ?
                    <Button className={classes.button} fullWidth onClick={() => addDevice()}>Complete</Button> :
                    <React.Fragment/>}
            </div>
        </CustomModal>
    );
}
