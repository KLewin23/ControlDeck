import * as React from "react";
import { Add } from "@material-ui/icons";
import { ButtonBase, makeStyles } from "@material-ui/core";

interface Props {
    placeHolder: boolean,
    onAdd?: () => void
}

const useStyles = makeStyles((theme) => ({
    placeholder: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        height: "55px",
        width: "55px",
        border: "solid 3px #4E3C57",
        opacity: 0.7,
        "&:hover": {
            opacity: 0.9,
            cursor: "pointer"
        }
    },
    tile: {
        borderRadius: "12px",
        height: "61px",
        width: "61px",
        backgroundColor: theme.palette.primary.main,
        border: "solid 3px white"
    },
    image: {
        height: "61px",
        width: "61px",
        borderRadius: "12px"
    }
}));

export const Tile = (props: Props & React.HTMLAttributes<HTMLDivElement>) => {
    const classes = useStyles();
    return (props.placeHolder) ? (
        <ButtonBase style={{ borderRadius: "12px", ...props.style }} onClick={() => {
            if (props.onAdd === undefined) return;
            props.onAdd();
        }}>
            <div className={classes.placeholder}>
                <Add style={{ color: "#4E3C57", fontSize: "35px" }}/>
            </div>
        </ButtonBase>
    ) : (
        <ButtonBase className={classes.tile} style={{ ...props.style }} onClick={() => {
            if (props.onAdd === undefined) return;
            props.onAdd();
        }}>
            <img alt={"an img"} src={require("../../spotify.png")} className={classes.image}/>
        </ButtonBase>
    );
};
