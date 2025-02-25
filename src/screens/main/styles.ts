import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        height: '100%',
        width: '100%',
        gap: 8
    },
    footer: {
        zIndex: 100,
        height: '10%',
        width: '95%',
        backgroundColor: '#1d1d1d',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        gap: 5
    },
    buttonFooter: {
        width: '48%',
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    textFooter: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerMain: {
        height: '75%',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d1d',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10
    },
    containerTop: {
        height: '10%',
        width: '95%',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
    },
    imagem: {
        width: 100,
        height: 100,
        
    }
})