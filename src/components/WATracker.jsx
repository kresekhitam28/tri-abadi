// src/components/WATracker.jsx
"use client";

import { useEffect } from "react";

export default function WATracker() {
  useEffect(() => {
    const handleClick = (e) => {
      // Cari elemen <a> terdekat dari yang diklik
      const target = e.target.closest("a");
      
      // Jika itu adalah link WhatsApp (wa.me atau api.whatsapp.com)
      if (
        target && 
        target.href && 
        (target.href.includes("wa.me") || target.href.includes("api.whatsapp.com"))
      ) {
        // Kirim event ke GTM dataLayer
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "klik_whatsapp",
          });
          console.log("Event klik_whatsapp terkirim!"); // Opsional untuk ngecek
        }
      }
    };

    // Pasang event listener ke seluruh dokumen
    document.addEventListener("click", handleClick);

    // Bersihkan listener saat komponen di-unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null; // Komponen ini tidak menampilkan apa-apa di layar
}