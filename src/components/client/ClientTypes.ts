
export type ClientType = 'observatory' | 'researcher' | 'politician' | 'institution' | 'journalist' | 'press';

export interface ClientTypeDetails {
  title: string;
  description: string;
  icon: string;
  features: string[];
  dashboardPath: string;
}

export const clientTypeDetails: Record<ClientType, ClientTypeDetails> = {
  observatory: {
    title: "Observatórios",
    description: "Monitoramento abrangente de dados e notícias para observatórios temáticos",
    icon: "Eye",
    features: [
      "Monitoramento contínuo de múltiplas fontes",
      "Análise de tendências em dados governamentais",
      "Geração de relatórios personalizados",
      "Visualização georreferenciada de dados",
      "Exportação de dados para diversos formatos"
    ],
    dashboardPath: "/clients/observatory"
  },
  researcher: {
    title: "Pesquisadores",
    description: "Ferramentas de pesquisa e análise para acadêmicos e cientistas",
    icon: "BookOpen",
    features: [
      "Acesso a dados de fontes oficiais em tempo real",
      "Exportação para formatos compatíveis com softwares estatísticos",
      "Visualização geográfica de estudos e publicações",
      "Ferramentas de análise de dados para pesquisas",
      "Indexação de publicações e monitoramento de citações"
    ],
    dashboardPath: "/clients/researcher"
  },
  politician: {
    title: "Políticos",
    description: "Monitoramento de imagem e análise de repercussão para figuras públicas",
    icon: "Award",
    features: [
      "Monitoramento de imagem e menções na mídia",
      "Análise de repercussão de declarações e projetos",
      "Acompanhamento da presença digital e engajamento",
      "Alertas de temas emergentes com potencial impacto",
      "Relatórios comparativos com análise de sentimento"
    ],
    dashboardPath: "/clients/politician"
  },
  institution: {
    title: "Instituições",
    description: "Gestão de comunicação institucional e análise de presença na mídia",
    icon: "Building",
    features: [
      "Monitoramento da presença institucional na mídia",
      "Gestão centralizada de comunicação externa",
      "Relatórios de impacto e alcance de divulgações",
      "Acompanhamento de menções e sentiment analysis",
      "Coordenação de comunicação em múltiplos canais"
    ],
    dashboardPath: "/clients/institution"
  },
  journalist: {
    title: "Jornalistas",
    description: "Acesso rápido a fontes de notícias e ferramentas de produção de conteúdo",
    icon: "Newspaper",
    features: [
      "Alertas de notícias relevantes em tempo real",
      "Acesso a banco de dados de fontes verificadas",
      "Verificação de informações em fontes oficiais",
      "Análise de tendências e tópicos emergentes",
      "Pesquisa avançada em publicações anteriores"
    ],
    dashboardPath: "/clients/journalist"
  },
  press: {
    title: "Assessoria de Imprensa",
    description: "Ferramentas completas para gestão de comunicação e assessoria de imprensa",
    icon: "MessageSquare",
    features: [
      "Gestão integrada de pautas e releases",
      "Automação da distribuição de conteúdo",
      "Métricas de efetividade das ações de imprensa",
      "Banco de dados de contatos de mídia atualizado",
      "Acompanhamento do ciclo completo de comunicação"
    ],
    dashboardPath: "/clients/press"
  }
};
