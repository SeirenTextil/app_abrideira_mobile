import React, { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import TabProgramacao from "../../components/tabProgramacao/page";
import { useState } from "react";
import TabConsulta from "../../components/tabConsulta/page";

export default function Main() {
    const [screen, setScreen] = useState<"prog"|"cons">("prog")

    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Image style={styles.imagem} source={require('../../assets/Logo.png')} />
            </View>
            <View style={styles.containerMain}>
                {screen === 'prog' ?
                    <TabProgramacao/>
                :
                    <TabConsulta/>
                }
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.buttonFooter, {backgroundColor: screen === 'cons' ? '#f5f5f5' : '#2d2d2d'}]} onPress={() => setScreen('cons')}>
                    <Text style={[styles.textFooter, {color: screen === 'cons' ? '#222' : '#f5f5f5'}]}>Consulta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonFooter, {backgroundColor: screen === 'prog' ? '#f5f5f5' : '#2d2d2d'}]} onPress={() => setScreen('prog')}>
                    <Text style={[styles.textFooter, {color: screen === 'prog' ? '#222' : '#f5f5f5'}]}>Programação</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="light" />
        </View>
    )
}