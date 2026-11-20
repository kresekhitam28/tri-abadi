// src/components/WATracker.jsx
"use client";

import { useEffect } from "react";

export function trackWhatsApp() {
  (window.dataLayer ??= []).push({ event: "klik_whatsapp" });
}

export default function WATracker() {
  useEffect(() => {
    function trackDestination({ hostname, pathname, search }) {
      const phone = hostname === "wa.me" ? pathname.slice(1)
        : hostname === "api.whatsapp.com" ? new URLSearchParams(search).get("phone")
        : null;

      // Share links to wa.me have no recipient.
      if (!phone || !/^\+?\d{8,15}\/?$/.test(phone)) return;

      trackWhatsApp();
    }

    function handleClick(event) {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (link instanceof HTMLAnchorElement) trackDestination(link);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
