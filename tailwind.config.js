/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // activar modo oscuro por clase 'dark'
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        azulPrincipal: "#667FFF",
        grisClaro: "#F3F4F6",
        blancoPuro: "#FFFFFF",
        azulSecundario: "#647DFF",
        grisClaro2: "#b2b2b2",
        azulAcento: "#748BFE",
        azulBannerLogin: "#5E86FF",
        grisOscuro: "#1F2937",
      },
    },
  },
}
