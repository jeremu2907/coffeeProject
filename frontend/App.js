import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TopBar from './components/TopBar/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import DrinkItemContainer from './components/DrinkItemContainer/DrinkItemContainer';
import ItemCard from './components/ItemCard/ItemCard';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => 
{
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <TopBar />

            {/* <ItemCard /> */}
            <View style={styles.bottomLine}>
                <Text style={styles.titleTextStyle}>My Drinks</Text>
            </View>
            <DrinkItemContainer />

            <View style={styles.bottomLine}>
                <Text style={styles.titleTextStyle}>Be Insipred</Text>
            </View>
            <DrinkItemContainer />
        </SafeAreaView>
    );
};

const transparentTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent'
    }
};

export default function App() {
  return (
        <NavigationContainer theme={transparentTheme}>
            <LinearGradient
                colors={['#522f06', '#000000', '#1c0f00']}
                style={{...styles.container,...styles.paddingDev}}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.4, 0.9]}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false //Hides screen title
                    }}
                >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}  
                />
                
            </Stack.Navigator>
            </LinearGradient>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
    },
    paddingDev: {
        padding: 10
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
