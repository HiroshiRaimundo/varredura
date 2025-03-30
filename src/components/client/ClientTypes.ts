
export { clientTypes } from '@/data/clientTypesList';
export type { ClientType } from '@/types/clientTypes';

// Definimos interfaces para ClientTypeDetail e CaseStudy
export interface ClientTypeDetail {
  id: string;
  name: string;
  description: string;
  features: string[];
  caseStudies?: CaseStudy[];
  alert?: string;
  title?: string;
  shortDescription?: string;
  benefits?: string[];
  details?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  results: string;
  clientName?: string;
}

// Adicionando clientTypeDetails para uso em toda a aplicação
export const clientTypeDetails: Record<string, ClientTypeDetail> = {
  observatory: {
    id: "observatory",
    name: "Observatório",
    title: "Observatório",
    shortDescription: "Monitoramento e análise de dados para observatórios",
    description: "Plataforma completa para observatórios de políticas públicas",
    features: [
      "Monitoramento de múltiplas fontes de dados",
      "Dashboards personalizados",
      "Alertas avançados",
      "Exportação de relatórios"
    ],
    benefits: [
      "Acompanhamento automatizado de dados",
      "Análises visuais intuitivas",
      "Compartilhamento facilitado de informações",
      "Economia de tempo em processos repetitivos"
    ],
    details: "Solução ideal para organizações que precisam monitorar indicadores constantemente"
  },
  researcher: {
    id: "researcher",
    name: "Pesquisador",
    title: "Pesquisador",
    shortDescription: "Ferramentas para pesquisa acadêmica",
    description: "Acesso a dados estruturados para pesquisadores",
    features: [
      "Acesso a datasets completos",
      "API para integração",
      "Histórico de séries temporais",
      "Compartilhamento seguro de dados"
    ],
    benefits: [
      "Dados confiáveis para pesquisas",
      "Facilidade para cruzar informações",
      "Economia de tempo em coleta de dados",
      "Suporte a metodologias quantitativas"
    ],
    details: "Ideal para pesquisadores que precisam de dados confiáveis e atualizados"
  },
  politician: {
    id: "politician",
    name: "Político",
    title: "Político",
    shortDescription: "Monitoramento de legislação",
    description: "Acompanhamento de políticas públicas e legislação",
    features: [
      "Alertas sobre novas legislações",
      "Análise de impacto de políticas públicas",
      "Resumos executivos de dados",
      "Comparativos regionais"
    ],
    benefits: [
      "Decisões baseadas em dados",
      "Acompanhamento eficiente de legislação",
      "Informações contextualizadas",
      "Antecipação de tendências políticas"
    ],
    details: "Ferramenta essencial para mandatos políticos baseados em evidências"
  },
  institution: {
    id: "institution",
    name: "Instituição",
    title: "Instituição",
    shortDescription: "Recursos para instituições",
    description: "Ferramentas para gestão de dados institucionais",
    features: [
      "Dashboards institucionais",
      "Monitoramento de programas",
      "Relatórios de acompanhamento",
      "Ferramentas de planejamento"
    ],
    benefits: [
      "Gestão orientada por dados",
      "Acompanhamento de metas e indicadores",
      "Transparência nas ações",
      "Melhoria contínua de processos"
    ],
    details: "Solução completa para instituições que precisam monitorar e avaliar seus programas"
  },
  journalist: {
    id: "journalist",
    name: "Jornalista",
    title: "Jornalista",
    shortDescription: "Fontes de dados para reportagens",
    description: "Acesso a indicadores para reportagens investigativas",
    features: [
      "Indicadores atualizados",
      "Visualizações prontas",
      "Verificação de dados",
      "Comparativos históricos"
    ],
    benefits: [
      "Reportagens baseadas em dados",
      "Verificação ágil de informações",
      "Contextualização de notícias",
      "Material visual para publicações"
    ],
    details: "Ferramenta indispensável para jornalismo de dados e reportagens investigativas"
  },
  press: {
    id: "press",
    name: "Assessoria de Imprensa",
    title: "Assessoria de Imprensa",
    shortDescription: "Ferramentas para releases e comunicação",
    description: "Sistema para criação e distribuição de releases",
    features: [
      "Criação e aprovação de releases",
      "Monitoramento de publicações",
      "Métricas de desempenho",
      "Gestão de contatos"
    ],
    benefits: [
      "Fluxo de trabalho otimizado",
      "Maior taxa de aproveitamento de releases",
      "Métricas claras de resultados",
      "Relacionamento eficiente com veículos"
    ],
    details: "Sistema completo para assessorias de imprensa profissionais"
  }
};
