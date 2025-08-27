/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ctaStart: "#14A800",
        ctaEnd: "#0B7D43",
        primaryStart: "#126b91",
        primaryEnd: "#082F47",
        primaryHoverStart: "#468CA9",
        primaryHoverEnd: "#126b91",
        bgStart: "#126b91",
        bgEnd: "#082F47",
        accentStart: "#FFA726",
        accentEnd: "#FF7043",
      },
      backgroundImage: {
        courses: "url('/bg-courses.jpg')",
        "woman-pc": "url('/assets/woman-pc.webp')",
        "guitar-man": "url('/assets/guitar-man.webp')",
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
