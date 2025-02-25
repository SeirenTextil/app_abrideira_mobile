import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9f9f9f',
        height: '100%',
        width: '100%',
        paddingTop: 20,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        elevation: 1,
        borderRadius: 10
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10
    },
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