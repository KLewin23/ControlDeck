import * as React from 'react';
import {Switch, Text, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {PulsatingDot} from "./PulsatingDot";

enum Status {
    connected,
    searching,
    disconnected
}

interface Props {
    index: number,
    name: string,
    status: Status,
    selectedConn: boolean,
    selectConnection: (index:number | null) => void
}

export const DeviceCard = (props: Props) => {

    function change() {
        if (props.selectedConn) {
            props.selectConnection(null)
        } else {
            props.selectConnection(props.index)
        }
    }

    return (
        <View style={{
            height: 70, backgroundColor: 'white', shadowColor: "#000",
            marginBottom: 2,
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
            <View style={{ width: 35, alignSelf: 'center'}}>
                <FontAwesome name={"desktop"} size={30} color="black"
                             style={{alignSelf: 'center'}}/>
            </View>
            <View style={{alignSelf: 'center'}}>
                <Text style={{fontFamily: 'Overpass_800ExtraBold', color: '#7A05BC'}}>{props.name}</Text>
            </View>
            <View style={{alignSelf: 'center', justifyContent: 'center', width: 30}}>
                <PulsatingDot status={props.status}/>
            </View>
            <View style={{alignSelf: 'center', justifyContent: 'center', width: 30}}>
                <Switch value={props.selectedConn}
                        disabled={props.status !== Status.connected}
                        onValueChange={() => change()}
                        thumbColor={'#F5F5F5'}
                        trackColor={{true: (props.status === Status.connected) ? '#7A05BC' : 'red', false: '#F5F5F5'}}/>
            </View>
        </View>
    );
};
