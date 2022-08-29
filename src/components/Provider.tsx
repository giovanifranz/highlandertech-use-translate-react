import useForwardRef from "@bedrock-layout/use-forwarded-ref";
import type { HTMLAttributes, Ref as ReactRef } from "react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";
import invariant from "tiny-invariant";

type Ref = HTMLDivElement;

type Props = HTMLAttributes<Ref>;

type Language = "portuguese" | "english";

interface ContextType {
  language: Language;
  toggleLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<ContextType | null>(null);

const useLanguage = (): ContextType => {
  const context = useContext(LanguageContext);

  invariant(
    context !== null,
    "useLanguage must be used within a LanguageProvider"
  );

  return context;
};

// NÃO EDITAR ESSA LINHA
const version = "development";

function Provider({ ...props }: Props, ref: ReactRef<Ref>) {
  const internalRef = useForwardRef(ref);
  const [language, setLanguage] = useState<Language>("portuguese");

  const toggleLanguage = useCallback((lang: Language) => {
    setLanguage(lang === "portuguese" ? "english" : "portuguese");
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div {...props} ref={internalRef} data-version={version} />
    </LanguageContext.Provider>
  );
}

const ForwardedProvider = forwardRef<Ref, Props>(Provider);

export { ForwardedProvider as LanguageProvider, useLanguage };
export type { Props as ProviderProps, Ref as ProviderRef };
