
import { ServiceType } from "@/hooks/useClientAuth";

export interface Client {
  id: string;
  name: string;
  email: string;
  serviceType: ServiceType;
  status: "active" | "inactive";
  createdAt: Date;
  expiresAt?: Date;
}

// Local storage implementation
const STORAGE_KEY = 'app_clients_data';

// Helper function to load clients from localStorage
const loadClientsFromStorage = (): Client[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Convert string dates back to Date objects
      return parsedData.map((client: any) => ({
        ...client,
        createdAt: new Date(client.createdAt),
        expiresAt: client.expiresAt ? new Date(client.expiresAt) : undefined
      }));
    }
  } catch (error) {
    console.error("Error loading clients from storage:", error);
  }
  return [];
};

// Helper function to save clients to localStorage
const saveClientsToStorage = (clients: Client[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.error("Error saving clients to storage:", error);
  }
};

// Initialize clients from localStorage
let clients: Client[] = loadClientsFromStorage();

export const clientService = {
  // Buscar todos os clientes
  getAll: async (): Promise<Client[]> => {
    return clients;
  },

  // Buscar cliente por ID
  getById: async (id: string): Promise<Client | null> => {
    return clients.find(client => client.id === id) || null;
  },

  // Buscar cliente por email
  getByEmail: async (email: string): Promise<Client | null> => {
    return clients.find(client => client.email.toLowerCase() === email.toLowerCase()) || null;
  },

  // Criar novo cliente
  create: async (data: Omit<Client, "id" | "createdAt">): Promise<Client> => {
    const existingClient = await clientService.getByEmail(data.email);
    if (existingClient) {
      throw new Error("Email já cadastrado");
    }

    const newClient: Client = {
      id: crypto.randomUUID(), // More reliable ID generation
      ...data,
      createdAt: new Date()
    };

    clients.push(newClient);
    saveClientsToStorage(clients);
    return newClient;
  },

  // Atualizar cliente
  update: async (id: string, data: Partial<Client>): Promise<Client> => {
    const index = clients.findIndex(client => client.id === id);
    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    if (data.email && data.email.toLowerCase() !== clients[index].email.toLowerCase()) {
      const existingClient = await clientService.getByEmail(data.email);
      if (existingClient) {
        throw new Error("Email já cadastrado");
      }
    }

    clients[index] = {
      ...clients[index],
      ...data,
      // Ensure dates are Date objects
      createdAt: clients[index].createdAt,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : clients[index].expiresAt
    };

    saveClientsToStorage(clients);
    return clients[index];
  },

  // Remover cliente
  delete: async (id: string): Promise<void> => {
    const index = clients.findIndex(client => client.id === id);
    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    clients.splice(index, 1);
    saveClientsToStorage(clients);
  },

  // Atualizar status do cliente
  updateStatus: async (id: string, status: "active" | "inactive"): Promise<Client> => {
    return clientService.update(id, { status });
  },

  // Verificar credenciais do cliente
  verifyCredentials: async (email: string, password: string): Promise<Client | null> => {
    // Implementar verificação de senha quando houver integração com banco real
    const client = await clientService.getByEmail(email);
    return client && client.status === "active" ? client : null;
  },

  // Redefinir senha do cliente
  resetPassword: async (id: string): Promise<string> => {
    const client = await clientService.getById(id);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }

    // Generate a secure random password
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // In a real implementation, we would hash this password and store it in the database
    
    return newPassword;
  }
};
