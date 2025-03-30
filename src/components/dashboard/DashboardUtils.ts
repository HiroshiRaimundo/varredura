
import { MonitoringItem } from "@/hooks/monitoring/types";

// Color constants for charts
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

// Converter tipo de frequência para formato legível em português
export const formatFrequency = (frequency: string): string => {
  switch (frequency) {
    case "hourly":
      return "A cada hora";
    case "daily":
      return "Diária";
    case "weekly":
      return "Semanal";
    case "monthly":
      return "Mensal";
    default:
      return frequency;
  }
};

// Função de conversão no sentido oposto, para entradas em português
export const parseFrequency = (frequency: string): "hourly" | "daily" | "weekly" | "monthly" => {
  switch (frequency.toLowerCase()) {
    case "a cada hora":
      return "hourly";
    case "diária":
    case "diario":
    case "diaria":
      return "daily";
    case "semanal":
      return "weekly";
    case "mensal":
      return "monthly";
    default:
      return "daily"; // valor padrão
  }
};

// Formatar data
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  } catch (err) {
    return "Data inválida";
  }
};

// Formatar hora
export const formatTime = (timeStr: string): string => {
  if (!timeStr) return "";
  
  try {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}h${minutes}min`;
  } catch (err) {
    return timeStr;
  }
};

// Calcular status do monitoramento baseado na última atualização
export const calculateMonitoringStatus = (item: MonitoringItem): "active" | "warning" | "error" => {
  if (!item.lastUpdate) return "error";
  
  const lastUpdate = new Date(item.lastUpdate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (item.frequency === "daily" && diffDays > 1) {
    return "warning";
  }
  
  if (item.frequency === "weekly" && diffDays > 7) {
    return "warning";
  }
  
  if (item.frequency === "monthly" && diffDays > 30) {
    return "warning";
  }
  
  return "active";
};

// Gerar cor de status
export const getStatusColor = (status: "active" | "warning" | "error"): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-300";
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "error":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

// Formatar URL para exibição
export const formatUrl = (url: string): string => {
  if (!url) return "N/A";
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (err) {
    // Se não for uma URL válida, retorna o original truncado
    return url.length > 30 ? `${url.substring(0, 27)}...` : url;
  }
};

// Data transformation utilities for Dashboard components
export const getCategoryData = (monitoringItems: MonitoringItem[]) => {
  const categories: Record<string, number> = {};
  
  monitoringItems.forEach(item => {
    const category = item.category || "Sem categoria";
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getFrequencyData = (monitoringItems: MonitoringItem[]) => {
  const frequencies: Record<string, number> = {
    "Diária": 0,
    "Semanal": 0,
    "Mensal": 0,
    "A cada hora": 0
  };
  
  monitoringItems.forEach(item => {
    const freq = formatFrequency(item.frequency);
    frequencies[freq] = (frequencies[freq] || 0) + 1;
  });
  
  return Object.entries(frequencies).map(([frequency, quantidade]) => ({ frequency, quantidade }));
};

export const getResponsibleData = (monitoringItems: MonitoringItem[]) => {
  const responsibles: Record<string, number> = {};
  
  monitoringItems.forEach(item => {
    const responsible = item.responsible || "Não atribuído";
    responsibles[responsible] = (responsibles[responsible] || 0) + 1;
  });
  
  return Object.entries(responsibles)
    .map(([responsible, monitoramentos]) => ({ responsible, monitoramentos }))
    .sort((a, b) => b.monitoramentos - a.monitoramentos)
    .slice(0, 5); // Limit to top 5
};

export const getRadarData = (monitoringItems: MonitoringItem[]) => {
  // Group items by category for radar chart
  const categories: Record<string, number> = {};
  
  monitoringItems.forEach(item => {
    const category = item.category || "Sem categoria";
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return Object.entries(categories).map(([subject, A]) => ({
    subject,
    A,
    fullMark: Math.max(...Object.values(categories)) * 1.2
  }));
};

export const generateTrendData = (monitoringItems: MonitoringItem[], timeRange: string) => {
  // Get dates for time range
  const now = new Date();
  const dates: string[] = [];
  let daysToShow = 30; // Default for monthly
  
  if (timeRange === "semanal") {
    daysToShow = 7;
  } else if (timeRange === "diário") {
    daysToShow = 1;
  } else if (timeRange === "trimestral") {
    daysToShow = 90;
  }
  
  for (let i = 0; i < daysToShow; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dates.unshift(dateStr);
  }
  
  // Generate random data for demonstration
  return dates.map(date => {
    const monthDay = date.slice(5);
    return {
      name: monthDay,
      estudos: Math.floor(Math.random() * 10) + 5,
      monitoramentos: Math.floor(Math.random() * 15) + 10,
      atualizacoes: Math.floor(Math.random() * 8) + 2
    };
  });
};

// CSV conversion utility
export const convertToCSV = (data: any[]): string => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};
