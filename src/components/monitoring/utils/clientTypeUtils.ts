export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist";

export interface ClientTypeInfo {
  description: string;
  alert: string | null;
}

// Get client-specific descriptions and alerts
export const getClientTypeInfo = (clientType?: ClientType): ClientTypeInfo => {
  switch (clientType) {
    case "observatory":
      return {
        description: "Configure monitoramentos com foco em análises comparativas e datasets completos",
        alert: "Novos monitoramentos serão incluídos nas análises regionais e comparativas"
      };
    case "researcher":
      return {
        description: "Defina monitoramentos para identificar correlações e tendências em seus estudos",
        alert: "Seus monitoramentos estarão disponíveis para exportação em formatos compatíveis com ferramentas de análise"
      };
    case "politician":
      return {
        description: "Configure alertas sobre legislações e indicadores relevantes para políticas públicas",
        alert: "Você receberá notificações sobre alterações em indicadores-chave relacionados"
      };
    case "journalist":
      return {
        description: "Monitore fontes para identificar tendências emergentes e gerar pautas",
        alert: "As fontes monitoradas serão verificadas e classificadas por confiabilidade"
      };
    default:
      return {
        description: "Gerencie monitoramentos automáticos de fontes de dados",
        alert: null
      };
  };
};

// Define default categories based on client type
export const getDefaultCategories = (clientType?: ClientType): string[] => {
  const baseCategories = ["governo", "indicadores", "legislacao", "api"];
  
  switch (clientType) {
    case "observatory":
      return [...baseCategories, "ambiental", "social", "climático", "conservação", "biodiversidade"];
    case "researcher":
      return [...baseCategories, "acadêmico", "publicações", "peer-review", "conferências", "datasets"];
    case "politician":
      return [...baseCategories, "votações", "projetos", "orçamento", "impacto-social", "políticas-públicas"];
    case "institution":
      return [...baseCategories, "relatórios", "auditorias", "compliance", "transparência"];
    case "journalist":
      return [...baseCategories, "pautas", "entrevistas", "fontes", "fact-checking", "tendências", "exclusivo"];
    default:
      return baseCategories;
  }
};

// Get title for monitoring form based on client type
export const getMonitoringFormTitle = (clientType?: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Sistema de Monitoramento para Observatórios";
    case "researcher":
      return "Sistema de Monitoramento para Pesquisadores";
    case "politician":
      return "Sistema de Alertas para Gestores Públicos";
    case "institution":
      return "Sistema de Monitoramento Institucional";
    case "journalist":
      return "Sistema de Monitoramento de Fontes e Pautas";
    default:
      return "Sistema de Monitoramento";
  }
};

// Get description for monitoring form based on client type
export const getMonitoringFormDescription = (clientType?: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Configure análises comparativas e acesso a datasets completos";
    case "researcher":
      return "Identifique correlações e tendências para suas pesquisas";
    case "politician":
      return "Acompanhe indicadores de impacto e novas legislações";
    case "institution":
      return "Monitore dados relevantes para sua instituição";
    case "journalist":
      return "Acompanhe tendências e identifique novas pautas";
    default:
      return "Gerencie monitoramentos automáticos de fontes de dados";
  }
};
