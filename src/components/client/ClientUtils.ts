
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

// Function to get client icon based on client type
export const getClientIcon = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "search";
    case "researcher":
      return "book";
    case "politician":
      return "landmark";
    case "institution":
      return "building";
    case "journalist":
      return "newspaper";
    case "press":
      return "mic";
    default:
      return "user";
  }
};

// Function to get client type title (re-exported for compatibility)
export const getClientTypeTitle = (clientType: ClientType): string => {
  return getClientName(clientType);
};

// Function to get client description (re-exported for compatibility)
export const getClientDescription = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Acesso a dados e informações para observatórios e institutos de monitoramento.";
    case "researcher":
      return "Ferramentas de pesquisa e análise de dados para pesquisadores e acadêmicos.";
    case "politician":
      return "Monitoramento de legislação e informações relevantes para mandatos políticos.";
    case "institution":
      return "Gestão de informações e documentos para instituições governamentais e não-governamentais.";
    case "journalist":
      return "Acesso a dados e informações para jornalistas e veículos de comunicação.";
    case "press":
      return "Gerenciamento de releases e monitoramento de mídia para assessorias de imprensa.";
    default:
      return "Acesso a ferramentas e informações personalizadas.";
  }
};

// Get default categories for monitoring forms
export const getDefaultCategories = (clientType: ClientType): string[] => {
  switch (clientType) {
    case "observatory":
      return ["Dados Públicos", "Relatórios", "Estatísticas", "Pesquisas"];
    case "researcher":
      return ["Artigos Científicos", "Bases de Dados", "Metodologias", "Publicações"];
    case "politician":
      return ["Legislação", "Projetos de Lei", "Políticas Públicas", "Orçamento"];
    case "institution":
      return ["Regulamentações", "Documentos Oficiais", "Portarias", "Editais"];
    case "journalist":
      return ["Notícias", "Reportagens", "Entrevistas", "Pautas"];
    case "press":
      return ["Releases", "Coberturas", "Mídia", "Publicações"];
    default:
      return ["Geral", "Específico", "Temático", "Personalizado"];
  }
};

// Get monitoring form title
export const getMonitoringFormTitle = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Cadastro de Monitoramento - Observatório";
    case "researcher":
      return "Cadastro de Pesquisa Monitorada";
    case "politician":
      return "Monitoramento Legislativo";
    case "institution":
      return "Monitoramento Institucional";
    case "journalist":
      return "Monitoramento de Pautas";
    case "press":
      return "Monitoramento de Mídia";
    default:
      return "Cadastro de Monitoramento";
  }
};

// Get monitoring form description
export const getMonitoringFormDescription = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Configure o monitoramento de dados e informações para seu observatório";
    case "researcher":
      return "Cadastre pesquisas para monitoramento contínuo de dados";
    case "politician":
      return "Configure o monitoramento de legislação e temas relevantes para seu mandato";
    case "institution":
      return "Configure o monitoramento de temas relevantes para sua instituição";
    case "journalist":
      return "Configure o monitoramento de temas para futuras pautas";
    case "press":
      return "Configure o monitoramento de mídia para releases e coberturas";
    default:
      return "Configure seu monitoramento personalizado";
  }
};
