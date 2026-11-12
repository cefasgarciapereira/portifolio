---
title: React internationalization with i18n
slug: react-internationalization-with-i18n
date: '2023-04-06T19:06:42.230Z'
description: 'Step by step guide to internationalize a React app with react-intl: message files, IntlProvider, FormattedMessage, dates and a language switcher.'
tags:
  - react
  - i18n
  - javascript
  - web-development
  - front-end-development
lang: en
translation: internacionalizacao-em-react-com-i18n
mediumUrl: >-
  https://medium.com/@cefasgpereira/react-internationalization-with-i18n-b8f6e17419fd
---

![React internationalization with i18n](/blog/react-internationalization-with-i18n/01.webp)
*Photo by [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com)*

Internationalization (i18n) is a crucial aspect of developing applications that need to be accessed by users who speak different languages. React.js provides a built-in i18n library, called react-intl, that makes it easy to internationalize your React application. In this tutorial, we will walk through the steps of setting up and using react-intl in a React.js application.

## Step 1: Install react-intl

To use react-intl, you will need to install it in your project. You can do this by running the following command in your terminal:

```bash
npm install react-intl
```

## Step 2: Set up your project

Before you can start using react-intl in your React.js application, you will need to set up your project. This typically involves creating a React component or a set of components that you will use to render your application’s user interface. You can do this using the create-react-app tool, or by manually creating a React project.

## Step 3: Create message files

Next, you will need to create message files that contain the translations for your application’s user interface. These files are typically written in JSON format and contain a key-value pair for each translated message.

For example, suppose you want to translate a button that says “Submit” into French. You could create a message file called `fr.json` that contains the following JSON:

```json
{
  "submit": "Soumettre"
}
```

## Step 4: Import the required components

To use react-intl in your React.js application, you will need to import the required components from the react-intl library. The most commonly used components are `IntlProvider`, `FormattedMessage`, and `FormattedDate`.

## Step 5: Set up the IntlProvider component

The `IntlProvider` component is used to provide localization context to your application. It accepts a `locale` prop, which specifies the language to use for localization. You can also pass in a `messages` prop, which is an object containing the translated messages for the specified locale.

For example, suppose you want to use French as the default language for your application. You could set up the `IntlProvider` component as follows:

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

## Step 6: Use the FormattedMessage component

The `FormattedMessage` component is used to display translated messages in your application's user interface. It accepts a `id` prop, which corresponds to the key of the translated message, and optionally accepts `values` props, which can be used to pass in dynamic values to the translated message.

For example, suppose you want to display a button that says “Submit” in your application’s user interface. You could use the `FormattedMessage` component as follows:

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

## Step 7: Use the FormattedDate component

The `FormattedDate` component is used to display formatted dates in your application's user interface. It accepts a `value` prop, which is a date string, and optionally accepts `format` props, which can be used to specify the date format.

For example, suppose you want to display a date in the format “MM/DD/YYYY”. You could use the `FormattedDate` component as follows:

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

## Step 8: Switch between languages

One of the main benefits of using react-intl is that it allows users to switch between languages dynamically. To do this, you can create a language switcher component that sets the `locale` prop of the `IntlProvider` component to the user’s selected language. For example, suppose you want to allow users to switch between English and French. You could create a language switcher component as follows:

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

In the example above, the `LanguageSwitcher`component uses the `useState` hook to manage the currently selected language. It also defines a `handleLanguageChange` function that updates the selected language when the user selects a different language from the dropdown menu. The `messages` variable is then updated based on the selected language, and the `IntlProvider` component is wrapped around the app components to provide the updated localization context.

## Conclusion

In this tutorial, we walked through the steps of setting up and using react-intl to internationalize a React.js application. By following these steps, you can provide a localized user interface that allows users to interact with your application in their preferred language.
