import 'react-native-gesture-handler';
import React from 'react';
import {registerRootComponent} from "expo";
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Home from "./Pages/Home";
import TopBar from "./Components/TopBar";
import Connect from "./Pages/Connect";

export default class App extends React.Component {

    render() {

        const Tab = createMaterialBottomTabNavigator()

        return (
            <NavigationContainer>
                <TopBar/>
                <Tab.Navigator activeColor={"#7A05BC"} inactiveColor={"#9F9F9F"} barStyle={{backgroundColor: 'white'}} initialRouteName={'qrcode'}>
                    <Tab.Screen name="Home" component={Home} options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({color}) => (<Feather name={"home"} color={color} size={26}/>)
                    }}/>
                    <Tab.Screen name="qrcode" component={Connect}
                                options={{
                                    tabBarLabel: 'Connect',
                                    tabBarIcon: ({color}) => (
                                        <AntDesign name={"qrcode"} color={color} size={26}/>)
                                }}/>
                    <Tab.Screen name="Deck" component={Home}
                                options={{
                                    tabBarLabel: 'Deck',
                                    tabBarIcon: ({color}) => (
                                        <Feather name={"grid"} color={color} size={26}/>)
                                }}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

registerRootComponent(App);

