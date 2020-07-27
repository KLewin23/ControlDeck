import React, {useState} from 'react'
import {createStyles, Grid, makeStyles, Tab, Tabs, withStyles} from '@material-ui/core'
import {DevicesOther, PowerOutlined, SettingsOutlined} from "@material-ui/icons";
import TabPanel from "./Components/TabPanel";
import Devices from './Screens/Devices';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundColor: theme.palette.background.default
    },
    sideBar: {
        height: '100%',
        width: '70px',
        backgroundColor: theme.palette.primary.main,
        textAlign: "center",
        fontFamily: "Overpass",
        fontWeight: "bold",
        fontSize: "10px",
    }
}));

interface StyledTabsProps {
    icon: React.ReactElement;
    label: React.ReactNode;
}

const CustomTab = withStyles((theme) =>
    createStyles({
        root: {
            color: '#C5C5C5',
            minWidth: 'unset',
            fontFamily: "Overpass",
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "capitalize",
            height: "70px",
            margin: 'auto',
            padding: 0,
            width: '100%',
            "&$selected": {
                color: "#FFFFFF",
            },
            "&:focus": {
                color: "#FFFFFF",
            },
        },
    })
)((props: StyledTabsProps) => <Tab {...props} />);

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function HomePage() {
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
                            display: "none",
                        },
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
                    <Devices/>
                </TabPanel>
            </Grid>
        </Grid>
    )
}
