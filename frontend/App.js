import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ItemCardScreen } from './screens/ItemCard';
import {HomeScreen} from './screens/HomeScreen'
import { StatusBar } from 'expo-status-bar';
import TopBar from './components/TopBar/TopBar';

const Stack = createNativeStackNavigator();

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
                <SafeAreaView style={styles.container}>
                    <StatusBar style="light" />
                    <TopBar />
                    <Stack.Navigator screenOptions={{ headerShown: false }} >{/*Hides screen title*/}

                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}  
                        />

                        <Stack.Screen
                            name="ItemCard"
                            component={ItemCardScreen}  
                        />
                    
                    </Stack.Navigator>
                </SafeAreaView>
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
    }
});