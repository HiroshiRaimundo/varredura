
// Type definition for client types
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

// Function to get client name based on client type
export const getClientName = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Observatório";
    case "researcher":
      return "Pesquisador";
    case "politician":
      return "Político";
    case "institution":
      return "Instituição";
    case "journalist":
      return "Jornalista";
    case "press":
      return "Assessoria de Imprensa";
    default:
      return "Cliente";
  }
};

// Function to get client description
export const getClientDescription = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Plataforma completa para observatórios de políticas públicas acompanharem indicadores, integrarem dados e gerarem relatórios automatizados com visualizações avançadas.";
    case "researcher":
      return "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.";
    case "politician":
      return "Alertas sobre novas legislações, análise de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região.";
    case "institution":
      return "Ferramentas para gestão de dados institucionais, monitoramento de programas, dashboards personalizados e relatórios de acompanhamento para instituições de diversos setores.";
    case "journalist":
      return "Acesso a indicadores atualizados, visualizações prontas para publicação, verificação de dados e comparativos históricos para embasar reportagens investigativas e especiais.";
    case "press":
      return "Sistema completo para criação, aprovação e monitoramento de releases, acompanhamento de publicações, métricas de desempenho e gestão de contatos com veículos de comunicação.";
    default:
      return "Acesso a ferramentas e informações personalizadas.";
  }
};

