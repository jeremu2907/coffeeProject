import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list';
import { useRoute } from '@react-navigation/native';

import PopScreenBtn from '../Buttons/PopScreenBtn';
import { enterCoffee, enterLiquidCoffee, enterMilk, convert } from './conversions';
import EditItemBtn from '../Buttons/EditItemBtn';

export default function ItemCard()
{
    const [unit, setUnit] = React.useState("grams");
    const [coffee, setCoffee] = React.useState("");
    const [liquidCoffee, setLiquidCoffee] = React.useState("");
    const [milk, setMilk] = React.useState("");
    const route = useRoute();

    let [wRatio, cRatio] = route.params.wtcRatio.split(':');
    let [mRatio, lcRatio] = route.params.mtcRatio.split(':');

    wRatio = parseFloat(wRatio);
    cRatio = parseFloat(cRatio);
    mRatio = parseFloat(mRatio);
    lcRatio = parseFloat(lcRatio);

    const setC = (e) => {setCoffee(e)};
    const setL = (e) => {setLiquidCoffee(e)};
    const setM = (e) => {setMilk(e)};

    const formatString = (s) =>
        {
            if(!s) return;

            let decimals = s.split('.');
            if(decimals[1])
            {
                return decimals[0]+ "." + decimals[1].substring(0,2);
            }
            return s
        }


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
            fontWeight: "bold",
            marginRight: "auto"
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
            <View style={styles.detailFields}>
                <PopScreenBtn />
                <Text style={styles.drinkName}>{route.params.drinkName}</Text>
                <EditItemBtn />
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.sectionHeading}>Calculate Ratio</Text>
                <View style={{width: 150}}>
                    <SelectList
                        setSelected={val =>
                                        {
                                            if(val != unit)
                                            {
                                                setUnit(val)
                                                convert(
                                                    coffee,
                                                    liquidCoffee,
                                                    milk,
                                                    val,
                                                    setC,
                                                    setL,
                                                    setM);
                                            }
                                        }
                                    }
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
                    placeholder="0.0"
                    value={formatString(coffee)}
                    style={styles.textInput}
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    placeholderTextColor={"#555555"}
                    returnKeyType='done'
                    onChangeText={i => {
                        setCoffee(i);
                        setLiquidCoffee("");
                        setMilk("");
                        enterCoffee(
                            parseFloat(i),
                            cRatio,
                            wRatio,
                            lcRatio,
                            mRatio,
                            setL,
                            setM
                        )
                    }}
                />
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Liquid Coffee</Text>
                <TextInput
                    placeholder="0.0"
                    value={formatString(liquidCoffee)}
                    style={styles.textInput}
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    placeholderTextColor={"#555555"}
                    returnKeyType='done'
                    onChangeText={i => {
                        setLiquidCoffee(i);
                        setCoffee("");
                        setMilk("");
                        enterLiquidCoffee(
                            parseFloat(i),
                            cRatio,
                            wRatio,
                            lcRatio,
                            mRatio,
                            setC,
                            setM
                        )
                    }}
                />
            </View>

            <View style={styles.detailFields}>
                <Text style={styles.unitTextStyle}>Milk</Text>
                <TextInput
                    placeholder="0.0"
                    value={formatString(milk)}
                    style={styles.textInput}
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    placeholderTextColor={"#555555"}
                    returnKeyType='done'
                    editable={isNaN(mRatio) ? false : true}
                    onChangeText={i => {
                        setMilk(i);
                        setCoffee("");
                        setLiquidCoffee("");
                        enterMilk(
                            parseFloat(i),
                            cRatio,
                            wRatio,
                            lcRatio,
                            mRatio,
                            setC,
                            setL
                        )
                    }}
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