import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rootStackParamList } from "../../types/rootStackParamList";
import { useEffect, useState } from "react";
import { ClientSepara, ItemProps, ListaCli, ListaNotas, NotaSeparar } from "../../types/tabConsulta";
import { API } from "../../utils/api/API";
import React, { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "./styles";

export default function TabConsulta() {

    const navigation = useNavigation<NavigationProp<rootStackParamList>>();
    const [data, setData] = useState<ListaCli[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [listNota, setListaNota] = useState<ListaNotas[]>([]);
    const [client, setClient] = useState('')

    useEffect(() => {
        getCliente();
    }, [])

    function getCliente() {
        setIsLoading(true);
        API.post('AbrideiraDesenroladeira/chama-dll?deviceName=APP-SEPARACAO', {
            nomeDll: 'ClienteSeparar',
            parametros: ['']
        }).then(response => {
            const clienteSepara: ClientSepara = response.data.data;
            if (clienteSepara.ListaCli && typeof clienteSepara.ListaCli === 'object') {
                const listaClient = Object.entries(clienteSepara.ListaCli) as ListaCli[];
                setData(listaClient);
            } else {
                Alert.alert('Error', 'ListaCli está indefinido ou não é um objeto');
            }
        }).catch((error) => {
            console.error(error);
            Alert.alert('Error', error.message || 'Erro desconhecido');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    function getPieceClient(client: string) {
        setIsLoading(true);
        setClient(client);
        API.post('AbrideiraDesenroladeira/chama-dll?deviceName=APP-SEPARACAO', {
            nomeDll: 'NotasSeparar',
            parametros: [client]
        }).then((result) => {
            const data: NotaSeparar = result.data.data;
            if (data.ListaNota && typeof data.ListaNota === 'object') {
                const dataCurrent = Object.entries(data.ListaNota) as ListaNotas[];
                setListaNota(dataCurrent);
            } else {
                Alert.alert('Error', 'ListaNotas está indefinido ou não é um objeto');
            }
        }).catch((error) => {
            Alert.alert('Error', error.message);
            console.error(error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    function goToSeparacao(codClie: string, dtEntrada: string) {
        if (codClie && dtEntrada) {
            navigation.navigate('Separacao', { codCli: codClie, dtEntrada: dtEntrada });
        }
    }

    const Item = ({ Data, Fantasia, Separar, Total, CodCli }: ItemProps) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { Fantasia ? CodCli && getPieceClient(CodCli) : Data && goToSeparacao(client, Data) }}>
                {CodCli && <Text style={styles.textItem}>{Fantasia}</Text>}
                {!CodCli &&
                    <>
                        <Text style={[styles.textItem, { width: '30%' }]}>{Data}</Text>
                        <Text style={[styles.textItem, { width: '20%' }]}>{Separar}</Text>
                        <Text style={[styles.textItem, { width: '10%' }]}>{Total}</Text>
                    </>
                }
            </TouchableOpacity>
        )
    }


    return (
        <>
            {
                isLoading && <ActivityIndicator color={'#fff'} size={'large'} />
            }
            {
                !isLoading &&
                <View>
                    {
                        listNota.length > 0 ?
                            <FlatList
                                data={listNota}
                                keyExtractor={([key]) => key}
                                renderItem={({ item: [, item] }) => {
                                    return (
                                        <Item Data={item.Data} Separar={item.Separar} Total={item.Total} />
                                    )
                                }}
                            />
                            :
                            <FlatList
                                data={data}
                                keyExtractor={([key]) => key}
                                renderItem={({ item: [, item] }) => {
                                    return (
                                        <Item Fantasia={item.Fantasia} CodCli={item.CodCli} />
                                    )
                                }}
                            />
                    }
                </View>
            }
        </>
    )
}