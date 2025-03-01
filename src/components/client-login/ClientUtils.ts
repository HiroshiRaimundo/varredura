
import { ClientInfo, ClientLoginFormValues } from "./types";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";

// Mock client credentials - in a real app this would be fetched from an API
export const validClients = [
  { email: "observatory@example.com", password: "password123", type: "observatory" },
  { email: "researcher@example.com", password: "password123", type: "researcher" },
  { email: "politician@example.com", password: "password123", type: "politician" },
  { email: "institution@example.com", password: "password123", type: "institution" },
  { email: "journalist@example.com", password: "password123", type: "journalist" },
  { email: "press@example.com", password: "password123", type: "press" }
];

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
  return {
    email,
    clientType,
    name: email.split('@')[0],
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };
};

/**
 * Saves client info to localStorage
 * @param clientInfo The client info to save
 */
export const saveClientInfo = (clientInfo: ClientInfo) => {
  localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
  console.log("Saved client info:", clientInfo);
};

/**
 * Gets client info from localStorage
 * @returns The client info or null if not found
 */
export const getClientInfo = (): ClientInfo | null => {
  const clientInfoString = localStorage.getItem('clientInfo');
  return clientInfoString ? JSON.parse(clientInfoString) : null;
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
};
