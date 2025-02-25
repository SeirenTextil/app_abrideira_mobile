export interface stepVoice {
    Situacao: string;
    Mensagem: string;
    Texto: string;
    TipoRetorno: string;
    Gaiola: string;
    Qtde: string;
    ChaveItem: string;
    Dados: DadosStepVoice;
}

export type DadosStepVoice = [key: string, {
    Nota: string;
    Cartao: string;
    Artigo: string;
    Peca: string;
    Compr: string;
    Peso: string;
    Gaiola: string;
    Conferido: string;
    ChaveItem: string;
}];