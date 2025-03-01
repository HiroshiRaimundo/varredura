import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { convertToCSV } from "@/components/dashboard/DashboardUtils";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
}

export const useMonitoring = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responsibleFilter, setResponsibleFilter] = useState<string>("");
  const form = useForm<Omit<MonitoringItem, "id">>();

  const fetchMonitoringItems = async () => {
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
        responsible: (item as any).responsible || null
      }));
      
      setMonitoringItems(formattedItems);
    } catch (error) {
      console.error('Erro ao buscar itens de monitoramento:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os monitoramentos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMonitoring = async (data: Omit<MonitoringItem, "id">) => {
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
          responsible: data.responsible || null
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
        responsible: (newItem as any).responsible || null
      };
      
      setMonitoringItems(prev => [formattedItem, ...prev]);
      form.reset();
      
      toast({
        title: "Item adicionado",
        description: `Monitoramento de ${data.name} foi configurado.`
      });
    } catch (error) {
      console.error('Erro ao adicionar monitoramento:', error);
      toast({
        title: "Erro ao adicionar item",
        description: "Não foi possível adicionar o monitoramento.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMonitoring = async (id: string) => {
    try {
      const { error } = await supabase
        .from('monitoring_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMonitoringItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item removido",
        description: "O monitoramento foi removido com sucesso."
      });
    } catch (error) {
      console.error('Erro ao remover monitoramento:', error);
      toast({
        title: "Erro ao remover item",
        description: "Não foi possível remover o monitoramento.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    const exportFormat = window.confirm(
      "Clique em OK para exportar como JSON ou Cancelar para exportar como CSV"
    ) ? "json" : "csv";
    
    if (exportFormat === "json") {
      const dataStr = JSON.stringify(monitoringItems, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'monitoramento-dados.json');
      linkElement.click();
    } else {
      const csvData = convertToCSV(monitoringItems);
      const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvData);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'monitoramento-dados.csv');
      linkElement.click();
    }
    
    toast({
      title: "Dados exportados",
      description: `Seus dados foram exportados com sucesso no formato ${exportFormat.toUpperCase()}.`
    });
  };

  const getUniqueResponsibles = () => {
    const responsibles = monitoringItems
      .map(item => item.responsible)
      .filter(responsible => responsible !== undefined && responsible !== null) as string[];
    
    return [...new Set(responsibles)];
  };

  const filteredMonitoringItems = responsibleFilter
    ? monitoringItems.filter(item => item.responsible === responsibleFilter)
    : monitoringItems;

  return {
    monitoringItems: filteredMonitoringItems,
    allMonitoringItems: monitoringItems,
    isLoading,
    form,
    responsibleFilter,
    setResponsibleFilter,
    getUniqueResponsibles,
    fetchMonitoringItems,
    handleAddMonitoring,
    handleDeleteMonitoring,
    handleExport
  };
};

export type { MonitoringItem };
