import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetRefProps } from "../../components/buttonSheet/page";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import TabHistorico from "../../components/tabHistorico/page";
import StepIndicator from "../../components/progress/page";
import { useNavigation } from "@react-navigation/native";
import { DadosStepVoice, stepVoice } from "../../types/separacao";
import { API } from "../../utils/api/API";
import { Speaker, StartBluetooth } from "./voice/voice";
//@ts-ignore
import { startVoiceRecognition, stopVoiceRecognition, useVoiceRecognition } from 'react-native-microphone';
import { processKeyWords, wordsGood } from "../../utils/keywords/keyWords";
import { comandoApresentar, comandoInformaGaiola, comandoInformarEtapa } from "./features";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { rootStackParamList } from "../../types/rootStackParamList";
import { ListaHistorico } from "../../types/tabHistorico";

type Step = 'listening' | 'confirm' | 'finish';
type Context = 'piece' | 'cage';

type SepracaoProps = NativeStackScreenProps<rootStackParamList, 'Separacao'>;

export default function Separacao({ route }: SepracaoProps) {
    const ref = useRef<BottomSheetRefProps>(null);
    const result = useVoiceRecognition();
    const navigation = useNavigation();
    const [voiceResult, setVoiceResult] = useState<string>("");
    const [step, setStep] = useState<Step>('listening');
    const [currentContext, setCurrentContext] = useState<Context>('piece');
    const [foundPieces, setFoundPieces] = useState<DadosStepVoice[]>([]);
    const [dataPecas, setDataPecas] = useState<stepVoice>();
    const [gaiolaDita, setGaiolaDita] = useState<string>("");
    const [chaveItem, setChaveItem] = useState<string>("");
    const [pecaDita, setPecaDita] = useState<string>("");
    const [alterarGaiolaEtapa, setAlterarGaiolaEtapa] = useState(0);
    const [cartao, setCartao] = useState<string>("");
    const [oldGaiola, setOldGaiola] = useState<string>("");
    const [newGaiola, setNewGaiola] = useState<string>("");
    const [listaHistorico, setListaHistorico] = useState<ListaHistorico>()
    
    let codCli = route.params.codCli;
    let dtEntrada = route.params.dtEntrada;

    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);

    useEffect(() => {
        procuraPeçaAPI('');
    }, []);

    useEffect(() => {
        StartBluetooth();
        startVoiceRecognition();
    }, []);


    useEffect(() => {
        setVoiceResult(result);
        conversation(result);
    }, [result]);

    useEffect(() => {
        if (step === 'confirm') {
            conversation(voiceResult);
        }
    }, [step])

    useEffect(() => {
        if (gaiolaDita) {
            setStep3(true);
        }
    }, [gaiolaDita])

    function conversation(text: string) {
        setFoundPieces([]);
        processKeyWords(text, '', (result) => {
            if (result.situacao) {
                switch (result.result) {
                    case "999":
                        Speaker(result.message);
                        return restart();
                    case "3":
                        return comandoAlterGaiola("");
                    case "4":
                        return comandoInformaGaiola(gaiolaDita, step);
                    case "5":
                        return comandoInformarEtapa(step);
                    case "6":
                        return comandoApresentar(result.message);
                    case "7":
                        return navigation.goBack();
                }
                return;
            }
        })

        if (alterarGaiolaEtapa > 0) {
            comandoAlterGaiola(text);
            return;
        }

        const numberPiece = text.replace(/\D/g, '');

        switch (step) {
            case 'listening':
                if (!gaiolaDita && numberPiece) {
                    if (currentContext === 'piece') {
                        procuraPeçaAPI(numberPiece);
                        setGaiolaDita('');
                    } else if (currentContext === 'cage') {
                        const numberCage = text.match(/\b([DG]\d+|\d+)\b/gi);
                        if (numberCage) {
                            setGaiolaDita(numberCage[0]);
                            setStep('confirm')
                        }
                    }
                }
                break;
            case 'confirm':
                if (gaiolaDita) {
                    Speaker(`Confirmar gaiola ${gaiolaDita}?`, () => {
                        setStep('finish');
                        setStep3(true);
                    })
                } else if (gaiolaDita && dataPecas?.TipoRetorno === '1') {
                    setStep('finish');
                }
                break;
            case 'finish':
                if (dataPecas?.TipoRetorno) {
                    const typeReturn = dataPecas?.TipoRetorno;

                    processKeyWords(text, typeReturn, (resultFinish) => {
                        if (resultFinish.situacao) {
                            console.log('Resultado do finish' + resultFinish.result);

                            switch (resultFinish.result) {
                                case '0':
                                    if (dataPecas) {
                                        handleInformaGaiola(gaiolaDita, dataPecas.ChaveItem);
                                    }
                                    Speaker(resultFinish.message);
                                    restart();
                                    break;
                                case '1':
                                    if (resultFinish.result) {
                                        if (dataPecas) {
                                            console.log('Entrou no InformaGaiola');

                                            handleInformaGaiola(dataPecas.Gaiola, dataPecas.ChaveItem);
                                        }
                                    }
                                    return Speaker(resultFinish.message, () => restart);
                                case '2':
                                    if (resultFinish.result) {
                                        if (dataPecas) {
                                            console.log('Entrou no FechaGaiola');

                                            handleFecharGaiola(dataPecas.Gaiola, dataPecas.ChaveItem);
                                        }
                                    }
                                    break;
                            }
                        }
                    });
                }
                break;
        }
    }

    function typeStepPiece(typeStep: string, textToSpeak?: string) {
        step
        switch (typeStep) {
            case '0':
                console.log('Entrou no cage');

                setCurrentContext('cage');
                break;
            case '1':
                if (textToSpeak) {
                    Speaker(textToSpeak, () => {
                        setStep('finish');
                    });
                } else {
                    setStep('finish');
                }
                break;
            case '2':
                if (textToSpeak) {
                    Speaker(textToSpeak, () => {
                        setStep('finish');
                    });
                } else {
                    setStep('finish');
                }
                break;
            case '3':
                if (textToSpeak) {
                    Speaker(textToSpeak, restart);
                }
                break;
            case '4':
                if (textToSpeak) {
                    Speaker(textToSpeak, restart);
                }
                break;
        }
    }

    function comandoAlterGaiola(resposta: string) {
        if (alterarGaiolaEtapa === 0) {
            Speaker("Informe o número do cartão!");
            setAlterarGaiolaEtapa(1);
        } else if (alterarGaiolaEtapa === 1) {
            setCartao(resposta);
            Speaker("Informe a gaiola anterior!");
            setAlterarGaiolaEtapa(2);
        } else if (alterarGaiolaEtapa === 2) {
            setOldGaiola(resposta);
            Speaker("Informe a nova gaiola!");
            setAlterarGaiolaEtapa(3);
        } else if (alterarGaiolaEtapa === 3) {
            setNewGaiola(resposta);
            Speaker(`Confirmar cartão ${cartao} da gaiola ${oldGaiola} ir para a gaiola ${resposta}?`);
            setAlterarGaiolaEtapa(4);
        } else if (alterarGaiolaEtapa === 4) {
            if (wordsGood.includes(resposta.toLowerCase())) {
                alterarGaiolaAPI(cartao, oldGaiola, newGaiola);
                restart();
                return;
            } else {
                Speaker("Cancelado!");
            }
            setAlterarGaiolaEtapa(0);
        }
    }


    function procuraPeçaAPI(peca: string) {
        API.post("AbrideiraDesenroladeira/chama-dll?deviceName=TBT-SEPARACAO", {
            nomeDll: "InformaPeca",
            parametros: [`${codCli}|${dtEntrada}|${peca}`],
        }).then((response) => {

            if (!response.data || !response.data.data) {
                throw new Error("Resposta inválida da API");
            }

            const data: stepVoice = response.data.data ?? {};
            setDataPecas(data);

            if (data.Situacao === '1') {
                Speaker(data.Texto, restart);
            } else if (data.Situacao === '0') {
                setStep2(true);
                if (data.Dados) {
                    setFoundPieces(Object.entries(data.Dados) as DadosStepVoice[]);
                }
                setChaveItem(data.ChaveItem ?? "");
                Speaker(data.Texto ?? "");
                setPecaDita(peca);

                console.log("Dados recebidos:", data);

                if (data.Dados && Object.keys(data.Dados).length > 1) {
                    console.log("Entrando no mais de uma peça");
                    setPecaDita("");
                    setCurrentContext("piece");
                } else if (data.Situacao === "0") {
                    typeStepPiece(data.TipoRetorno ?? "", data.Texto);
                    setGaiolaDita(data.Gaiola);
                }
            }
        }).catch((error) => {
            Speaker("Erro ao consultar a API Informa Peça");
            console.error("Erro na API:", error);
        });
    }


    function informaGaiolaAPI(gaiola: string, chave: string, fecharGaiola: 'S' | 'N') {
        if (gaiola && gaiola != null && chave != null && chave != undefined && gaiola != undefined) {
            API.post('AbrideiraDesenroladeira/chama-dll?deviceName=TBT-SEPARACAO', {
                nomeDll: "InformaGaiola",
                parametros: [`${codCli}|${dtEntrada}|${chave}|${gaiola}|${fecharGaiola}`],
            }).then((response) => {
                const data = response.data.data;
                setGaiolaDita(data.Gaiola);

                console.log(data);

                if (data.Situacao === '0') {

                    const novoHistorico = {
                        Peca: `Peça: ${pecaDita}`,
                        Gaiola: `Gaiola: ${gaiolaDita}`,
                        Data: formatoHora(new Date())
                    }

                    setListaHistorico(novoHistorico);
                } else if (data.Situacao === '1') {
                    Speaker(data.Mensagem, () => restart);
                    return;
                }

            }).catch((err) => {
                console.error("Error ao consultar a API:", err);
                Speaker("Erro ao consultar a API Informa Gaiola");
            }).finally(() => {
                restart();
            })
        }
    }

    function alterarGaiolaAPI(cartao: string, oldGaiola: string, newGaiola: string) {
        API.post('AbrideiraDesenroladeira/chama-dll?deviceName=TBT-SEPARACAO', {
            nomeDll: 'AlteraGaiola',
            parametros: [`${cartao}|${oldGaiola}|${newGaiola}`]
        }).then((response) => {
            const data = response.data.data;
            console.log(data);

            if (data.Situacao === '1') {
                Speaker(data.Mensagem);
            } else if (data.Situacao === '0') {
                Speaker(data.Mensagem);
            }
        }).catch((error) => {
            Speaker('Erro ao alterar a gaiola');
            console.error('Erro na API:', error);
        })
    }

    function handleFecharGaiola(gaiola: string, chave: string) {
        informaGaiolaAPI(gaiola, chave, 'S');
    }

    function handleInformaGaiola(gaiola: string, chave: string) {
        informaGaiolaAPI(gaiola, chave, 'N');
    }

    const formatoHora = (date: Date) => {
        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        const segundos = String(date.getSeconds()).padStart(2, '0');

        return `${horas}:${minutos}:${segundos}`;
    };

    function restart() {
        setVoiceResult("");
        setStep("listening");
        setCurrentContext("piece");
        setFoundPieces([]);
        setDataPecas(undefined);
        setGaiolaDita("");
        setChaveItem("");
        setPecaDita("");
        setAlterarGaiolaEtapa(0);
        setCartao("");
        setOldGaiola("");
        setNewGaiola("");
        setStep2(false);
        setStep3(false);
    }

    const Item = ({ ChaveItem, Artigo, Gaiola, Peca }: {ChaveItem: string, Gaiola: string, Peca: string, Artigo: string}) => {
            return (
                <TouchableOpacity style={styles.item} onPress={() => {procuraPeçaAPI(ChaveItem)}}>
                    <>
                        <Text style={styles.textItem}>{Artigo}</Text>
                        <Text style={styles.textItem}>Gaiola: {Gaiola}</Text>
                        <Text style={styles.textItem}>Peça: {Peca}</Text>
                    </>
                </TouchableOpacity>
            )
        }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Image style={styles.imagem} source={require('../../assets/Logo.png')} />

                <View style={styles.mainContainer}>
                    {foundPieces.length !== 0 ? 
                        <FlatList 
                            data={foundPieces}
                            keyExtractor={([key]) => key}
                            renderItem={({ item: [,item] }) => <Item Artigo={item.Artigo} ChaveItem={item.ChaveItem} Gaiola={item.Gaiola} Peca={item.Peca}/>}
                        />
                    :
                        <StepIndicator gaiola={gaiolaDita} peca={pecaDita} step1={true} step2={step2} step3={step3}/>
                    }
                </View> 

                <BottomSheet ref={ref}>
                    <TabHistorico Data={listaHistorico?.Data ?? ''} Gaiola={listaHistorico?.Gaiola ?? ''} Peca={listaHistorico?.Peca ?? ''}/>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
} 