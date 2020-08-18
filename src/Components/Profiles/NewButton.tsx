import * as React from "react";
import { useEffect, useState } from "react";
import { ButtonMenuStatus } from "./EditProfile";
import { Profile } from "../../Store/Reducers/mainReducer";
import {
    Button,
    Checkbox,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import { Image } from "@material-ui/icons";
import TitleBar from "../Multi/TitleBar";
import { ActionType, store } from "../../Store";

const { ipcRenderer } = window.require("electron");

interface Props {
    profile: Profile,
    status: ButtonMenuStatus,
    index: number,
    page: number,
    profileIndex: number,
    onClose: () => void
}

type Button = {
    name: string,
    imagePath: string,
    showText: boolean
    textColor: string,
    action: string
}


const useStyles = makeStyles((theme) => ({
    button: {
        height: "30px",
        borderRadius: 0,
        width: "75px",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        textTransform: "capitalize"
    },
    imageBox: {
        backgroundColor: theme.palette.primary.main,
        display: "inline-block",
        width: "100%",
        marginBottom: "30px",
        borderRadius: "25px"
    },
    image: {
        width: "100%",
        marginBottom: "30px",
        borderRadius: "25px"
    },
    imagePicker: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        left: "50%",
        transform: "translateX(-50%)"
    },
    disabledTextField: {
        "& .MuiInputBase-root.Mui-disabled": {
            fontSize: "15px",
            paddingLeft: "10px",
            color: "white"
        }
    },
    textBox: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: theme.palette.primary.main
    },
    selectPaper: {
        marginTop: "40px"
    },
    selectedElement: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        fontSize: "15px",
        paddingLeft: "10px",
        paddingTop: "15px",
        paddingBottom: "15px"
    }
}));

export const NewButton = (props: Props) => {
        const buttonData = props.profile.pages[props.page][props.index];
        const classes = useStyles();
        const [buttonName, setButtonName] = useState(buttonData.name);
        const [imagePath, setImagePath] = useState(buttonData.imagePath);
        const [fontColor, setFontColor] = useState(buttonData.textColor);
        const [showName, setShowName] = useState(false);
        const [image, setImage] = useState(
            (buttonData.imagePath !== "") ?
                (
                    <img className={classes.image} alt={"your icon"}
                         src={`data:image/png;base64,${ipcRenderer.sendSync("getImageRaw", buttonData.imagePath)}`}/>
                ) : (
                    <div className={classes.imageBox}>
                        <div style={{ marginTop: "100%" }}/>
                    </div>
                )
        );

        useEffect(() => {
            ipcRenderer.on("returnImage", (event: any, data: any) => {
                setImagePath(data.location);
                setImage(
                    <img className={classes.image} alt={"your icon"}
                         src={`data:image/png;base64,${data.file}`}/>
                );
            });
        });

        function getImage() {
            ipcRenderer.send("getImage", "imagePath");
        }

        const colorPicker = (showName) ? (
            <Grid item style={{ margin: "10px 0 10px 0", display: "flex", alignItems: "center" }}>
                <Typography style={{ color: "white", fontSize: "15px", marginRight: "8px" }}>
                    Font color :
                </Typography>
            </Grid>
        ) : <React.Fragment/>;

        const name = (showName) ? (
            <Typography style={{
                position: "absolute",
                zIndex: 100,
                marginTop: "250px",
                color: fontColor,
                fontSize: "30px",
                textTransform: "capitalize",
                textAlign: "center",
                fontWeight: "bold"
            }}>
                test
            </Typography>
        ) : <React.Fragment/>;

        const newData = (
            buttonData.name === buttonName &&
            buttonData.imagePath === imagePath &&
            buttonData.showText === showName &&
            buttonData.textColor === fontColor &&
            buttonData.action === "test"
        );

        function saveData() {
            store.dispatch({
                type: ActionType.MODIFY_BUTTON,
                payload: {
                    profileIndex: props.index,
                    pageIndex: props.page,
                    buttonIndex: props.profileIndex,
                    button: {
                        name: buttonName,
                        imagePath: imagePath,
                        showText: showName,
                        textColor: fontColor,
                        action: "test"
                    }
                }
            });
        }

        return (
            <React.Fragment>
                <TitleBar title={buttonName} titleEditable={true} titleChange={(name) => setButtonName(name)}/>
                <Grid container direction={"row"} style={{ width: "600px", margin: "auto", marginTop: "40px" }}>
                    <Grid item xs={6}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {image}
                            {name}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button className={classes.button} disabled={newData} onClick={() => saveData()}>Save</Button>
                            <Button className={classes.button} onClick={() => props.onClose()}>Cancel</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction={"column"} style={{ padding: "0 20px 0 20px" }}>
                            <TextField disabled={true} className={classes.imagePicker}
                                       classes={{ root: classes.disabledTextField }} InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => getImage()}>
                                        <Image style={{ color: "white" }}/>
                                    </IconButton>
                                )
                            }}
                                       value={(props.profile.pages[0][props.index].imagePath !== "") ? props.profile.pages[0][props.index].imagePath : "No Image Selected"}/>
                            <Grid item style={{ margin: "10px 0 10px 0" }}>
                                <Typography style={{ display: "inline-block", color: "white", fontSize: "15px" }}>
                                    Show name :
                                </Typography>
                                <Checkbox
                                    onChange={(event) => {
                                        setShowName(event.target.checked);
                                    }}
                                    style={{ color: "white" }}/>
                            </Grid>
                            {colorPicker}
                            <Grid item>
                                <Select
                                    className={classes.textBox}
                                    labelId="demo-customized-select-label"
                                    id="demo-simple-select"
                                    MenuProps={{ classes: { paper: classes.selectPaper } }}
                                    classes={{ root: classes.selectedElement }}
                                >
                                    {["test", "test"].map((cur, index) => (
                                        <MenuItem key={index} value={index}>{cur}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
;
