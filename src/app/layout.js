// src/app/layout.js
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <body className="min-h-screen flex flex-col antialiased">
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