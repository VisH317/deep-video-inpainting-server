import React from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

interface ActionProps {
    title: string,
    desc: string,
}

export default function Action(props: ActionProps) {
    return (
        <Pressable style={styles.container}>
            <View style={styles.text}>
                <Text>{props.title}</Text>
                <Text>{props.desc}</Text>
            </View>
            <View style={styles.go}>
                <FontAwesomeIcon icon={faArrowRight} color="white"/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        borderRadius: 20,
        backgroundColor: "transparent"
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
    }
})