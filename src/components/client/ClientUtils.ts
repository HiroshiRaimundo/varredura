
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
