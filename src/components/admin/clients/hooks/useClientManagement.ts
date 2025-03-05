import { useState, useCallback } from 'react';
import { ClientAccount } from '@/types/adminTypes';

// Mock data - substituir por dados reais da API
const mockClients: ClientAccount[] = [
  {
    id: '1',
    name: 'Observatório Nacional',
    email: 'contato@observatorio.com.br',
    type: 'observatory',
    status: 'active',
    plan: 'premium',
    createdAt: new Date().toISOString(),
    organization: 'Observatório Nacional'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao.silva@pesquisa.org',
    type: 'researcher',
    status: 'trial',
    plan: 'basic',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@politica.gov.br',
    type: 'politician',
    status: 'active',
    plan: 'premium',
    createdAt: new Date().toISOString(),
    organization: 'Câmara dos Deputados'
  },
  {
    id: '4',
    name: 'Universidade Federal',
    email: 'reitoria@univ.edu.br',
    type: 'institution',
    status: 'active',
    plan: 'premium',
    createdAt: new Date().toISOString(),
    organization: 'Universidade Federal'
  },
  {
    id: '5',
    name: 'Pedro Costa',
    email: 'pedro@jornal.com.br',
    type: 'journalist',
    status: 'active',
    plan: 'basic',
    createdAt: new Date().toISOString(),
    organization: 'Jornal da Cidade'
  },
  {
    id: '6',
    name: 'Agência de Notícias',
    email: 'redacao@agencia.com.br',
    type: 'press',
    status: 'active',
    plan: 'premium',
    createdAt: new Date().toISOString(),
    organization: 'Agência de Notícias'
  }
];

export const useClientManagement = () => {
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadClients = useCallback(async () => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClients(mockClients);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStatusToggle = useCallback(async (clientId: string) => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setClients(prevClients => 
        prevClients.map(client => {
          if (client.id === clientId) {
            return {
              ...client,
              status: client.status === 'active' ? 'inactive' : 'active'
            };
          }
          return client;
        })
      );
    } catch (error) {
      console.error('Erro ao alterar status do cliente:', error);
    }
  }, []);

  return {
    clients,
    isLoading,
    loadClients,
    handleStatusToggle
  };
};
