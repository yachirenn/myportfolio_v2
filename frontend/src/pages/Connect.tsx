import { useState } from 'react'
import { LuCheck, LuCopy, LuDownload, LuMail, LuRadio, LuSparkles } from 'react-icons/lu'

const EMAIL = 'rendysulistyawan11@gmail.com'

export default function Connect() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="connect" aria-labelledby="connect-title" className="relative overflow-hidden bg-[#F6F7ED] px-6 py-28 sm:px-16 md:px-32">
      <div className="mx-auto max-w-5xl border-2 border-black bg-white p-8 sm:p-12 md:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col gap-6 border-b-2 border-black pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-xs font-bold uppercase tracking-[0.25em] text-black/55">04 / Comms Deck</p>
            <h2 id="connect-title" className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Open a channel.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5c4a3a]">
              Have a project in mind, an internship opening, or just want to chat about web technology and anime?
              Send a transmission.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-black/70">
            <LuRadio className="size-4 animate-pulse text-emerald-600" aria-hidden="true" />
            <span>Channel standby</span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={copyEmail}
            className="group flex min-h-24 items-center justify-between border-2 border-black bg-[#F6F7ED] p-5 text-left transition-colors hover:bg-black hover:text-white cursor-pointer"
          >
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-wider text-black/50 group-hover:text-white/60">Primary frequency</p>
              <p className="mt-1 font-bold text-sm sm:text-base break-all">{EMAIL}</p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center border border-current">
              {copied ? <LuCheck className="size-4 text-emerald-500" aria-hidden="true" /> : <LuCopy className="size-4" aria-hidden="true" />}
            </span>
          </button>

          <a
            href={`mailto:${EMAIL}`}
            className="flex min-h-24 items-center justify-between border-2 border-black bg-black p-5 text-left text-white transition-colors hover:bg-[#2563EB] cursor-pointer"
          >
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-wider text-white/50">Compose transmission</p>
              <p className="mt-1 font-bold text-sm sm:text-base">Launch email client</p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center border border-white/20">
              <LuMail className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-6 font-mono-tech text-xs text-black/70">
          <div className="flex flex-wrap gap-4">
            <span>LOCATION: INDONESIA</span>
            <span>ZONE: UTC+7</span>
            <span>STATUS: ACTIVE</span>
          </div>
          <a
            href="/assets/CV_by_yachirenn.pdf"
            download="yachirenn_Resume_download.pdf"
            className="inline-flex min-h-11 items-center gap-2 border border-black px-4 font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white cursor-pointer"
          >
            <LuDownload className="size-4" aria-hidden="true" />
            Download resume
          </a>
        </div>

        <div className="mt-8 flex items-center gap-2 font-mono-tech text-[11px] text-black/40 uppercase">
          <LuSparkles className="size-3 text-[#2563EB]" aria-hidden="true" />
          <span>Prompt reply guaranteed within 24 hours</span>
        </div>
      </div>
    </section>
  )
}
