export const wordsGood = ['confirmar', 'confirmo', 'sim', 'confirmado', 'ok', 'peça Confirmada', 'yes', 'no'];
export const wordsBad = ['não confirmado', 'não', 'não confirmo',];

export interface keyWords {
    keyword: string[];
    action: (item?: string, situacao?: string) => { situacao: boolean, result?: string, message: string } | void;
}

export const keyWordsAction: keyWords[] = [
    //Reiniciar processo
    {
        keyword: ['reiniciar', 'parar processo', 'cancelar'],
        action: () => { return { situacao: true, result: '999', message: 'Processo Reiniciado' } }
    },

    //Confirmar peça na gaiola
    {
        keyword: [...wordsGood, ...wordsBad],
        action: (item, situacao) => {
            if (situacao === '0') {
                if (item && wordsGood.includes(item.toLocaleLowerCase())) {
                    return { situacao: true, result: '0', message: 'Peça confirmada na gaiola, Informe outra peça' }
                } else if (item && wordsBad.includes(item.toLocaleLowerCase())) {
                    return { situacao: false, result: '0', message: 'Peça não confirmada na gaiola' }
                }
            }
        }
    },

    //Fechar gaiola
    {
        keyword: [...wordsGood, ...wordsBad],
        action: (item, situacao) => {
            if (situacao === '1') {
                if (item && wordsGood.includes(item.toLocaleLowerCase())) {
                    return { situacao: true, result: '1', message: 'Gaiola confirmada, Informe outra peça' }
                } else if (item && wordsBad.includes(item.toLocaleLowerCase())) {
                    return { situacao: false, result: '1', message: 'Gaiola não confirmada' }
                }
            }
        }
    },

    //Confirmar nova gaiola
    {
        keyword: [...wordsGood, ...wordsBad],
        action: (item, situacao) => {
            if (situacao === '2') {
                if (item && wordsGood.includes(item.toLocaleLowerCase())) {
                    return { situacao: true, result: '2', message: 'Nova gaiola confirmada' }
                } else if (item && wordsBad.includes(item.toLocaleLowerCase())) {
                    return { situacao: false, result: '2', message: 'Confirmação negada' }
                }
            }
        }
    },

    //Confirmar alteração da gaiola
    {
        keyword: ['altera gaiola', 'alterar gaiola', 'alterar a gaiola', 'altera a gaiola'],
        action: () => {
            return { situacao: true, result: '3', message: 'Olá, sou a Assistente Virtual da Seiren, meu nome é Aya, estou aqui para facilitar a sua vida, porem vou estar mais presente na área da Separação. Venha me ver!' }
        }
    },

    //Repetir gaiola
    {
        keyword: ['repetir gaiola', 'repete gaiola', 'repete a gaiola', 'repetir a gaiola'],
        action: (item) => {
            return { situacao: true, result: '4', message: item || '' }
        }
    },

    //Falar comando novamente
    {
        keyword: ['repetir comando', 'repetir o comando', 'repete comando', 'repete o comando'],
        action: () => {
            return { situacao: true, result: '5', message: 'Status' }
        }
    },

    //Falar sobre a Aya
    {
        keyword: ['se apresente', 'de presente', 'presente'],
        action: () => {
            return { situacao: true, result: '6', message: 'Olá, sou a Assistente Virtual da Seiren, meu nome é Aya, estou aqui para facilitar a sua vida, porem vou estar mais presente na área da Separação. Venha me ver!' }
        }
    },

    //Desligar reconhecimento de voz
    {
        keyword: ['retornar a tela', 'retornar tela'],
        action: () => {
            return { situacao: true, result: '7', message: 'Retornando para a tela anterior' }
        }
    },
];

export const processKeyWords = (
    text: string,
    validTipo: string,
    onSucess: (result: { situacao: boolean, result?: string, message: string }) => void
): void => {
    keyWordsAction.forEach(({ keyword, action }) => {
        const foundKeyWords = keyword.find((kw: string) => text.toLocaleLowerCase().includes(kw.toLocaleLowerCase()));

        if (foundKeyWords) {
            const result = action(text, validTipo);
            if (result) {
                onSucess(result);
            }
        }
    });
};