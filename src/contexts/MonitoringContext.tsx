import React, { createContext, useContext, useState } from 'react';

interface Monitoring {
  id: string;
  name: string;
  type: 'url' | 'api';
  urls?: string[];
  apiEndpoint?: string;
  frequency: string;
  active: boolean;
  responsible: string;
  description?: string;
  keywords: string[];
  categories: string[];
  customCategories: string[];
  metrics: string[];
  analysisTypes: string[];
  createdAt: Date;
  lastUpdate?: Date;
}

interface MonitoringContextType {
  monitorings: Monitoring[];
  addMonitoring: (monitoring: Omit<Monitoring, 'id' | 'createdAt'>) => void;
  updateMonitoring: (id: string, monitoring: Partial<Monitoring>) => void;
  deleteMonitoring: (id: string) => void;
}

const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export function MonitoringProvider({ children }: { children: React.ReactNode }) {
  const [monitorings, setMonitorings] = useState<Monitoring[]>([]);

  const addMonitoring = (newMonitoring: Omit<Monitoring, 'id' | 'createdAt'>) => {
    const monitoring: Monitoring = {
      ...newMonitoring,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setMonitorings(prev => [...prev, monitoring]);
  };

  const updateMonitoring = (id: string, updates: Partial<Monitoring>) => {
    setMonitorings(prev => prev.map(m => 
      m.id === id ? { ...m, ...updates, lastUpdate: new Date() } : m
    ));
  };

  const deleteMonitoring = (id: string) => {
    setMonitorings(prev => prev.filter(m => m.id !== id));
  };

  return (
    <MonitoringContext.Provider value={{ monitorings, addMonitoring, updateMonitoring, deleteMonitoring }}>
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (context === undefined) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
}
