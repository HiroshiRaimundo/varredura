
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from "./types";

// Fetch monitoring items from Supabase
export const fetchMonitoringItemsFromDB = async () => {
  try {
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
      description: "Não foi possível carregar os monitoramentos.",
      variant: "destructive"
    });
    return [];
  }
};

// Add a new monitoring item to Supabase
export const addMonitoringItemToDB = async (data: Omit<MonitoringItem, "id">) => {
  try {
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
    
    const formattedItem: MonitoringItem = {
      id: newItem.id,
      name: newItem.name,
      url: newItem.url,
      api_url: newItem.api_url,
      frequency: newItem.frequency,
      category: newItem.category,
      keywords: newItem.keywords,
      responsible: (newItem as any).responsible || null,
      notes: (newItem as any).notes || null
    };
    
    return formattedItem;
  } catch (error) {
    console.error('Erro ao adicionar monitoramento:', error);
    toast({
      title: "Erro ao adicionar item",
      description: "Não foi possível adicionar o monitoramento.",
      variant: "destructive"
    });
    throw error;
  }
};

// Delete a monitoring item from Supabase
export const deleteMonitoringItemFromDB = async (id: string) => {
  try {
    const { error } = await supabase
      .from('monitoring_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Erro ao remover monitoramento:', error);
    toast({
      title: "Erro ao remover item",
      description: "Não foi possível remover o monitoramento.",
      variant: "destructive"
    });
    throw error;
  }
};

// Simulate fetching legislation alerts (mock data for now)
export const fetchLegislationAlertsFromDB = (): LegislationAlert[] => {
  // In a real app, this would come from an API
  const mockAlerts: LegislationAlert[] = [
    {
      id: "1",
      title: "Nova Lei de Proteção Ambiental",
      description: "Lei Nº 14.522/2023 sobre medidas de proteção a áreas ambientais",
      date: "2023-06-10",
      url: "https://www.gov.br/exemplo",
      isRead: false
    },
    {
      id: "2",
      title: "Atualização do Código Florestal",
      description: "Alteração nos artigos 23 e 24 relacionados a reservas legais",
      date: "2023-05-15",
      url: "https://www.gov.br/exemplo2",
      isRead: true
    },
    {
      id: "3",
      title: "Resolução sobre Qualidade do Ar",
      description: "Novas métricas para monitoramento da qualidade do ar em centros urbanos",
      date: "2023-04-22",
      url: "https://www.gov.br/exemplo3",
      isRead: false
    }
  ];
  
  return mockAlerts;
};

// Fetch release monitoring results (mock data for now)
export const fetchReleaseMonitoringFromDB = (): ReleaseMonitoringItem[] => {
  // In a real app, this would come from an API
  // Mock data for release monitoring
  const mockReleaseMonitoring: ReleaseMonitoringItem[] = [
    {
      id: "1",
      releaseTitle: "Nova tecnologia ambiental lançada no mercado",
      websiteName: "Folha de São Paulo",
      publishedDate: "2023-06-12",
      publishedTime: "14:30",
      url: "https://folha.com/tecnologia-ambiental",
      isVerified: true
    },
    {
      id: "2",
      releaseTitle: "Resultados do estudo sobre qualidade do ar divulgados",
      websiteName: "G1",
      publishedDate: "2023-05-18",
      publishedTime: "10:15",
      url: "https://g1.com/qualidade-ar-estudo",
      isVerified: true
    },
    {
      id: "3",
      releaseTitle: "Novo programa de monitoramento ambiental",
      websiteName: "Estadão",
      publishedDate: "2023-06-22",
      publishedTime: "09:45",
      url: "https://estadao.com/programa-monitoramento",
      isVerified: false
    }
  ];
  
  return mockReleaseMonitoring;
};
