import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Feather} from '@expo/vector-icons';
import {Overpass_800ExtraBold, useFonts} from "@expo-google-fonts/overpass";

export default function Connect() {

    let [fontsLoaded] = useFonts({
        Overpass_800ExtraBold
    })

    if (!fontsLoaded) {
        return null
    }


    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#F8F8F8'}}>
            <View style={styles.button}>
                <View>
                    <Feather style={{alignSelf: 'center'}} name="wifi" size={115} color="#7A05BC"/>
                    <Text style={{
                        color: '#7A05BC',
                        fontFamily: 'Overpass_800ExtraBold',
                        fontSize: 17,
                        textAlign: 'center'
                    }}>Connect</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 5
    }
});
