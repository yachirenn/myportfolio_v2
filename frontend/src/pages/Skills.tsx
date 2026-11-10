import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LuArrowUpRight, LuCheck, LuCode, LuLayers3, LuMousePointer2, LuServer, LuSmartphone, LuWrench } from 'react-icons/lu'
import { skills, type Skill, type SkillGroup } from '../data/skills'

const groups: Array<{ label: SkillGroup; icon: typeof LuCode }> = [
  { label: 'Frontend', icon: LuCode },
  { label: 'Backend', icon: LuServer },
  { label: 'Mobile', icon: LuSmartphone },
  { label: 'Tools', icon: LuWrench },
]

function SkillTile({ skill, selected, onSelect }: { skill: Skill; selected: boolean; onSelect: () => void }) {
  const Icon = skill.icon

  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={selected}
      className={`group relative min-h-32 border-2 p-4 text-left transition-colors cursor-pointer ${
        selected ? 'border-black bg-black text-[#F6F7ED] shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]' : 'border-black/15 bg-white hover:border-black/60'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="grid size-10 place-items-center border border-current/20 bg-black/5" style={{ color: selected ? '#F6F7ED' : skill.color }}>
          <Icon size={23} aria-hidden="true" />
        </span>
        {selected && <LuCheck className="size-4 text-[#60A5FA]" aria-hidden="true" />}
      </div>
      <div className="mt-6">
        <p className="font-bold tracking-tight">{skill.name}</p>
        <p className={`mt-1 text-xs ${selected ? 'text-white/60' : 'text-black/50'}`}>{skill.category}</p>
      </div>
    </motion.button>
  )
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<SkillGroup | 'All'>('All')
  const [selectedSkillName, setSelectedSkillName] = useState<string>(skills[0].name)

  const filteredSkills = useMemo(
    () => activeGroup === 'All' ? skills : skills.filter(skill => skill.group === activeGroup),
    [activeGroup],
  )

  const selectedSkill = useMemo(() => {
    return filteredSkills.find(skill => skill.name === selectedSkillName) ?? filteredSkills[0] ?? skills[0]
  }, [filteredSkills, selectedSkillName])

  const SelectedIcon = selectedSkill.icon

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden bg-[#F6F7ED] px-6 py-28 sm:px-16 md:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b-2 border-black pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono-tech text-xs font-bold uppercase tracking-[0.25em] text-black/55">02 / Loadout Matrix</p>
            <h2 id="skills-title" className="mt-4 max-w-2xl text-5xl font-bold tracking-[-0.06em] sm:text-7xl">
              Skills <span className="font-serif font-normal italic">&amp;</span> tools.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#65594f]">Select a module to inspect the technologies behind the builds.</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-wider text-black/60">
            <LuLayers3 className="size-4" aria-hidden="true" />
            <span>{skills.length.toString().padStart(2, '0')} modules indexed</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
          <button
            type="button"
            aria-pressed={activeGroup === 'All'}
            onClick={() => setActiveGroup('All')}
            className={`min-h-11 border px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeGroup === 'All' ? 'border-black bg-black text-white' : 'border-black/20 bg-white hover:border-black'}`}
          >
            All modules
          </button>
          {groups.map(({ label, icon: GroupIcon }) => (
            <button
              key={label}
              type="button"
              aria-pressed={activeGroup === label}
              onClick={() => setActiveGroup(label)}
              className={`inline-flex min-h-11 items-center gap-2 border px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeGroup === label ? 'border-black bg-black text-white' : 'border-black/20 bg-white hover:border-black'}`}
            >
              <GroupIcon className="size-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map(skill => (
                <SkillTile key={skill.name} skill={skill} selected={skill.name === selectedSkill.name} onSelect={() => setSelectedSkillName(skill.name)} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.aside layout className="order-first flex min-h-72 flex-col justify-between border-2 border-black bg-[#171717] p-6 text-[#F6F7ED] lg:order-none lg:sticky lg:top-28 lg:h-fit">
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/50">
                <span className="flex items-center gap-2"><LuMousePointer2 className="size-3" aria-hidden="true" /> Module selected</span>
                <span>#{String(skills.indexOf(selectedSkill) + 1).padStart(2, '0')}</span>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <span className="grid size-16 place-items-center border border-white/20 bg-white/5" style={{ color: selectedSkill.color }}>
                  <SelectedIcon size={34} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{selectedSkill.name}</p>
                  <p className="mt-1 text-sm text-white/55">{selectedSkill.category}</p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 font-mono-tech text-xs">
                <div className="border border-white/10 p-3"><span className="block text-white/40">TYPE</span><span className="mt-1 block">{selectedSkill.group}</span></div>
                <div className="border border-white/10 p-3"><span className="block text-white/40">STATUS</span><span className="mt-1 block text-emerald-300">ACTIVE</span></div>
              </div>
            </div>
            <a href={selectedSkill.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center justify-between border border-white/30 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white hover:text-black">
              Visit official docs <LuArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
