import { Ref as ReactRef, HTMLAttributes, useCallback } from "react";
import { createContext, useContext, useState, forwardRef } from "react";
import useForwardRef from "@bedrock-layout/use-forwarded-ref";
import invariant from "tiny-invariant";

type Ref = HTMLDivElement;

type Props = HTMLAttributes<Ref>;

type Language = "portuguese" | "english";

interface ContextType {
  language: Language;
  toggleLanguage: (lang: Language) => void;
}

const Context = createContext<ContextType | null>(null);

// NÃO EDITAR ESSA LINHA
const version = "development";

function Provider({ ...props }: Props, ref: ReactRef<Ref>) {
  const [language, setLanguage] = useState<Language>("portuguese");
  const internalRef = useForwardRef(ref);

  const toggleLanguage = useCallback((lang: Language) => {
    setLanguage(lang === "portuguese" ? "english" : "portuguese");
  }, []);

  return (
    <Context.Provider value={{ language, toggleLanguage }}>
      <div {...props} ref={internalRef} data-version={version} />
    </Context.Provider>
  );
}

const useLanguage = () => {
  const context = useContext(Context);

  invariant(
    context !== null,
    "useLanguage must be used within a LanguageProvider"
  );

  return context as ContextType;
};

const ForwardedProvider = forwardRef<Ref, Props>(Provider);

export { ForwardedProvider as LanguageProvider, useLanguage };
export type { Props as ProviderProps, Ref as ProviderRef };
