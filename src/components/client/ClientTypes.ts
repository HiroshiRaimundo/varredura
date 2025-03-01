
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

export const clientTypes = [
  {
    type: "observatory" as ClientType,
    label: "Observatório",
    description: "Acesso a dashboards e ferramentas para observatórios de dados",
    alert: "Popular"
  },
  {
    type: "researcher" as ClientType,
    label: "Pesquisador",
    description: "Ferramentas para análise e processamento de dados científicos",
    alert: ""
  },
  {
    type: "politician" as ClientType,
    label: "Político",
    description: "Monitoramento de legislação e indicadores governamentais",
    alert: ""
  },
  {
    type: "institution" as ClientType,
    label: "Instituição",
    description: "Soluções para gestão de dados institucionais",
    alert: ""
  },
  {
    type: "journalist" as ClientType,
    label: "Jornalista",
    description: "Acesso a dados verificados para produção de conteúdo",
    alert: ""
  },
  {
    type: "press" as ClientType,
    label: "Assessoria de Imprensa",
    description: "Ferramentas para gestão de releases e contatos",
    alert: "Novo"
  },
];

interface CaseStudy {
  title: string;
  description: string;
}

interface ClientTypeDetail {
  id: ClientType;
  title: string;
  shortDescription: string;
  description: string;
  details: string;
  features: string[];
  benefits: string[];
  caseStudy?: CaseStudy;
}

