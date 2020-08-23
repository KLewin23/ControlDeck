import React, { useState } from "react";
import TitleBar from "../Components/Multi/TitleBar";
import { Grid } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AddDeviceModal from "../Components/Devices/AddDeviceModal";
import CustomGridList from "../Components/Multi/CustomGridList";
import { Device, Profile } from "../Store/Reducers/mainReducer";
import { ModifyDeviceModal } from "../Components/Devices/ModifyDeviceModal";
import { DeleteVerifyModal } from "../Components/Devices/DeleteVerifyModal";

interface Props {
    devices: Device[],
    profiles: Profile[]
    ip: string
}

enum ModalStatus {
    Add,
    Modify,
    Closed,
    Delete
}

export default function Devices(props: Props) {

    function showWarning(element: Device): string {
        if (element.profile === null) {
            return "No profile selected";
        } else {
            return "";
        }
    }

    const [modalStatus, setModalStatus] = useState(ModalStatus.Closed);
    const [clickedTile, setClickedTile] = useState(-1);

    const showModals = (clickedTile !== -1) ? (
            <React.Fragment>
                <ModifyDeviceModal open={modalStatus === ModalStatus.Modify}
                                   onClose={() => setModalStatus(ModalStatus.Closed)}
                                   selectedDevice={props.devices[clickedTile]} selectedDeviceIndex={clickedTile}
                                   profiles={props.profiles} delete={() => setModalStatus(ModalStatus.Delete)}
                />
                <DeleteVerifyModal open={modalStatus === ModalStatus.Delete}
                                   onClose={() => setModalStatus(ModalStatus.Closed)}
                                   selectedDevice={props.devices[clickedTile]}/>;
            </React.Fragment>
        ) :
        <React.Fragment/>;

    return (
        <Grid container direction={"column"}>
            <TitleBar title={"Devices"} titleEditable={false} endText={"Add Device"}
                      endIcon={<AddCircleOutline onClick={() => setModalStatus(ModalStatus.Add)}/>}/>
            <CustomGridList deletable data={props.devices} checkForWarnings={showWarning}
                            onTileClick={(index: number) => {
                                setClickedTile(index);
                                setModalStatus(ModalStatus.Modify);
                            }}/>
            <AddDeviceModal ip={props.ip} open={modalStatus === ModalStatus.Add}
                            onClose={() => setModalStatus(ModalStatus.Closed)}/>
            {showModals}
        </Grid>
    );
}


