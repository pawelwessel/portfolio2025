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
          id="google-analytics"
          src="https://www.googletagmanager.com/gtag/js?id=G-VH4MSJ1DFY"
        >
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VH4MSJ1DFY');
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
