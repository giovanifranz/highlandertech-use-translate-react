import { useMemo } from "react";

type Text = Language;

type DifferentTextsInput<T> = {
  portuguese: T;
  english: T;
};

type Props<GenericTexts> = {
  textsInput: DifferentTextsInput<GenericTexts>;
  language: Text;
};

export function useTranslate<GenericTexts>({
  textsInput,
  language,
}: Props<GenericTexts>): GenericTexts {
  return useMemo(() => textsInput[language], [textsInput, language]);
}

export type {
  DifferentTextsInput,
  Text as Language,
  Props as useTranslateProps,
};
