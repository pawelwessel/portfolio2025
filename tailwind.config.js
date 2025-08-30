/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/quixyComponents/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ctaStart: "#14A800",
        ctaEnd: "#0B7D43",
        primaryStart: "#2563eb", // blue-600
        primaryEnd: "#1e40af", // blue-800
        primaryHoverStart: "#1d4ed8", // blue-700
        primaryHoverEnd: "#2563eb", // blue-600
        bgStart: "#f3f4f6", // gray-100
        bgEnd: "#e5e7eb", // gray-200
        accentStart: "#06b6d4", // cyan-500
        accentEnd: "#0e7490", // cyan-700
      },
      backgroundImage: {
        courses: "url('/bg-courses.jpg')",
        "woman-pc": "url('/assets/woman-pc.webp')",
        "guitar-man": "url('/assets/guitar-man.webp')",
        login: "url('/assets/login.webp')",
        register: "url('/happy.webp')",
      },
      fontFamily: {
        sans: ["var(--font-cocosharp)"],
        gotham: ["var(--font-gotham)"],
      },
      animation: {
        "gradient-x": "gradient-x 1.75s ease infinite",
        "gradient-y": "gradient-y 1.75s ease infinite",
        "gradient-xy": "gradient-xy 1.75s ease infinite",
        "-translate-x-100": "-translate-x-100 15s ease infinite",
      },
      keyframes: {
        "-translate-x-100": {
          "0%, 100%": {
            transform: "translateX(0%)",
          },
          "50%": {
            transform: "translateX(-100%)",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
