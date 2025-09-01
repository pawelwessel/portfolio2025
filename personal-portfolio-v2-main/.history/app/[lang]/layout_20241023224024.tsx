import "@/styles/globals.css";
import localFont from "next/font/local";
import { Lato } from "next/font/google";
import { Metadata } from "next";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLeft, NavRight } from "@/components/Navigation";
import Script from "next/script";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
export const metadata: Metadata = {
  title: "wesiudev.com | Front-end Developer Paweł Wessel - Portfolio",
  description:
    "Tworzę strony i aplikacje internetowe, sklepy internetowy, prowdzę marketing w Google Ads. Zajmuję się projektowaniem graficznym i designem.",
  icons: [
    {
      url: "/favicon.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
  ],
  openGraph: {
    type: "website",
    url: `https://wesiudev.com/`,
    title: "wesiudev.com | Front-end Developer Paweł Wessel - Portfolio",
    description:
      "Tworzę strony i aplikacje internetowe, sklepy internetowy, prowdzę marketing w Google Ads. Zajmuję się projektowaniem graficznym i designem.",
    siteName: "WESIUDEV.COM",
    images: [
      {
        url: "/ponczek.png",
        type: "image/png",
      },
    ],
  },
  twitter: {
    site: "@wesiudev",
    title: "wesiudev.com | Front-end Developer Paweł Wessel - Portfolio",
    description:
      "Tworzę strony i aplikacje internetowe, sklepy internetowy, prowdzę marketing w Google Ads. Zajmuję się projektowaniem graficznym i designem.",
    images: [{ url: "/ponczek.png", type: "image/png" }],
  },
};
export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html className="scrollbarBlack">
      <body
        className={`${cocosharp.variable} ${lato.variable} ${anta.variable} ${dosis.variable} font-sans scrollbarBlack overflow-x-hidden`}
      >
        <NavLeft />
        <NavRight dictionary={dictionary} lang={params.lang} />
        {children}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHR2XRP7YX"
        />
        <Script strategy="afterInteractive" id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZHR2XRP7YX');
          `}
        </Script>
      </body>
    </html>
  );
}

const lato = Lato({
  weight: "400",
  variable: "--font-lato",
  subsets: ["latin"],
});
const anta = localFont({
  src: [
    {
      path: "../../fonts/Anta.ttf",
      weight: "400",
    },
  ],
  variable: "--font-anta",
});
const dosis = localFont({
  src: [
    {
      path: "../../fonts/Dosis.ttf",
      weight: "400",
    },
  ],
  variable: "--font-dosis",
});
const cocosharp = localFont({
  src: [
    {
      path: "../../fonts/Bold.ttf",
      weight: "700",
    },

    {
      path: "../../fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../../fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
