import * as React from 'react';
import {Image, TouchableOpacity} from "react-native";
import {Orientation} from "../Store";

interface Props {
    title: string,
    orientation: Orientation
}

export const Tile = (props: Props) => {

    return (
        <TouchableOpacity
            style={{
                elevation: 3,
                borderRadius: 25,
                height: 110,
                width: 110,
                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            <Image source={require('./spotify.png')}
                   style={{
                       height: 110,
                       width: 110,
                       borderRadius: 25,
                       transform: [{rotate: (props.orientation === Orientation.Portrait)?'0deg':'-90deg'}]
                   }}/>
        </TouchableOpacity>
    );
};
