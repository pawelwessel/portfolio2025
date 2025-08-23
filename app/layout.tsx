import "@/styles/globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import AOSInit from "@/components/AOS";
import { Providers } from "@/common/redux/Provider";
import ClientFormWrapper from "@/components/cta/ClientFormWrapper";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
        <Providers>{children}</Providers>
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
  title: "Paweł Wessel | Full-Stack Developer & Portfolio",
  description:
    "Paweł Wessel - pasjonat programowania i tworzenia cyfrowych doświadczeń. Full-stack developer z 10-letnim doświadczeniem. Tworzę nowoczesne strony internetowe i aplikacje.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Paweł Wessel | Full-Stack Developer & Portfolio",
    description:
      "Paweł Wessel - pasjonat programowania i tworzenia cyfrowych doświadczeń. Full-stack developer z 10-letnim doświadczeniem. Tworzę nowoczesne strony internetowe i aplikacje.",
    siteName: "Paweł Wessel Portfolio",
  },
  authors: [{ name: "wesiu.dev", url: "https://wesiudev.netlify.app" }],
  publisher: "wesiu.dev",
  keywords:
    "strony internetowe, strony www, strony internetowe dla firm, strony internetowe dla osób prywatnych, strony internetowe dla firm, strony internetowe dla osób prywatnych, strony internetowe dla firm, strony internetowe dla osób prywatnych, strony internetowe dla firm, strony internetowe dla osób prywatnych",
  icons: [
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-16x16.png",
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
