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
    Pressable,
    Image
} from 'react-native'
import { useAtom } from 'jotai'
import videoURI from '../../data/video'
import Nav from '../Nav'
import ImgStack from './ImgStack'
import Action from './Action'
import { launchImageLibrary } from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'

async function getVideos() {
    const params = {
        mediaType: "video" as const
    }
    const videos = await launchImageLibrary(params)
    return videos.assets
}


export default function Home({ navigation }: any) {

    const [uri, setUri] = useAtom(videoURI)

    const updateVideos = async () => {
        const video = await getVideos()
        if(video===undefined) return
        setUri({ value: video[0] })
    }

    return (
        <View style={{backgroundColor: "white", height: "100%"}}>
            {/* <LinearGradient style={styles.topRect} 
                colors={["#FFA89C", "#FF8C67"]} 
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}/> */}
            <LinearGradient style={styles.bottomRect} 
                colors={["#e2e8f0", "#e2e8f0"]} 
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}/>
            {/* <ImgStack/> */}
            <View style={styles.imgContainer}>
                <Image source={require("./video.png")} style={{ width: 300, height: 300 }}/>
            </View>
            <View style={styles.mainText}>
                <Text style={{fontSize: 36, color: "black", textAlign: "center"}}>Video <Text style={styles.highlight}>Inpainting</Text></Text>
                <Text style={{fontSize: 17, color: "black", fontWeight:"200", textAlign: "center"}}>Remove Objects from Videos Using AI</Text>
            </View>
            {/* <View style={styles.spacer}/> */}
            <View style={styles.actionContainer}>
                <Action title="Upload a Video" desc="Edit a premade video" onClick=""/>
                <Action title="Record a Video" desc="Record a video to edit" onClick="Record"/>
            </View>
        </View>
    )

    // return (
    //     <View>
    //         <Text>Insert logo here</Text>
    //         <Text>Inpaint videos to get rid of unnecessary objects</Text>
    //         <Text>Insert description here</Text>
    //         <Button
    //         title="Get Videos"
    //         color="#841584"
    //         onPress={async () => {
    //                 await updateVideos()
    //                 navigation.navigate("BoxSelect")
    //             }}/>
    //     </View> 
    // )
}

const styles = StyleSheet.create({
    topRect: {
        position: "absolute",
        width: 876.42,
        height: 173,
        left: -15,
        // backgroundColor: "#FFA89C",
        backgroundColor: "#FFA89C",
        transform: [{ rotate: '6deg' }]
    },
    imgContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomRect: {
        position: "absolute",
        width: 876.42,
        height: 273,
        left: -25,
        bottom: -15,
        // backgroundColor: "#FFA89C",
        backgroundColor: "#FFA89C",
        transform: [{ rotate: '-6deg' }]
    },
    mainText: {
        width: "100%",
        borderColor: "black",
        letterSpacing: "0.05em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "black",
        alignContent: "center",
    },
    highlight: {
        color: "#3b82f6"
    },
    actionContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 5,
        position: "absolute",
        bottom: 18,
    },
    spacer: {
        height: 50
    }
})