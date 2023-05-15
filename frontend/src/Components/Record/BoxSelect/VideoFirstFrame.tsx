import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import Video from 'react-native-video'

import styles from './boxSelectStyles'

interface VideoFrameProps {
    setValues: (x: number, y: number, w: number, h: number) => void
    uri: string
}

export default function VideoFirstFrame(props: VideoFrameProps) {
    const [p, setp] = useState(false)

    // gestures
    const [x, setx] = useState(-10)
    const [y, sety] = useState(-10)
    const [w, setw] = useState(0)
    const [h, seth] = useState(0)

    // states for bounding box
    const [absx, setabsx] = useState(-10)
    const [absy, setabsy] = useState(-10)
    const [absxf, setabsxf] = useState(0)
    const [absyf, setabsyf] = useState(0)

    const pan = Gesture.Pan()
        .onStart((g) => {
            setx(Math.round(g.x)) 
            sety(Math.round(g.y))
            setabsx(Math.round(g.absoluteX))
            setabsy(Math.round(g.absoluteY))
        })
        .onUpdate(g => {
            setabsxf(Math.round(g.absoluteX))
            setabsyf(Math.round(g.absoluteY))
            console.log("abs: ", absxf, ", ", absyf)
        })
        .onEnd((g) => {
            setw(Math.abs(Math.round(g.x)-x))
            seth(Math.abs(Math.round(g.y)-y))
            setabsxf(Math.round(g.absoluteX))
            setabsyf(Math.round(g.absoluteY))
            console.log("abs: ", absxf, ", ", absyf)
            props.setValues(x, y, Math.abs(Math.round(g.x)-x), Math.abs(Math.round(g.y)-y))
        })

    const boundingBoxStyle = {
        borderColor: "blue",
        borderWidth: 2,
        position: "absolute",
        top: absy,
        // top:0,
        // left:0,
        left: absx,
        width: absxf-absx,
        height: absyf-absy,
        zIndex: 50
    }

    let player: any

    return (
        <>
            <View style={styles.videoCont}>
                <View style={boundingBoxStyle}/>
                <GestureDetector gesture={pan} style={styles.videoCont}>
                        <Video source={{uri: props.uri}} ref={ref=>player=ref} controls={false} paused={p}
                            onBuffer={() => console.log("buffering")} onError={() => console.log("ERROR")}
                            style={styles.backgroundVideo} resizeMode="contain" onLoad={() => {
                                player.seek(0)
                                setp(true)
                        }}/>
                        
                </GestureDetector>
                {/* <Canvas style={{flex: 1}}>
                    <Path path={path}/> 
                </Canvas> */}
                {/* <Text style={{position: "relative", top: 20}}>x: {x}, y: {y}, w: {w}, h: {h}</Text> */}
            </View>
        </>
    )
}