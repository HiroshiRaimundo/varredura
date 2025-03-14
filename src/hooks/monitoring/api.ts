import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from "./types";
import { API_CONFIG, simulateNetworkDelay } from "@/config/api-config";

// Dados mockados para uso local quando o Supabase não estiver disponível
const mockMonitoringItems: MonitoringItem[] = [
  {
    id: "1",
    name: "Portal de Notícias",
    url: "https://exemplo.com/noticias",
    frequency: "diária",
    category: "Notícias",
    keywords: "governo, política, economia",
    responsible: "João Silva",
    notes: "Monitorar artigos sobre política econômica"
  },
  {
    id: "2",
    name: "Blog Corporativo",
    url: "https://exemplo.com/blog",
    frequency: "semanal",
    category: "Corporativo",
    keywords: "empresa, negócios, mercado",
    responsible: "Maria Oliveira",
    notes: "Verificar publicações sobre o mercado financeiro"
  },
  {
    id: "3",
    name: "Redes Sociais",
    url: "https://exemplo.com/social",
    frequency: "diária",
    category: "Social Media",
    keywords: "trending, viral, hashtag",
    responsible: "Pedro Santos",
    notes: "Monitorar tendências e menções à marca"
  }
];

// Fetch monitoring items from Supabase or use mock data
export const fetchMonitoringItemsFromDB = async () => {
  try {
    // Se configurado para usar dados mockados, retorna os dados locais
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateNetworkDelay();
      console.log("Usando dados mockados para monitoramentos");
      return mockMonitoringItems;
    }

    // Caso contrário, tenta buscar do Supabase
    const { data, error } = await supabase
      .from('monitoring_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const formattedItems = data.map(item => ({
      id: item.id,
      name: item.name,
      url: item.url,
      api_url: item.api_url,
      frequency: item.frequency,
      category: item.category,
      keywords: item.keywords,
      responsible: (item as any).responsible || null,
      notes: (item as any).notes || null
    }));
    
    return formattedItems;
  } catch (error) {
    console.error('Erro ao buscar itens de monitoramento:', error);
    toast({
      title: "Erro ao carregar dados",
      description: "Usando dados locais como fallback.",
      variant: "destructive"
    });
    return mockMonitoringItems; // Fallback para dados mockados em caso de erro
  }
};

// Add a new monitoring item to Supabase or mock data
export const addMonitoringItemToDB = async (data: Omit<MonitoringItem, "id">) => {
  try {
    // Se configurado para usar dados mockados, simula adição local
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateNetworkDelay();
      console.log("Simulando adição de item de monitoramento:", data);
      
      // Não faz nada real, apenas simula sucesso
      return {
        success: true,
        data: {
          ...data,
          id: `mock-${Date.now()}`
        }
      };
    }

    // Caso contrário, tenta adicionar ao Supabase
    const { data: newItem, error } = await supabase
      .from('monitoring_items')
      .insert({
        name: data.name,
        url: data.url,
        api_url: data.api_url || null,
        frequency: data.frequency,
        category: data.category,
        keywords: data.keywords || null,
        responsible: data.responsible || null,
        notes: data.notes || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: newItem
    };
  } catch (error) {
    console.error('Erro ao adicionar item de monitoramento:', error);
    toast({
      title: "Erro ao salvar",
      description: "Não foi possível salvar o monitoramento.",
      variant: "destructive"
    });
    return {
      success: false,
      error
    };
  }
};

// Delete a monitoring item from Supabase or mock data
export const deleteMonitoringItemFromDB = async (id: string) => {
  try {
    // Se configurado para usar dados mockados, simula deleção local
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateNetworkDelay();
      console.log("Simulando deleção de item de monitoramento:", id);
      
      // Não faz nada real, apenas simula sucesso
      return {
        success: true
      };
    }

    // Caso contrário, tenta deletar do Supabase
    const { error } = await supabase
      .from('monitoring_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Erro ao deletar item de monitoramento:', error);
    toast({
      title: "Erro ao deletar",
      description: "Não foi possível remover o monitoramento.",
      variant: "destructive"
    });
    return {
      success: false,
      error
    };
  }
};

// Simulate fetching legislation alerts (mock data for now)
export const fetchLegislationAlertsFromDB = (): LegislationAlert[] => {
  // Dados mockados para exemplo
  return [
    {
      id: "1",
      title: "Nova Lei de Proteção de Dados",
      description: "Alterações na legislação de proteção de dados pessoais",
      date: "2023-06-15",
      source: "Diário Oficial",
      impact: "alto",
      status: "pendente"
    },
    {
      id: "2",
      title: "Regulamentação do Setor Financeiro",
      description: "Novas regras para instituições financeiras",
      date: "2023-05-22",
      source: "Banco Central",
      impact: "médio",
      status: "analisado"
    },
    {
      id: "3",
      title: "Mudanças na Tributação",
      description: "Alterações nas alíquotas de impostos para 2023",
      date: "2023-04-10",
      source: "Receita Federal",
      impact: "alto",
      status: "implementado"
    }
  ];
};

// Fetch release monitoring results (mock data for now)
export const fetchReleaseMonitoringFromDB = (): ReleaseMonitoringItem[] => {
  // Dados mockados para exemplo
  return [
    {
      id: "1",
      title: "Lançamento do Novo Produto",
      date: "2023-06-01",
      coverage: 85,
      sentiment: "positivo",
      sources: ["Portal de Notícias", "Blog Especializado", "Redes Sociais"],
      highlights: [
        "Inovação destacada por especialistas",
        "Recepção positiva do público"
      ]
    },
    {
      id: "2",
      title: "Expansão Internacional",
      date: "2023-05-15",
      coverage: 92,
      sentiment: "muito positivo",
      sources: ["Mídia Internacional", "Portais de Negócios", "Imprensa Local"],
      highlights: [
        "Destaque para o potencial de crescimento",
        "Análise favorável do mercado"
      ]
    },
    {
      id: "3",
      title: "Parceria Estratégica",
      date: "2023-04-22",
      coverage: 78,
      sentiment: "neutro",
      sources: ["Portais de Negócios", "Blogs Especializados"],
      highlights: [
        "Análise dos potenciais benefícios",
        "Questionamentos sobre impacto no mercado"
      ]
    }
  ];
};
