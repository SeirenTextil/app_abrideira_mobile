import { Speaker } from "./voice/voice";

export function comandoInformaGaiola(gaiola: string, step: string) {
    if (!gaiola) {
        Speaker(step === 'listening' ? 'Ainda não está na etapa de informar a gaiola' : 'Gaiola ainda não informada!');
    } else {
        Speaker(`Gaiola ${gaiola}`);
    }
}

export function comandoInformarEtapa(step: string) {
    switch (step) {
        case 'listening':
            Speaker('Estamos na etapa informar a peça');
            break;
        case 'comfirm':
            Speaker('Estamos na etapa de informar a gaiola');
            break;
        case 'finish':
            Speaker('Estamos na etapa de confirmar a peça na gaiola');
            break;
    }
}

export function comandoApresentar(text: string) {
    Speaker(text);
}