import { Project, CreateProjectDTO } from '../models/project.model'

// Dummy data with anime theme
const projects: Project[] = [
  {
    id: 1,
    title: 'Demon Slayer Fan Page',
    description: 'Website tribute untuk anime Demon Slayer dengan karakter interaktif',
    imageUrl: 'https://picsum.photos/seed/demonslayer/400/300',
    anime: 'Demon Slayer',
    status: 'completed',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Jujutsu Kaisen Database',
    description: 'Database karakter dan teknik kutukan dari anime Jujutsu Kaisen',
    imageUrl: 'https://picsum.photos/seed/jujutsu/400/300',
    anime: 'Jujutsu Kaisen',
    status: 'ongoing',
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    title: 'One Piece Journey Tracker',
    description: 'Track progress menonton One Piece dengan fitur episode tracker',
    imageUrl: 'https://picsum.photos/seed/onepiece/400/300',
    anime: 'One Piece',
    status: 'planned',
    createdAt: '2024-03-10'
  }
]

export class ProjectService {
  getAllProjects(): Project[] {
    return projects
  }

  getProjectById(id: number): Project | undefined {
    return projects.find(project => project.id === id)
  }

  createProject(data: CreateProjectDTO): Project {
    const newProject: Project = {
      id: projects.length + 1,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || `https://picsum.photos/seed/${data.title.toLowerCase().replace(/\s+/g, '')}/400/300`,
      anime: data.anime,
      status: data.status || 'planned',
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    projects.push(newProject)
    return newProject
  }
}