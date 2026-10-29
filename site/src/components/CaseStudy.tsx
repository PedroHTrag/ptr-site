import { PROJECTS } from '../data'
import { Blob, Dots, Footer, Icon, MaskText, container, stagger, type IconName } from './ui'

/** Modelo de página de estudo de caso (contexto, meu papel, o que foi entregue). */
export default function CaseStudy({ slug }: { slug: string }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const project = PROJECTS[index]

  if (!project) {
    return (
      <main className={`${container} pb-24 pt-[140px]`}>
        <p className="font-mono text-[20px] font-bold">Projeto não encontrado.</p>
        <a href="#projetos" className="group mt-4 inline-flex items-center gap-2 font-mono text-[13px] font-bold text-mute hover:text-ink">
          <Icon name="arrowLeft" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Projetos
        </a>
      </main>
    )
  }

  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const meta = [
    ['Setor', project.sector],
    ['Categoria', project.categories.join(' · ')],
    ['Cliente', project.client],
    ...(project.year ? [['Ano', project.year]] : []),
  ]

  return (
    <>
      <main className="relative pt-[112px] md:pt-[136px]">
        <Blob shape={2} parallax={0.1} className="absolute -right-24 top-28 hidden h-64 w-52 bg-ink md:block" />
        <Dots parallax={0.18} className="absolute right-24 top-[340px] hidden h-20 w-24 text-sun md:block" />

        <div className={`${container} relative`}>
          <a
            href="#projetos"
            data-reveal="fade"
            className="group inline-flex items-center gap-2 font-mono text-[13px] font-bold text-mute transition-colors hover:text-ink"
          >
            <Icon name="arrowLeft" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Projetos
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p data-reveal="up" style={stagger(0)} className="font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-mute">
                Estudo de caso · {project.label}
              </p>
              <h1 data-reveal="mask" className="mt-4 font-mono text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-ink md:text-[60px]">
                <MaskText text={project.name} start={1} />
              </h1>
              <p data-reveal="up" style={stagger(2)} className="mt-3 font-mono text-[18px] font-bold text-sun md:text-[22px]">
                {project.sector}
              </p>
              <p data-reveal="up" style={stagger(3)} className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-mute">
                {project.description}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
              {meta.map(([key, value], i) => (
                <div key={key} data-reveal="up" style={stagger(2 + i)} className="rounded-xl bg-white px-4 py-3.5 shadow-card">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">{key}</dt>
                  <dd className="mt-1 font-mono text-[13.5px] font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-[1380px] px-4 md:px-6">
          <figure data-reveal="zoom" style={stagger(4)} className="img-sweep h-[280px] overflow-hidden rounded-2xl bg-[#E3E3DF] md:h-[520px]">
            <img src={project.cover.src} alt={project.cover.alt} fetchPriority="high" className="h-full w-full object-cover" />
          </figure>
        </div>

        {project.wordmark && (
          <div className={`${container} relative mt-8`}>
            <figure className="flex min-h-28 items-center justify-center rounded-xl bg-white px-8 py-6 shadow-card">
              <img src={project.wordmark.src} alt={project.wordmark.alt} className="max-h-20 max-w-full object-contain" />
            </figure>
          </div>
        )}

        <div className={`${container} relative mt-16 md:mt-24`}>
          <div className="grid gap-5 md:grid-cols-3">
            <CaseBlock index={0} icon="target" title="Contexto" text={project.context} />
            <CaseBlock index={1} icon="pen" title="Meu papel" text={project.role} />
            <div
              data-reveal="up"
              style={stagger(2)}
              className="group rounded-2xl bg-ink p-7 text-white shadow-card transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift md:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-sun text-ink transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:-rotate-6">
                <Icon name="layers" className="size-5" />
              </span>
              <h2 className="mt-6 font-mono text-[18px] font-bold">O que foi entregue</h2>
              <ul className="mt-4 space-y-2">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] text-white/70">
                    <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-sun" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1380px] px-4 md:px-6">
          <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:auto-rows-[340px] lg:grid-cols-12">
            {project.gallery.map((image, i) => {
              const layout = [
                'sm:col-span-2 lg:col-span-7',
                'lg:col-span-5',
                'lg:col-span-4',
                'sm:col-span-2 lg:col-span-8',
              ][i % 4]
              return (
                <figure
                  key={image.src}
                  data-reveal="zoom"
                  style={stagger(i % 2)}
                  className={`img-sweep overflow-hidden rounded-lg bg-[#E3E3DF] ${layout}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </figure>
              )
            })}
          </div>
        </div>

        <div className={`${container} relative pb-16 pt-20`}>
          <a
            href={`#/projeto/${next.slug}`}
            data-reveal="up"
            className="group flex items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-card transition-[translate,scale,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift active:scale-[0.99] md:p-8"
          >
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-mute">Próximo projeto</p>
              <p className="mt-2 font-mono text-[22px] font-bold text-ink md:text-[28px]">{next.name}</p>
              <p className="text-[14px] text-mute">{next.sector}</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sun text-ink transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrowRight" />
            </span>
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}

function CaseBlock({ index, icon, title, text }: { index: number; icon: IconName; title: string; text: string }) {
  return (
    <div
      data-reveal="up"
      style={stagger(index)}
      className="group rounded-2xl bg-white p-7 shadow-card transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift md:p-8"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:-rotate-6">
        <Icon name={icon} className="size-5" />
      </span>
      <h2 className="mt-6 font-mono text-[18px] font-bold text-ink">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-mute">{text}</p>
    </div>
  )
}
