import { useEffect, useState } from 'react'
import { LINKS, NAV } from '../data'
import { Icon } from './ui'

export default function Header({ active }: { active: string | null }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const iconLink =
    'flex size-10 items-center justify-center rounded-full text-ink transition-[translate,scale,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-card active:scale-95'

  return (
    <header
      className={`header-enter fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled || open ? 'bg-paper/80 shadow-[0_1px_0_rgba(17,17,17,0.06)] backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#inicio" className="font-mono text-[17px] font-bold tracking-tight text-ink">
          Pedro Tragante
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full bg-white p-1.5 shadow-card">
            {NAV.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 after:pointer-events-none after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-smooth ${
                      isActive ? 'bg-sun text-ink after:opacity-0' : 'text-ink/65 hover:text-ink hover:after:scale-x-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`${iconLink} hidden md:flex`}>
            <Icon name="linkedin" className="size-[17px]" />
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={`${iconLink} hidden md:flex`}>
            <Icon name="instagram" className="size-[17px]" />
          </a>
          <a
            href={LINKS.cv}
            download
            data-magnetic
            className="group ml-2 hidden items-center gap-2 rounded-md bg-ink px-4 py-2.5 font-mono text-[12.5px] font-bold text-white transition-[transform,translate,scale,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a] hover:shadow-[0_14px_26px_-14px_rgba(17,17,17,0.55)] active:scale-[0.97] sm:inline-flex"
          >
            <Icon name="download" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Currículo (PDF)
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="ml-2 flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-card transition-[scale] duration-300 active:scale-95 lg:hidden"
          >
            {/* Ícone hambúrguer que se transforma em "X" */}
            <span aria-hidden="true" className="relative block h-3.5 w-[18px]">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-transform duration-500 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-current transition-[opacity,scale] duration-300 ${
                  open ? 'scale-x-0 opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current transition-transform duration-500 ${
                  open ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={`absolute inset-x-0 top-full bg-paper/95 px-5 pb-5 shadow-[0_1px_0_rgba(17,17,17,0.06)] transition-[opacity,translate,visibility] duration-500 md:px-10 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <nav aria-label="Seções" className="rounded-2xl bg-white p-3 shadow-card">
          <ul className="grid gap-0.5">
            {NAV.map((item, i) => (
              <li
                key={item.id}
                className={`transition-[opacity,translate] duration-500 ${open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    active === item.id ? 'bg-sun text-ink' : 'text-ink/75 hover:bg-paper hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center gap-1 border-t border-[#EEEEEA] px-1 pt-3">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
              <Icon name="linkedin" className="size-[17px]" />
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={iconLink}>
              <Icon name="instagram" className="size-[17px]" />
            </a>
            <a
              href={LINKS.cv}
              download
              className="group ml-auto inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 font-mono text-[12.5px] font-bold text-white transition-[scale] duration-300 active:scale-[0.97] sm:hidden"
            >
              <Icon name="download" className="size-4" />
              Currículo (PDF)
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
