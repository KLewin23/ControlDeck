import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import { store } from "./Store";
const customTitlebar = window.require('custom-electron-titlebar')

export const theme = createMuiTheme({
    palette: {
        background: {
            default: '#261D2A'
        },
        primary: {
            main: '#362B3B'
        },
        common: {
            white: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: 'Overpass',
        fontSize: 15
    }
})

const titleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#1B1B1B'),
    menu: null,
    maximizable: false,
    hideWhenClickingClose: true
})

titleBar.updateTitle(" ")

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HomePage/>
        </ThemeProvider>
    </Provider>,
document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
