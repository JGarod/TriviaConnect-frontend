# 🎯 TriviaConnect

**TriviaConnect** es una aplicación web interactiva de trivia en tiempo real, donde los usuarios pueden crear salas, unirse a partidas y competir con amigos en diferentes categorías como deportes, historia, geografía, ciencia y cultura.

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** – Entorno de ejecución para JavaScript.
- **Express.js** – Framework para la creación de APIs REST.
- **Sequelize** – ORM para manejo de base de datos SQL.
- **PostgreSQL / MySQL** – Base de datos relacional (configurable en `.env`).
- **Socket.io** – Comunicación en tiempo real para las salas de juego.

### Frontend
- **Angular** – Framework para SPA (Single Page Application).
- **TailwindCSS** – Framework CSS para diseño responsive y moderno.
- **TypeScript** – Tipado estático en el frontend.

---

## 📂 Estructura del Proyecto

```plaintext
📦 TriviaConnect
 ┣ 📂 backend
 ┃ ┣ 📂 models        # Modelos Sequelize (Usuario, Sala, Pregunta, etc.)
 ┃ ┣ 📂 routes        # Rutas API REST
 ┃ ┣ 📂 controllers   # Lógica de negocio
 ┃ ┣ 📜 database.js   # Configuración de Sequelize
 ┃ ┗ 📜 server.js     # Servidor principal
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 app         # Componentes y servicios Angular
 ┃ ┃ ┣ 📂 assets      # Imágenes y recursos estáticos
 ┃ ┃ ┗ 📜 styles.css  # Estilos globales
 ┗ 📜 README.md
