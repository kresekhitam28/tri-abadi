// src/context/LanguageContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Selalu mulai dengan "id" supaya konsisten antara server & client.
  // localStorage hanya dibaca di client setelah mount.
  const [lang, setLang] = useState("id");

  // Baca preferensi bahasa dari localStorage setelah mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lang");
    if (saved === "id" || saved === "en") {
      setLang(saved);
    }
  }, []);

  // Simpan preferensi bahasa + set atribut <html lang>
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("lang", lang);
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