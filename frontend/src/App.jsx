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

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import { CameraRoll } from 'react-native'
import Video from 'react-native-video'
import { ExternalStorageDirectoryPath, getAllExternalFilesDirs } from 'react-native-fs'

import { launchImageLibrary } from 'react-native-image-picker'

async function getVideos() {
    const params = {
        mediaType: "video"
    }
    const videos = await launchImageLibrary(params)
    return videos.assets
}

import RNFetchBlob from 'rn-fetch-blob'

import { Canvas, Line, Path, rect, Box, Skia } from '@shopify/react-native-skia'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'

function BoxSelect(props) {
    const [x, setx] = useState("")
    const [y, sety] = useState("")
    const [w, setw] = useState("")
    const [h, seth] = useState("")

    function onSubmit(event) {
        const formdata = new FormData()
        formdata.append('file', {uri: props.uri, type: "video/mp4", name: "file.mp4"})
        formdata.append('x', x)
        formdata.append('y', y)
        formdata.append('w', w)
        formdata.append('h', h)
        RNFetchBlob.fetch("POST", "http://10.0.2.2:8000/video", 
            {
                "content-type": "multipart/form-data"
            },
            [
                {name: 'file', data: RNFetchBlob.wrap(props.uri), filename: 'vid.mp4'},
                {name: 'x', data: x},
                {name: 'y', data: y},
                {name: 'w', data: w},
                {name: 'h', data: h},
            ]
        ).then(res => {
            parseInt(getAllExternalFilesDirs())
            RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    mime: "video/mp4",
                    description: "video with object removed from download manager",
                    path: `${RNFetchBlob.fs.dirs.DownloadDir}/video/vid.mp4`,
                    notification: true
                }
            }).fetch("GET", "http://10.0.2.2:8000/video").then(res => console.log("downloaded to: ", res.path()))
                .then(res => props.setRes())
        }).then(res => props.setRes(res))
    }

    function set(x, y, w, h) {
        setx(x)
        sety(y)
        setw(w)
        seth(h)
        console.log(x, " ", y, " ", w, " ", h)
    }

    return (
        <View style={styles.chooseImage}>
            <VideoFirstFrame uri={props.uri} setValues={set}/>
            {/* <Text>Select an Area to Remove:</Text>
            <TextInput onChangeText={setx} value={x} placeholder="x:"/>
            <TextInput onChangeText={sety} value={y} placeholder="y:"/>
            <TextInput onChangeText={setw} value={w} placeholder="w:"/>
            <TextInput onChangeText={seth} value={h} placeholder="h:"/> */}
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.text}>Inpaint Video</Text>
            </Pressable>
        </View>

    )
}

function VideoFirstFrame(props) {
    const [p, setp] = useState(false)

    // gestures
    const [x, setx] = useState("0")
    const [y, sety] = useState("0")
    const [w, setw] = useState("0")
    const [h, seth] = useState("0")

    // states for bounding box
    const [absx, setabsx] = useState(0)
    const [absy, setabsy] = useState(0)
    const [absxf, setabsxf] = useState(0)
    const [absyf, setabsyf] = useState(0)

    const pan = Gesture.Pan()
        .onStart((g) => {
            setx(`${Math.round(g.x)}`) 
            sety(`${Math.round(g.y)}`)
            setabsx(Math.round(g.absoluteX))
            setabsy(Math.round(g.absoluteY))
        })
        .onUpdate(g => {
            setabsxf(Math.round(g.absoluteX))
            setabsyf(Math.round(g.absoluteY))
        })
        .onEnd((g) => {
            setw(`${Math.abs(Math.round(g.x)-x)}`)
            seth(`${Math.abs(Math.round(g.y)-y)}`)
            setabsxf(Math.round(g.absoluteX))
            setabsyf(Math.round(g.absoluteY))
            props.setValues(x, y, `${Math.abs(Math.round(g.x)-x)}`, `${Math.abs(Math.round(g.y)-y)}`)
        })

    const boundingBoxStyle = {
        border: '2px solid blue',
        position: absolute,
        top: `${absy}px`,
        left: `${absx}px`,
        width: `${absxf-absx}px`,
        height: `${absyx-absy}px`
    }

    let player

    const path = Skia.Path.Make();
    path.moveTo(parseInt(x), parseInt(y))
    path.lineTo(parseInt(x)+parseInt(w), parseInt(y))
    path.lineTo(parseInt(x)+parseInt(w), parseInt(y)+parseInt(h))
    path.lineTo(parseInt(x), parseInt(y)+parseInt(h))
    path.lineTo(parseInt(x), parseInt(y))
    path.close()

    return (
        <>
            <View style={styles.videoCont}>
                <View style={boundingBoxStyle}/>
                <GestureDetector gesture={pan} style={styles.videoCont}>
                        <Video source={{uri: props.uri}} ref={ref => player=ref} controls={false} paused={p}
                            onBuffer={() => console.log("buffering")} onError={() => console.log("ERROR")}
                            style={styles.backgroundVideo} resizeMode="contain" onLoad={() => {
                                player.seek(0)
                                setp(true)
                        }}/>
                        
                </GestureDetector>
                {/* <Canvas style={{flex: 1}}>
                    <Path path={path}/> 
                </Canvas> */}
                <Text style={{position: "relative", top: 20}}>x: {x}, y: {y}, w: {w}, h: {h}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: "relative",
        top: 20,
        zIndex: 0,
        height: "100%",
        width: "100%",
    },
    button: {
        position: "absolute",
        top: 0,
        zIndex: 3,
        backgroundColor: "#4CAF50",
        width: 415,
        textAlign: 'center',
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    videoCont: {
        position: 'absolute',
        top: 30,
        height: 600,
        zIndex: 0,
        width: "80%",
        marginLeft: "10%",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
    chooseImage: {
        flexDirection: 'column',
        // flex: 1
    },
    text: {
        fontSize: 30
    }
})

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

    let output = <></>

    if(objVideo) {
        output = (
            <View style={{flex: 1}}>
                <Text>The Video Has Been Received and is saved in Downloads</Text>
                {/* <Video source={{uri: }}/> */}
            </View>
            
        )
    }

    else if(!videos) {
        output = (
            <Button
                title="Get Videos"
                color="#841584"
                onPress={() => updateVideos()}/>
        )
    }

    else output = <BoxSelect uri={videos.uri} setRes={() => setObjVideo(true)}/>

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                { output }

            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default App;