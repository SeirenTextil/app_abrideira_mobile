import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        height: 70,
        marginTop: 10,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 2,
        padding: 10,
        flexDirection: 'row'
    },
    textItem: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        textAlign: 'center'
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});