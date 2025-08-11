/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        azulPrincipal: "#667FFF",
        grisClaro: "#F3F4F6",
        blancoPuro: "#FFFFFF",
        azulSecundario: "#647DFF",
        grisClaro2: "#F5F5F6",
        azulAcento: "#748BFE",
        azulBannerLogin: "#5E86FF",
      },
    },
  },
  plugins: [],
}
