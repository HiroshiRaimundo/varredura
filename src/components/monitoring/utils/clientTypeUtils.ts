
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

export const getClientTypeLabel = (clientType: ClientType): string => {
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

export const getClientTypeDescription = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Monitoramento de dados e informações públicas";
    case "researcher":
      return "Coleta e análise de dados para pesquisa científica";
    case "politician":
      return "Acompanhamento de menções na mídia e análise de impacto";
    case "institution":
      return "Monitoramento de regulamentações e políticas públicas";
    case "journalist":
      return "Alertas e dados para pautas jornalísticas";
    case "press":
      return "Gestão de releases e monitoramento de mídia";
    default:
      return "Serviços personalizados de monitoramento";
  }
};
