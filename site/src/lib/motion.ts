import { useEffect } from 'react'

const media = (query: string) => {
  let list: MediaQueryList | undefined
  return () => (list ??= window.matchMedia(query)).matches
}

/** Mouse/trackpad com hover e sem preferência por menos movimento. */
export const canHoverFine = media('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
const isDesktop = media('(min-width: 1024px)')

/**
 * Marca com `data-revealed` os elementos `[data-reveal]` quando entram na tela
 * (inclusive os montados depois, como a galeria ao trocar de filtro).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ok')) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    const scan = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el))
    }

    scan(document)
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('[data-reveal]:not([data-revealed])')) io.observe(node)
          scan(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/** Parallax leve em `[data-parallax="velocidade"]`; apenas desktop com mouse. Usa a propriedade `translate`. */
export function useParallax(routeKey: string) {
  useEffect(() => {
    if (!canHoverFine() || !isDesktop()) return

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => ({
      el,
      speed: Number(el.dataset.parallax) || 0,
      offset: 0,
    }))
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      for (const item of items) {
        const rect = item.el.getBoundingClientRect()
        const center = rect.top - item.offset + rect.height / 2
        if (center < -vh || center > vh * 2) continue
        item.offset = (vh / 2 - center) * item.speed
        item.el.style.translate = `0 ${item.offset.toFixed(1)}px`
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      for (const item of items) item.el.style.translate = ''
    }
  }, [routeKey])
}
