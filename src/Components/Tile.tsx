import * as React from 'react';
import {Text, TouchableOpacity} from "react-native";

interface Props {
    title: string
}

export const Tile = (props: Props) => {
    return (
        <TouchableOpacity
            style={{
                elevation: 3,
                borderRadius: 25,
                height: 110,
                backgroundColor: '#7A05BC',
                width: 110,
                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            <Text style={{textAlign: 'center'}}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};
