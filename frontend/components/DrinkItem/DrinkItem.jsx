import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {useWindowDimensions} from 'react-native';

export default function DrinkItem(props)
{
    const {height, width} = useWindowDimensions();

    const styles = StyleSheet.create({
        container: {
            width: width / 2.2,
            height: height / 6.2,
            borderRadius: 10,
            marginRight: 15,
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: 'space-evenly'
        },
        textStyle: {
            color: "#ffffff"
        },
        view: {
        },
        shadowProp: {
            shadowOffset: {width: 5,height: 10},
            shadowOpacity: 0.7,
            shadowColor: "#000000",
            shadowRadius: 10
        },
        drinkName: {
            color: "white",
            fontSize: 17,
            fontWeight: "bold"
        },
        detailFields: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        detailText: {
            color: "white"
        }
    });

    return(
        <View style={[styles.view, styles.shadowProp]} >
            <LinearGradient
                // colors={['rgba(69, 48, 21,1)', '#262626','rgba(30,30,30,0.6)']}
                colors={['rgba(0,0,0,0))', 'rgba(60,60,60,0.3)','rgba(60,60,60,0.3)']}
                style={styles.container}
                start={{ x: 0.2, y: 1.2 }}
                end={{ x: 0.4, y: 0 }}
                locations={[0, 0.35,0.9]}
            >
                <Text style={styles.drinkName}>{props.drinkName}</Text>
                <View style={styles.detailFields}>
                    <Text style={styles.detailText}>Type</Text>
                    <Text style={styles.detailText}>{props.type}</Text>
                </View>
                <View style={styles.detailFields}>
                    <Text style={styles.detailText}>Water Ratio</Text>
                    <Text style={styles.detailText}>{props.wtcRatio}</Text>
                </View>
                <View style={styles.detailFields}>
                    <Text style={styles.detailText}>Milk Ratio</Text>
                    <Text style={styles.detailText}>{props.mtcRatio}</Text>
                </View>
                
            </LinearGradient>
        </View>
    )
}