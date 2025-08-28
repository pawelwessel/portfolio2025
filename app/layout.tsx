import "@/styles/globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import AOSInit from "@/components/AOS";
import { PhoneModalProvider } from "@/common/context/PhoneModalContext";
import { ThemeProvider } from "@/common/context/ThemeContext";
import PhoneModal from "@/components/PhoneModal";
import PromoPopup from "@/components/PromoPopup";
import Footer from "@/components/footer/Footer";

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
            <Footer />
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
