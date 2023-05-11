import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DrinkItemContainer from '../components/DrinkItemContainer/DrinkItemContainer';


export const HomeScreen = ({navigation}) => 
{
    return(
        <View style={styles.container}>

            <View style={styles.bottomLine}>
                <Text style={styles.titleTextStyle}>My Drinks</Text>
            </View>
                <DrinkItemContainer url="https://cffee.jeremynguyen.tech/UserCoffee/getAllMyItems?user=Jeremy%20Nguyen"/>

            <View style={styles.bottomLine}>
                <Text style={styles.titleTextStyle}>Be Insipred</Text>
            </View>
                <DrinkItemContainer url="https://cffee.jeremynguyen.tech/suggestType?type=1" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
    },
    titleTextStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    bottomLine: {
        paddingTop: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 20
    }
});