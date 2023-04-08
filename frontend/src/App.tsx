import React, { useState } from 'react'
import { Button, StatusBar, Text, useColorScheme, View } from 'react-native'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'


// Components
import Completed from './Components/Completed'
import Home from './Components/Home'
import Loading from './Components/Loading'
import BoxSelect from './Components/BoxSelect/BoxSelect'


const Stack = createNativeStackNavigator()
const navigationRef = createNavigationContainerRef()

async function getVideos() {
    const params = {
        mediaType: "video"
    }
    const videos = await launchImageLibrary(params)
    return videos.assets
}

function App() {
    const [videos, setVideos] = useState(false)
    const [objVideo, setObjVideo] = useState(false)

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    async function updateVideos() {
        const videos = await getVideos();
        console.log(videos)
        setVideos(videos[0])
    }

    return (
        <GestureHandlerRootView style={{flex:1}} ref={navigationRef}>
            <NavigationContainer>
                <Stack.Navigator>
                    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor}/>
                    <Stack.Screen name="Home" options={{ title: "Home", updateVideos }} component={Home}/>
                    <Stack.Screen name="Loading" component={Loading}/>
                    <Stack.Screen name="Completed" component={Completed}/>
                    <Stack.Screen name="BoxSelect" component={BoxSelect} options={{ uri: videos.uri, setRes: () => setObjVideo(true) }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default App;