import { Fragment, type CSSProperties, type ReactNode } from 'react'

export const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-10'

/** Índice de cascata das animações de entrada (multiplicado por --motion-stagger no CSS). */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties

const btnBase =
  'group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-mono text-[13px] font-bold transition-[transform,translate,scale,box-shadow,background-color,color] duration-300 ease-smooth hover:-translate-y-0.5 active:scale-[0.97]'
export const btnSun = `${btnBase} btn-shine relative overflow-hidden bg-sun text-ink hover:shadow-[0_14px_26px_-14px_rgba(255,180,0,0.95)]`
export const btnInk = `${btnBase} bg-ink text-white hover:bg-[#2a2a2a] hover:shadow-[0_14px_26px_-14px_rgba(17,17,17,0.55)]`

/** Ícones dentro de elementos com `group` deslizam levemente no hover. */
export const nudgeRight = 'transition-transform duration-300 ease-smooth group-hover:translate-x-1'
export const nudgeDown = 'transition-transform duration-300 ease-smooth group-hover:translate-y-0.5'

const ICONS = {
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </>
  ),
  arrowUpRight: (
    <>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </>
  ),
  arrowRight: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  arrowLeft: (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </>
  ),
  arrowUp: (
    <>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </>
  ),
  pen: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  className = 'size-5',
  strokeWidth = 1.8,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

const SHAPES = [
  '62% 38% 46% 54% / 56% 44% 56% 44%',
  '42% 58% 63% 37% / 41% 44% 56% 59%',
  '55% 45% 38% 62% / 63% 39% 61% 37%',
  '38% 62% 56% 44% / 48% 58% 42% 52%',
  '70% 30% 52% 48% / 44% 62% 38% 56%',
]

/** Forma orgânica decorativa (blob) que flutua lentamente; `parallax` define a velocidade do parallax. */
export function Blob({
  shape = 0,
  className = '',
  style,
  parallax,
  float = true,
}: {
  shape?: number
  className?: string
  style?: CSSProperties
  parallax?: number
  /** Desligado nos blobs atrás das fotos, para a foto recortada acompanhar o contorno exato. */
  float?: boolean
}) {
  const index = shape % SHAPES.length
  return (
    <div
      aria-hidden="true"
      data-parallax={parallax}
      className={`pointer-events-none ${float ? 'motion-safe:animate-float' : ''} ${className}`}
      style={{
        borderRadius: SHAPES[index],
        animationDuration: `${15 + index * 2}s`,
        animationDelay: `${-index * 3}s`,
        ...style,
      }}
    />
  )
}

export function Dots({ className = '', parallax }: { className?: string; parallax?: number }) {
  return <div aria-hidden="true" data-parallax={parallax} className={`dots pointer-events-none rounded-full ${className}`} />
}

export function OutlineWord({ children, className = '', parallax }: { children: ReactNode; className?: string; parallax?: number }) {
  return (
    <span
      aria-hidden="true"
      data-parallax={parallax}
      className={`text-outline pointer-events-none absolute select-none whitespace-nowrap font-hand leading-none ${className}`}
    >
      {children}
    </span>
  )
}

