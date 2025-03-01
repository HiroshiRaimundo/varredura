
// Re-export ClientType from ClientUtils.ts
export type { ClientType } from "@/components/client/ClientUtils";
export { 
  getDefaultCategories,
  getMonitoringFormTitle, 
  getMonitoringFormDescription 
} from "@/components/client/ClientUtils";

// Add interface for ClientTypeInfo that includes alert property
export interface ClientTypeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  alert?: string;
}

// List of available client types
export const clientTypes: ClientTypeInfo[] = [
  {
    id: "observatory",
    name: "Observatório",
    description: "Acesso a dados e informações para observatórios e institutos de monitoramento.",
    icon: "search",
    alert: "Novas fontes de dados disponíveis"
  },
  {
    id: "researcher",
    name: "Pesquisador",
    description: "Ferramentas de pesquisa e análise de dados para pesquisadores e acadêmicos.",
    icon: "book",
    alert: "Novos datasets disponíveis para análise"
  },
  {
    id: "politician",
    name: "Político",
    description: "Monitoramento de legislação e informações relevantes para mandatos políticos.",
    icon: "landmark",
    alert: "Novos projetos de lei cadastrados"
  },
  {
    id: "institution",
    name: "Instituição",
    description: "Gestão de informações e documentos para instituições governamentais e não-governamentais.",
    icon: "building",
    alert: "Novos documentos oficiais disponíveis"
  },
  {
    id: "journalist",
    name: "Jornalista",
    description: "Acesso a dados e informações para jornalistas e veículos de comunicação.",
    icon: "newspaper",
    alert: "Novas pautas sugeridas pelo sistema"
  },
  {
    id: "press",
    name: "Assessoria de Imprensa",
    description: "Gerenciamento de releases e monitoramento de mídia para assessorias de imprensa.",
    icon: "mic",
    alert: "Novas publicações do seu conteúdo detectadas"
  }
];

// Function to get client type info by id
export const getClientTypeInfo = (clientType: string): ClientTypeInfo | undefined => {
  return clientTypes.find(type => type.id === clientType);
};
