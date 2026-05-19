import { app } from './App'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║     🗡️  Anime Portfolio API Server     ║
║     Running on http://localhost:${PORT}     ║
║     Environment: ${process.env.NODE_ENV || 'development'}          ║
╚══════════════════════════════════════════╝
  `)
})