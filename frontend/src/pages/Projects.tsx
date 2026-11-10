import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { LuArrowUpRight, LuCircleAlert, LuFolderKanban, LuLoaderCircle, LuRefreshCw } from 'react-icons/lu'
import { useProjects } from '../hooks/useProjects'
import type { Project } from '../types/project'

const statusLabels: Record<Project['status'], string> = {
  completed: 'Cleared',
  ongoing: 'In progress',
  planned: 'Queued',
}

export default function Projects() {
  const { projects, loading, error, refetch } = useProjects()
  const [activeStatus, setActiveStatus] = useState<Project['status'] | 'all'>('all')
  const visibleProjects = useMemo(() => activeStatus === 'all' ? projects : projects.filter(project => project.status === activeStatus), [activeStatus, projects])

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-[#171717] px-6 py-28 text-[#F6F7ED] sm:px-16 md:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono-tech text-xs font-bold uppercase tracking-[0.25em] text-white/45">03 / Quest Board</p>
            <h2 id="projects-title" className="mt-4 text-5xl font-bold tracking-[-0.06em] sm:text-7xl">Selected <span className="font-serif font-normal italic">missions.</span></h2>
            <p className="mt-5 max-w-lg leading-relaxed text-white/60">A live feed of experiments and digital products. Each card is a checkpoint in the build process.</p>
          </div>
          <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-wider text-white/50"><LuFolderKanban className="size-4" aria-hidden="true" /> <span>{projects.length} records</span></div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter missions by status">
          {(['all', 'completed', 'ongoing', 'planned'] as const).map(status => (
            <button key={status} type="button" aria-pressed={activeStatus === status} onClick={() => setActiveStatus(status)} className={`min-h-11 border px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeStatus === status ? 'border-white bg-[#F6F7ED] text-black' : 'border-white/20 hover:border-white'}`}>
              {status === 'all' ? 'All missions' : statusLabels[status]}
            </button>
          ))}
        </div>

        {loading && <div className="flex min-h-64 items-center justify-center gap-3 font-mono-tech text-sm text-white/60"><LuLoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Syncing mission data...</div>}
        {!loading && error && <div className="mt-10 flex flex-col items-center gap-4 border border-red-300/30 bg-red-950/20 p-8 text-center"><LuCircleAlert className="size-6 text-red-300" aria-hidden="true" /><p className="text-sm text-red-100">Mission data is offline. Start the API server to sync the board.</p><button type="button" onClick={() => void refetch()} className="inline-flex min-h-11 items-center gap-2 border border-white/25 px-4 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black cursor-pointer"><LuRefreshCw className="size-4" aria-hidden="true" /> Retry sync</button></div>}
        {!loading && !error && visibleProjects.length === 0 && <p className="mt-10 border border-white/15 p-8 text-center font-mono-tech text-sm text-white/60">No missions match this status.</p>}

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.article key={project.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group flex min-h-80 flex-col border border-white/15 bg-white/5 p-5 hover:border-[#60A5FA] transition-colors">
              <div className="relative aspect-[4/3] overflow-hidden bg-black"><img src={project.imageUrl} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /></div>
              <div className="mt-5 flex flex-1 flex-col"><div className="flex items-center justify-between gap-3 font-mono-tech text-[10px] uppercase tracking-wider text-white/45"><span>{project.anime}</span><span className="text-emerald-300">{statusLabels[project.status]}</span></div><h3 className="mt-3 text-xl font-bold">{project.title}</h3><p className="mt-2 text-sm leading-relaxed text-white/60">{project.description}</p><div className="mt-auto flex items-center justify-between pt-6 text-xs font-mono-tech text-white/40"><span>MISSION {String(project.id).padStart(2, '0')}</span><LuArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></div></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
