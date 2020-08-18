import React from "react";
import { GridList, GridListTile, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { DeleteOutline, ErrorOutlineTwoTone, PhoneIphone, TabletMac } from "@material-ui/icons";

interface Props {
    data: any[],
    onTileClick?: (index: number) => void
    checkForWarnings?: (element: any) => string,
    deletable?: boolean,
    onDelete?: (index: number) => void
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: "180px",
        height: "110px",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
            boxShadow: "0px 3px 6px #00000029",
            cursor: "pointer"
        }
    },
    text: {
        margin: "auto",
        textTransform: "capitalize",
        color: "white"
    },
    icon_large: {
        fontSize: "55px",
        color: "white",
        margin: "auto"
    },
    icon_small: {
        fontSize: "35px",
        color: "white",
        margin: "auto"
    }
}));

export default function CustomGridList(props: Props) {
    const classes = useStyles();

    const icon = (type: number) => {
        switch (type) {
            case 0:
                return <PhoneIphone className={classes.icon_large}/>;
            case 1:
                return <PhoneIphone className={classes.icon_small}/>;
            case 2:
                return <TabletMac className={classes.icon_large}/>;
            case 3:
                return <TabletMac className={classes.icon_small}/>;
        }
    };

    return (
        <GridList cols={3} style={{ width: "602px", margin: "auto", marginTop: "30px" }}>
            {props.data.map((cur, index) => {
                const warning = (props.checkForWarnings !== undefined && props.checkForWarnings(cur) !== "") ? (
                    <Tooltip title={props.checkForWarnings(cur)}>
                        <ErrorOutlineTwoTone
                            style={{ color: "yellow", position: "absolute", opacity: 0.6, right: "5px", top: "5px" }}/>
                    </Tooltip>
                ) : <React.Fragment/>;

                return (
                    <GridListTile cols={1} key={index} style={{ height: "135px" }}>
                        <ButtonBase onClick={() => {
                            if (props.onTileClick === undefined) return;
                            props.onTileClick(index);
                        }} style={{
                            width: "180px",
                            height: "110px"
                        }}>
                            <div className={classes.card}
                                 style={((index + 2) % 3 === 2) ? { marginLeft: 0 } : ((index + 2) % 3 === 1) ? {
                                     marginRight: 0,
                                     float: "right"
                                 } : { margin: "auto" }}>
                                {warning}
                                <div style={{ width: "100%", height: "80%", display: "grid" }}>
                                    {icon(cur.type)}
                                </div>
                                <Typography className={classes.text}>
                                    {cur.name}
                                </Typography>
                            </div>
                        </ButtonBase>
                    </GridListTile>
                );
            })}
        </GridList>
    );
}
