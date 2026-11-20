import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWA from "../components/FloatingWA";
import WATracker from "../components/WATracker"; // <-- Tambahan untuk tracking WA
import Script from "next/script";
import { serializeJsonLd, SITE_ENTITY_ID, SITE_NAME, SITE_URL } from "../lib/metadata";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  keywords: [
    "jasa pengaspalan",
    "jasa pengaspalan jalan",
    "aspal hotmix",
    "kontraktor aspal",
    "kontraktor pengaspalan jabodetabek",
    "paving block",
    "kanstin",
    "cor beton ready mix",
  ],
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  // Data JSON-LD untuk Google (Local Business / General Contractor)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": SITE_ENTITY_ID,
    "name": "PT Tri Abadi Makmur - Spesialis Aspal",
    "legalName": "PT Tri Abadi Makmur",
    "url": `${SITE_URL}/`,
    "telephone": "+6282258089367",
    "sameAs": [
      "https://www.instagram.com/triabadi.makmur/",
      "https://www.tiktok.com/@spesialisaspal",
      "https://www.google.com/maps/place/Jasa+Pengaspalan+Tri+Abadi+Makmur/@-6.26941,106.718938,3a,76.8y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgID8vIfQ4gE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLeU-c-ojdzGX1qc673FoBPUi_RCWADNdNqTnzJwYi5eCPGLk3K6jkLQYiGmRkZwzCwVEkX_Vxw_sA__wTHnkXO1IwDyDWi6iwbmkKNUaKMOU-T_PBWwM48fgdT7ggIV2VWhlVVy_Q%3Dw114-h86-k-no!7i1032!8i774!4m7!3m6!1s0x2e69fa837518530d:0x6f054f333f762104!8m2!3d-6.26941!4d106.718938!10e5!16s%2Fg%2F11f3tjdqdc",
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Al Hidayah RT.06 RW.02, Pondok Jaya, Pondok Aren",
      "addressLocality": "Tangerang Selatan",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "areaServed": [
      "Jakarta",
      "Bogor",
      "Depok",
      "Tangerang",
      "Tangerang Selatan",
      "Bekasi",
      "Banten",
      "Jawa Barat"
    ]
  };

  return (
    <html lang="id">
      <head>
        {/* JSON-LD untuk SEO Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />

        
{/* GTM Production - dioptimalkan agar tidak memblokir render awal */}
<Script id="gtm-script" strategy="lazyOnload">
  {`
    (function(w,d,s,l,i){
      if (w.location.hostname !== 'spesialisaspal.com') return;
      w[l] = w[l] || [];
      var loaded = false;
      function initGTM() {
        if (loaded) return;
        loaded = true;
        w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      }
      var evs = ['scroll', 'mousemove', 'touchstart', 'click'];
      function trigger() {
        initGTM();
        evs.forEach(function(e) { w.removeEventListener(e, trigger, { passive: true }); });
      }
      evs.forEach(function(e) { w.addEventListener(e, trigger, { passive: true, once: true }); });
      setTimeout(initGTM, 3500);
    })(window,document,'script','dataLayer','GTM-5D8KPG65');
  `}
</Script>
</head>

<body className="min-h-screen flex flex-col antialiased">
  {/* GTM noscript dihapus agar tidak dimuat di hostname QA */}

        {/* Komponen pelacak klik WhatsApp otomatis */}
        <WATracker />

        <LanguageProvider>
          <Navbar />
          <main id="konten-utama" tabIndex={-1} className="flex-1 scroll-mt-20">
            {children}
          </main>
          <Footer />

          <FloatingWA />
        </LanguageProvider>
      </body>
    </html>
  );
}
