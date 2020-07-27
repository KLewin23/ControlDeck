import React, {useState} from 'react';
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    label: {
        color: 'white',
        fontSize: '14px',
        padding: '4px 0 0 5px',
    },
    labelFocused: {
        color: 'white !important'
    },
    selectPaper: {
        marginTop: '40px'
    },
    selectedElement: {
        color: 'white',
        fontSize: '15px',
        paddingLeft: '10px',
        paddingTop: '6px'
    }
}));

interface Props {
    title: string
    elements: string[],
    onChange: (elem: string) => void
}

export default function DropDown(props: Props) {
    const classes = useStyles()
    const [value, setValue] = useState("")

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string)
        props.onChange(event.target.value as string)
    };

    return (
        <FormControl className={classes.root}>
            <InputLabel id="demo-customized-select-label" className={classes.label}
                        classes={{focused: classes.labelFocused}}>{props.title}</InputLabel>
            <Select
                labelId="demo-customized-select-label"
                id="demo-simple-select"
                MenuProps={{classes: {paper: classes.selectPaper}}}
                classes={{root: classes.selectedElement}}
                value={value}
                onChange={handleChange}
            >
                {props.elements.map((cur) => (
                    <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
