import React, { useState, useEffect } from 'react'
import {
    Button,
    NativeModules,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    Pressable
} from 'react-native'
import { useAtom } from 'jotai'
import videoURI from '../data/video'

async function getVideos() {
    const params = {
        mediaType: "video"
    }
    const videos = await launchImageLibrary(params)
    return videos.assets
}


function Home({ navigation, routes }) {

    const [uri, setUri] = useAtom(videoURI)

    const updateVideos = async () => {
        const video = await getVideos()
        setUri({ value: video[0] })
    }

    return (
        <View>
            <Text>Insert logo here</Text>
            <Text>Inpaint videos to get rid of unnecessary objects</Text>
            <Text>Insert description here</Text>
            <Button
            title="Get Videos"
            color="#841584"
            onPress={async () => {
                    await updateVideos()
                    navigation.navigate("BoxSelect")
                }}/>
        </View> 
    )
}

export default Home