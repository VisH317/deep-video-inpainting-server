import { StyleSheet } from "react-native"  

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

export default styles