// Client type details for service landing pages
export const clientTypeDetails = {
  observatory: {
    id: "observatory",
    title: "Observatório de Dados",
    description: "Plataforma completa para observatórios de políticas públicas.",
    details: "Nossa plataforma oferece ferramentas avançadas para observatórios de políticas públicas acompanharem indicadores, integrarem dados de múltiplas fontes e gerarem relatórios automatizados com visualizações dinâmicas e interativas.",
    features: [
      "Integração de dados de múltiplas fontes",
      "Dashboards personalizados e interativos",
      "Geração automatizada de relatórios",
      "Monitoramento de indicadores-chave",
      "Histórico de séries temporais",
      "Exportação em múltiplos formatos"
    ],
    benefits: [
      "Tomada de decisão baseada em dados confiáveis",
      "Economia de tempo na coleta e análise de informações",
      "Visualização clara e objetiva de tendências",
      "Compartilhamento simplificado de resultados",
      "Identificação rápida de padrões e anomalias"
    ],
    caseStudy: {
      title: "Observatório de Políticas Públicas - Região Norte",
      description: "Um observatório regional conseguiu aumentar em 60% a eficiência na coleta de dados e reduziu o tempo de geração de relatórios de 2 semanas para apenas 2 dias, melhorando significativamente sua capacidade de resposta a demandas urgentes."
    }
  },
  researcher: {
    id: "researcher",
    title: "Plataforma para Pesquisadores",
    description: "Ferramentas avançadas para pesquisadores e acadêmicos.",
    details: "Oferecemos acesso a datasets completos, APIs para integração com ferramentas estatísticas avançadas, histórico detalhado de séries temporais e recursos para compartilhamento seguro de dados com colaboradores e outros pesquisadores.",
    features: [
      "Acesso a datasets completos e atualizados",
      "APIs para integração com R, Python e outras ferramentas",
      "Histórico completo de séries temporais",
      "Compartilhamento seguro de dados",
      "Ferramentas de análise estatística",
      "Visualizações personalizáveis para publicações"
    ],
    benefits: [
      "Economia de tempo na coleta e preparação de dados",
      "Garantia de confiabilidade e origem das informações",
      "Facilitação da colaboração entre equipes de pesquisa",
      "Acesso a dados históricos para análises longitudinais",
      "Conformidade com requisitos de financiadores sobre gestão de dados"
    ],
    caseStudy: {
      title: "Grupo de Pesquisa em Epidemiologia - Universidade Federal",
      description: "Um grupo de pesquisa universitário conseguiu reduzir em 70% o tempo dedicado à coleta e limpeza de dados, permitindo que os pesquisadores focassem mais na análise e interpretação, resultando em três publicações adicionais em um ano."
    }
  },
  politician: {
    id: "politician",
    title: "Inteligência para Mandatos",
    description: "Dados e análises para decisões políticas fundamentadas.",
    details: "Sistema completo com alertas sobre novas legislações, análises de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região para suporte à tomada de decisão.",
    features: [
      "Alertas personalizados sobre novas legislações",
      "Análise de impacto de políticas públicas",
      "Resumos executivos diários",
      "Comparativos regionais de indicadores",
      "Monitoramento de repercussão de temas",
      "Relatórios de desempenho de políticas"
    ],
    benefits: [
      "Tomada de decisão baseada em evidências",
      "Antecipação de tendências e demandas sociais",
      "Priorização eficiente de ações e recursos",
      "Avaliação objetiva do impacto de iniciativas",
      "Melhor comunicação com eleitores e stakeholders"
    ],
    caseStudy: {
      title: "Mandato Legislativo Estadual",
      description: "Um mandato legislativo estadual utilizou nossa plataforma para identificar prioridades regionais baseadas em dados, resultando em proposição de projetos com 40% mais apoio e engajamento da população local."
    }
  },
  institution: {
    id: "institution",
    title: "Gestão Institucional de Dados",
    description: "Soluções integradas para instituições de todos os setores.",
    details: "Fornecemos ferramentas completas para gestão de dados institucionais, monitoramento de programas e projetos, dashboards personalizados e relatórios de acompanhamento adaptados às necessidades específicas de cada instituição.",
    features: [
      "Integração de dados de múltiplos departamentos",
      "Painéis executivos personalizados",
      "Monitoramento em tempo real de indicadores",
      "Relatórios automatizados periódicos",
      "Ferramentas de planejamento estratégico",
      "Análise de desempenho de programas"
    ],
    benefits: [
      "Visão unificada do desempenho institucional",
      "Alinhamento entre equipes e departamentos",
      "Otimização da alocação de recursos",
      "Melhoria contínua baseada em dados",
      "Prestação de contas simplificada"
    ],
    caseStudy: {
      title: "Secretaria Estadual de Planejamento",
      description: "Uma secretaria estadual implementou nossa solução e conseguiu reduzir em 30% o tempo de elaboração do orçamento anual, além de melhorar a precisão das projeções orçamentárias em 25%."
    }
  },
  journalist: {
    id: "journalist",
    title: "Centro de Dados para Jornalistas",
    description: "Informações verificadas para reportagens fundamentadas.",
    details: "Oferecemos acesso privilegiado a indicadores atualizados, visualizações prontas para publicação, ferramentas de verificação de dados e comparativos históricos para embasar reportagens investigativas e matérias especiais.",
    features: [
      "Acesso a dados verificados e atualizados",
      "Visualizações prontas para publicação",
      "Ferramentas de fact-checking",
      "Comparativos históricos de indicadores",
      "Alertas de novos dados relevantes",
      "Exportação em formatos compatíveis com editorias"
    ],
    benefits: [
      "Credibilidade reforçada das reportagens",
      "Redução do tempo de apuração e verificação",
      "Capacidade de identificar tendências e pautas relevantes",
      "Diferenciação do conteúdo produzido",
      "Proteção contra desinformação e dados imprecisos"
    ],
    caseStudy: {
      title: "Equipe de Jornalismo de Dados - Jornal Nacional",
      description: "Uma equipe de jornalismo de dados utilizou nossa plataforma para produzir uma série especial sobre desigualdade social, conseguindo reduzir o tempo de apuração em 50% e aumentando o engajamento dos leitores em 35%."
    }
  },
  press: {
    id: "press",
    title: "Sistema para Assessorias de Imprensa",
    description: "Gestão completa de releases e relacionamento com a mídia.",
    details: "Nosso sistema oferece ferramentas para criação, aprovação e monitoramento de releases, acompanhamento de publicações na mídia, métricas de desempenho e gestão integrada de contatos com veículos de comunicação.",
    features: [
      "Workflow de criação e aprovação de releases",
      "Monitoramento de publicações na mídia",
      "Métricas de desempenho de divulgações",
      "Gestão de relacionamento com veículos",
      "Agenda integrada de pautas e eventos",
      "Relatórios de resultados para clientes"
    ],
    benefits: [
      "Organização e controle do fluxo de informações",
      "Avaliação objetiva do retorno de divulgações",
      "Otimização da estratégia de relacionamento com a mídia",
      "Identificação dos canais mais efetivos",
      "Demonstração clara de resultados para clientes"
    ],
    caseStudy: {
      title: "Assessoria de Imprensa Corporativa",
      description: "Uma assessoria que atende 12 clientes simultaneamente conseguiu aumentar em 45% o índice de aproveitamento de releases e reduzir em 30% o tempo dedicado à produção de relatórios de resultados."
    }
  }
};

// Type assertion helper
export function assertClientType(value: string): asserts value is ClientType {
  const validTypes = ["observatory", "researcher", "politician", "institution", "journalist", "press"];
  if (!validTypes.includes(value)) {
    throw new Error(`Invalid client type: ${value}`);
  }
}

// Safe type casting
export function asClientType(value: string): ClientType {
  assertClientType(value);
  return value;
}
