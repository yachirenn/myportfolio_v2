import { ProjectService } from '../services/project.service'
import { createSuccessResponse, createErrorResponse } from '../utils/response'

const projectService = new ProjectService()

export const projectController = {
  getAllProjects: () => {
    try {
      const projects = projectService.getAllProjects()
      return createSuccessResponse(projects, 'Projects retrieved successfully')
    } catch (error) {
      return createErrorResponse('Failed to fetch projects', 'Internal server error')
    }
  },

  getProjectById: (id: number) => {
    try {
      const project = projectService.getProjectById(id)
      if (!project) {
        return createErrorResponse('Project not found', `No project found with id ${id}`)
      }
      return createSuccessResponse(project, 'Project retrieved successfully')
    } catch (error) {
      return createErrorResponse('Failed to fetch project', 'Internal server error')
    }
  }
}