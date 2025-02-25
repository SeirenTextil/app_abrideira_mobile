export interface ClientSepara {
    Situacao: string,
    Mensagem: string,
    ListaCli: ListaCli;
}

export type ListaCli = [key: string, {
    CodCli: string,
    Fantasia: string
}]

export interface NotaSeparar {
    Situacao: string,
    Mensagem: string,
    ListaNota: ListaNotas;
}

export type ListaNotas = [key: string, {
    Data: string,
    Total: string,
    Separar: string
}]

export interface ItemProps {
    Data?: string;
    Separar?: string;
    Total?: string;
    Fantasia?: string;
    CodCli?: string;
}