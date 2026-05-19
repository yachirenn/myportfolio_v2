import { ProjectService } from '../services/project.service'
import { createSuccessResponse, createErrorResponse } from '../utils/response'
import { CreateProjectDTO } from '../models/project.model'

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
  },

  createProject: (body: CreateProjectDTO) => {
    try {
      if (!body.title || !body.description || !body.anime) {
        return createErrorResponse('Missing required fields', 'Title, description, and anime are required')
      }
      
      const newProject = projectService.createProject(body)
      return createSuccessResponse(newProject, 'Project created successfully')
    } catch (error) {
      return createErrorResponse('Failed to create project', 'Internal server error')
    }
  }
}