import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper'
import {Tile} from '../Components/Tile';

export const Deck = () => {

    const profile = {
        columns: 2,
        pages: [
            [
                {name: "test"},
                {name: "test1"},
                {name: "test2"},
                {name: "test3"},
                {name: "test4"},
                {name: "test5"}
            ],
            [
                {name: "test6"},
                {name: "test7"},
                {name: "test8"},
                {name: "test9"},
                {name: "test10"},
                {name: "test11"},
            ],
            [
                {name: "test12"},
                {name: "test13"}
            ]
        ]
    }

    const renderItem = ({item}: any) => (
        <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
            <Tile title={item.name}/>
        </View>
    );

    return (
        <Swiper style={styles.container} showsButtons={false} loop={false} activeDotColor={"#7A05BC"}>
            {
                profile.pages.map((buttons) => (
                    <View style={{flex: 1}}>
                        <FlatList
                            contentContainerStyle={{flex: 1, justifyContent: 'space-evenly'}}
                            data={buttons} renderItem={renderItem} numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            columnWrapperStyle={{justifyContent: 'center'}}
                        />
                    </View>
                ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    container: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});