/** Divide o texto em palavras para a revelação por máscara (use dentro de um elemento com data-reveal="mask"). */
export function MaskText({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="mask-word">
            <span className="mask-inner" style={stagger(start + i)}>
              {word}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}

/** Contorno SVG (viewBox 0–100) idêntico ao `border-radius` orgânico de um blob. */
function blobMask(shape: number) {
  const [h, v] = SHAPES[shape % SHAPES.length].split('/').map((part) => part.trim().split(/\s+/).map(parseFloat))
  const f = Math.min(1, 100 / (h[0] + h[1]), 100 / (h[3] + h[2]), 100 / (v[0] + v[3]), 100 / (v[1] + v[2]))
  const [tl, tr, br, bl] = h.map((n) => n * f)
  const [tlv, trv, brv, blv] = v.map((n) => n * f)
  const d = `M${tl} 0H${100 - tr}A${tr} ${trv} 0 0 1 100 ${trv}V${100 - brv}A${br} ${brv} 0 0 1 ${100 - br} 100H${bl}A${bl} ${blv} 0 0 1 0 ${100 - blv}V${tlv}A${tl} ${tlv} 0 0 1 ${tl} 0Z`
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='${d}'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

/**
 * Foto recortada (PNG sem fundo) sobre um blob: a base e as laterais acompanham o contorno do blob
 * e a parte de cima (cabeça) fica livre para "sair" da forma. `boxClassName` deve ser igual ao do blob.
 * A imagem mantém a proporção original (largura em %, altura automática) e recebe sombra suave.
 * As bordas retas do enquadramento original já vêm suavizadas no próprio PNG.
 */
export function BlobPhoto({
  src,
  width,
  height,
  shape,
  boxClassName,
  imgClassName,
  priority = false,
}: {
  src: string
  width: number
  height: number
  shape: number
  boxClassName: string
  imgClassName: string
  priority?: boolean
}) {
  const mask = `${blobMask(shape)}, linear-gradient(to bottom, #000 0 42%, transparent 50%)`
  return (
    <div className={`pointer-events-none ${boxClassName}`} style={{ filter: 'drop-shadow(0 12px 16px rgb(17 17 17 / 0.18))' }}>
      <div
        className="absolute inset-0"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskComposite: 'add',
          WebkitMaskComposite: 'source-over',
        }}
      >
        <img
          src={src}
          alt="Pedro Tragante"
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          className={`block h-auto max-w-none ${imgClassName}`}
        />
      </div>
    </div>
  )
}

export function ImagePlaceholder({ label, className = '', style }: { label: string; className?: string; style?: CSSProperties }) {
  return (
    <div
      data-reveal="zoom"
      style={style}
      className={`img-sweep relative flex items-center justify-center overflow-hidden bg-[#E3E3DF] ${className}`}
      role="img"
      aria-label={`${label} (imagem provisória)`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 18px, rgb(255 255 255 / 0.3) 18px 19px)' }}
      />
      <div className="relative flex flex-col items-center gap-2.5 text-[#94948F]">
        <Icon name="image" className="size-7" strokeWidth={1.5} />
        <span className="font-mono text-[13px] font-bold tracking-wide">{label}</span>
      </div>
    </div>
  )
}

export function LogoPlaceholder({ n, dark = false }: { n: number; dark?: boolean }) {
  const label = `Logo ${String(n).padStart(2, '0')}`
  return (
    <div className="flex items-center gap-2.5" role="img" aria-label={`${label} (provisório)`}>
      <span className={`size-8 rounded-lg ${dark ? 'bg-[#3a3a3a]' : 'bg-[#E0E0DC]'}`} />
      <span className={`font-mono text-[14px] font-bold ${dark ? 'text-[#8d8d88]' : 'text-[#A3A39E]'}`}>{label}</span>
    </div>
  )
}

const headingCls = 'font-mono text-[28px] font-bold leading-[1.15] tracking-[-0.01em] text-ink md:text-[36px]'

export function SectionHeading({ title, center = false }: { title: string; center?: boolean }) {
  if (center) {
    return (
      <div data-reveal="mask" className="text-center">
        <h2 className={headingCls}>
          <MaskText text={title} />
        </h2>
        <span data-bar="x" aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-12 rounded-full bg-sun" />
      </div>
    )
  }
  return (
    <div data-reveal="mask" className="flex gap-4">
      <span data-bar aria-hidden="true" className="my-1 w-[3px] shrink-0 rounded-full bg-sun" />
      <h2 className={headingCls}>
        <MaskText text={title} />
      </h2>
    </div>
  )
}

export function Footer() {
  return (
    <footer data-reveal="fade" className="py-8 text-center text-[13px] text-mute">
      © 2026 Pedro Tragante
    </footer>
  )
}
