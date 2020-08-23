import * as React from 'react';
import { AsyncStorage, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Swiper from 'react-native-swiper'
import {Tile} from '../Components/Tile';
import {MaterialIcons} from '@expo/vector-icons';
import shortid from "shortid";
import {store} from "../Store/Store";
import {ActionType, MainReducerType, Orientation} from "../Store";
import {connect, ConnectedProps} from "react-redux";
import { useEffect, useState } from "react";

const mapState = (state: MainReducerType) => ({
    devices: state.devices,
    orientation: state.orientation
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Button {
    name: string,
    imagePath: string,
    showText: boolean
    textColor: string,
    action: string
}

interface Profile {
    name: string,
    type: number,
    columns: number,
    rows: number,
    pages: [
        Button[]
    ],
    lastUpdated: number
}

interface Props {

}

const Deck = (props: PropsFromRedux) => {

    const [profile,setProfile] = useState<Profile>({
        name: "temp",
        type: 0,
        columns: 0,
        rows: 0,
        pages: [[]],
        lastUpdated: 0
    })

    const [ip,setIp] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("ControlDeck-Selected-connection").then(item => {
            if (item === "null" || item === null) return
            AsyncStorage.getItem(props.devices[parseInt(item)].name).then(profile => {
                if (profile === null) return
                setIp(props.devices[parseInt(item)].ip)
                setProfile(JSON.parse(profile) as Profile)
            })
        });
    }, []);

    const renderItem = ({item}: any) => (
        <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
            {
                (item.name === null) ? <View style={{
                    height: 110,
                    width: 110,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}/> : <Tile title={item.name} ip={ip} event={item.action}  orientation={props.orientation}/>
            }
        </View>
    );

    const profilesPadded = profile.pages.reduce((prev: any, cur: any) => {
        const newArray = [...cur]
        for (let i = 0; i <= (profile.rows * profile.columns - 1) - cur.length; i++) {
            if (props.orientation === Orientation.Portrait) {
                newArray.push({name: null})
            } else {
                newArray.unshift({name: null})
            }
        }
        return [...prev, (cur.length !== profile.rows * profile.columns) ? newArray : cur]
    }, [])



    return (
        <View style={{flex: 1}}>
            <Swiper style={styles.container} showsButtons={false} loop={false} activeDotColor={"#7A05BC"}>
                {
                    profilesPadded.map((buttons) => (
                        <View style={{flex: 1}} key={shortid.generate()}>
                            <FlatList
                                contentContainerStyle={{flex: 1, justifyContent: 'space-evenly'}}
                                data={buttons} renderItem={renderItem} numColumns={2}
                                keyExtractor={(item, index) => index.toString()}
                                columnWrapperStyle={{justifyContent: 'center'}}
                            />
                        </View>
                    ))}
            </Swiper>
            <TouchableOpacity style={[styles.fullscreenBtn, {zIndex: 1000}]} onPress={() => store.dispatch({
                type: ActionType.SET_ORIENTATION,
                payload: (props.orientation === Orientation.Portrait) ? Orientation.Landscape : Orientation.Portrait
            })}>
                <MaterialIcons name={(props.orientation === Orientation.Portrait) ? "fullscreen" : "fullscreen-exit"}
                               size={24} color="#7A05BC" style={{alignSelf: 'center'}}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 300
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    fullscreenBtn: {
        position: 'absolute',
        marginTop: 40,
        right: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        width: 30,
        justifyContent: 'center',
        elevation: 3
    }
});

export default connector(Deck)
