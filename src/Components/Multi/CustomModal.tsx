import * as React from "react";
import { Grid, makeStyles, Modal, Typography } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";

/*
    title: shown at the top of the modal
    open: whether the modal should be shown or not
    onClose: a function ran when the use clicks the exit button
    children: elements that should be shown in the modal
    height: the height of the modal
    width: the width of the modal
 */

interface Props {
    title: string
    open: boolean,
    onClose: () => void,
    children: JSX.Element[] | JSX.Element
    height?: number,
    width?: number,
}

const useStyles = makeStyles((theme) => ({
    modal: {
        "&:focus": {
            outline: "none"
        }
    },
    container: {
        position: "relative",
        "&:focus": {
            outline: "none"
        },
        height: "100%"
    },
    root: (props: { height: number, width: number }) => ({
        height: `${props.height}px`,
        width: `${props.width}px`,
        backgroundColor: "#442354",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    }),
    exitButton: {
        position: "absolute",
        top: "2px",
        right: "3px",
        color: "white",
        "&:hover": {
            cursor: "pointer"
        }
    },
    topBar: {
        textAlign: "center",
        height: "30px",
        width: "100%",
        backgroundColor: "#1B1B1B"
    },
    textBlock: {
        color: "white",
        fontSize: "13px",
        fontWeight: "bold",
        paddingTop: "15px",
        paddingLeft: "12px",
        paddingRight: "12px"
    },
    title: {
        lineHeight: "1.9", color: "white", fontWeight: "bold"
    }
}));

export const CustomModal = (props: Props) => {
    const classes = useStyles({
        height: (props.height !== undefined) ? props.height : 380,
        width: (props.width !== undefined) ? props.width : 290
    });
    return (
        <Modal
            id={`${props.title}_modal`}
            className={classes.modal}
            open={props.open}
        >
            <div className={classes.container}>
                <Grid container direction={"column"} className={classes.root}>
                    <div className={classes.topBar}>
                        <Typography id={`${props.title}_title`} className={classes.title}>{props.title}</Typography>
                        <CloseOutlined id={`${props.title}_close_button`} className={classes.exitButton} onClick={() => props.onClose()}/>
                    </div>
                    {props.children}
                </Grid>
            </div>
        </Modal>
    );
};
