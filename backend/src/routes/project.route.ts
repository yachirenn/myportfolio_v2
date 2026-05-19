import { Elysia } from 'elysia'
import { projectController } from '../controllers/project.controller'
import { CreateProjectDTO } from '../models/project.model'

export const projectRoutes = new Elysia({ prefix: '/api' })
  .get('/projects', () => {
    return projectController.getAllProjects()
  })
  
  .get('/projects/:id', ({ params: { id } }) => {
    return projectController.getProjectById(Number(id))
  })
  
  .post('/projects', ({ body }) => {
    return projectController.createProject(body as CreateProjectDTO)
  })