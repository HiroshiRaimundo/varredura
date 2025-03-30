
import { ClientType } from "@/types/clientTypes";

export type { ClientType };

export const getMonitoringFormTitle = (clientType?: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Sistema de Monitoramento para Observatório";
    case "researcher":
      return "Sistema de Monitoramento para Pesquisadores";
    case "politician":
      return "Sistema de Monitoramento de Imprensa";
    case "institution":
      return "Sistema de Monitoramento Institucional";
    case "journalist":
      return "Sistema de Monitoramento para Jornalistas";
    case "press":
      return "Sistema de Monitoramento para Assessoria de Imprensa";
    default:
      return "Sistema de Monitoramento";
  }
};

export const getMonitoringFormDescription = (clientType?: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Gerencie monitoramentos automáticos de fontes de dados para seu observatório";
    case "researcher":
      return "Configure monitoramentos para acompanhar fontes de pesquisa e publicações acadêmicas";
    case "politician":
      return "Monitore menções na mídia e redes sociais para acompanhar sua reputação";
    case "institution":
      return "Monitoramento institucional para acompanhamento de políticas públicas e menções";
    case "journalist":
      return "Monitore fontes de notícias e publicações para encontrar referências e insights";
    case "press":
      return "Acompanhe a distribuição e repercussão de releases e comunicados";
    default:
      return "Gerencie monitoramentos automáticos de fontes de dados";
  }
};

export const getDefaultCategories = (clientType?: ClientType): string[] => {
  const baseCategories = ["governo", "indicadores", "legislacao", "api"];
  
  switch (clientType) {
    case "observatory":
      return [...baseCategories, "dados-abertos", "pesquisa"];
    case "researcher":
      return [...baseCategories, "publicacoes-academicas", "repositorios"];
    case "politician":
      return ["midia", "redes-sociais", "legislacao", "eleicoes", "opiniao-publica"];
    case "institution":
      return ["midia", "politicas-publicas", "indicadores", "relatorios", "governanca"];
    case "journalist":
      return ["fontes", "pautas", "reportagens", "midias-sociais", "concorrentes"];
    case "press":
      return ["releases", "publicacoes", "imprensa", "contatos", "campanhas"];
    default:
      return baseCategories;
  }
};

export const getClientTypeInfo = (clientType: ClientType) => {
  return {
    title: getMonitoringFormTitle(clientType),
    description: getMonitoringFormDescription(clientType),
    alert: getClientTypeAlert(clientType),
  };
};

export const getClientTypeAlert = (clientType: ClientType): string | null => {
  switch (clientType) {
    case "observatory":
      return "As configurações serão adaptadas para necessidades de observatórios e centros de pesquisa.";
    case "researcher":
      return "Monitore publicações acadêmicas e repositórios de pesquisa relevantes para seu trabalho.";
    case "politician":
      return "Acompanhe a repercussão de suas ações na mídia e o impacto na opinião pública.";
    case "institution":
      return "Configure o monitoramento para acompanhar temas relevantes para sua instituição.";
    case "journalist":
      return "Acompanhe fontes de informação e encontre referências para suas pautas.";
    case "press":
      return "Monitore a repercussão de seus releases e comunicados na imprensa.";
    default:
      return null;
  }
};
