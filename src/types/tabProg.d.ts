export interface ListaDataProgramacao {
    Situcao: string;
    Mensagem: string;
    ListaFila: ListaFila;
}

export type ListaFila = [key: string, {
    Data: string;
}]

export interface ListaPecasData {
    Situcao: string;
    Mensagem: string;
    ListaFila: ListaPecas;
}

export type ListaPecas = [key: string, {
    CodCli: string;
    Cliente: string;
    Cartao: string;
    Entrada: string;
    TotalPecas: string;
    ASeparar: string;
    Programado: string;
    HoraSuper: string;
}]

export interface ItemProps {
    Data?: string;
    CodCli?: string;
    Cliente?: string;
    Cartao?: string;
    Entrada?: string;
    TotalPecas?: string;
    ASeparar?: string;
    Programad?: string;
    HoraSuper?: string;
}