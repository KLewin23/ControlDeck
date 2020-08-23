import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Orientation } from "../Store";
import * as Device_expo from "expo-device";

interface Props {
    ip: string
    title: string,
    event: string,
    orientation: Orientation
}

export const Tile = (props: Props) => {

    return (
        <TouchableOpacity
            style={{
                elevation: 3,
                borderRadius: 25,
                height: 110,
                width: 110,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center"
            }}
            onPress={() => {
                if (Device_expo.deviceName === null) return;
                fetch(`http://${props.ip}/event?name=${encodeURIComponent(Device_expo.deviceName)}`,{method: 'POST'}).then(res => {
                    console.log(res)
                })
            }}
        >
            <Image source={require("./spotify.png")}
                   style={{
                       height: 110,
                       width: 110,
                       borderRadius: 25,
                       transform: [{ rotate: (props.orientation === Orientation.Portrait) ? "0deg" : "-90deg" }]
                   }}/>
            <View style={{
                width: '100%',
                zIndex: 100,
                position: "absolute",
                bottom: 5,
                alignItems: 'center'
            }}>
                <Text style={{color: "white", textTransform: 'capitalize'}}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};
