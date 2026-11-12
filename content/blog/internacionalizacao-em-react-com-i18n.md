---
title: Internacionalização em React com i18n
slug: internacionalizacao-em-react-com-i18n
date: '2023-04-06T19:06:42.230Z'
description: 'Guia passo a passo para internacionalizar um app React com react-intl: arquivos de mensagens, IntlProvider, FormattedMessage, datas e seletor de idioma.'
tags:
  - react
  - i18n
  - javascript
  - web-development
  - front-end-development
lang: pt
translation: react-internationalization-with-i18n
---

![Internacionalização em React com i18n](/blog/react-internationalization-with-i18n/01.webp)
*Foto de [Sigmund](https://unsplash.com/@sigmund) no [Unsplash](https://unsplash.com)*

A internacionalização (i18n) é um aspecto crucial no desenvolvimento de aplicações que precisam ser acessadas por pessoas que falam idiomas diferentes. O React.js oferece uma biblioteca de i18n integrada, chamada react-intl, que facilita a internacionalização da sua aplicação React. Neste tutorial, vamos passar pelas etapas de configuração e uso do react-intl em uma aplicação React.js.

## Passo 1: Instale o react-intl

Para usar o react-intl, você precisa instalá-lo no seu projeto. Para isso, rode o seguinte comando no terminal:

```bash
npm install react-intl
```

## Passo 2: Configure seu projeto

Antes de começar a usar o react-intl na sua aplicação React.js, você precisa configurar o projeto. Normalmente, isso envolve criar um componente React, ou um conjunto de componentes, que você vai usar para renderizar a interface da aplicação. Você pode fazer isso com a ferramenta create-react-app ou criando um projeto React manualmente.

## Passo 3: Crie os arquivos de mensagens

Em seguida, você vai precisar criar arquivos de mensagens com as traduções da interface da sua aplicação. Esses arquivos normalmente são escritos em JSON e contêm um par chave-valor para cada mensagem traduzida.

Por exemplo, suponha que você queira traduzir um botão com o texto “Submit” para o francês. Você pode criar um arquivo de mensagens chamado `fr.json` com o seguinte JSON:

```json
{
  "submit": "Soumettre"
}
```

## Passo 4: Importe os componentes necessários

Para usar o react-intl na sua aplicação React.js, você precisa importar os componentes necessários da biblioteca. Os componentes mais usados são `IntlProvider`, `FormattedMessage` e `FormattedDate`.

## Passo 5: Configure o componente IntlProvider

O componente `IntlProvider` é usado para fornecer o contexto de localização para a sua aplicação. Ele recebe uma prop `locale`, que define o idioma usado na localização. Você também pode passar uma prop `messages`, que é um objeto com as mensagens traduzidas para o idioma definido.

Por exemplo, suponha que você queira usar o francês como idioma padrão da aplicação. Você pode configurar o componente `IntlProvider` assim:

```jsx
import { IntlProvider } from 'react-intl';
import frMessages from './fr.json';

function App() {
  return (
    <IntlProvider locale="fr" messages={frMessages}>
      {/* your app components */}
    </IntlProvider>
  );
}
```

## Passo 6: Use o componente FormattedMessage

O componente `FormattedMessage` é usado para exibir mensagens traduzidas na interface da aplicação. Ele recebe uma prop `id`, que corresponde à chave da mensagem traduzida, e, opcionalmente, a prop `values`, usada para passar valores dinâmicos para a mensagem.

Por exemplo, suponha que você queira exibir um botão com o texto “Submit” na interface da aplicação. Você pode usar o componente `FormattedMessage` assim:

```jsx
import { FormattedMessage } from 'react-intl';

function App() {
  return (
    <div>
      <button>
        <FormattedMessage id="submit" />
      </button>
    </div>
  );
}
```

## Passo 7: Use o componente FormattedDate

O componente `FormattedDate` é usado para exibir datas formatadas na interface da aplicação. Ele recebe uma prop `value`, que é uma string de data, e, opcionalmente, a prop `format`, usada para definir o formato da data.

Por exemplo, suponha que você queira exibir uma data no formato “MM/DD/YYYY”. Você pode usar o componente `FormattedDate` assim:

```jsx
import { FormattedDate } from 'react-intl';

function App() {
  return (
    <div>
      <FormattedDate value="2022-03-14" format="MM/DD/YYYY" />
    </div>
  );
}
```

## Passo 8: Alterne entre idiomas

Um dos principais benefícios do react-intl é permitir que os usuários troquem de idioma dinamicamente. Para isso, você pode criar um componente seletor de idioma que define a prop `locale` do `IntlProvider` de acordo com o idioma escolhido pelo usuário. Por exemplo, suponha que você queira permitir que os usuários alternem entre inglês e francês. Você pode criar um seletor de idioma assim:

```jsx
import { useState } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "./en.json";
import frMessages from "./fr.json";

function LanguageSwitcher() {
  const [locale, setLocale] = useState("en");
  const messages = locale === "en" ? enMessages : frMessages;

  function handleLanguageChange(event) {
    setLocale(event.target.value);
  }

  return (
    <div>
      <select value={locale} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
      <IntlProvider locale={locale} messages={messages}>
        {/* your app components */}
      </IntlProvider>
    </div>
  );
}
```

No exemplo acima, o componente `LanguageSwitcher` usa o hook `useState` para controlar o idioma selecionado. Ele também define a função `handleLanguageChange`, que atualiza o idioma quando o usuário escolhe outra opção no menu. A variável `messages` é então atualizada de acordo com o idioma selecionado, e o componente `IntlProvider` envolve os componentes da aplicação para fornecer o contexto de localização atualizado.

## Conclusão

Neste tutorial, passamos pelas etapas de configuração e uso do react-intl para internacionalizar uma aplicação React.js. Seguindo esses passos, você consegue oferecer uma interface localizada, que permite aos usuários interagir com sua aplicação no idioma que preferirem.
