
import { useState, useEffect } from 'react';
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from './monitoring/types';
import { toast } from '@/hooks/use-toast';
import { 
  getClientMonitorings, 
  getLegislationAlerts, 
  getReleaseMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring as apiDeleteMonitoring
} from './monitoring/api';

// Re-export MonitoringItem for other files to import
export type { MonitoringItem, LegislationAlert, ReleaseMonitoringItem };

export function useMonitoring(clientId: string = 'default') {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [legislationAlerts, setLegislationAlerts] = useState<LegislationAlert[]>([]);
  const [releaseMonitoring, setReleaseMonitoring] = useState<ReleaseMonitoringItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMonitorings();
    fetchLegislationAlerts();
    fetchReleaseMonitoring();
  }, []);

  const fetchMonitorings = async () => {
    setIsLoading(true);
    try {
      const result = await getClientMonitorings(clientId);
      if (result.data) {
        setMonitoringItems(result.data);
      }
    } catch (error) {
      console.error('Erro ao buscar monitoramentos:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os monitoramentos',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLegislationAlerts = () => {
    try {
      const alerts = getLegislationAlerts();
      setLegislationAlerts(alerts);
    } catch (error) {
      console.error('Erro ao buscar alertas de legislação:', error);
    }
  };

  const fetchReleaseMonitoring = () => {
    try {
      const releases = getReleaseMonitoring();
      setReleaseMonitoring(releases);
    } catch (error) {
      console.error('Erro ao buscar monitoramento de releases:', error);
    }
  };

  const addMonitoring = async (monitoring: Partial<MonitoringItem>) => {
    try {
      // Check if this is an update or create operation
      if (monitoring.id) {
        // This is an update
        const updatedItem = {
          ...monitoring,
          lastUpdate: new Date().toISOString()
        };
        
        // Call the API to update the item
        const result = await updateMonitoring(updatedItem as MonitoringItem & { id: string });
        
        // Update local state
        setMonitoringItems(prev => 
          prev.map(item => item.id === monitoring.id ? result : item)
        );
        
        toast({
          title: 'Monitoramento atualizado',
          description: `Monitoramento "${monitoring.name}" foi atualizado com sucesso.`,
        });
        
        return result;
      } else {
        // This is a new monitoring
        const newMonitoring = await createMonitoring(monitoring as Omit<MonitoringItem, 'id' | 'status' | 'lastUpdate' | 'createdAt'>);
        setMonitoringItems(prev => [newMonitoring, ...prev]);
        
        toast({
          title: 'Monitoramento adicionado',
          description: `Monitoramento "${monitoring.name}" foi configurado com sucesso.`,
        });
        
        return newMonitoring;
      }
    } catch (error) {
      console.error('Erro ao adicionar/atualizar monitoramento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o monitoramento',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteMonitoring = async (id: string) => {
    try {
      const success = await apiDeleteMonitoring(id);
      
      if (success) {
        setMonitoringItems(prev => prev.filter(item => item.id !== id));
        
        toast({
          title: 'Monitoramento removido',
          description: 'O monitoramento foi excluído com sucesso.',
        });
      }
      
      return success;
    } catch (error) {
      console.error('Erro ao excluir monitoramento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o monitoramento',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateMonitoringStatus = async (id: string, newStatus: string) => {
    try {
      // Call the API to update the status
      const updatedItem = { id, status: newStatus } as MonitoringItem & { id: string };
      const result = await updateMonitoring(updatedItem);
      
      // Update local state
      setMonitoringItems(prev => 
        prev.map(item => item.id === id ? 
          { ...item, status: newStatus, lastUpdate: new Date().toISOString() } : item
        )
      );
      
      toast({
        title: 'Status atualizado',
        description: `O status do monitoramento foi atualizado para ${newStatus}.`,
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do monitoramento',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    monitoringItems,
    legislationAlerts,
    releaseMonitoring,
    isLoading,
    addMonitoring,
    deleteMonitoring,
    updateMonitoringStatus,
    refreshData: fetchMonitorings
  };
}
