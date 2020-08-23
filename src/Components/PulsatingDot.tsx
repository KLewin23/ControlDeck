import * as React from 'react';
import {useEffect, useRef} from 'react';
import {Animated, Easing, View} from "react-native";

export enum Status {
    connected,
    searching,
    disconnected
}

interface Props {
    status: Status
}

export const PulsatingDot = (props: Props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current

    function runAnimation() {
        fadeAnim.setValue(0)
        Animated.timing(
            fadeAnim,
            {
                useNativeDriver: false,
                toValue: 1,
                duration: 1200,
                // @ts-ignore
                easing: Easing.in,
            }
        ).start(() => runAnimation());
    }

    useEffect(() => {
        runAnimation()
    }, [fadeAnim])

    const dim = fadeAnim.interpolate({inputRange: [0, 1], outputRange: [20, 50]})

    return (
        <React.Fragment>
            <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: (props.status === Status.connected) ? 'green' : (props.status === Status.searching) ? 'orange' : 'red',
                alignSelf: 'center',
                opacity: 1,
                zIndex: 10,
                position: 'absolute'
            }}/>
            <Animated.View // Special animatable View
                style={{
                    zIndex: 5,
                    height: dim,         // Bind opacity to animated value
                    width: dim,
                    // @ts-ignore
                    borderRadius: fadeAnim.interpolate({inputRange: [0, 1], outputRange: [10, 25]}),
                    backgroundColor: (props.status === Status.connected) ? 'green' : (props.status === Status.searching) ? 'orange' : 'red',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    opacity: fadeAnim.interpolate({inputRange: [0, 1], outputRange: [0.5, 0]})
                }}
            />
        </React.Fragment>
    );
};
