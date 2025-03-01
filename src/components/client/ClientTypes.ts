
export type ClientType = 
  | "observatory" 
  | "researcher" 
  | "politician" 
  | "institution" 
  | "journalist" 
  | "press";

export interface ClientTypeDetails {
  id: ClientType;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  details: string;
  caseStudy?: {
    title: string;
    description: string;
  };
}

export const clientTypeDetails: Record<ClientType, ClientTypeDetails> = {
  observatory: {
    id: "observatory",
    title: "Observatório",
    description: "Plataforma completa para observatórios de políticas públicas acompanharem indicadores, integrarem dados e gerarem relatórios automatizados com visualizações avançadas.",
    features: [
      "Integração com APIs governamentais",
      "Dashboards personalizados em tempo real",
      "Relatórios automatizados com periodicidade configurável",
      "Alertas de atualização de indicadores",
      "Ferramentas de análise comparativa entre regiões"
    ],
    benefits: [
      "Economia de tempo com automação de coleta de dados",
      "Visualização eficiente de tendências e padrões",
      "Fundamentação técnica para advocacy",
      "Monitoramento contínuo de políticas públicas",
      "Compartilhamento facilitado de resultados"
    ],
    details: "Nossa plataforma para observatórios oferece um ecossistema completo para monitoramento e análise de políticas públicas. Desenvolvida especificamente para organizações que precisam acompanhar indicadores governamentais, a solução permite a integração de múltiplas fontes de dados, criação de painéis personalizados e geração de relatórios detalhados com visualizações avançadas que facilitam a comunicação de resultados.",
    caseStudy: {
      title: "Observatório de Saúde Pública",
      description: "Um observatório estadual de saúde utilizou nossa plataforma para monitorar indicadores de atenção básica em todos os municípios do estado. Com a automação da coleta de dados do DATASUS e sistemas próprios, conseguiram reduzir o tempo de produção de relatórios em 70% e identificar municípios com déficit de cobertura, resultando em intervenções que aumentaram o acesso à saúde em regiões vulneráveis."
    }
  },
  researcher: {
    id: "researcher",
    title: "Pesquisador",
    description: "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.",
    features: [
      "Acesso a datasets limpos e organizados",
      "APIs para integração com R, Python e SPSS",
      "Séries históricas completas",
      "Ferramentas de compartilhamento seguro de dados",
      "Metadados detalhados e documentação"
    ],
    benefits: [
      "Agilidade no acesso a dados confiáveis",
      "Integração simples com ferramentas de análise",
      "Colaboração facilitada entre pesquisadores",
      "Reprodutibilidade de pesquisas",
      "Citação automática de fontes"
    ],
    details: "Nossa solução para pesquisadores acadêmicos e científicos foi desenvolvida para simplificar o acesso a dados governamentais e facilitar análises robustas. Oferecemos datasets organizados e documentados, com APIs específicas para integração com ferramentas estatísticas populares como R, Python e SPSS. A plataforma mantém séries históricas completas e permite o compartilhamento seguro de dados entre pesquisadores, facilitando a colaboração e a reprodutibilidade de estudos.",
    caseStudy: {
      title: "Grupo de Pesquisa em Economia Urbana",
      description: "Um grupo de pesquisa universitário utilizou nossa plataforma para analisar dados de mobilidade urbana e desenvolvimento econômico em regiões metropolitanas. A integração com ferramentas estatísticas permitiu análises complexas que resultaram em duas publicações em revistas internacionais. O compartilhamento de dados facilitou a colaboração com pesquisadores de outras instituições."
    }
  },
  politician: {
    id: "politician",
    title: "Político",
    description: "Alertas sobre novas legislações, análise de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região.",
    features: [
      "Alertas em tempo real sobre novas legislações",
      "Análises de impacto de políticas públicas",
      "Resumos executivos personalizados",
      "Comparativos regionais de indicadores-chave",
      "Dashboards de acompanhamento de metas"
    ],
    benefits: [
      "Tomada de decisões baseada em evidências",
      "Acompanhamento eficiente do ciclo legislativo",
      "Visão estratégica para planejamento de políticas",
      "Comunicação eficaz com constituintes",
      "Mensuração de resultados de programas"
    ],
    details: "Nossa plataforma para políticos e assessores parlamentares foi desenvolvida para apoiar a tomada de decisão baseada em evidências e o acompanhamento eficiente de políticas públicas. O sistema fornece alertas sobre novas legislações relevantes, análises de impacto de políticas implementadas, resumos executivos de dados governamentais complexos e comparativos detalhados de indicadores por região, permitindo uma atuação mais informada e estratégica.",
    caseStudy: {
      title: "Secretaria Municipal de Desenvolvimento",
      description: "Uma secretaria municipal de desenvolvimento econômico implementou nossa plataforma para monitorar indicadores de emprego e renda após a implementação de um programa de incentivos fiscais. O acompanhamento sistemático permitiu ajustes precisos na política, resultando em um aumento de 15% na geração de empregos locais e melhor direcionamento dos recursos públicos."
    }
  },
  institution: {
    id: "institution",
    title: "Instituição",
    description: "Ferramentas para gestão de dados institucionais, monitoramento de programas, dashboards personalizados e relatórios de acompanhamento para instituições de diversos setores.",
    features: [
      "Gestão centralizada de dados institucionais",
      "Monitoramento de programas e projetos",
      "Dashboards personalizados por departamento",
      "Relatórios automatizados para stakeholders",
      "Indicadores de desempenho customizáveis"
    ],
    benefits: [
      "Visão unificada de dados institucionais",
      "Monitoramento eficiente de programas",
      "Transparência na prestação de contas",
      "Otimização de processos internos",
      "Suporte à tomada de decisões estratégicas"
    ],
    details: "Nossa solução para instituições oferece um sistema completo para gestão de dados, monitoramento de programas e geração de relatórios personalizados. Desenvolvida para atender às necessidades de organizações de diversos setores, a plataforma centraliza informações, automatiza o acompanhamento de indicadores e facilita a visualização de resultados através de dashboards customizáveis, tornando a gestão de dados mais eficiente e estratégica.",
    caseStudy: {
      title: "Fundação de Apoio à Pesquisa",
      description: "Uma fundação de apoio à pesquisa científica implementou nossa plataforma para monitorar a execução de projetos financiados. Com dashboards personalizados para cada departamento, conseguiram reduzir o tempo de elaboração de relatórios em 60% e melhorar a transparência na prestação de contas, resultando em aumento de 25% nos recursos captados no ano seguinte."
    }
  },
  journalist: {
    id: "journalist",
    title: "Jornalista",
    description: "Acesso a indicadores atualizados, visualizações prontas para publicação, verificação de dados e comparativos históricos para embasar reportagens investigativas e especiais.",
    features: [
      "Acesso a dados verificados e atualizados",
      "Visualizações prontas para publicação",
      "Ferramentas de verificação de dados",
      "Séries históricas para contextualização",
      "Exportação em formatos compatíveis com editoriais"
    ],
    benefits: [
      "Fundamentação sólida para reportagens",
      "Economia de tempo na análise de dados",
      "Credibilidade em matérias investigativas",
      "Contextualização histórica de temas atuais",
      "Visualizações impactantes para o público"
    ],
    details: "Nossa plataforma para jornalistas foi desenvolvida para facilitar o acesso a dados confiáveis e atualizados, oferecendo ferramentas específicas para verificação de informações e criação de visualizações impactantes. O sistema permite consultar séries históricas para contextualização de temas atuais, comparar indicadores entre diferentes períodos e regiões, e exportar gráficos e tabelas em formatos compatíveis com os principais sistemas editoriais.",
    caseStudy: {
      title: "Redação de Jornal de Grande Circulação",
      description: "A equipe de jornalismo de dados de um jornal de grande circulação utilizou nossa plataforma para uma série de reportagens sobre desigualdade social. Utilizando as ferramentas de visualização e análise comparativa, produziram um especial premiado que apresentou dados complexos de forma acessível ao público geral, aumentando o engajamento dos leitores e estabelecendo o veículo como referência no tema."
    }
  },
  press: {
    id: "press",
    title: "Assessoria de Imprensa",
    description: "Sistema completo para criação, aprovação e monitoramento de releases, acompanhamento de publicações, métricas de desempenho e gestão de contatos com veículos de comunicação.",
    features: [
      "Sistema de criação e aprovação de releases",
      "Monitoramento de publicações na mídia",
      "Métricas de desempenho e alcance",
      "Gestão de contatos com veículos de comunicação",
      "Agendamento de envios e follow-ups"
    ],
    benefits: [
      "Fluxo de trabalho otimizado para aprovações",
      "Mensuração precisa de resultados",
      "Relacionamento eficiente com a imprensa",
      "Insights sobre temas de maior repercussão",
      "Automação de processos de comunicação"
    ],
    details: "Nossa solução para assessorias de imprensa oferece um sistema completo para gerenciamento do ciclo de vida de releases, desde a criação e aprovação até o monitoramento de publicações e mensuração de resultados. A plataforma inclui ferramentas para gestão de contatos com veículos de comunicação, agendamento de envios, acompanhamento de métricas de desempenho e geração de relatórios detalhados sobre a presença na mídia.",
    caseStudy: {
      title: "Assessoria de Empresa de Tecnologia",
      description: "A assessoria de imprensa de uma empresa de tecnologia implementou nossa plataforma para gerenciar suas ações de comunicação. Com o sistema de aprovação de releases e monitoramento integrado, conseguiram reduzir o tempo de publicação em 40% e aumentar em 35% o número de veículos que divulgaram seus conteúdos, consolidando a marca como referência no setor de inovação."
    }
  }
};
