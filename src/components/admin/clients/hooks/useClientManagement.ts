import { useState, useCallback } from 'react';
import { ClientAccount } from '@/types/adminTypes';

// Mock data - substituir por dados reais da API
const mockClients: ClientAccount[] = [
  // Clientes do Observatório
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
    id: '7',
    name: 'Observatório Regional',
    email: 'contato@observatorio-regional.com.br',
    type: 'observatory',
    status: 'active',
    plan: 'basic',
    createdAt: new Date().toISOString(),
    organization: 'Observatório Regional'
  },
  // Pesquisadores
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
    id: '8',
    name: 'Ana Pesquisadora',
    email: 'ana@pesquisa.org',
    type: 'researcher',
    status: 'active',
    plan: 'premium',
    createdAt: new Date().toISOString()
  },
  // Políticos
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
    id: '9',
    name: 'José Político',
    email: 'jose@politica.gov.br',
    type: 'politician',
    status: 'active',
    plan: 'basic',
    createdAt: new Date().toISOString(),
    organization: 'Assembleia Legislativa'
  },
  // Instituições
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
    id: '10',
    name: 'Instituto de Pesquisa',
    email: 'contato@instituto.org.br',
    type: 'institution',
    status: 'active',
    plan: 'basic',
    createdAt: new Date().toISOString(),
    organization: 'Instituto de Pesquisa'
  },
  // Jornalistas
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
    id: '11',
    name: 'Carla Jornalista',
    email: 'carla@jornal.com.br',
    type: 'journalist',
    status: 'trial',
    plan: 'basic',
    createdAt: new Date().toISOString(),
    organization: 'Revista Semanal'
  },
  // Assessorias de Imprensa
  {
    id: '6',
    name: 'Agência de Notícias',
    email: 'redacao@agencia.com.br',
    type: 'press',
    status: 'active',
    plan: 'premium',
    createdAt: new Date().toISOString(),
    organization: 'Agência de Notícias'
  },
  {
    id: '12',
    name: 'Assessoria Comunicação',
    email: 'contato@assessoria.com.br',
    type: 'press',
    status: 'active',
    plan: 'basic',
    createdAt: new Date().toISOString(),
    organization: 'Assessoria Comunicação'
  }
];

export const useClientManagement = (clientType?: string) => {
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadClients = useCallback(async () => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Se um tipo de cliente foi especificado, filtrar apenas os clientes daquele tipo
      const filteredClients = clientType 
        ? mockClients.filter(client => client.type === clientType)
        : mockClients;
        
      setClients(filteredClients);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [clientType]);

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
