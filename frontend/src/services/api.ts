import { type ApiResponse, type Project } from '../types/project'

const API_URL = 'http://localhost:3001/api'

export const api = {
  getProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await fetch(`${API_URL}/projects`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    return response.json()
  }
}