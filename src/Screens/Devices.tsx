import React, { useState } from 'react';
import TitleBar from '../Components/TitleBar';
import {Grid, GridList, GridListTile, makeStyles} from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons'
import AddDeviceModal from "../Components/AddDeviceModal";
import {MainReducerType} from '../Store/Reducers/mainReducer';
import {connect, ConnectedProps} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '180px',
        height: '110px',
        backgroundColor: theme.palette.primary.main
    }
}));

const mapDispatch = {};

const mapState = (state: MainReducerType) => ({
    devices: state.devices,
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Devices(props : PropsFromRedux) {
    const devices = [
        {name: 'idk'},
        {name: 'test'},
        {name: 'test'},
        {name: 'idk'},
        {name: 'test'},
        {name: 'test'}
    ]

    const classes = useStyles();
    const [addDevice,setAddDevice] = useState(true)
    return (
        <Grid container direction={"column"}>
            <TitleBar title={"Devices"} titleEditable={false} endText={"Add Device"} endIcon={<AddCircleOutline onClick={() => setAddDevice(true)}/>} />
            <GridList cols={3} style={{width: '602px', margin: 'auto', marginTop: '30px'}}>
                {props.devices.map((cur, index) => {
                    return (
                        <GridListTile cols={1} key={index} style={{height: '135px'}}>
                            <div className={classes.card}
                                 style={((index + 2) % 3 === 2) ? {marginLeft: 0} : ((index + 2 ) % 3 === 1) ? {marginRight: 0, float: 'right'} : {margin: 'auto'}}/>
                        </GridListTile>
                    )
                })}
            </GridList>
            <AddDeviceModal open={addDevice} onClose={() => setAddDevice(false)}/>
        </Grid>
    )
}

export default connector(Devices)
