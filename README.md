# 🎨 MyPortfolio V2

> A modern fullstack portfolio application built with cutting-edge technologies for high performance and clean architecture.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Elysia.js](https://img.shields.io/badge/Elysia.js-Latest-FFE24D?style=flat)](https://elysiajs.com/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-F471B5?style=flat&logo=bun)](https://bun.sh/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Development](#-development)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🌟 Overview

**MyPortfolio V2** is a modern fullstack portfolio application designed with performance and maintainability in mind. The project separates frontend and backend into independent applications, each optimized for their specific purposes.

### Key Highlights

✨ **High Performance**: Built with Bun runtime for blazing-fast execution  
🏗️ **Clean Architecture**: Implements separation of concerns with controllers, services, and routes  
📱 **Responsive Design**: Modern UI with React and TailwindCSS  
🔌 **RESTful API**: Standardized API responses with proper error handling  
🎯 **Type-Safe**: Full TypeScript support for enhanced developer experience  
⚡ **Production-Ready**: Battle-tested patterns and best practices

---

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library for building interactive interfaces
- **TypeScript** - Static typing for safer code
- **Vite** - Next-generation build tool with instant HMR
- **TailwindCSS** - Utility-first CSS framework for rapid UI development

### Backend
- **Elysia.js** - Fast, friendly Bun web framework
- **TypeScript** - Type-safe backend development
- **Bun** - All-in-one runtime (runtime, package manager, bundler)

### DevTools & Utilities
- **Bun Package Manager** - Fast and efficient dependency management
- **Hot Module Replacement (HMR)** - Instant feedback during development

---

## 📁 Project Structure

\`\`\`
MyPortfolio-V2/
├── frontend/                    # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API client services
│   │   ├── types/             # TypeScript type definitions
│   │   ├── styles/            # Global styles and Tailwind config
│   │   ├── App.tsx            # Main App component
│   │   └── main.tsx           # Entry point
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── vite.config.ts         # Vite configuration
│
├── backend/                     # Elysia.js + Bun
│   ├── src/
│   │   ├── routes/            # API route definitions
│   │   ├── controllers/       # Request handlers (business logic)
│   │   ├── services/          # Business logic layer
│   │   ├── types/             # TypeScript types and interfaces
│   │   ├── middleware/        # Custom middleware
│   │   ├── utils/             # Helper functions and utilities
│   │   ├── constants/         # Application constants
│   │   └── index.ts           # Server entry point
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── bunfig.toml            # Bun configuration
│   └── .env.example           # Environment variables template
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── LICENSE                    # License file

\`\`\`

### Folder Descriptions

| Folder | Purpose |
|--------|---------|
| **frontend/** | React application with Vite and TailwindCSS for building the user interface |
| **backend/** | Elysia.js server handling API requests with clean architecture pattern |
| **src/routes/** | Define API endpoints and HTTP methods |
| **src/controllers/** | Handle incoming requests and responses |
| **src/services/** | Core business logic and data processing |
| **src/types/** | Shared TypeScript interfaces and types |
| **src/middleware/** | Authentication, logging, error handling middleware |
| **src/utils/** | Reusable utility functions and helpers |

---

## 💻 Installation

### Prerequisites

Ensure you have the following installed:
- **Bun** (v1.0 or higher) - [Download](https://bun.sh/)

### Clone the Repository

\`\`\`bash
git clone https://github.com/yachirenn/MyPortfolio-V2.git
cd MyPortfolio-V2
\`\`\`

### Install Dependencies

#### Backend Setup

\`\`\`bash
cd backend
bun install
\`\`\`

#### Frontend Setup

\`\`\`bash
cd ../frontend
bun install
\`\`\`

---

## 🚀 Development

### Running the Backend

\`\`\`bash
cd backend
bun run dev
\`\`\`

The backend will start at \`http://localhost:3000\` (or your configured port)

### Running the Frontend

\`\`\`bash
cd frontend
bun run dev
\`\`\`

The frontend will start at \`http://localhost:5173\` (Vite default)

### Running Both Concurrently

**From the root directory:**

\`\`\`bash
# Terminal 1 - Backend
cd backend && bun run dev

# Terminal 2 - Frontend
cd frontend && bun run dev
\`\`\`

### Build for Production

#### Backend

\`\`\`bash
cd backend
bun run build
bun run start
\`\`\`

#### Frontend

\`\`\`bash
cd frontend
bun run build
\`\`\`


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