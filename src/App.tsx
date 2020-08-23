import 'react-native-gesture-handler';
import React from 'react';
import {registerRootComponent} from "expo";
import {Provider} from 'react-redux';
import {store} from "./Store/Store";
import MainNavigation from "./Pages/MainNavigation";
<<<<<<< HEAD
import { YellowBox } from "react-native";
=======
>>>>>>> fa20b85d9ce3930d8a55a0c5eba9cb0e6548851a


export default class App extends React.Component<any,any> {
    render() {
<<<<<<< HEAD
        console.disableYellowBox = true
=======
>>>>>>> fa20b85d9ce3930d8a55a0c5eba9cb0e6548851a
        return (
            <Provider store={store}>
                <MainNavigation/>
            </Provider>
        );
    }
}


registerRootComponent(App);

