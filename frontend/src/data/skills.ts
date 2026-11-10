import type { IconType } from 'react-icons'
import { SiAndroidstudio, SiBun, SiFigma, SiFirebase, SiGit, SiGithub, SiNextdotjs, SiNodedotjs, SiPostman, SiReact, SiTailwindcss, SiTypescript, SiVite } from 'react-icons/si'

export type SkillGroup = 'Frontend' | 'Backend' | 'Mobile' | 'Tools'

export interface Skill {
  name: string
  category: string
  group: SkillGroup
  href: string
  icon: IconType
  color: string
  imageSrc?: string
}

export const skills: Skill[] = [
  { name: 'React', category: 'UI library', group: 'Frontend', href: 'https://react.dev/', icon: SiReact, color: '#087ea4' },
  { name: 'TypeScript', category: 'Language', group: 'Frontend', href: 'https://www.typescriptlang.org/', icon: SiTypescript, color: '#3178c6' },
  { name: 'Tailwind CSS', category: 'Styling', group: 'Frontend', href: 'https://tailwindcss.com/', icon: SiTailwindcss, color: '#087f9b' },
  { name: 'Vite', category: 'Build tool', group: 'Frontend', href: 'https://vite.dev/', icon: SiVite, color: '#7952cc' },
  { name: 'Bun', category: 'Runtime', group: 'Backend', href: 'https://bun.sh/', icon: SiBun, color: '#2c1810' },
  { name: 'Git', category: 'Version control', group: 'Tools', href: 'https://git-scm.com/', icon: SiGit, color: '#d34125' },
  { name: 'GitHub', category: 'Version control', group: 'Tools', href: 'https://github.com/', icon: SiGithub, color: '#1e1e1e' },
  { name: 'Figma', category: 'Design tool', group: 'Tools', href: 'https://figma.com/', icon: SiFigma, color: '#f24e1e' },
  { name: 'Next.js', category: 'Framework', group: 'Frontend', href: 'https://nextjs.org/', icon: SiNextdotjs, color: '#000000' },
  { name: 'React Native', category: 'Mobile', group: 'Mobile', href: 'https://reactnative.dev/', icon: SiReact, color: '#61dafb' },
  { name: 'Node.js', category: 'Runtime', group: 'Backend', href: 'https://nodejs.org/', icon: SiNodedotjs, color: '#339933' },
  { name: 'Firebase', category: 'Backend service', group: 'Backend', href: 'https://firebase.google.com/', icon: SiFirebase, color: '#ffca28' },
  { name: 'Postman', category: 'API testing', group: 'Tools', href: 'https://www.postman.com/', icon: SiPostman, color: '#ff6c37' },
  { name: 'Android Studio', category: 'Mobile development', group: 'Mobile', href: 'https://developer.android.com/studio', icon: SiAndroidstudio, color: '#3ddc84' },
]
