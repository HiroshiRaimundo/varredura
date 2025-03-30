
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  MonitoringItem, 
  LegislationAlert, 
  ReleaseMonitoringItem 
} from "./monitoring/types";
import { 
  fetchMonitoringItemsFromDB, 
  addMonitoringItemToDB, 
  deleteMonitoringItemFromDB, 
  fetchLegislationAlertsFromDB, 
  fetchReleaseMonitoringFromDB 
} from "./monitoring/api";
import { 
  exportMonitoringItems, 
  getUniqueResponsibles, 
  filterMonitoringItemsByResponsible 
} from "./monitoring/utils";

export const useMonitoring = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responsibleFilter, setResponsibleFilter] = useState<string>("");
  const [legislationAlerts, setLegislationAlerts] = useState<LegislationAlert[]>([]);
  const [releaseMonitoring, setReleaseMonitoring] = useState<ReleaseMonitoringItem[]>([]);
  const form = useForm<Omit<MonitoringItem, "id">>({
    defaultValues: {
      name: "",
      url: "",
      frequency: "diária",
      category: "Legislação",
      responsible: "",
      keywords: "",
      notes: ""
    }
  });

  // Fetch monitoring items
  const fetchMonitoringItems = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching monitoring items...");
      const items = await fetchMonitoringItemsFromDB();
      console.log("Monitoring items fetched:", items?.length || 0);
      setMonitoringItems(items || []);
      
      // Fetch legislation alerts and release monitoring data
      const alerts = fetchLegislationAlertsFromDB();
      setLegislationAlerts(alerts);
      
      const releases = fetchReleaseMonitoringFromDB();
      setReleaseMonitoring(releases);
    } catch (error) {
      console.error('Error fetching monitoring items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark a legislation alert as read
  const markAlertAsRead = (id: string) => {
    setLegislationAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
    
    toast("Alerta marcado como lido", {
      description: "O alerta foi marcado como lido e não aparecerá nas notificações."
    });
  };

  // Add a new monitoring item
  const handleAddMonitoring = async (data: Omit<MonitoringItem, "id">) => {
    try {
      console.log("Adding monitoring item:", data);
      const newItem = await addMonitoringItemToDB(data);
      setMonitoringItems(prev => [newItem, ...prev]);
      form.reset();
      
      toast("Item adicionado", {
        description: `Monitoramento de ${data.name} foi configurado.`
      });
      
      return { success: true, data: newItem };
    } catch (error) {
      console.error('Error in handleAddMonitoring:', error);
      toast("Erro ao adicionar item", {
        description: "Ocorreu um erro ao adicionar o monitoramento."
      });
      return { success: false, error };
    }
  };

  // Delete a monitoring item
  const handleDeleteMonitoring = async (id: string) => {
    try {
      await deleteMonitoringItemFromDB(id);
      setMonitoringItems(prev => prev.filter(item => item.id !== id));
      
      toast("Item removido", {
        description: "O monitoramento foi removido com sucesso."
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error in handleDeleteMonitoring:', error);
      toast("Erro ao remover item", {
        description: "Ocorreu um erro ao remover o monitoramento."
      });
      return { success: false, error };
    }
  };

  // Export monitoring items
  const handleExport = () => {
    exportMonitoringItems(monitoringItems);
  };

  // Get filtered monitoring items based on responsible filter
  const filteredMonitoringItems = filterMonitoringItemsByResponsible(
    monitoringItems, 
    responsibleFilter
  );

  return {
    monitoringItems: filteredMonitoringItems,
    allMonitoringItems: monitoringItems,
    isLoading,
    form,
    responsibleFilter,
    setResponsibleFilter,
    getUniqueResponsibles: () => getUniqueResponsibles(monitoringItems),
    fetchMonitoringItems,
    handleAddMonitoring,
    handleDeleteMonitoring,
    handleExport,
    legislationAlerts,
    releaseMonitoring,
    markAlertAsRead,
    unreadAlertCount: legislationAlerts.filter(alert => !alert.isRead).length
  };
};

export type { MonitoringItem, LegislationAlert, ReleaseMonitoringItem };
