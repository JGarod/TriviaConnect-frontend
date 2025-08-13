/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // activar modo oscuro por clase 'dark's
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
        // azulPrincipal: "var(--azul-principal)",
        // grisClaro: "var(--gris-claro)",
        // blancoPuro: "var(--blanco-puro)",
        // azulSecundario: "var(--azul-secundario)",
        // grisClaro2: "var(--gris-claro2)",
        // azulAcento: "var(--azul-acento)",
        // azulBannerLogin: "var(--azul-banner-login)"
      },
    },
  },
  plugins: [],
}
