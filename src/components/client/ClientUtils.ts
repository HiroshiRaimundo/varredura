
// Client-specific utility functions and data

// Get client type title for display
export const getClientTypeTitle = (clientType: string): string => {
  switch (clientType) {
    case "observatory": return "Observatório";
    case "researcher": return "Pesquisador";
    case "politician": return "Político";
    case "institution": return "Instituição";
    case "journalist": return "Jornalista";
    default: return "Cliente";
  }
};

// Client-specific dashboard descriptions
export const getClientDescription = (clientType: string): string => {
  switch (clientType) {
    case "observatory":
      return "Acesso a indicadores agregados e análises de tendências para monitoramento estratégico de políticas públicas e dados socioeconômicos regionais.";
    case "researcher":
      return "Visualização detalhada de dados para análises acadêmicas, com acesso a séries históricas e possibilidade de download para processamento complementar.";
    case "politician":
      return "Resumo executivo de indicadores-chave para tomada de decisão estratégica, com foco em tendências e impactos de políticas públicas.";
    case "institution":
      return "Monitoramento de dados institucionais para gestão de responsabilidades e acompanhamento de projetos por área de atuação.";
    case "journalist":
      return "Acesso rápido a dados e tendências para produção de reportagens baseadas em evidências, com foco em visualizações simplificadas e dados atualizados.";
    default:
      return "";
  }
};
