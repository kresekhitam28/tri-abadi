// src/components/WATracker.jsx
"use client";

import { useEffect } from "react";

export default function WATracker() {
  useEffect(() => {
    function trackDestination({ hostname, pathname, search }) {
      const phone = hostname === "wa.me" ? pathname.slice(1)
        : hostname === "api.whatsapp.com" ? new URLSearchParams(search).get("phone")
        : null;

      // Share links to wa.me have no recipient.
      if (!phone || !/^\+?\d{8,15}\/?$/.test(phone)) return;

      (window.dataLayer ??= []).push({ event: "klik_whatsapp" });
    }

    function handleClick(event) {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (link instanceof HTMLAnchorElement) trackDestination(link);
    }

    function handleSubmit(event) {
      const form = event.target;
      if (event.defaultPrevented || !(form instanceof HTMLFormElement) || !form.hasAttribute("data-whatsapp-draft")) return;

      trackDestination(new URL(form.action));
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
