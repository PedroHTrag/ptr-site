import { useMemo, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { COURSES, EDUCATION, EXPERIENCE, FILTERS, LINKS, PROJECTS, SKILLS, TOOLS, type EduItem, type Filter, type Project } from '../data'
import { canHoverFine } from '../lib/motion'
import fotoFormacao from '../assets/fotos/pedro-formacao.png'
import fotoInicio from '../assets/fotos/pedro-inicio-recortada.png'
import fotoSobre from '../assets/fotos/pedro-sobre.png'
import {
  Blob,
  BlobPhoto,
  Dots,
  Footer,
  Icon,
  MaskText,
  OutlineWord,
  SectionHeading,
  btnInk,
  btnSun,
  container,
  nudgeDown,
  nudgeRight,
  stagger,
  type IconName,
} from './ui'

const lead = 'text-[16px] leading-[1.75] text-mute'

/* Caixas dos blobs amarelos atrás das fotos (a foto usa exatamente a mesma caixa para seguir o contorno) */
const heroBlobBox = 'absolute -right-8 top-[3%] h-[95%] w-[104%] lg:-right-28 lg:-top-22 lg:h-[108%] lg:w-[118%]'
const aboutBlobBox = 'absolute inset-x-[2%] bottom-0 top-[14%]'
const eduBlobBox = 'absolute bottom-0 left-0 size-[84%]'
/** Card sobe levemente e a sombra se intensifica no hover. */
const cardHover = 'transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift'
/** Ícone dá um leve "pulo" quando o card (group) recebe hover. */
const iconHop = 'transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:-rotate-6'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

/* 1) Início */
const HERO_CARDS: { icon: IconName; title: string; tone: string; link?: boolean }[] = [
  { icon: 'pen', title: 'Identidade visual', tone: 'bg-ink text-white' },
  { icon: 'layers', title: 'Design de marca', tone: 'bg-sun text-ink' },
  { icon: 'briefcase', title: 'Fundador da P.TR Estúdio Criativo', tone: 'bg-paper text-ink ring-1 ring-[#E6E6E1]', link: true },
]

function Hero() {
  return (
    <section id="inicio" className="relative pt-[108px] md:pt-[132px]" style={{ '--motion-stagger': '120ms' } as CSSProperties}>
      <Blob shape={2} parallax={0.12} className="absolute -left-28 top-[38%] hidden h-[280px] w-[200px] bg-ink md:block" />
      <Dots parallax={0.2} className="absolute left-14 top-[62%] hidden h-24 w-24 text-sun md:block" />

      <div className={`${container} relative grid items-center gap-12 lg:grid-cols-12 lg:gap-6`}>
        <div className="relative lg:col-span-6 lg:pb-8">
          <p data-reveal="up" style={stagger(0)} className="flex items-center gap-3 font-mono text-[14px] font-bold text-ink">
            <span aria-hidden="true" className="h-[2px] w-8 bg-sun" />
            Olá, sou
          </p>
          <h1 data-reveal="mask" className="mt-4 font-mono text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-ink md:text-[60px]">
            <MaskText text="Pedro Tragante" start={1} />
          </h1>
          <p data-reveal="up" style={stagger(3)} className="mt-3 font-mono text-[20px] font-bold leading-snug text-sun md:text-[26px]">
            Designer gráfico e estrategista de marca
          </p>
          <p data-reveal="up" style={stagger(4)} className={`${lead} mt-6 max-w-[470px]`}>
            Desenvolvo identidades visuais e sistemas de marca para empresas de médio porte. Fundador da P.TR Estúdio Criativo.
          </p>

          <dl data-reveal="up" style={stagger(5)} className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="font-mono text-[13px] font-bold text-ink">E-mail:</dt>
              <dd className="mt-1 text-[14px] text-mute">
                <a href={`mailto:${LINKS.email}`} className="transition-colors hover:text-ink">
                  {LINKS.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[13px] font-bold text-ink">LinkedIn:</dt>
              <dd className="mt-1 text-[14px] text-mute">
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                  {LINKS.linkedinHandle}
                </a>
              </dd>
            </div>
          </dl>

          <div data-reveal="up" style={stagger(6)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projetos" data-magnetic className={btnSun}>
              Projetos
              <Icon name="arrowRight" className={`size-4 ${nudgeRight}`} />
            </a>
            <a href={LINKS.cv} download data-magnetic className={btnInk}>
              Currículo (PDF)
            </a>
          </div>

          <div
            data-reveal="fade"
            style={stagger(8)}
            className="mt-12 hidden items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-mute md:flex"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-sun motion-safe:animate-pulse" />
            <span aria-hidden="true" className="h-px w-14 bg-ink/20" />
            Role a página
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div data-reveal="zoom" style={stagger(2)} className="relative mx-auto aspect-[1/1.04] w-full max-w-[520px] lg:max-w-none">
            <Blob shape={0} float={false} className={`${heroBlobBox} bg-sun`} />
            <Blob shape={3} parallax={0.16} className="absolute -left-[3%] bottom-[10%] size-[24%] bg-ink" />
            <Dots parallax={0.1} className="absolute bottom-[3%] right-[4%] h-20 w-28 text-ink/25" />
            <BlobPhoto
              src={fotoInicio}
              width={768}
              height={790}
              shape={0}
              priority
              boxClassName={heroBlobBox}
              imgClassName="absolute bottom-0 left-0 w-[90%] lg:bottom-[-96px] lg:left-auto lg:-right-[56px] lg:w-[102%]"
            />
          </div>
        </div>
      </div>

      <div className={`${container} relative mt-10 lg:-mt-6`}>
        <ul className="grid gap-4 sm:grid-cols-3 lg:max-w-[920px] lg:gap-6">
          {HERO_CARDS.map((card, i) => (
            <li
              key={card.title}
              data-reveal="up"
              style={stagger(7 + i)}
              className={`group flex items-center gap-3.5 rounded-xl bg-white px-5 py-4 shadow-card ${cardHover}`}
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${card.tone} ${iconHop}`}>
                <Icon name={card.icon} className="size-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[13px] font-bold leading-snug text-ink">{card.title}</p>
                {card.link && (
                  <a
                    href={LINKS.studio}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link mt-1 inline-flex items-center gap-1 text-[12.5px] text-mute underline-offset-2 transition-colors hover:text-ink hover:underline"
                  >
                    {LINKS.studioLabel}
                    <Icon
                      name="arrowUpRight"
                      className="size-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 2) Sobre */
function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <Blob shape={4} parallax={0.1} className="absolute -right-16 top-2 hidden h-[160px] w-[130px] bg-ink md:block" />
      <Blob shape={1} parallax={0.05} className="absolute -left-52 bottom-0 hidden size-[440px] bg-[#EFEFEB] lg:block" />

      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        <div className="relative order-2 mx-auto w-full max-w-[480px] lg:order-1">
          <div data-reveal="zoom" className="relative aspect-[1/0.95]">
            <Blob shape={1} float={false} className={`${aboutBlobBox} bg-sun`} />
            <Dots parallax={0.12} className="absolute -left-6 bottom-6 h-24 w-20 text-ink/25" />
            <BlobPhoto
              src={fotoSobre}
              width={900}
              height={722}
              shape={1}
              boxClassName={aboutBlobBox}
              imgClassName="absolute bottom-0 left-[2.08%] w-[95.83%]"
            />
            <p
              aria-hidden="true"
              data-reveal="up"
              style={stagger(3)}
              className="absolute -left-1 top-[4%] -rotate-6 font-hand text-[84px] leading-none text-ink sm:text-[112px] lg:-left-8 lg:text-[124px]"
            >
              Olá!
            </p>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <SectionHeading title="Sobre mim" />
          <p data-reveal="up" style={stagger(1)} className={`${lead} mt-6`}>
            Designer gráfico e estrategista de marca com 8 anos de experiência. Atuo com identidade visual e design de marca, com
            projetos desenvolvidos para mercados da América Latina.
          </p>
          <p data-reveal="up" style={stagger(2)} className={`${lead} mt-4`}>
            Formado em Design pela FIB Bauru e técnico em Processos Gráficos pelo SENAI, atuei nos setores industrial
            (automotivo), de telecomunicações e varejo, com identidade visual, manuais de marca, embalagens, rótulos e
            pré-impressão. Desenvolvi mais de 20 marcas validadas nos mercados nacional e internacional e hoje curso
            pós-graduações em Branding e Design Thinking.
          </p>

          <p data-reveal="up" style={stagger(3)} className="mt-9 font-mono text-[13px] font-bold text-ink">
            Perfis
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <SocialCard index={4} href={LINKS.linkedin} icon="linkedin" network="LinkedIn" name={LINKS.linkedinName} tone="bg-ink text-white" />
            <SocialCard index={5} href={LINKS.instagram} icon="instagram" network="Instagram" name={LINKS.instagramHandle} tone="bg-sun text-ink" />
          </ul>
        </div>
      </div>
    </section>
  )
}

function SocialCard({
  index,
  href,
  icon,
  network,
  name,
  tone,
}: {
  index: number
  href: string
  icon: IconName
  network: string
  name: string
  tone: string
}) {
  return (
    <li data-reveal="up" style={stagger(index)}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 rounded-lg bg-white py-2 pl-2 pr-5 shadow-card transition-[translate,scale,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97]"
      >
        <span className={`flex size-9 items-center justify-center rounded-md ${tone} ${iconHop}`}>
          <Icon name={icon} className="size-4" />
        </span>
        <span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-mute">{network}</span>
          <span className="block text-[14px] font-medium text-ink">{name}</span>
        </span>
      </a>
    </li>
  )
}

/* 3) Competências */
function Skills() {
  return (
    <section id="competencias" className="relative py-24 md:py-28">
      <Blob shape={2} parallax={0.05} className="absolute -right-48 top-16 hidden h-[520px] w-[460px] bg-[#EFEFEB] lg:block" />

      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <SectionHeading title="Competências" />
          <p data-reveal="up" style={stagger(1)} className={`${lead} mt-6 max-w-[440px]`}>
            Ao longo de oito anos, atuei em identidade visual e design de marca, do diagnóstico às aplicações. Estas são as áreas e
            as ferramentas com que trabalhei.
          </p>
          <p data-reveal="up" style={stagger(2)} className="mt-9 font-mono text-[13px] font-bold text-ink">
            Ferramentas
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {TOOLS.map((tool, i) => (
              <li
                key={i}
                data-reveal="up"
                style={stagger(3 + i)}
                className="rounded-full border border-[#E3E3DF] bg-white px-4 py-2 font-mono text-[13px] text-ink transition-[translate,border-color] duration-300 ease-spring hover:-translate-y-0.5 hover:border-ink"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 sm:pb-10 lg:col-span-7 lg:pl-10">
          {SKILLS.map((skill, i) => {
            const dark = i === 3
            return (
              <li key={skill.title} data-reveal="up" style={stagger(i)} className={i % 2 === 1 ? 'sm:translate-y-10' : ''}>
                <div className={`group h-full rounded-2xl p-7 shadow-card ${cardHover} ${dark ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
                  <span
                    className={`flex size-12 items-center justify-center rounded-full ${dark ? 'bg-sun text-ink' : 'bg-ink text-white'} ${iconHop}`}
                  >
                    <Icon name={skill.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 font-mono text-[17px] font-bold">{skill.title}</h3>
                  <p className={`mt-2 text-[14px] leading-relaxed ${dark ? 'text-white/65' : 'text-mute'}`}>{skill.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* 4) Experiência */
function Experience() {
  return (
    <section id="experiencia" className="relative py-24 md:py-28">
      <div className={`${container} relative grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-8">
          <SectionHeading title="Experiência" />
          <p data-reveal="up" style={stagger(1)} className={`${lead} mt-6 max-w-[520px]`}>
            Os cargos que ocupei e as empresas pelas quais passei, do mais recente ao mais antigo.
          </p>

          <ol className="relative mt-12 space-y-6 pl-9 md:pl-12">
            <span
              aria-hidden="true"
              data-reveal="line"
              className="absolute bottom-8 left-[7px] top-8 border-l-2 border-dashed border-[#D9D9D4] md:left-[11px]"
            />
            {EXPERIENCE.map((job, i) => (
              <li key={i} data-reveal="up" style={stagger(i)} className="relative">
                <span
                  aria-hidden="true"
                  data-dot
                  className="absolute -left-9 top-7 flex size-4 items-center justify-center rounded-full bg-sun ring-[5px] ring-paper md:-left-12 md:size-6"
                >
                  <span className="size-1.5 rounded-full bg-ink md:size-2" />
                </span>
                <article className={`rounded-2xl bg-white p-6 shadow-card md:p-7 ${cardHover}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-mono text-[17px] font-bold text-ink md:text-[18px]">{job.role}</h3>
                      <p className="mt-1 text-[14.5px] font-medium text-ink/80">{job.company}</p>
                    </div>
                    <span className="rounded-full bg-paper px-3 py-1.5 font-mono text-[12px] font-bold text-ink">{job.period}</span>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {job.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-[14.5px] leading-relaxed text-mute">
                        <span aria-hidden="true" className="mt-[11px] h-[2px] w-3 shrink-0 rounded-full bg-sun" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-4">
          <div
            data-reveal="up"
            style={stagger(1)}
            className="relative flex min-h-[300px] overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-[#E9E9E5] lg:sticky lg:top-28 lg:h-[620px]"
          >
            <Blob shape={3} className="absolute -bottom-16 -right-16 size-56 bg-sun" />
            <Blob shape={1} className="absolute -left-10 -top-10 size-28 bg-ink" />
            <Dots className="absolute right-8 top-10 h-20 w-24 text-ink/20" />
            <OutlineWord className="left-6 top-14 text-[96px] lg:left-8 lg:top-24 lg:rotate-180 lg:text-[150px] lg:[writing-mode:vertical-rl]">
              Currículo
            </OutlineWord>
            <div className="relative mt-auto p-7 lg:p-8">
              <p className="max-w-[220px] text-[14px] leading-relaxed text-mute">Versão completa do currículo, com experiências e formação.</p>
              <a href={LINKS.cv} download data-magnetic className={`${btnInk} mt-5`}>
                <Icon name="download" className={`size-4 ${nudgeDown}`} />
                Baixar PDF
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

/* 5) Formação */
function Education() {
  return (
    <section id="formacao" className="relative py-24 md:py-28">
      <Blob shape={0} parallax={0.1} className="absolute -left-14 top-1/3 hidden h-[150px] w-[120px] bg-ink md:block" />

      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-7">
          <SectionHeading title="Formação e certificações" />
          <p data-reveal="up" style={stagger(1)} className={`${lead} mt-6 max-w-[520px]`}>
            A formação acadêmica que concluí e os cursos complementares que fiz ao longo da carreira.
          </p>

          <div
            data-reveal="up"
            style={stagger(2)}
            className="mt-10 grid gap-9 rounded-2xl bg-white p-7 shadow-card md:grid-cols-2 md:gap-0 md:p-9"
          >
            <EduList title="Formação" items={EDUCATION} start={3} />
            <EduList title="Cursos e certificações" items={COURSES} start={4} className="md:border-l md:border-[#EEEEEA] md:pl-9" />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div data-reveal="zoom" style={stagger(1)} className="relative mx-auto aspect-square w-full max-w-[400px]">
            <Blob shape={4} className="absolute right-0 top-[4%] size-[84%] bg-ink" />
            <Blob shape={1} float={false} className={`${eduBlobBox} bg-sun`} />
            <BlobPhoto
              src={fotoFormacao}
              width={640}
              height={598}
              shape={1}
              boxClassName={eduBlobBox}
              imgClassName="absolute bottom-0 left-[15.48%] w-[88.1%] lg:left-[7.14%]"
            />
            <p
              aria-hidden="true"
              data-reveal="up"
              style={stagger(4)}
              className="absolute -top-3 right-[-2%] -rotate-6 font-hand text-[64px] leading-none text-sun sm:text-[88px]"
            >
              Currículo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function EduList({ title, items, start, className = '' }: { title: string; items: EduItem[]; start: number; className?: string }) {
  return (
    <div className={className}>
      <h3 className="font-mono text-[16px] font-bold text-ink">{title}</h3>
      <span aria-hidden="true" className="mt-3 block h-[3px] w-10 rounded-full bg-sun" />
      <ul className="mt-6 space-y-5">
        {items.map((item, i) => (
          <li key={i} data-reveal="up" style={stagger(start + i)} className="flex gap-3.5">
            <span aria-hidden="true" className="mt-[8px] size-2 shrink-0 rounded-full bg-sun" />
            <div>
              <p className="text-[15px] font-medium text-ink">{item.course}</p>
              <p className="mt-0.5 text-[13.5px] text-mute">
                {item.school} · {item.year}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 6) Projetos */
function Projects() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const list = useMemo(
    () => (filter === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projetos" className="relative overflow-hidden py-24 md:py-28">
      <OutlineWord parallax={0.12} className="-right-2 top-10 text-[110px] md:text-[210px]">
        Projetos
      </OutlineWord>

      <div className={`${container} relative`}>
        <SectionHeading title="Projetos selecionados" />
        <p data-reveal="up" style={stagger(1)} className={`${lead} mt-6 max-w-[560px]`}>
          Uma seleção dos projetos de identidade visual e branding que desenvolvi. Cada um tem uma página com o contexto, o meu papel
          e o que foi entregue.
        </p>

        <div data-reveal="up" style={stagger(2)} role="group" aria-label="Filtrar projetos" className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-4 py-2.5 font-mono text-[13px] font-bold transition-[background-color,color,translate,scale] duration-300 active:scale-[0.97] ${
                filter === f ? 'bg-sun text-ink' : 'text-ink/60 hover:-translate-y-0.5 hover:bg-white hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1380px] px-4 md:px-6">
        {/* A troca de filtro remonta a grade; os itens novos entram em cascata pelo sistema de revelação */}
        <ul key={filter} className="grid grid-flow-dense auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[330px] lg:grid-cols-12">
          {list.map((project, i) => (
            <li
              key={project.slug}
              data-reveal="up"
              style={stagger(i)}
              className={project.wide ? 'sm:col-span-2 lg:col-span-6' : 'lg:col-span-3'}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  // Inclinação 3D muito sutil seguindo o mouse (somente desktop)
  const onMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || !canHoverFine()) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`
  }
  const onLeave = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <a
      href={`#/projeto/${project.slug}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative isolate block h-full overflow-hidden rounded-lg outline-none transition-[transform,translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift focus-visible:ring-4 focus-visible:ring-sun"
    >
      <div data-reveal="zoom" className="img-sweep h-full w-full overflow-hidden bg-[#E3E3DF]">
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-[scale] duration-700 group-hover:scale-[1.05]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <div aria-hidden="true" className="absolute inset-0 hidden bg-linear-to-t from-ink/85 to-transparent [@media(hover:none)]:block" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="translate-y-3 opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <p className="font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-sun">{project.categories.join(' · ')}</p>
          <h3 className="mt-2 font-mono text-[20px] font-bold text-white">{project.name}</h3>
          <p className="text-[14px] text-white/70">{project.sector}</p>
        </div>
      </div>
      <span className="absolute right-5 top-5 flex size-10 scale-75 items-center justify-center rounded-full bg-sun text-ink opacity-0 transition-[opacity,scale] duration-500 ease-spring group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        <Icon name="arrowUpRight" className="size-4" />
      </span>
    </a>
  )
}

/* 7) Contato */
function Contact() {
  const items: { icon: IconName; label: string; value: string; href: string }[] = [
    { icon: 'mail', label: 'E-mail', value: LINKS.email, href: `mailto:${LINKS.email}` },
    { icon: 'linkedin', label: 'LinkedIn', value: LINKS.linkedinHandle, href: LINKS.linkedin },
    { icon: 'instagram', label: 'Instagram', value: LINKS.instagramHandle, href: LINKS.instagram },
  ]

  return (
    <section id="contato" className="relative pb-6 pt-12 md:pt-16">
      <div className={container}>
        <div
          data-reveal="up"
          className="relative overflow-hidden rounded-[28px] bg-ink px-6 pb-16 pt-20 text-white md:rounded-[36px] md:px-12 md:py-20"
        >
          <Blob shape={0} className="absolute -left-14 -top-14 h-32 w-36 bg-sun md:-left-16 md:-top-20 md:h-64 md:w-72" />
          <Blob shape={3} className="absolute -bottom-20 -right-16 h-44 w-52 bg-sun md:-bottom-24 md:h-56 md:w-64" />
          <Dots className="absolute right-[16%] top-10 h-16 w-28 text-white/15" />

          <h2 data-reveal="mask" className="relative text-center font-mono text-[36px] font-bold md:text-[48px]">
            <MaskText text="Contato" start={1} />
          </h2>
          <ul className="relative mx-auto mt-12 grid max-w-[880px] gap-10 md:grid-cols-3 md:gap-6">
            {items.map((item, i) => (
              <li key={item.label} data-reveal="up" style={stagger(2 + i)} className="group flex flex-col items-center text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-sun text-ink transition-transform duration-500 ease-spring group-hover:-translate-y-1">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <p className="mt-4 font-mono text-[14px] font-bold">{item.label}</p>
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="mt-1.5 break-all text-[14.5px] text-white/65 transition-colors hover:text-sun"
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
