import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list';
import { useRoute } from '@react-navigation/native';

export default function ItemCard()
{
    const [unit, setUnit] = React.useState("grams");
    const route = useRoute();

    const styles = StyleSheet.create({
        container: {
            borderRadius:30,
            marginTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'space-evenly',
            flex: 1
        },
        shadowProp: {
            shadowOffset: {width: 5,height: 10},
            shadowOpacity: 0.7,
            shadowColor: "#000000",
            shadowRadius: 10
        },
        drinkName: {
            color: "white",
            fontSize: 30,
            fontWeight: "bold"
        },
        detailFields: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        sectionHeading: {
            color: "#888888",
            fontWeight: "bold",
            fontSize: 23
        },
        unitTextStyle:{
            color: "#FF8A00",
            alignSelf: "center",
            fontSize: 20
        },
        unitDropdownStyle: {
            borderRadius: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0
        },
        textInput: {
            backgroundColor: "rgba(45,45,45,0.75)",
            borderRadius: 15,
            width: 150,
            padding: 10,
            paddingTop: 5,
            paddingBottom: 5,
            textAlign: "center",
            fontSize: 20,
            color: "#ffffff"
        },
        infoText: {
            color: "#ffffff",
            fontSize: 20,
            alignSelf: "flex-start"
        },
        noteArea: {
            fontStyle: "italic"
        }
    });

    return(
        <LinearGradient
            // colors={['rgba(69, 50, 26,1)', '#262626','rgba(30,30,30,0.6)']}
            colors={['rgba(54, 35, 11,1))','rgba(25,25,25,1)','rgba(15,15,15,1)']}
            style={styles.container}
            start={{ x: 0.1, y: 1.5 }}
            end={{ x: 1.3, y: 0.2 }}
            locations={[0,0.6,0.95]}
        >
            <Text style={styles.drinkName}>{route.params.drinkName}</Text>

            <View style={styles.detailFields}>
                <Text style={styles.sectionHeading}>Calculate Ratio</Text>
                <View style={{width: 150}}>
                    <SelectList
                        setSelected={val => setUnit(val)}
                        data={[
                            {key: '1', value: 'grams'},
                            {key: '2', value: 'oz'}
                        ]}
                        save="value"
                        boxStyles={{borderWidth: 0, justifyContent: "center"}}
                        inputStyles={styles.unitTextStyle}
                        dropdownStyles={styles.unitDropdownStyle}
                        dropdownItemStyles={{padding: 0}}
                        dropdownTextStyles={styles.unitTextStyle}
                        defaultOption={{key:'1', value: 'grams'}}
                        search={false}
                        arrowicon={<View/>}
                    />
                </View>
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Coffee</Text>
                <TextInput
                    placeholder="amount"
                    style={styles.textInput}
                    keyboardType='numeric'
                    placeholderTextColor={"#555555"}
                    returnKeyType='done'
                />
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Liquid Coffee</Text>
                <TextInput
                    placeholder="amount"
                    style={styles.textInput}
                    keyboardType='numeric'
                    placeholderTextColor={"#555555"}
                    returnKeyType='done'
                />
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Milk</Text>
                <TextInput
                    placeholder="amount"
                    style={styles.textInput}
                    keyboardType='numeric'
                    placeholderTextColor={"#555555"}
                    returnKeyType='done'
                />
            </View>

            <Text style={styles.sectionHeading}>More Info</Text>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Type</Text>
                <Text style={styles.infoText}>{route.params.type}</Text>
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Water : Coffee</Text>
                <Text style={styles.infoText}>{route.params.wtcRatio}</Text>
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Milk : Coffee</Text>
                <Text style={styles.infoText}>{route.params.mtcRatio}</Text>
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Ingredients</Text>
                <Text style={styles.infoText}>{route.params.ingredients}</Text>
            </View>

            <View>
                <Text style={[styles.unitTextStyle, styles.noteArea]}>Notes</Text>
                <Text style={[styles.infoText, styles.noteArea]}>{route.params.notes}</Text>
            </View>

        </LinearGradient>
    )
}