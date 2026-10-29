import type { IconName } from './components/ui'

export const LINKS = {
  email: 'pedrotragantedesign@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pedro-tragante-06a88b16a',
  linkedinHandle: 'in/pedro-tragante',
  linkedinName: 'Pedro Tragante',
  // Substitua pelo endereço e pelo nome do perfil no Instagram.
  instagram: 'https://www.instagram.com/',
  instagramHandle: '[@perfil_instagram]',
  studio: 'https://ptrestudio.com.br',
  studioLabel: 'ptrestudio.com.br',
  cv: '/curriculo-pedro-tragante.pdf',
}

export const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'competencias', label: 'Competências' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

export const SECTION_IDS = [
  'inicio',
  'sobre',
  'competencias',
  'experiencia',
  'formacao',
  'projetos',
  'contato',
]

export type Category = 'Identidade visual' | 'Branding' | 'Web design'
export type Filter = 'Todos' | Category
export const FILTERS: Filter[] = ['Todos', 'Identidade visual', 'Branding', 'Web design']

export type ProjectImage = { src: string; alt: string }

export type Project = {
  slug: string
  name: string
  sector: string
  label: string
  categories: Category[]
  wide: boolean
  client: string
  year?: string
  description: string
  context: string
  role: string
  deliverables: string[]
  cover: ProjectImage
  gallery: ProjectImage[]
  wordmark?: ProjectImage
}

export const PROJECTS: Project[] = [
  {
    slug: 'vetgroom',
    name: 'VetGroom',
    sector: 'Saúde animal',
    label: 'Projeto 01',
    categories: ['Identidade visual', 'Branding'],
    wide: true,
    client: 'VetGroom',
    description: 'Identidade visual que une saúde animal e grooming premium com profissionalismo e afeto.',
    context:
      'A VetGroom integra serviços veterinários especializados e grooming premium. A marca precisava equilibrar segurança, excelência técnica e acolhimento.',
    role: 'Criação do conceito e desenvolvimento da identidade visual, com suas aplicações em materiais de marca.',
    deliverables: ['Identidade visual', 'Papelaria', 'Embalagens'],
    cover: {
      src: '/projects/vetgroom/vetgroom-sacola.jpeg',
      alt: 'Sacola kraft VetGroom com a assinatura da marca',
    },
    gallery: [
      { src: '/projects/vetgroom/vetgroom-cosmeticos.jpeg', alt: 'Produtos de grooming premium com a identidade da VetGroom' },
      { src: '/projects/vetgroom/vetgroom-papelaria.jpeg', alt: 'Papelaria VetGroom com cartões e envelope da marca' },
      { src: '/projects/vetgroom/vetgroom-tote.jpeg', alt: 'Sacola de tecido da VetGroom com etiqueta personalizada' },
      { src: '/projects/vetgroom/vetgroom-acessorios.jpeg', alt: 'Tigela e bandana com a identidade visual VetGroom' },
    ],
  },
  {
    slug: 'hapuk',
    name: 'Hapuk',
    sector: 'Odontologia',
    label: 'Projeto 02',
    categories: ['Identidade visual'],
    wide: true,
    client: 'Ateliê Odontológico Hapuk',
    description: 'Identidade visual criada para unir precisão técnica, cuidado artesanal e acolhimento.',
    context:
      'O Ateliê Odontológico Hapuk propõe transformar o cuidado bucal em uma experiência acolhedora e artesanal, sem abrir mão da precisão técnica.',
    role: 'Criação da linguagem visual e desenvolvimento de aplicações para a papelaria e a sinalização do ateliê.',
    deliverables: ['Identidade visual', 'Papelaria', 'Sinalização'],
    cover: {
      src: '/projects/hapuk/hapuk-recepcao.jpg',
      alt: 'Recepção acolhedora do Ateliê Odontológico Hapuk',
    },
    gallery: [
      { src: '/projects/hapuk/hapuk-papelaria.jpeg', alt: 'Papelaria Hapuk com elementos triangulares da identidade' },
      { src: '/projects/hapuk/hapuk-letreiro.jpeg', alt: 'Letreiro Hapuk com o símbolo de dente e fio dental integrado ao logotipo' },
      { src: '/projects/hapuk/hapuk-necessaire.jpeg', alt: 'Necessaire de tecido e itens de higiene com a marca Hapuk' },
      { src: '/projects/hapuk/hapuk-caneca.jpg', alt: 'Caneca Hapuk em um espaço acolhedor do ateliê odontológico' },
    ],
  },
  {
    slug: 'kudissanga',
    name: 'Kudissanga',
    sector: 'Gastronomia',
    label: 'Projeto 03',
    categories: ['Branding'],
    wide: true,
    client: 'Kudissanga · Bistrô Angolano',
    year: '2026',
    description: 'Identidade de um conceito de bistrô angolano contemporâneo inspirado em encontro, partilha e cultura.',
    context:
      'Conceito de bistrô casual de cozinha angolana contemporânea para Bauru, valorizando a culinária, a hospitalidade e as referências culturais.',
    role: 'Desenvolvimento da estratégia, identidade visual e direção de arte para as aplicações da marca.',
    deliverables: ['Estratégia', 'Identidade visual', 'Direção de arte'],
    cover: {
      src: '/projects/kudissanga/fachada.jpg',
      alt: 'Fachada conceitual do Kudissanga Bistrô Angolano com letreiro iluminado e painéis geométricos',
    },
    gallery: [
      { src: '/projects/kudissanga/embalagens.jpg', alt: 'Embalagens kraft com a marca e grafismos inspirados em Samakaka' },
      { src: '/projects/kudissanga/avental.jpg', alt: 'Avental preto com o logotipo Kudissanga bordado em ocre' },
      { src: '/projects/kudissanga/guardanapo.jpg', alt: 'Guardanapo bordado com o imbondeiro e padrão geométrico' },
      { src: '/projects/kudissanga/coquetel.jpg', alt: 'Coquetel servido sobre porta-copos com a marca Kudissanga' },
    ],
    wordmark: {
      src: '/projects/logos/kudissanga-horizontal.svg',
      alt: 'Assinatura horizontal Kudissanga Bistrô Angolano',
    },
  },
  {
    slug: 'hs-telecom',
    name: 'HS Telecom',
    sector: 'Telecomunicações',
    label: 'Projeto 04',
    categories: ['Branding', 'Identidade visual'],
    wide: true,
    client: 'HS Telecom',
    year: '2025',
    description: 'Redesign de identidade visual em tons de vinho, off-white e bege.',
    context:
      'O redesign atualiza a apresentação da HS Telecom com uma linguagem mais elegante, mantendo a marca clara e acessível nos diferentes pontos de contato.',
    role: 'Redesign da assinatura visual e criação do sistema de marca para aplicações impressas, digitais e no espaço da loja.',
    deliverables: ['Design de logotipo', 'Manual da marca', 'Materiais impressos e identidade digital'],
    cover: {
      src: '/projects/hs-telecom/fachada.png',
      alt: 'Fachada da loja HS Telecom com identidade visual em vinho e bege',
    },
    gallery: [
      { src: '/projects/hs-telecom/atendimento.png', alt: 'Atendimento ao cliente com uniforme da identidade HS Telecom' },
      { src: '/projects/hs-telecom/aplicacao-carro.png', alt: 'Carro com a identidade visual HS Telecom aplicada' },
      { src: '/projects/hs-telecom/aplicacao-caneca.png', alt: 'Aplicação da marca HS Telecom em uniforme e caneca' },
      { src: '/projects/hs-telecom/cartao-visita.png', alt: 'Cartões de visita HS Telecom em vinho e off-white' },
    ],
    wordmark: {
      src: '/projects/logos/hs-telecom-vinho.svg',
      alt: 'Assinatura da marca HS Telecom em vinho',
    },
  },
]

