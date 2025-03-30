
import { useState, useEffect } from 'react';
import { MonitoringItem, LegislationAlert, ReleaseMonitoringItem } from './monitoring/types';
import { toast } from '@/hooks/use-toast';
import { 
  getClientMonitorings, 
  getLegislationAlerts, 
  getReleaseMonitoring,
  createMonitoring,
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

  const addMonitoring = async (monitoring: Omit<MonitoringItem, 'id' | 'status' | 'lastUpdate' | 'createdAt'>) => {
    try {
      const newMonitoring = await createMonitoring(monitoring);
      setMonitoringItems(prev => [newMonitoring, ...prev]);
      
      toast({
        title: 'Monitoramento adicionado',
        description: `Monitoramento "${monitoring.name}" foi configurado com sucesso.`,
      });
      
      return newMonitoring;
    } catch (error) {
      console.error('Erro ao adicionar monitoramento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o monitoramento',
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

  return {
    monitoringItems,
    legislationAlerts,
    releaseMonitoring,
    isLoading,
    addMonitoring,
    deleteMonitoring,
    refreshData: fetchMonitorings
  };
}
