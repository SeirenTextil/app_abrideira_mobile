import { Alert, PermissionsAndroid, Platform } from "react-native";
// @ts-ignore
import { startBluetoothSco, startVoiceRecognition} from 'react-native-microphone';
import * as Speech from 'expo-speech';

export async function StartBluetooth() {
    try {
        await requestPermission();
        if (startBluetoothSco) {
            await startBluetoothSco();
            console.log("Connecting to Bluetooth");
            
        }
    } catch (error) {
    }
}

export function StartSpeech() {
    StartBluetooth();
    startVoiceRecognition();
}

export function Speaker(texto: string, onDone?: () => void) {
    Speech.speak(texto, {
        language: 'pt-BR',
        _voiceIndex: 1,
        pitch: 1,
        rate: 1.5,
        onDone: onDone,
    })
}

async function requestPermission() {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])
    }
}