
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

// Function to get client description
export const getClientDescription = (clientType: ClientType): string => {
  switch (clientType) {
    case "observatory":
      return "Plataforma completa para observatórios de políticas públicas acompanharem indicadores, integrarem dados e gerarem relatórios automatizados com visualizações avançadas.";
    case "researcher":
      return "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.";
    case "politician":
      return "Alertas sobre novas legislações, análise de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região.";
    case "institution":
      return "Ferramentas para gestão de dados institucionais, monitoramento de programas, dashboards personalizados e relatórios de acompanhamento para instituições de diversos setores.";
    case "journalist":
      return "Acesso a indicadores atualizados, visualizações prontas para publicação, verificação de dados e comparativos históricos para embasar reportagens investigativas e especiais.";
    case "press":
      return "Sistema completo para criação, aprovação e monitoramento de releases, acompanhamento de publicações, métricas de desempenho e gestão de contatos com veículos de comunicação.";
    default:
      return "Acesso a ferramentas e informações personalizadas.";
  }
};

// Type assertion helper
export function assertClientType(value: string): asserts value is ClientType {
  const validTypes = ["observatory", "researcher", "politician", "institution", "journalist", "press"];
  if (!validTypes.includes(value)) {
    throw new Error(`Invalid client type: ${value}`);
  }
}

// Safe type casting
export function asClientType(value: string): ClientType {
  assertClientType(value);
  return value;
}
