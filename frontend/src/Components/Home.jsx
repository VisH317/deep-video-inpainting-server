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

function Home({ navigation, routes }) {
    return (
        <View>
            <Text>Insert logo here</Text>
            <Text>Inpaint videos to get rid of unnecessary objects</Text>
            <Text>Insert description here</Text>
            <Button
            title="Get Videos"
            color="#841584"
            onPress={async () => {
                    routes.params.updateVideos()
                    navigation.navigate("Edit")
                }}/>
        </View> 
    )
}

export default Home