
export enum ServiceType {
  OBSERVATORY = "observatory",
  PRESS = "press",
  RESEARCHER = "researcher",
  POLITICIAN = "politician",
  INSTITUTION = "institution",
  JOURNALIST = "journalist"
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  serviceType: ServiceType;
}

export interface ClientAuthCredentials {
  email: string;
  password: string;
}

export const useClientAuth = () => {
  // Funções básicas para autenticação de cliente
  // Implementação mock apenas para resolver o erro de importação
  
  const login = async (credentials: ClientAuthCredentials): Promise<ClientUser | null> => {
    // Implementação simulada - em um cenário real, isto faria uma chamada para API
    return null;
  };

  const logout = () => {
    // Implementação simulada
  };

  const verifyClientAccess = (serviceType: ServiceType): boolean => {
    // Implementação simulada
    return true;
  };

  return {
    login,
    logout,
    verifyClientAccess
  };
};

export default useClientAuth;
