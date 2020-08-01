import 'react-native-gesture-handler';
import React from 'react';
import {registerRootComponent} from "expo";
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AntDesign, Feather} from '@expo/vector-icons';
import Home from "./Pages/Home";
import TopBar from "./Components/TopBar";
import Connect from "./Pages/Connect";
import {Provider} from 'react-redux';
import {store} from "./Store/Store";
import AsyncStorage from '@react-native-community/async-storage';
import {ActionType} from "./Store";
import {Deck} from "./Pages/Deck";

export default class App extends React.Component {

    render() {

        async function getDevices() {
            return await AsyncStorage.getItem('ControlDeck-Devices')
        }

        async function createDevicesVar() {
            return await AsyncStorage.setItem('ControlDeck-Devices', JSON.stringify([]))
        }

        getDevices().then((devices) => {
            if (devices) {
                console.log(devices)
                store.dispatch({type: ActionType.SET_DEVICES, payload: JSON.parse(devices)})
            } else {
                createDevicesVar().then()
            }
        })

        const closeQrScanner = () => {
            store.dispatch({type: ActionType.SET_BARCODE_SCANNER_STATUS, payload: false})
        }

        const Tab = createMaterialBottomTabNavigator()
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <TopBar/>
                    <Tab.Navigator backBehavior={"history"} activeColor={"#7A05BC"} inactiveColor={"#9F9F9F"}
                                   barStyle={{backgroundColor: 'white'}} initialRouteName={'qrCode'}>
                        <Tab.Screen name="Home" component={Home}
                                    options={{
                                        tabBarLabel: 'Home',
                                        tabBarIcon: ({color}) => (
                                            <Feather name={"home"} color={color} size={26}/>)
                                    }} listeners={{tabPress: () => closeQrScanner()}}
                        />
                        <Tab.Screen name="qrCode" component={Connect}
                                    options={{
                                        tabBarLabel: 'Connect',
                                        tabBarIcon: ({color}) => (
                                            <AntDesign name={"qrcode"} color={color} size={26}/>),
                                    }} listeners={{tabPress: () => closeQrScanner()}}
                        />
                        <Tab.Screen name="Deck" component={Deck}
                                    options={{
                                        tabBarLabel: 'Deck',
                                        tabBarIcon: ({color}) => (
                                            <Feather name={"grid"} color={color} size={26}/>)
                                    }} listeners={{tabPress: () => closeQrScanner()}}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

registerRootComponent(App);

