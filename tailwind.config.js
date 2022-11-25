module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      inset: {
        "-12.5": "-3.25rem",
        "-15": "-3.875rem",
      },
      gridTemplateColumns: {
        flow: "repeat(auto-fill, minmax(min(38px, 100%), 1fr))",
      },
      colors: {
        primary: {
          50: "#e2e4e5",
          100: "#b7babe",
          200: "#878d92",
          300: "#626669",
          400: "#262D31",
          500: "#1e2428",
          600: "#0c1721",
          700: "#0a131b",
          800: "#080f16",
          900: "#04080d",
        },
        secondary: {
          100: "rgba(241,241,242,0.45)",
          200: "rgba(241,241,242,0.63)",
        },
        picker: {
          light: "#F0F0F0",
          dark: "#2A2F32",
        },
      },
      padding: {
        12.5: "3.25rem",
        15: "3.875rem",
      },
      maxHeight: {
        12.5: "3.25rem",
      },
      maxWidth: {
        sidePanel: "418px",
        desktop: "1396px",
        message: "71%",
        "1/2": "50%",
        "10/12": "91.666667%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
