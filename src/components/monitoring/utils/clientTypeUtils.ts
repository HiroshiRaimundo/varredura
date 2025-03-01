
import { ClientType } from "../../../components/client/ClientUtils";

// Client type information
export interface ClientTypeInfo {
  label: string;
  description: string;
  icon: string;
}

// Map client types to their display information
export const getClientTypeInfo = (clientType: ClientType): ClientTypeInfo => {
  const clientTypeMap: Record<ClientType, ClientTypeInfo> = {
    observatory: {
      label: "Observatório",
      description: "Monitoramento de dados para observatórios",
      icon: "search"
    },
    researcher: {
      label: "Pesquisador",
      description: "Monitoramento de dados para pesquisadores",
      icon: "book"
    },
    politician: {
      label: "Político",
      description: "Monitoramento de dados para políticos",
      icon: "landmark"
    },
    institution: {
      label: "Instituição",
      description: "Monitoramento de dados para instituições",
      icon: "building"
    },
    journalist: {
      label: "Jornalista",
      description: "Monitoramento de dados para jornalistas",
      icon: "newspaper"
    },
    press: {
      label: "Assessoria de Imprensa",
      description: "Gerenciamento de releases e monitoramento de mídia",
      icon: "mic"
    }
  };

  return clientTypeMap[clientType];
};

// Get default categories based on client type
export const getDefaultCategories = (clientType: ClientType): string[] => {
  const categoryMap: Record<ClientType, string[]> = {
    observatory: ["Dados Públicos", "Estatísticas", "Relatórios"],
    researcher: ["Artigos Científicos", "Dados de Pesquisa", "Publicações"],
    politician: ["Legislação", "Votações", "Projetos de Lei"],
    institution: ["Editais", "Documentos Públicos", "Licitações"],
    journalist: ["Notícias", "Coletivas", "Entrevistas"],
    press: ["Releases", "Menções na Mídia", "Entrevistas"]
  };

  return categoryMap[clientType];
};

// Get monitoring form title based on client type
export const getMonitoringFormTitle = (clientType: ClientType): string => {
  const titleMap: Record<ClientType, string> = {
    observatory: "Configuração de Monitoramento para Observatório",
    researcher: "Configuração de Monitoramento para Pesquisador",
    politician: "Configuração de Monitoramento para Político",
    institution: "Configuração de Monitoramento para Instituição",
    journalist: "Configuração de Monitoramento para Jornalista",
    press: "Configuração de Monitoramento para Assessoria de Imprensa"
  };

  return titleMap[clientType];
};

// Get monitoring form description based on client type
export const getMonitoringFormDescription = (clientType: ClientType): string => {
  const descriptionMap: Record<ClientType, string> = {
    observatory: "Configure o monitoramento de dados para seu observatório",
    researcher: "Configure o monitoramento de dados para sua pesquisa",
    politician: "Configure o monitoramento de dados para seu mandato",
    institution: "Configure o monitoramento de dados para sua instituição",
    journalist: "Configure o monitoramento de dados para suas pautas",
    press: "Configure o monitoramento de dados para sua assessoria de imprensa"
  };

  return descriptionMap[clientType];
};
