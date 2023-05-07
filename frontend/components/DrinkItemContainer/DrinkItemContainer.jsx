import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import DrinkItem from '../DrinkItem/DrinkItem';
import {useWindowDimensions} from 'react-native';

export default function DrinkItemContainer() 
{
    const {height, width} = useWindowDimensions();

    // const styles = StyleSheet.create({
    //     container: {
    //         flex: 1,
    //         // flexDirection: "column",
    //         // flexWrap: "wrap",
    //         // justifyContent: "space-between",
    //         // alignItems: "flex-end",
    //         // alignContent: "space-between",
    //         flexGrow: 1
    //     }
    // });

    return(
        <ScrollView
            // style={styles.container}
            contentContainerStyle={{
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
            }}
            horizontal={true}
            
        >
            <DrinkItem
                drinkName = "Cold Brew"
                type = "cold"
                wtcRatio = "10:1"
                mtcRatio = "..."
            />
            <DrinkItem
                drinkName = "Latte"
                type = "hot, espresso"
                wtcRatio = "1.5:1"
                mtcRatio = "4:1"
            />
            <DrinkItem
                drinkName = "Filtered Brew"
                type = "hot, cold"
                wtcRatio = "10:1"
                mtcRatio = "..."
            />
            <DrinkItem
                drinkName = "Iced Mocha"
                type = "cold, espresso"
                wtcRatio = "1:1"
                mtcRatio = "3.5:1"
            />
            <DrinkItem
                drinkName = "Americano"
                type = "espresso"
                wtcRatio = "1.5:1"
                mtcRatio = "..."
            />
        </ScrollView>
    )
}