export const clientTypeDetails: Record<ClientType, ClientTypeDetail> = {
  observatory: {
    id: "observatory",
    title: "Observatório",
    shortDescription: "Plataforma completa para observatórios de políticas públicas.",
    description: "Plataforma completa para observatórios de políticas públicas acompanharem indicadores, integrarem dados e gerarem relatórios automatizados com visualizações avançadas.",
    details: "Nossa solução para observatórios oferece um conjunto completo de ferramentas para coleta, análise e visualização de dados relacionados a políticas públicas. Com painéis personalizáveis e relatórios automáticos, sua equipe poderá acompanhar indicadores em tempo real, identificar tendências e compartilhar insights com facilidade.",
    features: [
      "Dashboard personalizado com indicadores",
      "Integração com bases de dados públicas",
      "Geração automática de relatórios",
      "Exportação de dados em múltiplos formatos",
      "Visualizações interativas e gráficos avançados",
      "Compartilhamento seguro de dados"
    ],
    benefits: [
      "Economize tempo com automação de coleta de dados",
      "Melhore a qualidade das análises com dados integrados",
      "Aumente a visibilidade do seu observatório com relatórios profissionais",
      "Facilite a tomada de decisões baseadas em evidências",
      "Monitore tendências e padrões em tempo real"
    ],
    caseStudy: {
      title: "Observatório de Políticas Educacionais",
      description: "Um observatório educacional conseguiu reduzir em 70% o tempo gasto na coleta e processamento de dados, aumentando a frequência de publicação de relatórios de trimestral para mensal."
    }
  },
  researcher: {
    id: "researcher",
    title: "Pesquisador",
    shortDescription: "Acesso a datasets completos e ferramentas estatísticas avançadas.",
    description: "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.",
    details: "Desenvolvida especialmente para pesquisadores, nossa plataforma oferece acesso privilegiado a conjuntos de dados exclusivos e ferramentas estatísticas avançadas. Consulte séries históricas, exporte dados em formato compatível com softwares estatísticos e colabore com outros pesquisadores em um ambiente seguro.",
    features: [
      "Acesso a datasets exclusivos e atualizados",
      "Ferramentas de análise estatística integradas",
      "Exportação para R, Python, SPSS e outros formatos",
      "Colaboração segura entre pesquisadores",
      "Documentação completa das metodologias"
    ],
    benefits: [
      "Acesse dados confiáveis e atualizados para suas pesquisas",
      "Economize tempo com dados já estruturados e limpos",
      "Colabore facilmente com colegas em projetos compartilhados",
      "Obtenha suporte metodológico especializado",
      "Publique resultados com maior rapidez e qualidade"
    ],
    caseStudy: {
      title: "Grupo de Pesquisa em Políticas Públicas",
      description: "Um grupo de pesquisa universitário conseguiu publicar 3 artigos científicos em menos de um ano usando os datasets e ferramentas disponíveis na plataforma."
    }
  },
  politician: {
    id: "politician",
    title: "Político",
    shortDescription: "Alertas e análises para tomada de decisão em políticas públicas.",
    description: "Alertas sobre novas legislações, análise de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região.",
    details: "Nossa plataforma para políticos e assessores parlamentares oferece informações estratégicas para a tomada de decisões. Receba alertas sobre novas legislações, acompanhe indicadores relevantes para sua base eleitoral e acesse análises de impacto de políticas públicas, tudo em um único ambiente.",
    features: [
      "Alertas personalizados sobre legislação",
      "Indicadores regionalizados por base eleitoral",
      "Análises comparativas entre regiões",
      "Resumos executivos para tomada de decisão",
      "Monitoramento de métricas de políticas públicas"
    ],
    benefits: [
      "Tome decisões mais informadas com dados atualizados",
      "Acompanhe o impacto de políticas públicas em sua região",
      "Receba alertas sobre temas relevantes para sua atuação",
      "Compare indicadores entre diferentes regiões",
      "Fundamente propostas com dados confiáveis"
    ],
    caseStudy: {
      title: "Secretaria Estadual de Planejamento",
      description: "Uma secretaria estadual utilizou nossa plataforma para identificar áreas prioritárias para investimentos, otimizando a alocação de recursos públicos com base em evidências."
    }
  },
  institution: {
    id: "institution",
    title: "Instituição",
    shortDescription: "Ferramentas para gestão e análise de dados institucionais.",
    description: "Ferramentas para gestão de dados institucionais, monitoramento de programas, dashboards personalizados e relatórios de acompanhamento para instituições de diversos setores.",
    details: "Desenvolvemos uma solução completa para instituições públicas e privadas gerenciarem seus dados e monitorarem programas. Com dashboards personalizados, relatórios automatizados e ferramentas de análise, sua instituição poderá tomar decisões baseadas em evidências e demonstrar resultados com transparência.",
    features: [
      "Gestão centralizada de dados institucionais",
      "Monitoramento de indicadores de programas",
      "Dashboards personalizados por departamento",
      "Relatórios de desempenho automáticos",
      "Comparativos históricos e projeções"
    ],
    benefits: [
      "Centralize informações de diferentes departamentos",
      "Demonstre resultados com relatórios profissionais",
      "Melhore a transparência e a prestação de contas",
      "Otimize processos com base em dados concretos",
      "Facilite auditorias e avaliações externas"
    ],
    caseStudy: {
      title: "Rede de Hospitais Regionais",
      description: "Uma rede de hospitais conseguiu reduzir em 25% o tempo de espera para atendimentos ao identificar gargalos nos processos através dos dashboards de monitoramento."
    }
  },
  journalist: {
    id: "journalist",
    title: "Jornalista",
    shortDescription: "Dados verificados e visualizações para reportagens de qualidade.",
    description: "Acesso a indicadores atualizados, visualizações prontas para publicação, verificação de dados e comparativos históricos para embasar reportagens investigativas e especiais.",
    details: "Nossa plataforma para jornalistas fornece acesso a dados verificados e atualizados, além de visualizações prontas para publicação. Com ferramentas de checagem e comparativos históricos, você poderá produzir reportagens investigativas e especiais com embasamento sólido e visualizações de impacto.",
    features: [
      "Dados verificados de fontes confiáveis",
      "Visualizações prontas para publicação",
      "Ferramentas de checagem de informações",
      "Séries históricas para comparativos",
      "Exportação em formatos compatíveis com redações"
    ],
    benefits: [
      "Produza reportagens baseadas em dados confiáveis",
      "Economize tempo com visualizações prontas para uso",
      "Verifique informações com ferramentas especializadas",
      "Encontre tendências e padrões para pautas exclusivas",
      "Diferencie seu trabalho com análises aprofundadas"
    ],
    caseStudy: {
      title: "Reportagem Investigativa Premiada",
      description: "Uma equipe de jornalismo de dados utilizou nossa plataforma para criar uma série investigativa sobre gastos públicos que foi premiada nacionalmente."
    }
  },
  press: {
    id: "press",
    title: "Assessoria de Imprensa",
    shortDescription: "Sistema completo para gestão de releases e contatos.",
    description: "Sistema completo para criação, aprovação e monitoramento de releases, acompanhamento de publicações, métricas de desempenho e gestão de contatos com veículos de comunicação.",
    details: "Nossa solução para assessorias de imprensa oferece um fluxo completo para criação, aprovação, distribuição e monitoramento de releases. Com ferramentas para gestão de contatos, acompanhamento de publicações e métricas de desempenho, sua equipe poderá otimizar estratégias e demonstrar resultados com precisão.",
    features: [
      "Fluxo de aprovação de releases",
      "Distribuição segmentada por público",
      "Monitoramento de publicações",
      "Métricas de desempenho e ROI",
      "Gestão avançada de contatos e veículos"
    ],
    benefits: [
      "Aumente a taxa de aproveitamento de seus releases",
      "Segmente envios para maior relevância",
      "Acompanhe resultados em tempo real",
      "Demonstre o valor do trabalho com métricas precisas",
      "Organize contatos e histórico de relacionamento com a imprensa"
    ],
    caseStudy: {
      title: "Assessoria de Imprensa Corporativa",
      description: "Uma assessoria de imprensa conseguiu aumentar em 40% a taxa de aproveitamento de seus releases após implementar o sistema de segmentação e monitoramento."
    }
  }
};
