import React, { createContext, useContext, useState } from 'react';

interface MonitoringData {
  id: string;
  name: string;
  metrics: {
    id: string;
    name: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }[];
  analysisResults: {
    type: string;
    data: any;
    timestamp: string;
  }[];
}

interface MonitoringDataContextType {
  monitoringData: MonitoringData[];
  updateMonitoringData: (data: MonitoringData[]) => void;
  getAnalysisForReport: (monitoringIds: string[], metricIds: string[], dateRange: { from: Date; to: Date }) => any;
}

const MonitoringDataContext = createContext<MonitoringDataContextType | undefined>(undefined);

// Dados iniciais de exemplo
const initialMonitoringData: MonitoringData[] = [
  {
    id: "1",
    name: "Localhost",
    metrics: [
      {
        id: "1",
        name: "Uptime",
        value: 100,
        trend: "stable",
        change: 0,
      },
      {
        id: "2",
        name: "Response Time",
        value: 200,
        trend: "stable",
        change: 0,
      },
    ],
    analysisResults: [
      {
        type: "performance",
        data: {},
        timestamp: new Date().toISOString(),
      },
      {
        type: "availability",
        data: {},
        timestamp: new Date().toISOString(),
      },
    ],
  }
];

export const MonitoringDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData[]>(initialMonitoringData);

  const updateMonitoringData = (data: MonitoringData[]) => {
    setMonitoringData(data);
  };

  const getAnalysisForReport = (monitoringIds: string[], metricIds: string[], dateRange: { from: Date; to: Date }) => {
    // Filtra os dados de monitoramento com base nos IDs selecionados
    const filteredData = monitoringData.filter(data => monitoringIds.includes(data.id));

    // Filtra as métricas selecionadas
    const reportData = filteredData.map(data => ({
      name: data.name,
      metrics: data.metrics.filter(metric => metricIds.includes(metric.id)),
      analysisResults: data.analysisResults.filter(result => 
        new Date(result.timestamp) >= dateRange.from && 
        new Date(result.timestamp) <= dateRange.to
      )
    }));

    return reportData;
  };

  return (
    <MonitoringDataContext.Provider value={{ monitoringData, updateMonitoringData, getAnalysisForReport }}>
      {children}
    </MonitoringDataContext.Provider>
  );
};

export const useMonitoringData = () => {
  const context = useContext(MonitoringDataContext);
  if (context === undefined) {
    throw new Error('useMonitoringData must be used within a MonitoringDataProvider');
  }
  return context;
};
