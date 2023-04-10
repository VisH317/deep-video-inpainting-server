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

export default function ImgStack() {
    return (
        <View style={styles.container}>
            <View style={styles.one}/>
            <View style={styles.two}/>
            <View style={styles.main}>
                <Text>CONTENT</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 300,
        position: "relative"
    },
    one: {
        position: "absolute",
        width: 297,
        height: 204,
        // left: "calc(50% - 148.5px)",
        // top: "calc(50% - 102px)",
        left: 148,
        backgroundColor: "#d9d9d9",
        borderRadius: 20
    },
    two: {
        position: "absolute",
        width: 241,
        height: 249,
        // left: "calc(50% - 120.5px)",
        // top: "calc(50% - 124.5px)",
        backgroundColor: "#b5b5b5",
        borderRadius: 20
    },
    main: {
        position: "absolute",
        width: "185px",
        height: "293px",
        // left: "calc(50% - 92.5px)",
        // top: "calc(50% - 146.5px)",
        backgroundColor: "#eee",
        borderRadius: 20
    }
})