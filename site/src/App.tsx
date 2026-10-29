import { useEffect, useState } from 'react'
import CaseStudy from './components/CaseStudy'
import Header from './components/Header'
import Home from './components/Home'
import { BackToTop, CursorFollower, ScrollProgress } from './components/Motion'
import { SECTION_IDS } from './data'
import { useParallax, useScrollReveal } from './lib/motion'

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

/** Destaca no menu a seção que está no centro da tela. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [enabled])
  return active
}

export default function App() {
  const hash = useHash()
  // Estudos de caso usam rotas no formato #/projeto/<slug>; os demais hashes são âncoras da página.
  const caseSlug = hash.match(/^#\/projeto\/([\w-]+)/)?.[1] ?? null
  const routeKey = caseSlug ?? 'home'
  const active = useActiveSection(caseSlug === null)

  useScrollReveal()
  useParallax(routeKey)

  useEffect(() => {
    if (caseSlug) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = window.location.hash.slice(1)
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [caseSlug])

  return (
    <div className="min-h-screen overflow-x-clip">
      <ScrollProgress />
      <Header active={caseSlug ? null : active} />
      {/* A chave por rota reinicia a transição de entrada ao trocar de página */}
      <div key={routeKey} className="page-enter">
        {caseSlug ? <CaseStudy slug={caseSlug} /> : <Home />}
      </div>
      <BackToTop />
      <CursorFollower />
    </div>
  )
}
