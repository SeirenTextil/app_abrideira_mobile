import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        height: '100%',
        width: '100%',
        paddingTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        padding: 10
    },
    mainContainer: {
        backgroundColor: '#1d1d1d',
        height: '90%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
        borderRadius: 10,
        marginTop: 10,
        padding: 20,
    },
    imagem: {
        position: 'absolute',
        width: 150,
        height: 150,
        zIndex: 1000
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