import { useState, useEffect } from 'react';

export interface MonitoredItem {
  id: string;
  term: string;
  lastUpdate: string;
  mentionsCount: number;
  status: 'active' | 'paused';
}

export const useMonitoringService = () => {
  const [monitoredItems, setMonitoredItems] = useState<MonitoredItem[]>([]);

  const addItemToMonitor = (term: string) => {
    const newItem: MonitoredItem = {
      id: Date.now().toString(),
      term,
      lastUpdate: new Date().toISOString(),
      mentionsCount: 0,
      status: 'active'
    };
    setMonitoredItems(prev => [newItem, ...prev]);
  };

  const removeMonitoredItem = (id: string) => {
    setMonitoredItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItemStatus = (id: string, status: 'active' | 'paused') => {
    setMonitoredItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status } 
          : item
      )
    );
  };

  // Simula atualização periódica dos dados
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoredItems(prev => 
        prev.map(item => ({
          ...item,
          lastUpdate: new Date().toISOString(),
          mentionsCount: item.mentionsCount + Math.floor(Math.random() * 3)
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    monitoredItems,
    addItemToMonitor,
    removeMonitoredItem,
    updateItemStatus
  };
};
