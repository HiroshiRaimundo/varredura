
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
