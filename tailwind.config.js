module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ashy: "#fdfbfb",
        accent: "rgb(99 136 108)"
      },
      fontFamily: {
        roboto: [
          "var(--font-roboto)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif"
        ],
        poppins: [
          "var(--font-poppins)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif"
        ]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};
