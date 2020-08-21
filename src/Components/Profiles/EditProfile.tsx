import * as React from "react";
import { useState } from "react";
import { Button, Grid, GridList, GridListTile, makeStyles, MenuItem, Select } from "@material-ui/core";
import ProfileTypes from "../../Config/ProfileTypes";
import { Counter } from "../Multi/Counter";
import { ActionType, store } from "../../Store";
import { PageStatus, Profile } from "../../Store/Reducers/mainReducer";
import { Tile } from "./Tile";
import { NewButton } from "./NewButton";
import TitleBar from "../Multi/TitleBar";

const useStyles = makeStyles((theme) => ({
    button: {
        height: "30px",
        borderRadius: 0,
        width: "75px",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        textTransform: "capitalize"
    },
    textBox: {
        width: "200px",
        alignSelf: "center",
        backgroundColor: theme.palette.primary.main,
        margin: "30px 0px 30px 0px"
    },
    textFieldText: {
        color: "white"
    },
    selectPaper: {
        marginTop: "40px"
    },
    selectedElement: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        fontSize: "15px",
        paddingLeft: "10px",
        paddingTop: "6px"
    },
    device: {
        backgroundColor: "#F8F8F8"
    },
    tile: { left: "50%", top: "50%", transform: "translate(-50%,-50%)" }
}));

interface Props {
    selectedProfileIndex: number,
    selectedProfile: Profile
}

export enum ButtonMenuStatus {
    new,
    edit,
    closed
}

export const EditProfile = (props: Props) => {
        const classes = useStyles();
        const [selectedType, setSelectedType] = useState(0);
        const [buttonPanelStatus, setButtonPanelStatus] = useState(ButtonMenuStatus.closed);
        const [selectedTileIndex, setSelectedTileIndex] = useState(0);
        const [columns, setColumns] = useState(props.selectedProfile.columns);
        const [rows, setRows] = useState(props.selectedProfile.rows);
        const [name, setName] = useState(props.selectedProfile.name);

        const { height, width } = ProfileTypes[selectedType];

        const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
            setSelectedType(event.target.value as number);
        };

        const isNew = (
            props.selectedProfile.name === name &&
            props.selectedProfile.columns === columns &&
            props.selectedProfile.rows === rows &&
            props.selectedProfile.type === selectedType
        );

        const tiles = [];
        for (let i = 0; i < rows * columns; i++) {
            tiles.push(
                <GridListTile style={{
                    height: "auto",
                    display: "grid",
                    justifyContent: "center",
                    alignContent: "center"
                }} key={i}>
                    {(props.selectedProfile.pages[0].length > i) ?
                        <Tile placeHolder={false} onAdd={() => {
                            setSelectedTileIndex(i);
                            setButtonPanelStatus(ButtonMenuStatus.edit);
                        }}/> :
                        <Tile placeHolder={true} onAdd={() => {
                            setSelectedTileIndex(i);
                            setButtonPanelStatus(ButtonMenuStatus.new);
                        }}/>}
                </GridListTile>
            );
        }

        function save() {
            store.dispatch({
                type: ActionType.MODIFY_PROFILE,
                payload: {
                    profileIndex: props.selectedProfileIndex,
                    data: {
                        name: name,
                        type: selectedType,
                        columns: columns,
                        rows: rows,
                        pages: [
                            ...props.selectedProfile.pages
                        ]
                    }
                }
            });
        }


        return (buttonPanelStatus === ButtonMenuStatus.closed) ? (
            <React.Fragment>
                <TitleBar title={name} titleEditable={true} titleChange={setName}/>
                <Grid container direction={"column"} style={{ width: "600px", margin: "auto" }}>
                    <Grid item>
                        <Select
                            className={classes.textBox}
                            labelId="demo-customized-select-label"
                            id="demo-simple-select"
                            MenuProps={{ classes: { paper: classes.selectPaper } }}
                            classes={{ root: classes.selectedElement }}
                            onChange={handleChange}
                            value={selectedType}
                        >
                            {ProfileTypes.map((cur, index) => (
                                <MenuItem key={index} value={index}>{cur.name}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item>
                        <Grid container direction={"row"}>
                            <Grid item xs={8}>
                                <div className={classes.device} style={{
                                    height: height,
                                    width: width
                                }}>
                                    <GridList cols={columns}
                                              style={{ height: "100%", overflow: "hidden" }}>
                                        {tiles}
                                    </GridList>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Counter title={"Columns"} defaultValue={props.selectedProfile.columns}
                                         maxValue={ProfileTypes[selectedType].maxCols}
                                         onChange={(value) => setColumns(value)}/>
                                <Counter title={"Rows"} defaultValue={props.selectedProfile.rows}
                                         maxValue={ProfileTypes[selectedType].maxRows}
                                         onChange={(value) => setRows(value)}/>
                                <Counter title={"Pages"} defaultValue={props.selectedProfile.pages.length} maxValue={6}/>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
                                    <Button className={classes.button} disabled={isNew} onClick={() => save()}>Save</Button>
                                    <Button className={classes.button} onClick={() => {
                                            store.dispatch({
                                                type: ActionType.SET_PROFILE_PAGE_STATE,
                                                payload: PageStatus.Home
                                            })
                                    }}>Cancel</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        ) : (
            <NewButton profileIndex={props.selectedProfileIndex} status={buttonPanelStatus} page={0}
                       profile={props.selectedProfile}
                       index={selectedTileIndex} onClose={() => setButtonPanelStatus(ButtonMenuStatus.closed)}/>
        );
    }
;
