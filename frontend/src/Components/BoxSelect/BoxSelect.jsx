import React, { useState } from 'react'
import RNFetchBlob from 'rn-fetch-blob'

import VideoFirstFrame from './VideoFirstFrame'
import styles from './boxSelectStyles'

function BoxSelect({ navigation, route }) {
    const [x, setx] = useState("")
    const [y, sety] = useState("")
    const [w, setw] = useState("")
    const [h, seth] = useState("")

    function onSubmit(event) {
        const formdata = new FormData()
        formdata.append('file', {uri: route.params.uri, type: "video/mp4", name: "file.mp4"})
        formdata.append('x', x)
        formdata.append('y', y)
        formdata.append('w', w)
        formdata.append('h', h)
        RNFetchBlob.fetch("POST", "http://10.0.2.2:8000/video", 
            {
                "content-type": "multipart/form-data"
            },
            [
                {name: 'file', data: RNFetchBlob.wrap(route.params.uri), filename: 'vid.mp4'},
                {name: 'x', data: x},
                {name: 'y', data: y},
                {name: 'w', data: w},
                {name: 'h', data: h},
            ]
        ).then(res => {
            route.params.setRes(res)
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
        }).then(res => route.params.setRes(res))
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
            <VideoFirstFrame uri={route.params.uri} setValues={set}/>
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

export default BoxSelect