
// Adicionar as funções de utilitários necessárias para o Dashboard

import { MonitoringItem } from '@/hooks/monitoring/types';

// Cores para gráficos
export const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1',
  '#A4DE6C', '#D0ED57', '#83A6E3', '#8F88D8'
];

// Função para converter frequência para português
export const getFrequencyLabel = (frequency: string): string => {
  switch (frequency) {
    case "hourly":
      return "Horária";
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

// Função para converter dados para CSV
export const convertToCSV = <T extends Record<string, any>>(data: T[]): string => {
  if (!data || data.length === 0) return '';
  
  // Extrair cabeçalhos (chaves do primeiro objeto)
  const headers = Object.keys(data[0]);
  
  // Criar linha de cabeçalho
  const headerLine = headers.join(',');
  
  // Criar linhas de dados
  const dataLines = data.map(item => {
    return headers.map(header => {
      // Tratamento especial para arrays e objetos
      const value = item[header];
      if (Array.isArray(value)) {
        return `"${value.join('; ')}"`;
      } else if (typeof value === 'object' && value !== null) {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      // Escape de strings com aspas
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    }).join(',');
  });
  
  // Combinar tudo
  return [headerLine, ...dataLines].join('\n');
};

// Funções para dados de gráficos
export const getCategoryData = (items: MonitoringItem[]) => {
  const categories: Record<string, number> = {};
  
  items.forEach(item => {
    if (item.category) {
      categories[item.category] = (categories[item.category] || 0) + 1;
    }
  });
  
  return Object.keys(categories).map(name => ({
    name,
    value: categories[name]
  }));
};

export const getFrequencyData = (items: MonitoringItem[]) => {
  const frequencies: Record<string, number> = {
    hourly: 0,
    daily: 0,
    weekly: 0,
    monthly: 0
  };
  
  items.forEach(item => {
    if (item.frequency in frequencies) {
      frequencies[item.frequency as keyof typeof frequencies]++;
    }
  });
  
  // Retornar no formato esperado pelos componentes de frequência
  return Object.keys(frequencies).map(key => ({
    frequency: getFrequencyLabel(key),
    quantidade: frequencies[key as keyof typeof frequencies]
  }));
};

export const getResponsibleData = (items: MonitoringItem[]) => {
  const responsibles: Record<string, number> = {};
  
  items.forEach(item => {
    if (item.responsible) {
      responsibles[item.responsible] = (responsibles[item.responsible] || 0) + 1;
    } else {
      responsibles['Não definido'] = (responsibles['Não definido'] || 0) + 1;
    }
  });
  
  // Retornar no formato esperado pelo componente ResponsibleData
  return Object.keys(responsibles).map(name => ({
    responsible: name,
    monitoramentos: responsibles[name]
  }));
};

export const getRadarData = (items: MonitoringItem[]) => {
  const categoryCount: Record<string, number> = {};
  const frequencyCount: Record<string, number> = {};
  
  items.forEach(item => {
    if (item.category) {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    }
    
    if (item.frequency) {
      const freq = getFrequencyLabel(item.frequency);
      frequencyCount[freq] = (frequencyCount[freq] || 0) + 1;
    }
  });
  
  // Criar dados de categoria para o gráfico radar
  const categoryData = Object.keys(categoryCount).map(category => ({
    subject: category,
    A: categoryCount[category],
    fullMark: Math.max(...Object.values(categoryCount)) + 2
  }));
  
  // Removendo o tipo B para evitar conflitos de tipo
  return categoryData;
};

// Função para gerar dados de tendência, agora com argumento items opcional
export const generateTrendData = (items?: MonitoringItem[], timeRange: string = "mensal") => {
  const data = [];
  const today = new Date();
  const days = timeRange === "diario" ? 7 
             : timeRange === "semanal" ? 14 
             : timeRange === "mensal" ? 30 
             : 365;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      name: date.toISOString().split('T')[0],
      monitoramentos: Math.floor(Math.random() * 10) + 5,
      alertas: Math.floor(Math.random() * 5) + 1
    });
  }
  
  return data;
};

// Função para extrair URLs de monitoramento para CSV
export const getMonitoringForExport = (items: MonitoringItem[]) => {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    url: item.url,
    frequency: getFrequencyLabel(item.frequency),
    category: item.category,
    keywords: item.keywords,
    responsible: item.responsible,
    notes: item.notes,
    status: item.status,
    lastUpdate: new Date(item.lastUpdate).toLocaleString('pt-BR'),
    createdAt: new Date(item.createdAt).toLocaleString('pt-BR')
  }));
};
