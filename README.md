# StepVoice

## Visão Geral
O **StepVoice** é um sistema de reconhecimento de voz desenvolvido para auxiliar no controle de processos industriais. Ele permite que operadores realizem ações por meio de comandos de voz, reconhecendo palavras-chave e respondendo com base no contexto.

## Como Funciona
O sistema trabalha de forma simples e eficiente:
1. O usuário fala um comando.
2. O sistema compara as palavras faladas com uma lista de palavras-chave pré-definidas.
3. Se houver uma correspondência, a ação correspondente é executada.
4. O sistema pode fornecer respostas de confirmação ou erro conforme necessário.

## Estrutura do Sistema
O **StepVoice** é composto por três partes principais:

### 1. Palavras-chave e Ações
As palavras-chave são agrupadas em categorias e associadas a funções específicas.

#### **Grupos de Palavras-chave e Suas Ações**
- **Reiniciar Processo**: "reiniciar", "parar processo", "cancelar"
  - Reinicia o processo.
- **Confirmar Peça na Gaiola**: Reconhece palavras de aceitação (ex: "confirmado") e rejeição (ex: "não confirmado")
  - Confirma ou rejeita a peça na gaiola.
- **Fechar Gaiola**: Confirma o fechamento da gaiola com base em respostas positivas ou negativas.
- **Confirmar Nova Gaiola**: Permite confirmar ou rejeitar a nova gaiola.
- **Repetir Gaiola**: "repetir gaiola", "repete a gaiola"
  - Reenvia a informação da gaiola.
- **Falar Comando Novamente**: "repetir comando", "status", "comando"
  - Repete o último comando.
- **Falar Sobre a Aya**: "se apresente", "de presente", "presente"
  - A assistente virtual responde apresentando-se.
- **Desligar Reconhecimento de Voz**: "retornar a tela", "retornar tela"
  - Encerra o reconhecimento de voz e retorna à tela anterior.

Essas palavras são processadas pela função `processKeyWords`, que verifica se alguma delas está presente no comando falado e aciona a ação correspondente.

### 2. Processamento de Comandos
O sistema conta com funções que geram respostas adequadas ao contexto do processo:

- **`comandoInformarGaiola(gaiola: string, step: string)`**: 
  - Se não houver gaiola informada, informa o status apropriado.
  - Caso contrário, confirma qual gaiola está sendo utilizada.

- **`comandoInformarEtapa(step: string)`**: 
  - Indica em que etapa do processo o usuário está.
  - Exemplo: "Estamos na etapa de informar a peça".

- **`comandoApresentar(text: string)`**: 
  - Permite que a assistente virtual fale qualquer mensagem necessária.

### 3. Classificação de Respostas
O **StepVoice** reconhece respostas positivas e negativas para tornar a interação mais natural:

- **Palavras Positivas (`wordsGood`)**: "confirmar", "confirmo", "sim", "confirmado", "ok", "yes", "peça confirmada"
- **Palavras Negativas (`wordsBad`)**: "não confirmado", "não", "não confirmo"

Essas palavras são usadas para validar ações como confirmação ou rejeição de comandos.

## Fluxo de Execução
### Exemplo de Uso
1. O operador fala: **"Confirmar"**.
2. O sistema verifica se "confirmar" está na lista de palavras-chave.
3. Como a palavra faz parte do grupo `wordsGood`, o sistema interpreta como uma confirmação.
4. A função correspondente é chamada, e o sistema retorna a resposta apropriada.

Se o operador falasse **"Não confirmo"**, o sistema verificaria que essa palavra está na lista `wordsBad`, e a resposta seria negativa.

## Conclusão
O **StepVoice** melhora a interação humano-máquina permitindo comandos de voz intuitivos. A separação lógica em palavras-chave, ações e respostas permite fácil adaptação a diferentes necessidades no processo industrial.

