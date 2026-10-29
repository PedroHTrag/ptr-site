import { useEffect, useRef, useState } from 'react'
import { canHoverFine } from '../lib/motion'
import { Icon } from './ui'

/** Barra fina de progresso de rolagem no topo da página. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={bar} className="h-full origin-left bg-sun" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

/** Botão "voltar ao topo" que aparece depois de rolar. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`group fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full bg-ink text-white shadow-lift transition-[opacity,translate,scale,background-color,color] duration-500 hover:-translate-y-1 hover:bg-sun hover:text-ink active:scale-[0.94] md:bottom-8 md:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="arrowUp" className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  )
}

/**
 * Círculo discreto que segue o mouse com leve atraso e cresce sobre links e botões.
 * Também aplica o efeito magnético em elementos `[data-magnetic]`.
 */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !canHoverFine()) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    let magnet: HTMLElement | null = null

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(loop) : 0
    }
    const release = () => {
      if (magnet) magnet.style.transform = ''
      magnet = null
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      if (!el.hasAttribute('data-visible')) {
        x = tx
        y = ty
        el.setAttribute('data-visible', '')
      }

      const target = e.target instanceof Element ? e.target : null
      el.toggleAttribute('data-active', !!target?.closest('a, button, [role="button"]'))

      const next = target?.closest<HTMLElement>('[data-magnetic]') ?? null
      if (next !== magnet) release()
      if (next) {
        magnet = next
        const rect = next.getBoundingClientRect()
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.28
        next.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`
      }

      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => {
      el.removeAttribute('data-visible')
      release()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      release()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="cursor-follower">
      <span className="cursor-ring" />
    </div>
  )
}
