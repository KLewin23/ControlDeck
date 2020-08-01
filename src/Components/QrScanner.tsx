import React, {useState} from 'react'
import {BarCodeEvent} from "expo-barcode-scanner/src/BarCodeScanner";
import {Button, Dimensions, StyleSheet, View} from "react-native";
import {Camera} from "expo-camera";


interface Props {
    onScanned: (data: string) => void
}

export default function QrScanner(props: Props) {
    const [scanned, setScanned] = useState(false);
    const [invalidQr, setInvalidQr] = useState(false);

    const handleBarCodeScanned = ({type, data}: BarCodeEvent) => {
        console.log(data)
        if (data.slice(0, 3) === "CD:") {
            setScanned(true);
            setInvalidQr(false);
            setTimeout(() => props.onScanned(data),1500);
        } else {
            setInvalidQr(true)
        }
    };

    const colorStyles = StyleSheet.create({
        normal: {
            backgroundColor: 'white',
        },
        success: {
            backgroundColor: 'lime',
        },
        error: {
            backgroundColor: 'red',
        }
    })

    const color = (invalidQr) ? colorStyles.error : (scanned) ? colorStyles.success : colorStyles.normal

    return (
        <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Camera
                onBarCodeScanned={(scanned) ? () => null : handleBarCodeScanned}
                ratio='16:9'
                style={[StyleSheet.absoluteFill]}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}


            <View style={styles.overlay}>
                <View
                    style={{
                        height:
                            (Dimensions.get('window').height -
                                (Dimensions.get('window').width / 100) *
                                80) /
                            2,
                        width: '100%',
                        backgroundColor: 'black',
                        opacity: 0.5
                    }}
                >
                    <View
                        style={[{
                            height: 6,
                            width: 40,
                            opacity: 1,
                            marginTop:
                                (Dimensions.get('window').height -
                                    (Dimensions.get('window').width / 100) *
                                    80) /
                                2 -
                                6,
                            marginLeft:
                                (Dimensions.get('window').width / 100) *
                                10 -
                                6
                        }, color]}
                    />
                    <View
                        style={[{
                            height: 6,
                            width: 40,
                            backgroundColor: 'white',
                            opacity: 1,
                            marginLeft:
                                Dimensions.get('window').width / 2 +
                                (Dimensions.get('window').width / 100) *
                                40 -
                                34,
                            marginTop: -6
                        }, color]}
                    />
                </View>
                <View style={{backgroundColor: 'transparent'}}>
                    <View
                        style={{
                            height:
                                (Dimensions.get('window').width / 100) * 80,
                            width: '10%',
                            backgroundColor: 'black',
                            opacity: 0.5
                        }}
                    >
                        <View
                            style={[{
                                height: 34,
                                width: 6,
                                backgroundColor: 'white',
                                opacity: 1,
                                marginLeft:
                                    (Dimensions.get('window').width / 100) *
                                    10 -
                                    6
                            }, color]}
                        />
                        <View
                            style={[{
                                height: 34,
                                width: 6,
                                backgroundColor: 'white',
                                opacity: 1,
                                marginLeft:
                                    (Dimensions.get('window').width / 100) *
                                    10 -
                                    6,
                                marginTop:
                                    (Dimensions.get('window').width / 100) *
                                    40 *
                                    2 -
                                    68
                            }, color]}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft:
                                Dimensions.get('window').width / 2 +
                                (Dimensions.get('window').width / 100) * 40,
                            height:
                                (Dimensions.get('window').width / 100) *
                                40 *
                                2,
                            width: '10%',
                            backgroundColor: 'black',
                            opacity: 0.5,
                            marginTop:
                                0 -
                                (Dimensions.get('window').width / 100) * 80
                        }}
                    >
                        <View
                            style={[{
                                height: 34,
                                width: 6,
                                backgroundColor: 'white',
                                opacity: 1
                            }, color]}
                        />
                        <View
                            style={[{
                                height: 34,
                                width: 6,
                                backgroundColor: 'white',
                                opacity: 1,
                                marginTop:
                                    (Dimensions.get('window').width / 100) *
                                    40 *
                                    2 -
                                    68
                            }, color]}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height:
                            (Dimensions.get('window').height -
                                (Dimensions.get('window').width / 100) *
                                80) /
                            2,
                        width: '100%',
                        backgroundColor: 'black',
                        opacity: 0.5
                    }}
                >
                    <View
                        style={[{
                            height: 6,
                            width: 40,
                            backgroundColor: 'white',
                            opacity: 1,
                            marginLeft:
                                (Dimensions.get('window').width / 100) *
                                10 -
                                6
                        }, color]}
                    />
                    <View
                        style={[{
                            height: 6,
                            width: 40,
                            backgroundColor: 'white',
                            opacity: 1,
                            marginLeft:
                                Dimensions.get('window').width / 2 +
                                (Dimensions.get('window').width / 100) *
                                40 -
                                34,
                            marginTop: -6
                        }, color]}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        marginHorizontal: 0,
        marginTop: -100,
        marginLeft: 0,
        marginStart: 0,
        paddingHorizontal: 0,
        paddingLeft: 0,
        paddingStart: 0,
        height: '130%',
        padding: 0,
        zIndex: 1
    },
    overlay: {
        zIndex: 2,
        width: '100%',
        backgroundColor: 'transparent'
    },
});
