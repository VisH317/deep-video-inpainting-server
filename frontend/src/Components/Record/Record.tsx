import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text,View, Pressable } from 'react-native'
import Nav from '../Nav'
import videoURI from '../../data/video'
import { useAtom } from 'jotai'

import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { launchImageLibrary } from 'react-native-image-picker'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons/faFileUpload'

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
    console.log("devices: ", device)

    const [isRecording, setRec] = useState(false)
    const camera = useRef<Camera>(null)
    const [uri, setUri] = useAtom(videoURI)

    const updateVideos = async () => {
        const video = await getVideos()
        if(video===undefined) return
        setUri(video[0].uri)
        navigation.navigate("Select")
    }


    const startRecording = async () => {
        if(!isRecording) {
            if(camera.current===null) return
            await camera.current.startRecording({
                flash: 'auto',
                onRecordingFinished: vid => {
                    setUri(vid.path)
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
            <Camera style={styles.camera} device={device} video={true} ref={camera} isActive/>
            <Pressable style={styles.start} onPressOut={startRecording}/>
            <Pressable style={styles.upload} onPressOut={updateVideos}>
                <Text><FontAwesomeIcon icon={faFileUpload} color="white"/></Text>
                <Text>COMO ESTAS TU</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: "calc(100%-60px)",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0
    },
    start: {
        width: 20,
        height: 20,
        backgroundColor: "transparent",
        borderRadius: 10,
        border: "10px solid white",
        position: "absolute",
        // left: "calc(50%-10px)",
        top: "85%"
    },
    upload: {
        width: 20,
        height: 20,
        backgroundColor: "transparent",
        color: "white",
        position: "absolute",
        left: "calc(25%-10px)",
        top: "85%"
    }
})