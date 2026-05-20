# 📂 `Backend - myportfolio_v2`

Backend API for MyPortfolio V2 built wih [Elysia.js](https://elysiajs.com/) running on [Bun](https://bun.sh/installation).

## Tech Stack
- Elysia.js
- TypeScript
- Bun Runtime

## 🚀 Getting Started

To install dependencies:

```bash
bun install
```

To run development server:

```bash
bun run server
```
Or manually:
```bash
bun run src/server.ts
```

## Folder Structure
src/
├── controllers/  # Handle request & response
├── services/     # Business logic
├── routes/       # API routes
├── utils/        # Helpers (response, etc)

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.sh/installation) is a fast all-in-one JavaScript runtime.