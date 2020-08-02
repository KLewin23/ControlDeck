import React from 'react'
import {Overpass_800ExtraBold, useFonts} from "@expo-google-fonts/overpass";
import {Text, View} from "react-native";
import {Orientation} from "../Store";

interface Props {
    orientation: Orientation
}

export default function TopBar(props:Props) {
    let [fontsLoaded] = useFonts({
        Overpass_800ExtraBold
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{height: 60, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',display: (props.orientation === Orientation.Landscape)?'none':'flex'}}>
            <Text style={{color: '#7A05BC', fontFamily: 'Overpass_800ExtraBold', fontSize: 17}}>Control Deck</Text>
        </View>
    )

}
