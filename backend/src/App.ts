import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { projectRoutes } from './routes/project.route'

export const app = new Elysia()
  .use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))
  .get('/', () => ({ 
    message: 'Anime Portfolio API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      health: '/health'
    }
  }))
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  .use(projectRoutes)