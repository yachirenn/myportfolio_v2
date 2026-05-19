export interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
  anime: string
  status: 'ongoing' | 'completed' | 'planned'
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp: string
}

export interface CreateProjectDTO {
  title: string
  description: string
  anime: string
  status?: 'ongoing' | 'completed' | 'planned'
}