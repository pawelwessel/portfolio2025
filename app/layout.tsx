import "@/styles/globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import AOSInit from "@/components/AOS";
import { PhoneModalProvider } from "@/common/context/PhoneModalContext";
import { ThemeProvider } from "@/common/context/ThemeContext";
import PhoneModal from "@/components/PhoneModal";
import { Metadata } from "next";
import PromoPopup from "@/components/PromoPopup";
import ConditionalFooter from "@/components/footer/ConditionalFooter";

export default async function Root({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${cocosharp.variable} overflow-x-hidden ${gotham.variable}`}
      >
        <AOSInit />
        <ThemeProvider>
          <PhoneModalProvider>
            {children}
            <ConditionalFooter />
            <PhoneModal />
            <PromoPopup />
          </PhoneModalProvider>
        </ThemeProvider>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-10818390066"
        />
        <Script async id="google-analytics1">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10818390066');
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16664946086"
        />
        <Script async id="google-analytics2">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16664946086');
          `}
        </Script>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XJL7SETE7X"
        />
        <Script async id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XJL7SETE7X');
          `}
        </Script>
        <Script async id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TKFVWD1KMR');
          `}
        </Script>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title: "Quixy Studio | Strony WWW, Social Media i Google Ads",
  description:
    "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads. Transparentne ceny i realne wyniki biznesowe.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Quixy Studio | Strony WWW, Social Media i Google Ads",
    description:
      "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads.",
    siteName: "Quixy Studio",
    images: [
      {
        url: "/logo-quixy.png",
        width: 1200,
        height: 630,
        alt: "Quixy Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quixy Studio | Strony WWW, Social Media i Google Ads",
    description:
      "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads.",
    images: ["/logo-quixy.png"],
  },
  authors: [{ name: "Quixy Studio", url: "https://quixy.pl" }],
  publisher: "Quixy Studio",
  keywords:
    "strony internetowe, strony www, sklepy internetowe, landing page, web developer, projektowanie stron, social media, marketing, Google Ads, kampanie reklamowe, SEO, Core Web Vitals",
  icons: [
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};

//font
const gotham = localFont({
  src: [
    {
      path: "../public/fonts/Gotham.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/Gotham-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/GothamBold.ttf",
      weight: "500",
      style: "bold",
    },
  ],
  variable: "--font-gotham",
});
const cocosharp = localFont({
  src: [
    {
      path: "../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
