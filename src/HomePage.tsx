import React, { useState } from "react";
import { createStyles, Grid, makeStyles, Tab, Tabs, withStyles } from "@material-ui/core";
import { DevicesOther, PowerOutlined, SettingsOutlined } from "@material-ui/icons";
import TabPanel from "./Components/Multi/TabPanel";
import Devices from "./Screens/Devices";
import Profiles from "./Screens/Profiles";
import { MainReducerType } from "./Store/Reducers/mainReducer";
import { connect, ConnectedProps } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        backgroundColor: theme.palette.background.default
    },
    sideBar: {
        height: "100%",
        width: "70px",
        backgroundColor: theme.palette.primary.main,
        textAlign: "center",
        fontFamily: "Overpass",
        fontWeight: "bold",
        fontSize: "10px"
    }
}));

interface StyledTabsProps {
    icon: React.ReactElement;
    label: React.ReactNode;
}

const CustomTab = withStyles((theme) => createStyles({
        root: {
            color: "#C5C5C5",
            minWidth: "unset",
            fontFamily: "Overpass",
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "capitalize",
            height: "70px",
            margin: "auto",
            padding: 0,
            width: "100%",
            "&$selected": {
                color: "#FFFFFF"
            },
            "&:focus": {
                color: "#FFFFFF"
            }
        }
    })
)((props: StyledTabsProps) => <Tab {...props} />);

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const mapDispatch = {};

const mapState = (state: MainReducerType) => ({
    devices: state.devices,
    ip: state.ip,
    profiles: state.profiles,
    profilePageState: state.pageStates.profilePages
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function HomePage(props: PropsFromRedux) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        setPage(value);
    };

    return (
        <Grid container direction={"row"} className={classes.root}>
            <Grid item className={classes.sideBar}>
                <Tabs
                    value={page}
                    orientation={"vertical"}
                    TabIndicatorProps={{
                        style: {
                            display: "none"
                        }
                    }}
                    onChange={handleChange}
                >
                    <CustomTab icon={<DevicesOther/>} label={"Devices"} {...a11yProps(0)}/>
                    <CustomTab icon={<SettingsOutlined/>} label={"Profiles"} {...a11yProps(1)}/>
                    <CustomTab icon={<PowerOutlined/>} label={"Plugins"} {...a11yProps(2)}/>
                </Tabs>
            </Grid>
            <Grid item xs>
                <TabPanel index={0} value={page}>
                    <Devices ip={props.ip} devices={props.devices} profiles={props.profiles}/>
                </TabPanel>
                <TabPanel index={1} value={page}>
                    <Profiles profiles={props.profiles} pageState={props.profilePageState}/>
                </TabPanel>
            </Grid>
        </Grid>
    );
}

export default connector(HomePage);
