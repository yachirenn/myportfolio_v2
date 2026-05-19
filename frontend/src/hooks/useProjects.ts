import { useState, useEffect, useCallback } from 'react'
import { type Project } from '../types/project'
import { api } from '../services/api'

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getProjects()
      if (response.success && response.data) {
        setProjects(response.data)
      } else {
        setError('Failed to load projects')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const addProject = async (data: { title: string; description: string; anime: string }) => {
    try {
      const response = await api.createProject(data)
      if (response.success && response.data) {
        setProjects(prev => [...prev, response.data!])
        return response.data
      }
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return { projects, loading, error, addProject, refetch: fetchProjects }
}