
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

export interface ClientTypeInfo {
  type: ClientType;
  label: string;
  description: string;
  icon: string;
  color: string;
  alert?: string;
}

export const clientTypes: ClientTypeInfo[] = [
  {
    type: "observatory",
    label: "Observatório",
    description: "Acesso a dados e visualizações para observatórios de políticas públicas",
    icon: "database",
    color: "bg-blue-500"
  },
  {
    type: "researcher",
    label: "Pesquisador",
    description: "Recursos para pesquisadores acadêmicos e científicos",
    icon: "microscope",
    color: "bg-purple-500"
  },
  {
    type: "politician",
    label: "Político",
    description: "Ferramentas para acompanhamento de políticas e legislação",
    icon: "landmark",
    color: "bg-green-500"
  },
  {
    type: "institution",
    label: "Instituição",
    description: "Recursos para instituições governamentais e não-governamentais",
    icon: "building",
    color: "bg-amber-500"
  },
  {
    type: "journalist",
    label: "Jornalista",
    description: "Fontes de dados e indicadores para reportagens",
    icon: "newspaper",
    color: "bg-rose-500"
  },
  {
    type: "press",
    label: "Assessoria de Imprensa",
    description: "Ferramentas para criação e distribuição de releases",
    icon: "megaphone",
    color: "bg-indigo-500",
    alert: "Novo"
  }
];

export const getClientTypeInfo = (type: ClientType): ClientTypeInfo => {
  const info = clientTypes.find(ct => ct.type === type);
  if (!info) {
    throw new Error(`Client type "${type}" not found`);
  }
  return info;
};

// Added missing functions
export const getDefaultCategories = (clientType?: ClientType): string[] => {
  switch (clientType) {
    case "observatory":
      return ["indicadores", "estatísticas", "relatórios", "dados abertos"];
    case "researcher":
      return ["pesquisa", "artigos", "dados brutos", "datasets"];
    case "politician":
      return ["legislação", "políticas", "orçamento", "transparência"];
    case "institution":
      return ["relatórios", "programas", "dados institucionais"];
    case "journalist":
      return ["notícias", "pautas", "estatísticas", "dados públicos"];
    case "press":
      return ["releases", "mídia", "cobertura", "publicações"];
    default:
      return ["geral", "dados", "relatórios", "estatísticas"];
  }
};

export const getMonitoringFormTitle = (clientType?: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Adicionar Fonte de Dados para Monitoramento";
    case "researcher":
      return "Adicionar Dataset de Pesquisa";
    case "politician":
      return "Adicionar Legislação ou Política para Acompanhamento";
    case "institution":
      return "Adicionar Fonte de Monitoramento Institucional";
    case "journalist":
      return "Adicionar Fonte de Dados para Reportagens";
    case "press":
      return "Adicionar Veículo para Monitoramento de Publicações";
    default:
      return "Adicionar Novo Monitoramento";
  }
};

export const getMonitoringFormDescription = (clientType?: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Cadastre fontes de dados para monitoramento contínuo de indicadores";
    case "researcher":
      return "Adicione datasets e APIs para análise científica e pesquisa";
    case "politician":
      return "Monitore atualizações em legislações e políticas públicas";
    case "institution":
      return "Acompanhe indicadores e relatórios institucionais";
    case "journalist":
      return "Cadastre fontes de dados para embasar suas reportagens";
    case "press":
      return "Monitore a publicação de releases em veículos de comunicação";
    default:
      return "Preencha os dados para adicionar uma nova fonte de monitoramento";
  }
};
