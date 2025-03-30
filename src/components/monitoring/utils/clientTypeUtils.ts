
import { ClientType } from "@/types/clientTypes";

interface ClientTypeInfo {
  title: string;
  description: string;
  alert: string | null;
  categories: string[];
}

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

const clientTypeInfoMap: Record<ClientType, ClientTypeInfo> = {
  observatory: {
    title: "Monitoramento do Observatório",
    description: "Identifique claramente o que está sendo monitorado para facilitar a organização dos dados.",
    alert: null,
    categories: ["ambiente", "legislação", "economia", "sociedade", "governo", "tecnologia"]
  },
  institution: {
    title: "Monitoramento Institucional",
    description: "Insira o título do monitoramento relacionado às atividades da sua instituição.",
    alert: "Como instituição, você possui acesso a ferramentas de análise avançadas.",
    categories: ["economia", "política", "desenvolvimento", "recursos", "projetos", "orçamento"]
  },
  researcher: {
    title: "Monitoramento de Pesquisa",
    description: "Defina o título da sua pesquisa ou do conjunto de dados a ser monitorado.",
    alert: "As fontes de pesquisa são verificadas automaticamente quanto à disponibilidade.",
    categories: ["pesquisa", "dados científicos", "estatísticas", "artigos", "repositórios", "bases de dados"]
  },
  journalist: {
    title: "Monitoramento de Mídia",
    description: "Especifique o tópico de mídia ou fluxo de notícias para monitoramento.",
    alert: "Você receberá alertas em tempo real para novos conteúdos publicados.",
    categories: ["notícias", "reportagens", "publicações", "redes sociais", "eventos", "comunicados"]
  },
  politician: {
    title: "Monitoramento Político",
    description: "Monitore políticas públicas, legislação ou temas de interesse político.",
    alert: "Os dados de monitoramento político são atualizados diariamente.",
    categories: ["legislação", "políticas públicas", "orçamento", "debates", "propostas", "audiências"]
  },
  press: {
    title: "Monitoramento de Imprensa",
    description: "Monitore a cobertura de mídia e publicações relacionadas aos seus releases.",
    alert: "Os releases publicados são monitorados automaticamente.",
    categories: ["releases", "cobertura", "mídia", "publicações", "menções", "veículos"]
  }
};

// Use the 'export type' syntax for re-exporting types with isolatedModules enabled
export type { ClientTypeInfo }; 
// Re-export ClientType para resolver os erros nos demais arquivos
export type { ClientType };

export const getClientTypeInfo = (clientType: ClientType): ClientTypeInfo => {
  return clientTypeInfoMap[clientType] || clientTypeInfoMap.observatory;
};

export const getMonitoringFormTitle = (clientType?: ClientType): string => {
  if (!clientType) return "Adicionar Novo Monitoramento";
  return clientTypeInfoMap[clientType]?.title || "Adicionar Novo Monitoramento";
};

export const getMonitoringFormDescription = (clientType?: ClientType): string => {
  if (!clientType) return "Configure uma nova fonte de dados para monitoramento contínuo";
  return clientTypeInfoMap[clientType]?.description || "Configure uma nova fonte de dados para monitoramento contínuo";
};

export const getDefaultCategories = (clientType: ClientType): string[] => {
  return clientTypeInfoMap[clientType]?.categories || clientTypeInfoMap.observatory.categories;
};
