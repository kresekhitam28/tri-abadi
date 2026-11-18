// src/context/LanguageContext.jsx
"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

const LanguageContext = createContext(null);
const LANGUAGE_KEY = "lang";
const LANGUAGE_CHANGE = "tri-abadi:language-change";
let temporaryLanguage;

function getLanguage() {
  if (temporaryLanguage) return temporaryLanguage;

  try {
    return window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function subscribe(onChange) {
  function onStorage(event) {
    if (event.key === LANGUAGE_KEY || event.key === null) onChange();
  }

  window.addEventListener(LANGUAGE_CHANGE, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(LANGUAGE_CHANGE, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setLang(language) {
  if (language !== "id" && language !== "en") return;

  try {
    window.localStorage.setItem(LANGUAGE_KEY, language);
    temporaryLanguage = undefined;
  } catch {
    temporaryLanguage = language;
  }

  window.dispatchEvent(new Event(LANGUAGE_CHANGE));
}

const getServerLanguage = () => "id";

export function LanguageProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam <LanguageProvider>");
  return ctx;
}
