---
title: Implementando uma Tela de Feedback em React Native
slug: implementando-uma-tela-de-feedback-em-react-native
date: '2020-10-28T20:56:13.714Z'
description: 'Tutorial de React Native para iniciantes: crie uma tela de feedback em que um slider muda o emoji, o texto e a cor de fundo conforme a avaliação do usuário.'
tags:
  - react-native
  - beginner
  - tutorial
  - feedback
  - react
lang: pt
translation: implementing-a-feedback-screen-in-react-native
---

Outro dia, eu estava navegando no Pinterest/Behance e, de repente, encontrei uma tela de feedback super legal desenhada por [Urvashi Jain](https://www.behance.net/urvashi_j). Por coincidência, meu time estava trabalhando em um app no qual íamos desenvolver uma tela de feedback com a mesma abordagem, em que um emoji muda de acordo com a nota do usuário. Como era algo divertido de desenvolver, pensei em descrever o processo como um tutorial, porque acredito que dá para aprender como técnicas de UX podem transformar uma tarefa simples, como dar uma nota, em algo muito mais interessante para o usuário. Além disso, é um bom exercício para quem quer praticar um pouco de React Native. Este é um tutorial de nível iniciante/intermediário.

![Interface da tela de feedback, por Urvashi Jain](/blog/implementing-a-feedback-screen-in-react-native/01.webp)
***Interface da tela de feedback, por Urvashi Jain***

Bom, não vamos desenvolver exatamente a mesma tela desenhada pela Urvashi, até porque não temos os assets, mas a ideia é a mesma e o resultado também vai ficar muito legal.

---

## 1- Primeiros Passos

Para começar, vou considerar que você já tem o React Native instalado e configurado na sua máquina, de acordo com o seu sistema operacional. Você sempre pode conferir o processo na [documentação](https://reactnative.dev/docs/0.59/getting-started). Se quiser, pode usar o Expo, mas vou usar o React Native CLI neste tutorial porque considero uma solução mais genérica.

### React Native CLI

```bash
react-native init feedbackScreen
```

### Expo

```bash
expo init feedbackScreen
```

## 2- Instalando as Dependências

Agora que o projeto está criado, vamos instalar os módulos que usaremos para desenvolver a interface. Vamos usar o [React Native Slider](https://github.com/jeanregisser/react-native-slider) para nos ajudar.

### React Native CLI

```bash
yarn add react-native-slider
```

### Expo

```bash
yarn add react-native-slider
```

## 3- Configurações (Opcional)

Esta é uma etapa opcional, em que faço algumas configurações pessoais. Você pode pular se preferir, **só tome cuidado com os formatos e a localização dos arquivos**, que podem mudar um pouco. O que configuro aqui é a opção de usar a extensão *.jsx* e também mover o código para dentro da pasta *src*.

**Estrutura do Projeto**

```text
- android
- ios
- node_modules
- src
  - components
  - screens
  - utils
    -assets
  - App.jsx
- babel.config.js
- index.js
- metro.config.js
- package.json
- yarn.lock
```

<!-- TODO: Medium embedded https://gist.github.com/cefasgarciapereira/78777bf199280043b59f450be36ce711 here. Paste its code as a fenced block. -->

Além dessas configurações, tenho o hábito de criar um package.json dentro de cada pasta de onde exporto meus componentes. Se você nunca viu isso, pesquise por “Absolute Path”. Basicamente, isso permite importar componentes passando só o nome da pasta, em vez do caminho inteiro.

```javascript
// Relative Path
import Component from '../../../components/Component';

// Absolute Path
import {Component} from 'components';
```

Viu? Muito melhor, não é?

## 4- Codificando

Finalmente, vamos ao que realmente importa. Então… A lógica é simples. Vamos usar o Slider para obter um valor do usuário. Como temos 5 possibilidades, os valores do Slider vão de 0 a 4. Para cada valor, vamos atribuir um texto, uma cor e um emoji.

```javascript
const colors = ['#F5CECE', '#FFE3D5', '#FFF5D1', '#F0FAEA', '#D4E9C6'];
const labels = ['Horrible', 'Not Good', 'OK!', 'Good', 'Excellent'];
const faces  = [crying, sad, straight, laughing, smiling];
```

Fiz isso usando arrays, que me pareceu a solução mais simples. Assim, quando o usuário nos der um valor pelo Slider, basta pegar o valor do array na posição correspondente.

```jsx
<View style={{
...feedbackStyles.container,
backgroundColor: colors[rate] // set the background color of the screen
}}>
/*
... code ...
*/
<Image
style={feedbackStyles.smiley}
source={faces[rate]}/> // set the emoji
<Text>{labels[rate]}</Text> // set the label
```

Para que tudo isso funcione direito, precisamos configurar o slider. O componente é muito fácil de usar e entender.

```javascript
<Slider
  style={feedbackStyles.slider}
  value={rate}
  onValueChange={value => setRate(value)}
  minimumValue={0}
  maximumValue={4}
  step={1}
  thumbTintColor={colors[rate]}
  thumbStyle={feedbackStyles.sliderThumb}
  minimumTrackTintColor="#666"
  maximumTrackTintColor="#666"
/>
```

Então… defini os valores mínimo e máximo. O step é quanto o slider aumenta ou diminui a cada passo. Como não queremos valores como 4.5, defini como 1. O restante das props é usado para estilização.

Se quiser exatamente o mesmo estilo que usei no meu exemplo, aqui está:

```javascript
import {StyleSheet} from 'react-native';

export const  feedbackStyles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        marginVertical: 10
    },
    smiley:{
        width: 100,
        height: 100,
        margin: 100
    },
    slider:{
        width: '80%'
    },
    sliderThumb:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#666'
    },
    buttonContainer:{
        position: 'absolute',
         width: '100%',
         padding: 15,
         bottom: 0,
         backgroundColor: 'black',
         alignItems: 'center',
         justifyContent: 'center'
    },
    buttonLabel:{
        color: 'white',
        fontWeight: 'bold'
    }
});
```

## Conclusão

É isso! Uma demonstração bem curta e simples, mas divertida de fazer e boa para praticar. Acho que pode ajudar a brincar com estado, estilos, componentização e talvez seja útil no seu projeto.

![Demonstração da tela de feedback pronta: arrastar o slider muda o emoji, o texto (de Horrible a Excellent) e a cor de fundo](/blog/implementing-a-feedback-screen-in-react-native/02.webp)

Espero que tenha sido útil e trazido bons insights.
