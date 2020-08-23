import React, { useState } from "react";
import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import ProfileTypes from "../../Config/ProfileTypes";
import { ActionType, store } from "../../Store";
import { PageStatus } from "../../Store/Reducers/mainReducer";
import DropDown from "../Multi/DropDown";
import { CustomModal } from "../Multi/CustomModal";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: "5px",
        left: "50%",
        transform: "translateX(-50%)",
        "& .MuiInputLabel-root.Mui-focused": {
            color: "white"
        }
    },
    textBlock: {
        color: "white",
        fontSize: "15px"
    },
    underline: {
        borderBottom: "1px solid white",
        opacity: 0.45
    },
    selectPaper: {
        marginTop: "40px"
    },
    select: {
        marginTop: "14px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "200px",
        "& .MuiInput-underline:before": {
            borderBottom: "1px solid white"
        },
        "& .MuiInput-underline:after": {
            borderBottom: "1px solid white"
        }
    },
    button: {
        marginTop: "15px",
        textTransform: "capitalize",
        color: "white",
        width: "200px",
        margin: "auto"
    }
}));

interface Props {
    open: boolean
    onClose: () => void
}

export default function AddProfileModal(props: Props) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [type, setType] = useState(0);
    const [columns, setColumns] = useState(1);
    const [rows, setRows] = useState(1);

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length < 15) {
            setName(event.target.value);
        }
    }

    function handleChangeType(value: number) {
        setType(value as number);
    }

    function handleColsChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value as unknown as number > ProfileTypes[type].maxCols) {
            setColumns(ProfileTypes[type].maxCols);
        } else if ((parseInt(event.target.value)) < 1) {
            setColumns(1);
        } else {
            setColumns((parseInt(event.target.value)));
        }
    }

    function handleRowsChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        if (event.target.value as unknown as number > ProfileTypes[type].maxRows) {
            setRows(ProfileTypes[type].maxRows as unknown as number);
        } else if ((event.target.value as unknown as number) < 1) {
            setRows(1);
        } else {
            setRows(event.target.value as unknown as number);
        }
    }

    return (
        <CustomModal open={props.open} onClose={() => props.onClose()} title={"Add Profile"} height={400}>
            <div style={{ padding: "20px 30px 20px 30px" }}>
                <Typography className={classes.textBlock}>
                    Using profiles you can configure how your deck is displayed on each device.
                </Typography>
                <Grid container direction={"column"} justify={"space-evenly"}>
                    <TextField value={name} onChange={handleNameChange} label={"Name"}
                               className={classes.textField}
                               InputLabelProps={{ classes: { root: classes.textBlock } }}
                               InputProps={{
                                   classes: {
                                       root: classes.textBlock,
                                       underline: classes.underline
                                   }
                               }}
                    />
                    <DropDown title={"Type"} elements={ProfileTypes.map((cur, index) => {
                        return { name: cur.name, value: index };
                    })} onChange={handleChangeType}/>
                    <TextField type={"number"} value={columns} label={"Columns"} className={classes.textField}
                               InputLabelProps={{ classes: { root: classes.textBlock } }}
                               onChange={handleColsChange}
                               InputProps={{
                                   classes: {
                                       root: classes.textBlock,
                                       underline: classes.underline
                                   }
                               }}
                    />
                    <TextField type={"number"} value={rows} label={"Rows"} className={classes.textField}
                               InputLabelProps={{ classes: { root: classes.textBlock } }}
                               onChange={handleRowsChange}
                               InputProps={{
                                   classes: {
                                       root: classes.textBlock,
                                       underline: classes.underline
                                   }
                               }}
                    />
                    <Button
                        disabled={name.length === 0}
                        style={name.length === 0 ? { backgroundColor: "grey" } : { backgroundColor: "#0E6D0E" }}
                        className={classes.button}
                        onClick={() => {
                            store.dispatch({
                                type: ActionType.ADD_PROFILE,
                                payload: {
                                    name: name,
                                    type: type,
                                    columns: columns,
                                    rows: rows,
                                    pages: [[]]
                                }
                            });
                            store.dispatch({
                                type: ActionType.SET_PROFILE_PAGE_STATE,
                                payload: PageStatus.Home
                            });
                        }}
                    >Create Profile</Button>
                </Grid>
            </div>
        </CustomModal>
    );
}
