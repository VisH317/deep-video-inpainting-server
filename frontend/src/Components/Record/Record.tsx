import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text,View, Pressable } from 'react-native'
import Nav from '../Nav'
import videoURI from '../../data/video'
import { useAtom } from 'jotai'

import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { launchImageLibrary } from 'react-native-image-picker'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons/faFileUpload'
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo'

async function getVideos() {
    const params = {
        mediaType: "video" as const
    }
    const videos = await launchImageLibrary(params)
    return videos.assets
}

export default function Record({ navigation }: any) {
    const devices = useCameraDevices('telephoto-camera')
    const device = devices.back
    // console.log("devices: ", device)

    const [isRecording, setRec] = useState(false)
    const camera = useRef<Camera>(null)
    const [uri, setUri] = useAtom(videoURI)

    const updateVideos = async () => {
        const video = await getVideos()
        if(video===undefined) return
        setUri(video[0].uri)
        console.log(video[0].uri)
        navigation.navigate("Select")
    }

    const [cameraPerm, setCameraPerm] = useState(false)

// Checks Mic and Video Permissions as soon as page loads
    useEffect(() => {
    checkPermissions();
    }, []);


    // Called in a useEffect to gain permissions
    const checkPermissions = async () => {
        // Request Permissions on component load
        await Camera.requestCameraPermission();
        await Camera.requestMicrophonePermission();
        // await requestPermission()

        const cameraPermission = await Camera.getCameraPermissionStatus();
        // setCameraPerm(cameraPermission)
        const microphonePermission = await Camera.getMicrophonePermissionStatus();
    };


    const startRecording = async () => {
        if(!isRecording) {
            if(camera.current===null) return
            await camera.current.startRecording({
                flash: 'auto',
                onRecordingFinished: vid => {
                    setUri(vid.path)
                    console.log(uri)
                    navigation.navigate("Select")
                },
                onRecordingError: err => console.log(err)
            })
            setRec(true)
        } else {
            if(camera.current===null) return
            await camera.current.stopRecording()
            setRec(false)
        }
    }

    if(device==null) return <Text>LOADING</Text>
    return (
        <View>
            <Camera style={styles.camera} device={device} video={true} ref={camera} isActive>
                <Text>HOLA</Text>
            </Camera>
            <View style={{flex: 1, flexDirection: "column-reverse", height: 635, width: "100%", position: "absolute", top: 0, left: 0}}>
            <View style={styles.btnContainer}>
                <Pressable style={styles.upload} onPressOut={updateVideos}>
                    <Text><FontAwesomeIcon icon={faFileUpload} color="black" size={25}/></Text>
                </Pressable>
                <Pressable style={styles.start} onPressOut={startRecording}><Text></Text></Pressable>
                <Pressable><FontAwesomeIcon icon={faInfo} color="black" size={25}/></Pressable>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: 635,
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        // borderColor: "black",
        // borderWidth: 50,
        color: "white"
    },
    btnContainer: {
        width: "100%",
        height: 100,
        borderColor: "black",
        // borderWidth: 5,
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
        alignItems: "center",
    },
    start: {
        width: 60,
        height: 60,
        backgroundColor: "transparent",
        borderRadius: 30,
        borderColor: "black",
        padding: 10,
        borderWidth: 5,
    },
    upload: {
        width: 20,
        height: 20,
        backgroundColor: "transparent",
        color: "black",
        // left: "calc(25%-10px)",
        // top: "85%"
    }
})