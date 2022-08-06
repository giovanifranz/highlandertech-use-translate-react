import { useMemo } from "react";

type Text = Language;

type Data<T> = {
  portuguese: T;
  english: T;
};

type Props<GenericTexts> = { data: Data<GenericTexts>; language: Text };

export function useTranslate<GenericTexts>({
  data,
  language,
}: Props<GenericTexts>): GenericTexts {
  return useMemo(() => data[language], [data, language]);
}

export type { Data, Text as Language, Props as useTranslateProps };
