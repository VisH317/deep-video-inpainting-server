import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'

import styles from './boxSelectStyles'


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

export default VideoFirstFrame