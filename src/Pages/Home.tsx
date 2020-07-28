import React from 'react'
import {Text, View} from "react-native";
import {Overpass_800ExtraBold, useFonts,} from '@expo-google-fonts/overpass';

export default function Home() {

    let [fontsLoaded] = useFonts({
        Overpass_800ExtraBold
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#7A05BC', fontFamily: 'Overpass_800ExtraBold', fontSize: 17}}>Welcome to Control Deck</Text>
            </View>
        </View>
    )
}
