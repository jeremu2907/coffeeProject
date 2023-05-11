import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DrinkItem(props)
{
    const navigation = useNavigation();
    const {height, width} = useWindowDimensions();

    const adjustTypeLen = (str) =>
    {
            return str.substr(0, 12) + ((str.length > 12)? " ..." : "");
    }

    const styles = StyleSheet.create({
        container: {
            width: width / 2.21,
            height: height / 6.2,
            borderRadius: 10,
            marginRight: 15,
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: 'space-evenly',
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
        <TouchableOpacity 
            onPress = {() => 
            {
                navigation.navigate('ItemCard', props);
            }}
        >
            <LinearGradient
                colors={['rgba(69, 50, 26,0.7)', 'rgba(38, 38, 38, 0.5)','rgba(30,30,30,0.6)']}
                // colors={['rgba(0,0,0,1))', 'rgba(60,60,60,0.3)','rgba(60,60,60,0.3)']}
                style={styles.container}
                start={{ x: 0.2, y: 1.2 }}
                end={{ x: 0.4, y: 0 }}
                locations={[0, 0.35,0.9]}
            >
                <Text style={styles.drinkName}>{props.drinkName}</Text>
                <View style={styles.detailFields}>
                    <Text style={styles.detailText}>Type</Text>
                    <Text style={styles.detailText}>{adjustTypeLen(props.type)}</Text>
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
        </TouchableOpacity>
    )
}