import React, { useEffect, useState } from "react"
import { ItemProps, ListaDataProgramacao, ListaFila, ListaPecas, ListaPecasData } from "../../types/tabProg";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { API } from "../../utils/api/API";

type RootStackParamList = {
    Separacao: { codCli: string; dtEntrada: string };
};

export default function TabProgramacao() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [listData, setListaData] = useState<ListaFila[]>([]);
    const [listaPecaData, setListaPecaData] = useState<ListaPecas[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataTime, setDataTime] = useState<string>('')

    useEffect(() => {
        filaSupPrep()
    }, [])

    useEffect(() => {
        if (dataTime) {
            getFilaSupPrep();
        }
    }, [dataTime]);

    function filaSupPrep() {
        setIsLoading(true);
        API.post('AbrideiraDesenroladeira/chama-dll?deviceName=APP-SEPARACAO', {
            nomeDll: 'FilaSupPrep',
            parametros: ['']
        }).then((response) => {
            const data: ListaDataProgramacao = response.data.data;
            const lista = Object.entries(data.ListaFila) as ListaFila[];
            setListaData(lista);
        }).catch((error) => {
            console.error(error);
            Alert.alert('Error', error.message);
            return;
        }).finally(() => {
            setIsLoading(false);
        })
    }

    function getFilaSupPrep() {
        setIsLoading(true);
        API.post('AbrideiraDesenroladeira/chama-dll?deviceName=APP-SEPARACAO', {
            nomeDll: 'DetFilaSupPrep',
            parametros: [dataTime]
        }).then((response) => {
            const data: ListaPecasData = response.data.data;
            console.log(data);
            const lista = Object.entries(data.ListaFila) as ListaPecas[];
            setListaPecaData(lista);
        }).catch((error) => {
            console.error(error);
            Alert.alert('Error', error.message);
            return;
        }).finally(() => {
            setIsLoading(false);
        })
    }

    function goToSeparacao(codClie: string, dtEntrada: string) {
        if (codClie && dtEntrada) {
            navigation.navigate('Separacao', { codCli: codClie, dtEntrada: dtEntrada });
        }
    }

    const Item = ({ Data, CodCli, Cliente, Cartao, Entrada, TotalPecas, ASeparar, Programad, HoraSuper }: ItemProps) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => {!dataTime && Data ? setDataTime(Data.split(' ').slice(0, 2).join(' ')) : CodCli && Entrada && goToSeparacao(CodCli, Entrada)}}>
                {Data && <Text style={styles.textItem}>{Data}</Text>}
                {!Data &&
                    <>
                        <Text style={[styles.textItem, {width: '30%'}]}>{Cliente}</Text>
                        <Text style={[styles.textItem, {width: '20%'}]}>{Cartao}</Text>
                        <Text style={[styles.textItem, {width: '10%'}]}>{TotalPecas}</Text>
                        <Text style={[styles.textItem, {width: '10%'}]}>{ASeparar}</Text>
                    </> 
                }
            </TouchableOpacity>
        )
    }

    return (
        <>
            {
                isLoading && <ActivityIndicator size='large' color="#fff" />
            }
            {
                !isLoading
                &&
                <View>
                    {dataTime ? (
                        <>
                            <View style={styles.containerTitle}>
                                <Text style={[styles.textTitle, {width: '25%'}]}>Cliente</Text>
                                <Text style={[styles.textTitle, {width: '20%'}]}>Cartão</Text>
                                <Text style={[styles.textTitle, {width: '10%'}]}>Total</Text>
                                <Text style={[styles.textTitle, {width: '15%'}]}>Separar</Text>
                            </View>
                            <FlatList
                                data={listaPecaData}
                                keyExtractor={([key]) => key}
                                renderItem={({ item: [, item] }) => {
                                    return <Item CodCli={item.CodCli} Cartao={item.Cartao} ASeparar={item.ASeparar} Cliente={item.Cliente} Entrada={item.Entrada} HoraSuper={item.Entrada} Programad={item.Programado} TotalPecas={item.TotalPecas} />;
                                }}
                            />
                        </>
                    ) : (
                        <FlatList
                            data={listData}
                            keyExtractor={([key]) => key}
                            renderItem={({ item: [, item] }) => {
                                return <Item Data={item.Data} />;
                            }}
                        />
                    )}
                </View>
            }
        </>
    )
}