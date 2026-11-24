import { Elysia } from 'elysia'
import { projectController } from '../controllers/project.controller'
import { createErrorResponse, type ApiResponse } from '../utils/response'

type ProjectByIdContext = {
  params: { id: string }
  status: (code: number, body: ApiResponse<null>) => ApiResponse<null>
}

export const projectRoutes = new Elysia({ prefix: '/api' })
  .get('/projects', () => {
    return projectController.getAllProjects()
  })
  .get('/projects/:id', ({ params, status }: ProjectByIdContext) => {
    const projectId = Number(params.id)
    if (!Number.isInteger(projectId) || projectId < 1) {
      return status(400, createErrorResponse(
        'Invalid project id',
        'Project id must be a positive integer'
      ))
    }

    const body = projectController.getProjectById(projectId)
    if (!body.success) {
      const httpStatus = body.error === 'Project not found' ? 404 : 500
      return status(httpStatus, {
        success: false,
        error: body.error ?? 'Failed to fetch project',
        message: body.message,
        timestamp: body.timestamp,
      })
    }

    return body
  })