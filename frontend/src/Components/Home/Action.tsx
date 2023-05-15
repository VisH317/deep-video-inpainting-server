import React, { useState } from 'react'
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
    TouchableNativeFeedback
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

interface ActionProps {
    title: string,
    desc: string,
    onClick: string
}

export default function Action(props: ActionProps) {

    const [press, setPress] = useState(false)
    const pressIn = () => setPress(true)
    const pressOut = () => setPress(false)

    return (
        <Pressable style={styles.container} onPressIn={pressIn} onPressOut={pressOut}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(
                "#cbd5e1",
                true
            )}>
                <View style={styles.innerContainer}>
                <View style={styles.text}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc}</Text>
                </View>
                <View style={styles.go}>
                    <FontAwesomeIcon icon={faArrowRight} color="#3b82f6" size={36}/>
                </View>
                </View>
            </TouchableNativeFeedback>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        borderRadius: 20,
        backgroundColor: "transparent",
        padding: 5,
        zIndex: 100,
        overflow: "hidden"
    },
    innerContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "transparent",
        padding: 10,
        zIndex: 100
    },
    containerHover: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        padding: 10
    },
    go: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        color: "#334155",
        fontWeight: "400"
    },
    desc: {
        fontSize: 16,
        color: "#94a3b8",
        fontWeight: "300"
    }
})