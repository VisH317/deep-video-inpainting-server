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
    Pressable
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder"
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome"

interface NavProps {
    active: number
}

export default function Nav(props: NavProps) {
    return (
        <View style={styles.nav}>
            <NavItem icon={0} isActive={props.active===0}/>
            <NavItem icon={1} isActive={props.active===1}/>
            <NavItem icon={2} isActive={props.active===2}/>
        </View> 
    )
}

interface NavItemProps {
    icon: number,
    isActive: boolean,
    text?: string
}

function NavItem(props: NavItemProps) {
    return (
        <View style={navItemStyles.container}>
            <FontAwesomeIcon icon={props.icon===1 ? faHome : props.icon===2 ? faCamera : faFolder} style={props.isActive ? navItemStyles.active : navItemStyles.inactive }/>
            <Text>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        position: "absolute",
        width: "100%",
        height: "60px",
        bottom: "0px",
        left: "0px",
        backgroundColor: "#2e2e2e",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

const navItemStyles = StyleSheet.create({
    active: {
        color: "#ff8c67"
    },
    inactive: {
        color: "#979797"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
})