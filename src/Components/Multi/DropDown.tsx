import React, { useState } from "react";
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
        width: "100%"
    },
    label: {
        color: "white",
        fontSize: "14px",
        padding: "4px 0 0 5px"
    },
    labelFocused: {
        color: "white !important"
    },
    textBlock: {
        color: "white",
        fontSize: "15px"
    },
    selectPaper: {
        marginTop: "40px"
    },
    selectedElement: {
        backgroundColor: "#693680",
        color: "white",
        fontSize: "15px",
        paddingLeft: "10px",
        paddingTop: "6px"
    },
    select: {
        left: "50%",
        transform: "translateX(-50%)",
        "& .MuiInput-underline:before": {
            borderBottom: "1px solid white"
        },
        "& .MuiInput-underline:after": {
            borderBottom: "1px solid white"
        }
    }

}));

export interface AdvancedElem {
    value: any,
    name: string
}

interface Props {
    title?: string
    elements: string[] | number[] | AdvancedElem[],
    onChange: ((elem: any) => void),
    defaultValue?: any
}

export default function DropDown(props: Props) {
    const classes = useStyles();
    const [value, setValue] = useState(props.defaultValue || (typeof (props.elements[0]) === "string" || typeof (props.elements[0]) === "number") ? props.elements[0] : 0);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
        props.onChange(event.target.value as string);
    };

    const mainSelect = (
        <Select
            labelId="demo-customized-select-label"
            id="demo-simple-select"
            MenuProps={{ classes: { paper: classes.selectPaper } }}
            inputProps={{ classes: { root: classes.textBlock } }}
            className={classes.select}
            value={value}
            fullWidth
            onChange={handleChange}
        >
            {
                (typeof (props.elements[0]) === "string" || typeof (props.elements[0]) === "number") ?
                    (props.elements as Array<string | number>).map((cur: string | number) => (
                        <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                    )) :
                    (props.elements as AdvancedElem[]).map((cur: AdvancedElem, index: number) => (
                        <MenuItem key={index} value={cur.value}>{cur.name}</MenuItem>
                    ))

            }
        </Select>
    );

    return (props.title !== undefined) ? (
        <FormControl fullWidth>
            <InputLabel className={classes.label} classes={{ focused: classes.labelFocused }}
                        id="demo-simple-select-label">{props.title}</InputLabel>
            {mainSelect}
        </FormControl>
    ) : (
        <React.Fragment>
            {mainSelect}
        </React.Fragment>
    );
}
