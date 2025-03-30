
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Define the Monitoring type to match what's being used in the components
export interface Monitoring {
  id: string;
  name: string;
  responsible: string;
  description?: string;
  frequency: string;
  urls?: string[];
  metrics?: string[];
  analysisTypes?: string[];
  status?: "active" | "inactive" | "analyzing";
  type: string;
  active: boolean;
  keywords: string[];
  categories: { id: string; name: string }[];
  customCategories: string[];
  lastUpdate?: string;
  theme?: string; 
  group?: string;
  createdAt?: string;
}

interface MonitoringContextType {
  monitorings: Monitoring[];
  addMonitoring: (monitoring: Omit<Monitoring, "id" | "createdAt">) => void;
  updateMonitoring: (monitoring: Monitoring) => void;
  removeMonitoring: (id: string) => void;
  getMonitoringById: (id: string) => Monitoring | undefined;
}

const MonitoringContext = createContext<MonitoringContextType>({
  monitorings: [],
  addMonitoring: () => {},
  updateMonitoring: () => {},
  removeMonitoring: () => {},
  getMonitoringById: () => undefined,
});

export const useMonitoring = () => useContext(MonitoringContext);

// Demo data for testing
const initialMonitorings: Monitoring[] = [
  {
    id: "1",
    name: "Portal da Transparência",
    responsible: "Maria Silva",
    description: "Monitoramento de atualizações de dados do Portal da Transparência",
    frequency: "1d",
    urls: ["http://www.portaldatransparencia.gov.br"],
    metrics: ["content_length", "html_structure"],
    analysisTypes: ["content", "frequency"],
    status: "active",
    type: "url",
    active: true,
    keywords: ["orçamento", "licitação", "contratos"],
    categories: [{ id: "gov", name: "Governo" }],
    customCategories: ["transparência"],
    lastUpdate: new Date().toISOString(),
    theme: "Governo",
    group: "Portais Governamentais",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Diário Oficial da União",
    responsible: "João Costa",
    description: "Monitoramento de publicações no DOU",
    frequency: "1d",
    urls: ["https://www.in.gov.br"],
    metrics: ["content", "links"],
    analysisTypes: ["content"],
    status: "active",
    type: "url",
    active: true,
    keywords: ["legislação", "portaria", "resolução"],
    categories: [{ id: "leg", name: "Legislação" }],
    customCategories: [],
    lastUpdate: new Date().toISOString(),
    theme: "Legislação",
    group: "Publicações Oficiais",
    createdAt: new Date().toISOString()
  }
];

export const MonitoringProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [monitorings, setMonitorings] = useState<Monitoring[]>(initialMonitorings);

  const addMonitoring = (newMonitoring: Omit<Monitoring, "id" | "createdAt">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    
    const monitoringWithId = {
      ...newMonitoring,
      id,
      createdAt
    };
    
    setMonitorings(prev => [monitoringWithId, ...prev]);
    toast.success("Monitoramento adicionado com sucesso");
  };

  const updateMonitoring = (updatedMonitoring: Monitoring) => {
    setMonitorings(prev =>
      prev.map(monitoring =>
        monitoring.id === updatedMonitoring.id ? updatedMonitoring : monitoring
      )
    );
    toast.success("Monitoramento atualizado com sucesso");
  };

  const removeMonitoring = (id: string) => {
    setMonitorings(prev => prev.filter(monitoring => monitoring.id !== id));
    toast.success("Monitoramento removido com sucesso");
  };

  const getMonitoringById = (id: string) => {
    return monitorings.find(monitoring => monitoring.id === id);
  };

  return (
    <MonitoringContext.Provider
      value={{
        monitorings,
        addMonitoring,
        updateMonitoring,
        removeMonitoring,
        getMonitoringById,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};
