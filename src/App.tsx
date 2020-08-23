import 'react-native-gesture-handler';
import React from 'react';
import {registerRootComponent} from "expo";
import {Provider} from 'react-redux';
import {store} from "./Store/Store";
import MainNavigation from "./Pages/MainNavigation";
import { YellowBox } from "react-native";


export default class App extends React.Component<any,any> {
    render() {
        console.disableYellowBox = true
        return (
            <Provider store={store}>
                <MainNavigation/>
            </Provider>
        );
    }
}


registerRootComponent(App);

