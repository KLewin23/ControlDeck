import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { CustomModal } from "../Multi/CustomModal";
import { Device, Profile } from "../../Store/Reducers/mainReducer";
import ProfileTypes from "../../Config/ProfileTypes";
import DropDown, { AdvancedElem } from "../Multi/DropDown";
import { ErrorOutlineTwoTone } from "@material-ui/icons";
import { ActionType, store } from "../../Store";

interface Props {
    open: boolean,
    onClose: () => void,
    selectedDevice: Device,
    selectedDeviceIndex: number,
    profiles: Profile[],
    delete: () => void
}

const useStyles = makeStyles((theme) => ({
    text: {
        color: "white",
        textAlign: "center",
        verticalAlign: "middle"
    },
    gridItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    saveButton: (props: any) => ({
        backgroundColor: props.buttonBackground,
        "&:hover": {
            backgroundColor: props.buttonBackgroundHover
        }
    }),
    deleteButton: {
        backgroundColor: "#a1150b",
        "&:hover": {
            backgroundColor: "#b8180d"
        }
    },
    button: {
        width: "49%",
        marginTop: "10px",
        marginBottom: "10px",
        textTransform: "capitalize",
        color: "white",
        margin: "auto",
        verticalAlign: "center"
    }
}));


export const ModifyDeviceModal = (props: Props) => {

    const [selectedProfile, setSelectedProfile] = useState((props.selectedDevice.profile === null) ? -1 : props.selectedDevice.profile);

    useEffect(() => {
        setSelectedProfile((props.selectedDevice.profile === null) ? -1 : props.selectedDevice.profile);
    }, [props.selectedDevice.profile]);


    const classes = useStyles({
        buttonBackground: (selectedProfile === -1 || props.selectedDevice.profile === selectedProfile) ? "#403f3e" : "#0E6D0E",
        buttonBackgroundHover: (selectedProfile === -1 || props.selectedDevice.profile === selectedProfile) ? "#403f3e" : "#149614"
    });

    const profiles = props.profiles.reduce(
        (accumulator: AdvancedElem[], cur: Profile, index: number) => {
            return (cur.type === props.selectedDevice.type) ? [...accumulator, {
                name: cur.name,
                value: index
            }] : accumulator;
        }, [{ name: "--", value: -1 }]
    );

    return (
        <CustomModal title={"Modify Device"} open={props.open} onClose={() => props.onClose()} height={200} width={250}>
            <Grid item xs className={classes.gridItem}>
                <Typography className={classes.text}>
                    Name: {props.selectedDevice.name}
                </Typography>
            </Grid>
            <Grid item xs className={classes.gridItem}>
                <Typography className={classes.text}>
                    Type: {ProfileTypes[props.selectedDevice.type].name}
                </Typography>
            </Grid>
            <Grid item xs className={classes.gridItem}>
                <Typography className={classes.text}>
                    Profile:
                </Typography>
                <div style={{ width: "100px", marginLeft: "10px" }}>
                    <DropDown defaultValue={(props.selectedDevice.profile === null) ? -1 : props.selectedDevice.profile}
                              elements={profiles}
                              onChange={(value) => setSelectedProfile(value)}/>
                </div>
                {
                    (selectedProfile === -1) ?
                        (profiles.length === 1) ?
                            <Tooltip
                                title={`No profile of type ${ProfileTypes[props.selectedDevice.type].name}, please create one`}>
                                <ErrorOutlineTwoTone style={{ color: "red", fontSize: "22px", marginLeft: "5px" }}/>
                            </Tooltip> :
                            <Tooltip title={"No profile selected"}>
                                <ErrorOutlineTwoTone style={{ color: "yellow", fontSize: "22px", marginLeft: "5px" }}/>
                            </Tooltip> : <React.Fragment/>
                }

            </Grid>
            <Grid className={classes.gridItem}>
                <div style={{ width: "200px" }}>
                    <Button style={{ float: "left" }} className={`${classes.saveButton} ${classes.button}`} fullWidth
                            onClick={() => {
                                if (selectedProfile === -1 || props.selectedDevice.profile === selectedProfile) return;
                                store.dispatch({
                                    type: ActionType.MODIFY_DEVICE,
                                    payload: {
                                        deviceIndex: props.selectedDeviceIndex,
                                        data: {
                                            profile: selectedProfile
                                        }
                                    }
                                });
                                props.onClose();
                            }}>Save</Button>
                    <Button style={{ float: "right" }} className={`${classes.button} ${classes.deleteButton}`} fullWidth
                            onClick={() => {
                                props.delete();
                            }}>Delete</Button>
                </div>
            </Grid>
        </CustomModal>
    );
};
