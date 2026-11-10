import type { Project } from "./data";

export const projectEntries: Project[] = [
  {
    id: "rotaseg",
    mark: "truck",
    category: "web",
    title: { pt: "RotaSeg", en: "RotaSeg" },
    kicker: {
      pt: "gestão de motoristas · offline-first",
      en: "driver management · offline-first",
    },
    summary: {
      pt: "Aplicação para registro e acompanhamento de informações de saúde, documentos e necessidades de motoristas em operações de transporte, desenvolvida para uma empresa apresentada neste portfólio sob o pseudônimo RotaSeg.",
      en: "Application for recording and tracking drivers’ health information, documents, and needs in transportation operations, developed for a company presented in this portfolio under the pseudonym RotaSeg.",
    },
    description: {
      pt: "Desenvolvimento, como parte de uma equipe, de uma aplicação web responsiva para uma empresa especializada em gerenciamento de riscos e operações de transporte. A solução permitia que motoristas registrassem informações sobre sua saúde, documentação e necessidades durante suas viagens. Como a aplicação precisava funcionar mesmo sem conexão com a internet, foi implementada persistência local com SQLite e sincronização automática dos registros quando a conectividade era restabelecida. O projeto também contemplava uma interface administrativa para consulta e acompanhamento das informações pela empresa.",
      en: "Worked as part of a development team on a responsive web application for a company specializing in transportation risk and operations management. The solution allowed drivers to record information about their health, documentation, and needs while on the road. Since the application had to work without an internet connection, it used SQLite for local data persistence and automatic synchronization when connectivity was restored. The project also included an administrative interface for the company to review and manage submitted information.",
    },
    role: {
      pt: "desenvolvedor na equipe de desenvolvimento",
      en: "software developer on the development team",
    },
    year: "2017",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["React", "SQLite", "Offline-first", "Sincronização", "Web responsiva"],
      en: ["React", "SQLite", "Offline-first", "Synchronization", "Responsive Web"],
    },
  },
  {
    id: "econexo",
    mark: "chart-no-axes-combined",
    category: "web",
    title: { pt: "EcoNexo", en: "EcoNexo" },
    kicker: {
      pt: "consultoria ambiental · sistemas de dados",
      en: "environmental consulting · data systems",
    },
    summary: {
      pt: "Sistema desenvolvido para uma consultoria ambiental apresentada neste portfólio sob o pseudônimo EcoNexo, voltado à coleta, consolidação e análise de informações de pessoas afetadas por desastres ambientais, com questionários e geração de relatórios.",
      en: "System developed for an environmental consulting firm presented in this portfolio under the pseudonym EcoNexo, focused on collecting, consolidating, and analyzing information from people affected by environmental disasters through questionnaires and reports.",
    },
    description: {
      pt: "Desenvolvimento de uma aplicação em parceria com a EcoNexo, pseudônimo utilizado neste portfólio para preservar a identidade da consultoria ambiental. O sistema permitia trabalhar com diferentes tipos de questionários, consolidar respostas e gerar relatórios para apoiar o trabalho da consultoria. Atuação full-stack com Ruby on Rails, concentrada principalmente no backend, incluindo a implementação das estruturas de questionários, processamento das respostas e geração de relatórios.",
      en: "Developed an application in partnership with EcoNexo, a pseudonym used in this portfolio to protect the environmental consulting firm’s identity. The system supported the collection and analysis of information from people affected by environmental disasters through multiple questionnaire types, response consolidation, and report generation. Worked full-stack with Ruby on Rails, focusing primarily on backend development, including questionnaire structures, response processing, and report generation.",
    },
    role: {
      pt: "desenvolvimento full-stack · foco em backend",
      en: "full-stack development · backend focus",
    },
    year: "2018",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["Ruby on Rails", "Backend", "Questionários", "Processamento de dados", "Relatórios"],
      en: ["Ruby on Rails", "Backend", "Questionnaires", "Data Processing", "Reporting"],
    },
  },
  {
    id: "gastro",
    mark: "utensils",
    category: "produto",
    title: { pt: "Gastrô", en: "Gastrô" },
    kicker: {
      pt: "produto digital · delivery cooperativo",
      en: "digital product · cooperative delivery",
    },
    summary: {
      pt: "Produto digital que conectava pequenos produtores de alimentos a restaurantes locais, com uma proposta de delivery dedicada à cooperativa.",
      en: "Digital product connecting small food producers with local restaurants, with a delivery service dedicated to the cooperative.",
    },
    description: {
      pt: "Concepção e desenvolvimento de um produto digital para conectar pequenos produtores de alimentos a restaurantes locais, viabilizando uma operação de delivery dedicada à cooperativa. Fui responsável pela liderança do projeto, participando da concepção do produto, definição das regras de negócio, arquitetura e decisões técnicas, além da coordenação de outros desenvolvedores. A solução foi construída com React Native no aplicativo mobile e Node.js, Express e MongoDB no backend.",
      en: "Conceived and developed a digital product connecting small food producers with local restaurants, enabling a delivery operation dedicated to the cooperative. Led the project, contributing to product conception, business rules, architecture, and technical decisions, while also coordinating other developers. The solution was built with React Native for the mobile application and Node.js, Express, and MongoDB on the backend.",
    },
    role: {
      pt: "liderança de produto, arquitetura e desenvolvimento full-stack",
      en: "product leadership, architecture, and full-stack development",
    },
    year: "2019",
    status: {
      pt: "descontinuado",
      en: "discontinued",
    },
    tags: {
      pt: ["React Native", "Node.js", "Express", "MongoDB", "Liderança", "Produto digital"],
      en: ["React Native", "Node.js", "Express", "MongoDB", "Leadership", "Digital Product"],
    },
  },
  {
    id: "imperative21",
    mark: "globe",
    category: "web",
    title: { pt: "Imperative 21", en: "Imperative 21" },
    kicker: {
      pt: "campanha global · iniciativa brasileira",
      en: "global campaign · Brazilian initiative",
    },
    summary: {
      pt: "Desenvolvimento da presença digital brasileira de uma campanha internacional voltada à transformação do sistema econômico e à adoção do capitalismo de stakeholders.",
      en: "Development of the Brazilian digital presence for an international campaign focused on transforming the economic system and advancing stakeholder capitalism.",
    },
    description: {
      pt: "Liderança técnica da frente brasileira de uma campanha internacional, sendo responsável pelo desenvolvimento da landing page utilizando React e Gatsby. O trabalho envolveu implementação frontend, otimização técnica para mecanismos de busca (SEO) e melhorias de desempenho e carregamento. Também houve colaboração com as equipes de comunicação e internacional na adaptação de conteúdos e materiais da campanha para o público brasileiro.",
      en: "Provided technical leadership for the Brazilian branch of an international campaign, taking responsibility for building its landing page with React and Gatsby. The work involved frontend implementation, technical search engine optimization (SEO), and performance and loading improvements. Also collaborated with communications and international teams to adapt campaign content and materials for the Brazilian audience.",
    },
    role: {
      pt: "liderança técnica · desenvolvimento web e SEO",
      en: "technical leadership · web development and SEO",
    },
    year: "2020",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["React", "Gatsby", "SEO", "Performance", "SSG", "Internacionalização"],
      en: ["React", "Gatsby", "SEO", "Performance", "SSG", "Localization"],
    },
  },
  {
    id: "nav",
    mark: "graduation-cap",
    category: "produto",
    title: { pt: "NAV", en: "NAV" },
    kicker: {
      pt: "edtech · ambiente virtual de aprendizagem",
      en: "edtech · virtual learning environment",
    },
    summary: {
      pt: "Plataforma educacional web e mobile utilizada por milhares de estudantes, com aulas, avaliações, exercícios e acompanhamento de progresso.",
      en: "Web and mobile educational platform used by thousands of students, featuring lessons, assessments, exercises, and progress tracking.",
    },
    description: {
      pt: "Desenvolvimento e manutenção do NAV, ambiente virtual de aprendizagem da Trivento Educação. A plataforma oferecia videoaulas, provas, exercícios, materiais para professores, controle de presença e chat. Atuei no desenvolvimento das aplicações web, com React, e mobile, com React Native, implementando funcionalidades como reprodução de vídeos, provas com tempo controlado, acompanhamento de progresso e notificações. Também participei da evolução do produto e de decisões de arquitetura junto à equipe de desenvolvimento. A instituição atendia milhares de alunos em cinco cidades e três estados. Durante o período, também participei da construção e manutenção de landing pages de campanhas da empresa.",
      en: "Worked on the development and maintenance of NAV, Trivento Educação's virtual learning environment. The platform offered video lessons, exams, exercises, teacher materials, attendance management, and chat. I developed both the web application with React and the mobile application with React Native, implementing features such as video playback, timed exams, progress tracking, and notifications. I also contributed to product evolution and architectural decisions alongside the development team. The institution served thousands of students across five cities and three states. During this period, I also worked on the development and maintenance of the company's campaign landing pages.",
    },
    role: {
      pt: "desenvolvedor frontend web e mobile · participação em decisões de arquitetura",
      en: "web and mobile frontend developer · architectural contributions",
    },
    year: "2020–2022",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["React", "React Native", "JavaScript", "Edtech", "LMS", "Mobile"],
      en: ["React", "React Native", "JavaScript", "Edtech", "LMS", "Mobile"],
    },
  },
  {
    id: "trivento-web",
    mark: "globe",
    category: "web",
    title: { pt: "Trivento", en: "Trivento" },
    kicker: {
      pt: "website institucional · headless CMS",
      en: "institutional website · headless CMS",
    },
    summary: {
      pt: "Desenvolvimento de páginas institucionais com foco em SEO e CMS para autonomia da equipe de conteúdo gerenciar as publicações.",
      en: "Development of institutional pages focused on SEO and CMS enabling the content team to manage publications independently.",
    },
    description: {
      pt: "Desenvolvimento de páginas institucionais para a Trivento Educação utilizando Next.js e Sanity como headless CMS. O projeto buscava melhorar a presença orgânica da empresa nos mecanismos de busca e permitir que a equipe de conteúdo criasse e atualizasse páginas sem depender diretamente do time de desenvolvimento.",
      en: "Developed institutional pages for Trivento Educação using Next.js and Sanity as a headless CMS. The project aimed to improve the company's organic search visibility and enable the content team to create and update pages without depending directly on the development team.",
    },
    role: {
      pt: "desenvolvimento frontend e integração com CMS",
      en: "frontend development and CMS integration",
    },
    year: "2023",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["Next.js", "React", "Sanity", "SEO", "Headless CMS"],
      en: ["Next.js", "React", "Sanity", "SEO", "Headless CMS"],
    },
  },
  {
    id: "cifra-club",
    mark: "music",
    category: "produto",
    title: { pt: "Cifra Club", en: "Cifra Club" },
    kicker: {
      pt: "edtech · educação musical",
      en: "edtech · music education",
    },
    summary: {
      pt: "Plataforma de educação musical por assinatura, com cursos, aulas, avaliações e acompanhamento de progresso para mais de 15 instrumentos.",
      en: "Subscription-based music education platform featuring courses, lessons, assessments, and progress tracking for more than 15 instruments.",
    },
    description: {
      pt: "Atuação na evolução da plataforma Cifra Club, com foco especial no Cifra Club Academy, ambiente de aprendizagem destinado a alunos assinantes. A plataforma reunia cursos completos, aulas e avaliações para mais de 15 instrumentos musicais, além de recursos para acompanhamento do progresso dos alunos. A aplicação foi desenvolvida com Next.js, com atenção à otimização para mecanismos de busca (SEO), desempenho e métricas do Lighthouse.",
      en: "Worked on the evolution of the Cifra Club platform, with a particular focus on Cifra Club Academy, a learning environment for subscribers. The platform offered full courses, lessons, and assessments for more than 15 musical instruments, as well as student progress tracking. Built with Next.js, the application emphasized search engine optimization (SEO), performance, and Lighthouse metrics.",
    },
    role: {
      pt: "desenvolvimento frontend e evolução de produto",
      en: "frontend development and product evolution",
    },
    year: "2022",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["Next.js", "React", "Edtech", "SEO", "Lighthouse", "Performance"],
      en: ["Next.js", "React", "Edtech", "SEO", "Lighthouse", "Performance"],
    },
  },
  {
    id: "ciandt-telecom",
    mark: "store",
    category: "web",
    title: { pt: "E-commerce B2B", en: "B2B E-commerce" },
    kicker: {
      pt: "telecomunicações · comércio digital",
      en: "telecommunications · digital commerce",
    },
    summary: {
      pt: "Plataforma de e-commerce B2B desenvolvida para uma das principais empresas de telecomunicações do Brasil, destinada à comercialização de produtos e serviços para o mercado corporativo.",
      en: "B2B e-commerce platform developed for one of Brazil’s leading telecommunications companies, enabling the sale of products and services to corporate customers.",
    },
    description: {
      pt: "Atuação no desenvolvimento de uma plataforma de comércio eletrônico B2B para uma das principais empresas de telecomunicações do Brasil, integrante de um grupo com presença internacional. A solução permitia que empresas comprassem produtos e contratassem serviços dedicados ao segmento corporativo. A plataforma foi desenvolvida com Java e Adobe Experience Manager (AEM).",
      en: "Worked on the development of a B2B e-commerce platform for one of Brazil’s leading telecommunications companies, part of an internationally established group. The solution enabled businesses to purchase products and services tailored to corporate customers. The platform was built with Java and Adobe Experience Manager (AEM).",
    },
    role: {
      pt: "desenvolvimento de software",
      en: "software development",
    },
    year: "2023",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["Java", "AEM", "E-commerce B2B"],
      en: ["Java", "AEM", "B2B E-commerce"],
    },
  },
  {
    id: "ciandt-integration",
    mark: "workflow",
    category: "backend",
    title: { pt: "HUB de e-commerces", en: "E-commerces HUB" },
    kicker: {
      pt: "integração de sistemas · operação LATAM",
      en: "systems integration · LATAM operations",
    },
    summary: {
      pt: "Integração backend entre plataformas de e-commerce, conectando pedidos e processos operacionais em seis países da América Latina.",
      en: "Backend integration between e-commerce platforms, connecting orders and operational processes across six Latin American countries.",
    },
    description: {
      pt: "Desenvolvimento de uma solução de integração entre plataformas de e-commerce de grandes grupos multinacionais do setor de alimentos e bebidas, com operações em diferentes mercados da América Latina. A integração, construída com Python e Node.js, conectava o fluxo de pedidos e processos como controle de estoque, cálculo de valores, geração de relatórios e processamento assíncrono por filas e mensageria. Também envolvia mecanismos de monitoramento, observabilidade e tratamento de erros e falhas. A operação abrangia seis países: Brasil, México, Equador, Peru, Argentina e Colômbia.",
      en: "Developed an integration solution connecting the e-commerce platforms of major multinational food and beverage groups operating across Latin America. Built with Python and Node.js, the backend integration handled order flows and processes such as inventory management, value calculations, report generation, and asynchronous processing through queues and messaging. It also included monitoring, observability, and error and failure handling. The solution supported operations across six countries: Brazil, Mexico, Ecuador, Peru, Argentina, and Colombia.",
    },
    role: {
      pt: "desenvolvimento backend e integração de sistemas",
      en: "backend development and systems integration",
    },
    year: "2024–2025",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["Python", "Node.js", "Backend", "Integração", "Mensageria", "Observabilidade"],
      en: ["Python", "Node.js", "Backend", "Systems Integration", "Messaging", "Observability"],
    },
  },
  {
    id: "ciandt-fintech",
    mark: "wallet",
    category: "produto",
    title: { pt: "Fintech", en: "Fintech" },
    kicker: {
      pt: "fintech · venda direta",
      en: "fintech · direct sales",
    },
    summary: {
      pt: "Aplicativo financeiro desenvolvido para uma das maiores empresas brasileiras do setor de beleza e cosméticos, com atuação internacional e forte presença no modelo de venda direta.",
      en: "Financial app developed for one of Brazil’s largest beauty and cosmetics companies, with international operations and a strong direct-selling business model.",
    },
    description: {
      pt: "Atuação no desenvolvimento de um aplicativo mobile com React Native, parte de uma solução fintech voltada a consultoras de venda direta de uma das maiores empresas brasileiras do setor de beleza e cosméticos, com atuação internacional. O aplicativo oferecia uma conta bancária própria, permitindo realizar operações financeiras relacionadas às atividades de compra e venda com clientes finais.",
      en: "Worked on the development of a React Native mobile application as part of a fintech solution for independent sales representatives of one of Brazil’s largest beauty and cosmetics companies, with international operations. The app provided users with their own bank account, enabling financial transactions related to purchasing and selling products to end customers.",
    },
    role: {
      pt: "desenvolvimento mobile",
      en: "mobile development",
    },
    year: "2025",
    status: {
      pt: "concluído",
      en: "completed",
    },
    tags: {
      pt: ["React Native", "Fintech", "Mobile", "Serviços financeiros"],
      en: ["React Native", "Fintech", "Mobile", "Financial Services"],
    },
  },
  {
    id: "vehicle-leasing",
    mark: "car-front",
    category: "produto",
    title: { pt: "Leasing de Veículos", en: "Vehicle Leasing" },
    kicker: {
      pt: "mobilidade · leasing automotivo · plataforma digital",
      en: "mobility · vehicle leasing · digital platform",
    },
    summary: {
      pt: "Plataforma integrada de gestão e vendas para uma empresa norte-americana de tecnologia e mobilidade automotiva, com operações financeiras, relatórios e análise de veículos baseada em inteligência artificial.",
      en: "Integrated management and sales platform for a North American automotive technology and mobility company, featuring financial operations, reporting, and AI-powered vehicle assessments.",
    },
    description: {
      pt: "Desenvolvimento e evolução de uma plataforma que centraliza operações comerciais e internas de uma empresa norte-americana de tecnologia e mobilidade automotiva. A solução contempla gestão de cadastros, vendas, relatórios operacionais e integrações com fluxos de pagamento. Um dos recursos de destaque utiliza inteligência artificial para analisar imagens dos veículos, identificar danos e avaliar suas condições físicas. Construída com React e Node.js, a plataforma integra diferentes processos de negócio em uma única solução. Além da implementação full-stack, participo ativamente da condução do projeto, contribuindo para o refinamento de requisitos, definição de soluções técnicas, priorização e alinhamento com stakeholders.",
      en: "Developing and evolving a platform that centralizes the commercial and internal operations of a North American automotive technology and mobility company. The solution includes record management, sales, operational reporting, and integrations with payment workflows. One of its key capabilities uses artificial intelligence to analyze vehicle images, identify damage, and assess physical condition. Built with React and Node.js, the platform brings multiple business processes together into a unified solution. Beyond full-stack implementation, I actively contribute to project execution through requirements refinement, technical solution design, prioritization, and stakeholder alignment.",
    },
    role: {
      pt: "engenheiro de software sênior full-stack · condução e evolução do projeto",
      en: "senior full-stack software engineer · project execution and evolution",
    },
    year: "2025–2026",
    status: {
      pt: "em andamento",
      en: "in progress",
    },
    tags: {
      pt: ["React", "Node.js", "Full-stack", "IA", "Visão computacional", "Integrações", "Pagamentos"],
      en: ["React", "Node.js", "Full-stack", "AI", "Computer Vision", "Integrations", "Payments"],
    },
  },
  {
    id: "your-next-project",
    mark: "handshake",
    pinned: true,
    title: {
      pt: "você!",
      en: "you!",
    },
    kicker: {
      pt: "próximo capítulo · sua ideia, minha próxima entrega",
      en: "next chapter · your idea, my next delivery",
    },
    summary: {
      pt: "Seu produto, sua empresa ou aquela ideia que ainda precisa sair do papel. Vamos construir algo relevante juntos?",
      en: "Your product, your company, or that idea waiting to become reality. Let's build something meaningful together.",
    },
    description: {
      pt: "Depois de trabalhar em produtos digitais, plataformas de grande escala, sistemas complexos e soluções com inteligência artificial, meu próximo projeto pode ser o seu. Posso contribuir desde a concepção e definição técnica até o desenvolvimento e evolução do produto. Se você tem um desafio interessante, uma ideia para tirar do papel ou um produto que precisa dar o próximo passo, vamos conversar.",
      en: "After working on digital products, large-scale platforms, complex systems, and AI-powered solutions, my next project could be yours. I can contribute from product conception and technical planning to development and continuous evolution. If you have an interesting challenge, an idea to bring to life, or a product ready for its next step, let's talk.",
    },
    role: {
      pt: "seu próximo parceiro de tecnologia",
      en: "your next technology partner",
    },
    year: String(new Date().getFullYear()),
    status: {
      pt: "aguardando o próximo desafio",
      en: "waiting for the next challenge",
    },
    tags: {
      pt: ["Seu projeto", "Parceria", "Desenvolvimento", "Vamos conversar"],
      en: ["Your Project", "Partnership", "Development", "Let's Talk"],
    },
  },
];