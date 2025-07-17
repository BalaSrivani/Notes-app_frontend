📒 Notes App — Frontend

This is the frontend of the Notes App, built with React (and optionally Vite).
It allows users to:
✅ Create an account
✅ Create, update, and delete notes
✅ Search/filter notes by keyword

It communicates with the deployed backend API (e.g., hosted on Render) and MongoDB Atlas.

🚀 Features
User registration & login

Create, update, delete notes

Search notes with a search bar

Responsive UI

🌐 Live Demo

Frontend: 

Backend API: https://notes-app-backend-cppi.onrender.com

🛠️ Tech Stack
React (with Vite or CRA)

Axios

TailwindCSS 

Render

Vercel 

MongoDB Atlas 

📂 Project Structure

| 📂 Folder/File     | 📄 Description                     |
| ------------------ | ---------------------------------- |
| `public/`          | Static assets (e.g., `index.html`) |
| `src/`             | React source code                  |
| `src/components/`  | Reusable UI components             |
| `src/pages/`       | Different pages of the app         |
| `src/App.jsx`      | Main App component                 |
| `src/main.jsx`     | Application entry point            |
| `src/constants.js` | Backend URL and configuration      |
| `package.json`     | NPM scripts & dependencies         |
| `vite.config.js`   | Vite configuration (if used)       |
| `README.md`        | Project documentation              |

🧪 Run Locally
Install dependencies
```bash
npm install
```

Start development server
```bash
npm run dev
```

