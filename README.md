# 🎨 MyPortfolio V2

> A modern fullstack portfolio application built with cutting-edge technologies for high performance and clean architecture.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Elysia.js](https://img.shields.io/badge/Elysia.js-1.4-FFE24D?style=flat)](https://elysiajs.com/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-F471B5?style=flat&logo=bun)](https://bun.sh/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Development](#-development)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 🌟 Overview

**MyPortfolio V2** is a fullstack portfolio application. The frontend is a React + Vite single page. The backend is an Elysia API on Bun. Product direction for a later version is in [PRD-Portfolio-v1.2.md](PRD-Portfolio-v1.2.md). This README describes the app that is in the repository today.

### Key Highlights

✨ **High Performance**: Built with Bun runtime for blazing-fast execution  
🏗️ **Clean Architecture**: Implements separation of concerns with controllers, services, and routes  
📱 **Responsive Design**: Modern UI with React and TailwindCSS  
🔌 **RESTful API**: Standardized API responses with proper error handling  
🎯 **Type-Safe**: Full TypeScript support for enhanced developer experience  
📖 **Read-only API**: The project list lives in memory. The API does not accept writes.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript 6** - Static typing
- **Vite 8** - Dev server and production build
- **Tailwind CSS 4** - Utility styling

### Backend
- **Elysia.js 1.4** - HTTP framework
- **TypeScript** - Types for the API
- **Bun** - Runtime and package manager. Entry file: `src/server.ts`

### DevTools & Utilities
- **Bun Package Manager** - Fast and efficient dependency management
- **Hot Module Replacement (HMR)** - Instant feedback during development

---

## 📁 Project Structure

```
myportfolio_v2/
├── frontend/                         # React 19 + Vite 8 + Tailwind CSS 4
│   ├── src/
│   │   ├── components/               # Header, cursor, profile card
│   │   ├── pages/                    # Hero, About, Skills, Projects, Connect
│   │   ├── hooks/                    # useProjects
│   │   ├── services/                 # API client
│   │   ├── types/                    # Frontend response types
│   │   ├── data/                     # Static skills list
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                          # Elysia 1.4 + Bun
│   ├── src/
│   │   ├── routes/                   # HTTP routes
│   │   ├── controllers/              # Request handlers
│   │   ├── services/                 # In-memory project list
│   │   ├── models/                   # Project type
│   │   ├── utils/                    # Response helpers
│   │   ├── App.ts                    # Elysia app
│   │   └── server.ts                 # Process entry, port 3001
│   ├── package.json
│   └── tsconfig.json
│
├── PRD-Portfolio-v1.2.md             # Later product direction
└── README.md
```

### Folder Descriptions

| Folder | Purpose |
|--------|---------|
| **frontend/** | React 19 application. Sections are in-page anchors, not separate routes. |
| **backend/** | Elysia 1.4 server. Default port is 3001. Entry file is `src/server.ts`. |
| **backend/src/routes/** | `GET /api/projects` and `GET /api/projects/:id` |
| **backend/src/controllers/** | Turn service results into response bodies |
| **backend/src/services/** | In-memory project list and lookups |
| **backend/src/models/** | `Project` interface |
| **backend/src/utils/** | Response helpers. The time field is `timestamp`. |
| **frontend/src/data/** | Skills shown without calling the API |

---

## 💻 Installation

### Prerequisites

Ensure you have the following installed:
- **Bun** (v1.0 or higher) - [Download](https://bun.sh/)

### Clone the Repository

```bash
git clone https://github.com/yachirenn/MyPortfolio-V2.git
cd MyPortfolio-V2
```

### Install Dependencies

#### Backend Setup

```bash
cd backend
bun install
```

#### Frontend Setup

```bash
cd ../frontend
bun install
```

---

## 🚀 Development

### Running the Backend

```bash
cd backend
bun run dev
```

The backend listens on `http://localhost:3001` unless `PORT` is set. The frontend calls `http://localhost:3001/api`.

### Running the Frontend

```bash
cd frontend
bun run dev
```

The frontend will start at `http://localhost:5173` (Vite default)

### Running Both Concurrently

**From the root directory:**

```bash
# Terminal 1 - Backend
cd backend && bun run dev

# Terminal 2 - Frontend
cd frontend && bun run dev
```

### Build for Production

#### Backend

There is no build script. Start the TypeScript entry directly:

```bash
cd backend
bun run start
```

`bun run dev` watches `src/server.ts`.

#### Frontend

```bash
cd frontend
bun run build
```

`bun run build` runs `tsc -b` and then `vite build`.

## 🔌 API Endpoints

Base URL: `http://localhost:3001`

| Method | Path | Success | Failure |
|--------|------|---------|---------|
| GET | `/` | 200, API index | |
| GET | `/health` | 200, `{ status: "ok" }` | |
| GET | `/api/projects` | 200, project array | |
| GET | `/api/projects/:id` | 200, one project | 400 if the id is not a positive integer. 404 if that id does not exist. |

Project responses include `timestamp` as an ISO string. `POST /api/projects` is not registered. The list is read from memory and resets when the process stops.

## 📸 Screenshots

### Frontend Interface

![Portfolio Dashboard](https://via.placeholder.com/800x500?text=Portfolio+Dashboard)
*Main portfolio dashboard displaying all projects*

![Project Detail](https://via.placeholder.com/800x500?text=Project+Detail+View)
*Detailed project view with full information*

### API Documentation

![API Response](https://via.placeholder.com/800x300?text=API+Response+JSON)
*Standardized API response format*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ✨ Author

**Yachirenn**

- 🔗 GitHub: [@yachirenn](https://github.com/yachirenn)
- 💼 Portfolio: [MyPortfolio V2](#)
- 📧 Email: [rendysulistyawan11@gmail.com](#)

---

## 🙏 Acknowledgments

- [Elysia.js](https://elysiajs.com/) - Amazing Bun web framework
- [React](https://react.dev/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Bun](https://bun.sh/) - JavaScript runtime

---

## 📞 Support

If you have any questions or need help, please open an [issue](https://github.com/yachirenn/MyPortfolio-V2/issues) on GitHub.

---

<div align="center">

**⭐ If you like this project, please support me! via [Trakter]() It helps me a lot.**

Made with ❤️ by [Yachirenn](https://github.com/yachirenn)

</div>  