export const SKILLS: { title: string; desc: string; icon: IconName }[] = [
  { title: 'Identidade Visual', desc: 'Desenvolvi logotipos, paletas, tipografia e manuais de marca.', icon: 'pen' },
  { title: 'Design de Marca', desc: 'Conduzi a estruturação de sistemas de marca e suas aplicações.', icon: 'layers' },
  { title: 'Web Design', desc: 'Projetei páginas e interfaces alinhadas à identidade de cada marca.', icon: 'monitor' },
  { title: 'Embalagens e Rótulos', desc: 'Criei e adaptei rótulos e embalagens com conformidade técnica e legibilidade.', icon: 'briefcase' },
]

export const TOOLS = ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'CorelDRAW']

export const EXPERIENCE = [
  {
    role: 'Fundador e Diretor de Criação',
    company: 'P.TR Estúdio Criativo',
    period: '[Período]',
    items: [
      'Desenvolvi identidades visuais e sistemas de marca para empresas de médio porte.',
      'Conduzi a direção de criação dos projetos, da pesquisa à entrega final.',
    ],
  },
  {
    role: 'Designer Gráfico Pleno',
    company: 'Tudor',
    period: '2024 – atual',
    items: [
      'Desenvolvi identidades visuais de mais de 20 marcas, validadas nos mercados nacional e internacional.',
      'Criei e adaptei rótulos e embalagens de baterias, em conformidade com as normas do setor.',
    ],
  },
  {
    role: 'Analista de Marketing',
    company: 'HS Telecom',
    period: '2023',
    items: [
      'Atendi semanalmente mais de 70 lojas em todo o Brasil, adaptando o material promocional às campanhas.',
      'Acompanhei a aplicação da marca Claro e conduzi eventos internos e convenções de vendas.',
    ],
  },
  {
    role: 'Desenhista Técnico / Pré-impressão',
    company: 'Gera Arte',
    period: '2021',
    items: [
      'Preparei e fechei arquivos complexos para impressão em grande formato e sinalização.',
      'Reduzi retrabalho e desperdício com a conferência técnica de cores, sangrias e resolução.',
    ],
  },
  {
    role: 'Estágio em Marketing',
    company: 'Grupo Tiliform',
    period: '2018 – 2019',
    items: [
      'Apoiei a criação de peças publicitárias e a gestão de conteúdo para redes sociais.',
      'Atuei em uma das maiores indústrias gráficas da região de Bauru.',
    ],
  },
]

export type EduItem = { course: string; school: string; year: string }
export const EDUCATION: EduItem[] = [
  { course: 'Pós-graduação em Branding', school: 'Faculdade Líbano', year: 'em andamento, conclusão em jul/2027' },
  { course: 'Pós-graduação em Design Thinking', school: 'Faculdade Líbano', year: 'em andamento, conclusão em jul/2027' },
  { course: 'Bacharelado em Design', school: 'FIB Bauru', year: '2018 – 2021' },
]
export const COURSES: EduItem[] = [
  { course: 'Técnico em Processos Gráficos', school: 'SENAI João Martins Coube', year: '2016 – 2017' },
  { course: 'Aprendizagem Industrial (Setor Gráfico)', school: 'SENAI João Martins Coube', year: '2018 – 2019' },
  { course: 'Inglês', school: 'Idioma', year: 'nível avançado' },
]
