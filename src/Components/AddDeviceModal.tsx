import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, makeStyles, Modal, Typography} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons'
import QRCode from 'qrcode.react'
import DropDown from "./DropDown";
import {ActionType, store} from '../Store';

const {ipcRenderer} = window.require('electron');

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        '&:focus': {
            outline: 'none'
        },
        height: '100%',
    },
    root: {
        height: '370px',
        width: '290px',
        backgroundColor: '#442354',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    modal: {
        '&:focus': {
            outline: 'none'
        },
    },
    topBar: {
        textAlign: 'center',
        height: '30px',
        width: '100%',
        backgroundColor: '#1B1B1B'
    },
    exitButton: {
        position: 'absolute',
        top: '2px',
        right: '3px',
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    textBlock: {
        color: 'white',
        fontSize: '13px',
        fontWeight: 'bold',
        paddingTop: '15px',
        paddingLeft: '12px',
        paddingRight: '12px'
    },
    qrCode: {
        margin: '10px auto 10px auto',
    },
    button: {
        width: '100%',
        marginTop: '10px',
        backgroundColor: '#391a47'
    }
}));

interface Props {
    open: boolean
    onClose: () => void
}

export default function AddDeviceModal(props: Props) {
    const classes = useStyles()
    const [devices, setDevices] = useState<string[]>([])
    const [selectedDevice, setSelectedDevice] = useState("")
    const [selectedProfile, setSelectedProfile] = useState("")

    useEffect(() => {
        ipcRenderer.on('addDevice', (event : any, args: string) => {
            setDevices([...devices, args])
        })
    })

    const bottomContent = (devices.length === 0) ? (
        <div style={{color: 'white', margin: '10px auto', width: 'fit-content'}}>
            <Typography style={{display: 'initial'}}>Waiting for device</Typography>
            <CircularProgress color={"inherit"} style={{verticalAlign: 'middle', marginLeft: '6px'}} size={20}/>
        </div>
    ) : <DropDown elements={devices} title={"Devices"} onChange={elem => setSelectedDevice(elem)}/>

    function addDevice() {
        store.dispatch({type: ActionType.ADD_DEVICE, payload: selectedDevice})
        props.onClose()
    }

    return (
        <Modal
            open={props.open}
            hideBackdrop={true}
            className={classes.modal}
        >
            <div className={classes.container}>
                <Grid container direction={"column"} className={classes.root}>
                    <div className={classes.topBar}>
                        <Typography style={{lineHeight: '1.9', color: 'white', fontWeight: 'bold'}}>Add
                            Device</Typography>
                        <CloseOutlined className={classes.exitButton} onClick={() => props.onClose()}/>
                    </div>
                    <Typography className={classes.textBlock}>
                        To add a device install the Control Deck app
                        and then whilst on the same network scan
                        the QR code below
                    </Typography>
                    <QRCode value={ipcRenderer.sendSync('getIp')} style={{
                        height: '85px',
                        width: '85px'
                    }} className={classes.qrCode}/>
                    <div style={{padding: '0 40px 0 40px'}}>
                        {bottomContent}
                        {(selectedDevice !== "") ?
                            <DropDown title={"Profile"} elements={["one"]}
                                      onChange={elem => setSelectedProfile(elem)}/> :
                            <React.Fragment/>}
                        {(selectedDevice !== "" && selectedProfile !== "") ?
                            <Button className={classes.button} onClick={() => addDevice()}>Complete</Button> :
                            <React.Fragment/>}
                    </div>
                </Grid>
            </div>
        </Modal>
    )
}
