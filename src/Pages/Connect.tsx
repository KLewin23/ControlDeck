import React, {useState} from 'react';
import {ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather} from '@expo/vector-icons';
import {Overpass_800ExtraBold, useFonts} from "@expo-google-fonts/overpass";
import {BarCodeScanner} from "expo-barcode-scanner";
import QrScanner from "../Components/QrScanner";
import {DeviceCard} from "../Components/DeviceCard";
import shortId from "shortid";
import Swipeable from 'react-native-swipeable-row';
import {connect, ConnectedProps} from 'react-redux';
import {ActionType, MainReducerType} from '../Store';
import {Device} from "../Store/index";
import * as Device_expo from 'expo-device'

enum Status {
    connected,
    searching,
    disconnected
}

const mapDispatch = {
    addDevice: (device: Device) => ({
        type: ActionType.ADD_DEVICE,
        payload: device
    }),
    removeDevice: (id: number) => ({
        type: ActionType.REMOVE_DEVICE,
        payload: id,
    }),
    setApiUrl: (url: string) => ({
        type: ActionType.SET_API_URL,
        payload: url
    }),
    setBarcodeScannerStatus: (status: boolean) => ({
        type: ActionType.SET_BARCODE_SCANNER_STATUS,
        payload: status
    })
};

const mapState = (state: MainReducerType) => ({
    devices: state.devices,
    scanningForBarcodes: state.scanningForBarcodes
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Connect(props: PropsFromRedux) {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedConnection, setSelectedConnection] = useState<number | null>(null);

    let [fontsLoaded] = useFonts({
        Overpass_800ExtraBold
    })

    if (!fontsLoaded) {
        return null
    }

    function qrScanned(data: string) {
        props.setApiUrl(data.substring(3))
        setModalOpen(true)
        if (Device_expo.deviceName === null) return;
        fetch(`http://${data.substring(3)}/addDevice?name=${encodeURIComponent(Device_expo.deviceName)}`, {
            method: 'GET'
        }).then(response => {
            return response.json()
        }).then(response => {
            setModalOpen(false)
            if (response.appStatus === "success") {
                props.setBarcodeScannerStatus(false)
                props.addDevice({
                    name: response.deviceName,
                    status: Status.connected,
                    ip: data.substring(3)
                })
            }
        })
    }

    async function openQrScanner() {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
            props.setBarcodeScannerStatus(true)
        }
    }

    function changeConnection(index: number | null) {
        if (index !== null) {
            setSelectedConnection(index)
            fetch(`http://${props.devices[index].ip}/getProfile`).then(response => {
                return response.json()
            }).then(response => {
                console.log(response)
            })
        }
    }

    const option = (props.devices.length !== 0) ? (
        <ScrollView style={{marginTop: 2}}>
            {
                props.devices.map((cur, index) => (
                    <Swipeable key={shortId.generate()} leftButtons={[
                        <TouchableOpacity onPress={() => props.removeDevice(index)}
                                          style={[styles.leftSwipeItem, {backgroundColor: '#db0909'}]}>
                            <AntDesign name={'delete'} color={'white'} size={26}/>
                        </TouchableOpacity>
                    ]}>
                        <DeviceCard name={cur.name}
                                    index={index}
                                    selectConnection={(index: number | null) => changeConnection(index)}
                                    selectedConn={selectedConnection === index}
                                    status={cur.status}/>
                    </Swipeable>
                ))
            }
        </ScrollView>
    ) : (!props.scanningForBarcodes) ? (
        <View style={{flex: 1, backgroundColor: '#F8F8F8', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.opacity} onPress={() => openQrScanner()}>
                <View>
                    <Feather style={{alignSelf: 'center'}} name="wifi" size={115} color="#7A05BC"/>
                    <Text style={{
                        color: '#7A05BC',
                        fontFamily: 'Overpass_800ExtraBold',
                        fontSize: 17,
                        textAlign: 'center'
                    }}>Connect</Text>
                </View>
            </TouchableOpacity>
        </View>
    ) : (
        <QrScanner onScanned={(data: string) => qrScanned(data)}/>
    )

    return (
        <View style={{flex: 1}}>
            {option}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Waiting for response</Text>
                        <ActivityIndicator size="large"/>
                    </View>
                </View>
            </Modal>
        </View>
    )


}

const styles = StyleSheet.create({
    opacity: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    header: {
        fontSize: 20,
        backgroundColor: "#FAFAFA"
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 25
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default connector(Connect)
