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
import videoURI from '../../data/video'
import Nav from '../Nav'
import ImgStack from './ImgStack'
import Action from './Action'

async function getVideos() {
    const params = {
        mediaType: "video"
    }
    const videos = await launchImageLibrary(params)
    return videos.assets
}


export default function Home({ navigation }) {

    const [uri, setUri] = useAtom(videoURI)

    const updateVideos = async () => {
        const video = await getVideos()
        setUri({ value: video[0] })
    }

    return (
        <View>
            <Nav active={0}/>
            <View style={styles.topRect}/>
            <View style={styles.bottomRect}/>
            <ImgStack/>
            <View style={styles.mainText}>
                <Text>Video <Text style={styles.highlight}>Inpainting</Text></Text>
            </View>
            <View style={styles.desc}>
                Remove Objects from Videos Using AI
            </View>
            <View style={styles.actionContainer}>
                <Action text="Upload a Video" desc="Edit a premade video" onClick=""/>
                <Action text="Record a Video" desc="Record a video to edit" onClick="Record"/>
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
        width: "876.42px",
        height: "173px",
        left: "840.42px",
        top: "202px",
        background: "linear-gradient(98.37deg, #FFA89C 35.94%, #FF8C67 96.5%)",
    },
    bottomRect: {

    },
    mainText: {
        width: "100%",
        fontSize: "36px",
        fontFamily: "Inter",
        fontstyle: "normal",
        fontWeight: 700,
        lineHeight: "44px",
        textAlign: "center",
        letterSpacing: "0.05em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "black"
    },
    highlight: {
        color: "#ffac67"
    },
    desc: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        fontSize: "25px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "30px",
        textAlign: "center",
        letterSpacing: "0.05em"
    },
    actionContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center"
    }
})