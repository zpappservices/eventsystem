/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: ["Inter", "san-serif"],
      colors: {
        softCream: "#F7F7F7",
        primary: "#068A4F",
        baseWhite: "#fafafa",
        baseBlack: "#0a0a0b",
        accent: "#F58634",
        success: "#1FCA59",
        warning: "#ffda24",
        error: "#CA1F29",
        primary1000: "#010D07",
        primary900: "#011D11",
        primary800: "#02361F",
        primary700: "#04532F",
        primary600: "#057040",
        primary500: "#068A4F",
        primary400: "#09D278",
        primary300: "##2DF69B",
        primary200: "#71F9BC",
        primary100: "#BBFCDF",
        accent1000: "#170A01",
        accent900: "#3A1A03",
        accent800: "#703206",
        accent700: "#AA4C08",
        accent600: "#E4660B",
        accent500: "#F58634",
        accent400: "#F79E5F",
        accent300: "#F9B685",
        accent200: "#FBCDAC",
        accent100: "#FDE8D8",
        accent50: "#FEF4EA",
        neutrals1000: "#151314",
        neutrals900: "#2b2829",
        neutrals800: "#433e3f",
        neutrals700: "#5a5555",
        neutrals600: "#726c6c",
        neutrals500: "#898384",
        neutrals400: "#9f9c9c",
        neutrals300: "#b5b3b3",
        neutrals200: "#cccbcb",
        neutrals100: "#e3e3e3",
        neutrals50: "#FEF4EA",
        success500: "#1FCA59",
        success400: "#41E277",
        success300: "#6DE996",
        success200: "#9EF0B9",
        success100: "#CEF8DC",
        warning500: "#cba800",
        warning400: "#FFD60A",
        warning300: "#FFE047",
        warning200: "#FFEB85",
        warning100: "#FFF5C2",
        error500: "#CA1F29",
        error400: "#E2414C",
        error300: "#E96D75",
        error200: "#F09EA3",
        error100: "#F8CED1",
        grey900: "#1C2122",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
