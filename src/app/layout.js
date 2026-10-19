import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script"; // <-- 1. Tambahkan import Script

export const metadata = {
  metadataBase: new URL("https://spesialisaspal.com"),
  title: {
    default: "PT Tri Abadi Makmur | Spesialis Aspal & Kontraktor Pengaspalan",
    template: "%s | PT Tri Abadi Makmur",
  },
  description:
    "PT Tri Abadi Makmur — Jasa pengaspalan jalan hotmix, paving block, kanstin, cor beton, dan konstruksi infrastruktur profesional & bergaransi di Tangerang Selatan & Jabodetabek.",
  keywords: [
    "jasa pengaspalan",
    "aspal hotmix",
    "kontraktor aspal",
    "paving block",
    "kanstin",
    "cor beton ready mix",
    "Tangerang Selatan",
  ],
  authors: [{ name: "PT Tri Abadi Makmur" }],
  openGraph: {
    type: "website",
    siteName: "PT Tri Abadi Makmur",
    title: "PT Tri Abadi Makmur | Spesialis Aspal & Kontraktor Pengaspalan",
    description:
      "Jasa pengaspalan jalan hotmix, paving block, kanstin, cor beton, dan konstruksi infrastruktur profesional.",
    images: ["/logo.webp"],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Tri Abadi Makmur | Spesialis Aspal & Kontraktor Pengaspalan",
    description: "Jasa pengaspalan jalan hotmix, paving block, kanstin, cor beton.",
    images: ["/logo.webp"],
  },
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
  return (
    <html lang="id">
      <head>
        {/* 2. Tag GTM untuk <head> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5D8KPG65');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* 3. Tag GTM (noscript) tepat setelah pembuka <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5D8KPG65"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}