# HighlanderTech useTranslate Hook

## Installation

```sh
npm install @highlandertech/use-translate
```

## Example

```typescript
import { LanguageProvider } from '@highlandertech/use-translate';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```


```typescript
import React, { useCallback } from 'react';
import { useLanguage, useTranslate } from '@highlandertech/use-translate';
import type {
  Language,
  DifferentTextsInput,
} from '@highlandertech/use-translate';

type Text = {
  title: string;
  description: string;
};

const data: DifferentTextsInput<Text> = {
  portuguese: { title: 'Olá Mundo', description: 'Esse é o hook useTranslate' },
  english: {
    title: 'Hello World',
    description: 'This is the useTranslate hook',
  },
};

const currentLanguageText = {
  portuguese: 'Você está usando Português',
  english: 'You are using English',
};

function App() {
  const { language, toggleLanguage } = useLanguage();
  const { title, description } = useTranslate({ textsInput: data, language });
  const currently = useTranslate({ textsInput: currentLanguageText, language });

  const handleClick = useCallback(
    (lang: Language) => toggleLanguage(lang),
    [toggleLanguage],
  );

  return (
    <>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <button onClick={() => handleClick('english')}>English</button>
      <button onClick={() => handleClick('portuguese')}>Portuguese</button>
      <p>{currently}</p>
    </>
  );
}

export default App;

```

## Demo

https://fantastic-pixie-538075.netlify.app/

## Developer

| [<img src="https://avatars.githubusercontent.com/u/79429654?v=4" width="75px;"/>](https://github.com/giovanifranz) |
| :-: |
|[Linkedin](https://www.linkedin.com/in/giovanifranz)|
|[Email](mailto:giovanifranz151@gmail.com)|