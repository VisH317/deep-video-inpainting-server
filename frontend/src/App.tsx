import React, { useState } from 'react'
import { Button, StatusBar, Text, useColorScheme, View } from 'react-native'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchImageLibrary } from 'react-native-image-picker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'

// Components
import Completed from './Components/Completed'
import Home from './Components/Home/Home'
import Loading from './Components/Loading'
import BoxSelect from './Components/Record/BoxSelect/BoxSelect'
import RecordStack from './Components/Record/RecordStack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder"
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome"


const Tab = createBottomTabNavigator()
const navigationRef = createNavigationContainerRef()

const Hola = () => (
    <Text>HOLA</Text>
)

function App() {

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor}/>
            <NavigationContainer ref={navigationRef}>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabbarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if(route.name==="Home") iconName = faHome
                        if(route.name==="Camera") iconName = faCamera
                        // if(route.name==="Files") iconName = faFolder
                        console.log("iconName: ", iconName)
                        return <FontAwesomeIcon icon={faHome} color={color}/>
                    },
                    tabBarActiveTintColor: "#ff8c67",
                    tabBarInactiveTintColor: "#979797",
                    headerShown: false
                })}>
                    <Tab.Screen name="Home" options={{ title: "Home" }} component={Home}/>
                    <Tab.Screen name="Camera" options={{ title: "Camera" }} component={RecordStack}/>
                </Tab.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default App;