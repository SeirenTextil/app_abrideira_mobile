import React, { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ListaHistorico } from "../../types/tabHistorico";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

export default function TabHistorico(list: ListaHistorico) {
    const [lista, setLista] = useState<ListaHistorico[]>([]);

    function atualizaLista(novoDados: ListaHistorico) {
        setLista((prevLista) => [novoDados, ...prevLista.slice(0, 4)])
    }

    const Item = ({ Data, Gaiola, Peca }: ListaHistorico) => {
        return (
            <View style={styles.item}>
                <>
                    <Text style={styles.textItem}>{Data}</Text>
                    <Text style={styles.textItem}>Gaiola: {Gaiola}</Text>
                    <Text style={styles.textItem}>Peça: {Peca}</Text>
                </>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Histórico </Text>

            <FlatList
                data={lista}
                keyExtractor={(item) => item.Peca}
                renderItem={({ item }) => (
                    <Item Data={item.Data} Gaiola={item.Gaiola} Peca={item.Peca} />
                )}
            />
        </View>
    )
}