import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        height: 50,
        marginTop: 10,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 2,
        overflow: 'hidden',
        padding: 10,
        flexDirection: 'row'
    },
    textItem: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
})