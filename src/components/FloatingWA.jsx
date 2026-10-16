// src/components/FloatingWA.jsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const WA_NUMBER = "6282258089367";
const WA_TEXT = encodeURIComponent("Halo, saya ingin konsultasi");

export default function FloatingWA() {
  const [mounted, setMounted] = useState(false);

  // Portal hanya di client (SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed right-4 sm:right-6 z-[60]
                group flex items-center gap-3"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
      }}
    >
      {/* Label — hanya muncul di desktop saat hover */}
      <span
        className="hidden sm:block px-4 py-2 bg-white text-gray-800 text-sm font-medium
                   rounded-lg shadow-lg border border-gray-100
                   opacity-0 translate-x-4 pointer-events-none
                   group-hover:opacity-100 group-hover:translate-x-0
                   transition-opacity transition-transform duration-200"
      >
        Contact us
      </span>

      {/* Tombol WA */}
      <span
        className="w-12 h-12 sm:w-14 sm:h-14
                   rounded-full bg-[#25D366]
                   flex items-center justify-center
                   shadow-lg shadow-[#25D366]/30
                   active:scale-95 sm:hover:scale-105
                   transition-transform duration-200"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true"
             className="w-6 h-6 sm:w-7 sm:h-7 fill-white">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.215-.673.215-1.017 0-.058-.014-.115-.043-.158-.13-.244-2.22-1.29-2.407-1.39-.158-.086-.33-.13-.5-.13z" />
          <path d="M16.005 3C8.83 3 3 8.83 3 16.005c0 2.286.595 4.435 1.636 6.297L3 29l6.87-1.61a12.96 12.96 0 0 0 6.135 1.55h.005c7.174 0 13.005-5.83 13.005-13.005 0-3.474-1.353-6.74-3.808-9.195A12.92 12.92 0 0 0 16.005 3zm0 23.845h-.004a10.8 10.8 0 0 1-5.504-1.507l-.395-.234-4.08.956.955-3.978-.258-.41a10.77 10.77 0 0 1-1.65-5.667c0-5.957 4.85-10.806 10.81-10.806 2.885 0 5.594 1.125 7.632 3.164a10.73 10.73 0 0 1 3.16 7.65c0 5.96-4.85 10.808-10.81 10.808z" />
        </svg>
      </span>
    </a>
  );

  // Render ke document.body → lepas dari wrapper yang punya `contain`
  if (!mounted) return null;
  return createPortal(content, document.body);
}