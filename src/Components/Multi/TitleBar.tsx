import React, { useEffect, useState } from "react";
import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";


const useStyles = makeStyles(() => ({
    text: {
        color: "white !important",
        fontSize: "20px",
        fontWeight: "bold",
        width: "120px"
    },
    divider: {
        width: "600px",
        height: "1px",
        backgroundColor: "#CECECE"
    },
    text_sm: {
        color: "white",
        fontSize: "15px",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "capitalize",
        marginRight: "3px"
    },
    endTextContainer: {
        color: "white",
        display: "inline-flex",
        "& svg": {
            height: "19px",
            marginBottom: "1px",
            alignSelf: "center",
            "&:hover": {
                cursor: "pointer",
                marginBottom: "3px"
            }
        }
    }
}));

interface Props {
    title: string,
    endIcon?: JSX.Element,
    endText?: string,
    titleEditable: boolean
    titleChange?: (newTitle: string) => void
}

export default function TitleBar(props: Props) {
    const classes = useStyles();
    const [title, setTitle] = useState((props.title === "New Profile") ? "" : props.title);
    const [titleEditable, setTitleEditable] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        if (props.titleChange === undefined) return;
        props.titleChange(event.target.value)
    };

    useEffect(() => {
        setTitle((props.title === "New Profile") ? "" : props.title)
    },[props.title])

    return (
        <div style={{ margin: "auto", marginTop: "30px" }}>
            <Grid container direction={"row"} justify={"space-between"}>
                <div className={classes.endTextContainer}>
                    <TextField value={title} InputProps={{ classes: { formControl: classes.text } }}
                               disabled={!titleEditable} onChange={handleChange} placeholder={"New Profile"}/>
                    {(props.titleEditable) ? <Edit style={(titleEditable) ? { color: "green" } : { color: "red" }}
                                                   onClick={() => setTitleEditable(!titleEditable)}/> :
                        <React.Fragment/>}
                </div>
                <div className={classes.endTextContainer}>
                    <Typography className={classes.text_sm}>
                        {props.endText}
                    </Typography>
                    {props.endIcon}
                </div>
            </Grid>
            <div className={classes.divider}/>
        </div>
    );
}
