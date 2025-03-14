import { ClientInfo, ClientLoginFormValues } from "./types";
import { ClientType } from "@/types/clientTypes";

// Lista de clientes válidos - em uma aplicação real isso seria buscado de uma API
export const validClients: { email: string; password: string; type: string; }[] = [];

/**
 * Type assertion helper for ClientType
 * This helps with TypeScript errors when passing string values to ClientType parameters
 */
export const asClientType = (type: string): ClientType => {
  // This ensures type safety while allowing string values to be converted to ClientType
  return type as ClientType;
};

/**
 * Validates client credentials against mock data
 * @param data The login form values
 * @returns The valid client or null if not found
 */
export const validateClient = (data: ClientLoginFormValues) => {
  console.log("Validating client credentials for:", data.email);
  
  const client = validClients.find(
    c => c.email === data.email && c.password === data.password
  );
  
  console.log("Client login validation:", data.email, client ? "found" : "not found", client?.type);
  return client;
};

/**
 * Creates a client info object from login data
 * @param email The client email
 * @param clientType The client type
 * @returns ClientInfo object
 */
export const createClientInfo = (email: string, clientType: string): ClientInfo => {
  const clientInfo = {
    email,
    clientType,
    name: email.split('@')[0],
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };
  
  console.log("Created client info:", clientInfo);
  return clientInfo;
};

/**
 * Saves client info to localStorage
 * @param clientInfo The client info to save
 */
export const saveClientInfo = (clientInfo: ClientInfo) => {
  localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
  console.log("Saved client info to localStorage:", clientInfo);
};

/**
 * Gets client info from localStorage
 * @returns The client info or null if not found
 */
export const getClientInfo = (): ClientInfo | null => {
  const clientInfoString = localStorage.getItem('clientInfo');
  const clientInfo = clientInfoString ? JSON.parse(clientInfoString) : null;
  console.log("Retrieved client info from localStorage:", clientInfo);
  return clientInfo;
};

/**
 * Checks if a client is logged in
 * @returns True if a client is logged in, false otherwise
 */
export const isClientLoggedIn = (): boolean => {
  const clientInfo = getClientInfo();
  return clientInfo !== null && clientInfo.isLoggedIn === true;
};

/**
 * Logs a client out
 */
export const logoutClient = () => {
  localStorage.removeItem('clientInfo');
  console.log("Client logged out, removed client info from localStorage");
};
