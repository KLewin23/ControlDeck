import * as React from "react";
import { useState } from "react";
import { ButtonBase, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        width: 70,
        height: 40
    },
    boxLeft: {
        lineHeight: "35px",
        textAlign: "center",
        width: "35px",
        height: "40px",
        borderRight: "solid 1px #707070"
    },
    boxRight: {
        lineHeight: "35px",
        textAlign: "center",
        width: "35px",
        height: "40px",
        borderLeft: "solid 1px #707070"
    },
    icons: {
        verticalAlign: "middle",
        color: "white",
        justifySelf: "center"
    },
    text: {
        color: "white",
        alignSelf: "center",
        textAlign: "right"
    }
}));

/*
    title: will be shown to the right of the counter //TESTED
    maxValue: highest value the counter can have, if not set default is 99 //TESTED
    minValue: minimum value the counter can have, if not set 0 is default //TESTED
    defaultValue: the initial value of the counter on load //TESTED
    onChange: a function that will be ran on each change and will pass back the current value //TESTED
 */

interface Props {
    title: string,
    maxValue?: number,
    minValue?: number,
    defaultValue?: number
    onChange?: (value: number) => void
}

export const Counter = (props: Props) => {
    const [counter, setCounter] = useState((props.defaultValue === undefined) ? 0 : props.defaultValue);
    const classes = useStyles();
    return (
        <Grid container direction={"row"} style={{ marginBottom: "10px", width: "100%" }} justify={"center"}>
            <Grid item className={classes.text} style={{ marginRight: "10px", width: "70px" }}>
                <Typography id={"Counter_Text"}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid item className={classes.root}>
                <ButtonBase id={"Counter_DecreaseButton"} onClick={() => {
                    if (counter - 1 >= (props.minValue || 0)) {
                        setCounter(counter - 1);
                        if (props.onChange === undefined) return;
                        props.onChange(counter - 1);
                    }
                }}>
                    <Grid item className={classes.boxLeft}>
                        <Remove className={classes.icons}/>
                    </Grid>
                </ButtonBase>
                <ButtonBase id={"Counter_IncreaseButton"} onClick={() => {
                    if (counter >= (props.maxValue || 99)) return;
                    setCounter(counter + 1);
                    if (props.onChange === undefined) return;
                    props.onChange(counter + 1);
                }}>
                    <Grid item className={classes.boxRight}>
                        <Add className={classes.icons}/>
                    </Grid>
                </ButtonBase>
            </Grid>
            <Grid item className={classes.text} style={{ marginLeft: "10px", width: "20px" }}>
                <Typography id={"Counter_Value"}>
                    {counter}
                </Typography>
            </Grid>
        </Grid>
    );
};
