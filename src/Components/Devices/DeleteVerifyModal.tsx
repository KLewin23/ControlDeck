import * as React from "react";
import { CustomModal } from "../Multi/CustomModal";
import { Device } from "../../Store/Reducers/mainReducer";
import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";

interface Props {
    open: boolean,
    onClose: () => void,
    selectedDevice: Device,
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
    }
}));


export const DeleteVerifyModal = (props: Props) => {
    const classes = useStyles();
    return (
        <CustomModal open={props.open} onClose={() => props.onClose()} title={"Delete Device"} height={200} width={250}>
            <Grid item xs className={classes.gridItem}>
                <Typography className={classes.text}>
                    Name: {props.selectedDevice.name}
                </Typography>
            </Grid>
            <Grid item xs>
                <div style={{width: '150px'}}>
                    <TextField/>
                </div>
            </Grid>
        </CustomModal>
    );
};
