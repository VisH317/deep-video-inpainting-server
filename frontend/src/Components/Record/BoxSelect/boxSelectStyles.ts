import { StyleSheet } from "react-native"  

const styles = StyleSheet.create({
    backgroundVideo: {
        zIndex: 0,
        height: 635,
        flex: 1,
        width: "100%",
        borderColor: "black",
        borderWidth: 5
    },
    button: {
        zIndex: 3,
        backgroundColor: "#4CAF50",
        width: "50%",
        textAlign: 'center',
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    videoCont: {
        position: 'absolute',
        height: 635,
        zIndex: 0,
        width: "100%",
        alignItems: 'center',
        borderColor: 'black',
        flex: 1,
        display: "flex",

    },
    btnContainer: {
        flex: 1, 
        flexDirection: "column-reverse", 
        height: 635, 
        width: "100%", 
        position: "absolute", 
        top: 0, 
        left: 0
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