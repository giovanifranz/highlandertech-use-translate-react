import type {
  Dispatch,
  SetStateAction,
  Ref as ReactRef,
  HTMLAttributes,
} from "react";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  forwardRef,
} from "react";
import useForwardRef from "@bedrock-layout/use-forwarded-ref";
import invariant from "tiny-invariant";

type Ref = HTMLDivElement;

type Props = HTMLAttributes<Ref>;

interface ContextType {
  language: Language;
  toggleLanguage: Dispatch<SetStateAction<Language>>;
}

const Context = createContext({} as ContextType);

// NÃO EDITAR ESSA LINHA
const version = "development";

function Provider({ ...props }: Props, ref: ReactRef<Ref>) {
  const [language, toggleLanguage] = useState<Language>("portuguese");
  const internalRef = useForwardRef(ref);

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
    }),
    [language, toggleLanguage]
  );

  return (
    <Context.Provider value={value}>
      <div {...props} ref={internalRef} />
    </Context.Provider>
  );
}

const useLanguage = () => {
  const context = useContext(Context);

  invariant(
    context === null,
    "useLanguage must be used within a LanguageProvider"
  );

  return context as ContextType;
};

const ForwardedProvider = forwardRef<Ref, Props>(Provider);

export { ForwardedProvider as LanguageProvider, useLanguage };
export type { Props as ProviderProps, Ref as ProviderRef };
