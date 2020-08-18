import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AntDesign, Feather} from '@expo/vector-icons';
import Home from "./Home";
import TopBar from "../Components/TopBar";
import Connect from "./Connect";
import {store} from "../Store/Store";
import {ActionType, MainReducerType, Orientation} from "../Store";
import Deck from "./Deck";
import {AsyncStorage} from "react-native";
import {connect, ConnectedProps} from "react-redux";

const mapState = (state: MainReducerType) => ({
    orientation: state.orientation
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

const MainNavigation = (props: PropsFromRedux) => {

    async function getDevices() {
        return await AsyncStorage.getItem('ControlDeck-Devices')
    }

    async function createDevicesVar() {
        return await AsyncStorage.setItem('ControlDeck-Devices', JSON.stringify([]))
    }

    getDevices().then((devices) => {
        if (devices) {
            store.dispatch({type: ActionType.SET_DEVICES, payload: JSON.parse(devices)})
        } else {
            createDevicesVar().then()
        }
    })

    const barPress = () => {
        store.dispatch({type: ActionType.SET_ORIENTATION, payload: Orientation.Portrait})
        store.dispatch({type: ActionType.SET_BARCODE_SCANNER_STATUS, payload: false})
    }

    const Tab = createMaterialBottomTabNavigator()

    return (
        <NavigationContainer>
            <TopBar orientation={props.orientation}/>
            <Tab.Navigator backBehavior={"history"} activeColor={"#7A05BC"} inactiveColor={"#9F9F9F"}
                           barStyle={{
                               backgroundColor: 'white',
                               display: (props.orientation === Orientation.Landscape) ? 'none' : 'flex'
                           }} initialRouteName={'qrCode'}>
                <Tab.Screen name="Home" component={Home}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({color}) => (
                                    <Feather name={"home"} color={color} size={26}/>)
                            }} listeners={{tabPress: () => barPress()}}
                />
                <Tab.Screen name="qrCode" component={Connect}
                            options={{
                                tabBarLabel: 'Connect',
                                tabBarIcon: ({color}) => (
                                    <AntDesign name={"qrcode"} color={color} size={26}/>),
                            }} listeners={{tabPress: () => barPress()}}
                />
                <Tab.Screen name="Deck" component={Deck}
                            options={{
                                tabBarLabel: 'Deck',
                                tabBarIcon: ({color}) => (
                                    <Feather name={"grid"} color={color} size={26}/>)
                            }} listeners={{tabPress: () => barPress()}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default connector(MainNavigation)
