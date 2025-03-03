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

// Simulação de banco de dados (substituir por integração real posteriormente)
let clients: Client[] = [];

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
    return clients.find(client => client.email === email) || null;
  },

  // Criar novo cliente
  create: async (data: Omit<Client, "id" | "createdAt">): Promise<Client> => {
    const existingClient = await clientService.getByEmail(data.email);
    if (existingClient) {
      throw new Error("Email já cadastrado");
    }

    const newClient: Client = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date()
    };

    clients.push(newClient);
    return newClient;
  },

  // Atualizar cliente
  update: async (id: string, data: Partial<Client>): Promise<Client> => {
    const index = clients.findIndex(client => client.id === id);
    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    if (data.email && data.email !== clients[index].email) {
      const existingClient = await clientService.getByEmail(data.email);
      if (existingClient) {
        throw new Error("Email já cadastrado");
      }
    }

    clients[index] = {
      ...clients[index],
      ...data
    };

    return clients[index];
  },

  // Remover cliente
  delete: async (id: string): Promise<void> => {
    const index = clients.findIndex(client => client.id === id);
    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    clients.splice(index, 1);
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

    // Implementar geração e atualização de senha quando houver integração com banco real
    const newPassword = "nova-senha-gerada";
    return newPassword;
  }
}; 