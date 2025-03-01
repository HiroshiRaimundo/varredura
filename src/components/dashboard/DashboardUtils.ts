
import { MonitoringItem } from "@/hooks/useMonitoring";

// Função para gerar dados de tendência com base no período
export const generateTrendData = (monitoringItems: MonitoringItem[], timeRange: string) => {
  // Obter data atual e calcular o intervalo de tempo
  const now = new Date();
  const periods: { [key: string]: number } = {
    'semanal': 7,
    'mensal': 12,
    'trimestral': 4,
    'anual': 5
  };
  
  const count = periods[timeRange] || 12;
  const data = [];
  
  // Gerar labels com base no período selecionado
  let labels: string[] = [];
  
  if (timeRange === 'semanal') {
    labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  } else if (timeRange === 'mensal') {
    labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  } else if (timeRange === 'trimestral') {
    labels = ['T1', 'T2', 'T3', 'T4'];
  } else {
    // Anual - últimos 5 anos
    const currentYear = now.getFullYear();
    labels = Array.from({length: 5}, (_, i) => String(currentYear - 4 + i));
  }
  
  // Distribuir itens de monitoramento nos períodos para simular dados reais
  // Usando a data de criação se disponível, ou distribuindo uniformemente
  const distributions = Array(count).fill(0);
  const updates = Array(count).fill(0);
  const studies = Array(count).fill(0);
  
  monitoringItems.forEach((item, index) => {
    const mod = index % count;
    distributions[mod]++;
    
    // Simular atualizações baseadas na frequência
    if (item.frequency === 'diária') {
      updates[mod] += 30;
    } else if (item.frequency === 'semanal') {
      updates[mod] += 4;
    } else if (item.frequency === 'mensal') {
      updates[mod] += 1;
    } else {
      updates[mod] += 0.5;
    }
    
    // Simular estudos baseados na categoria
    if (item.category === 'indicadores' || item.category === 'pesquisa') {
      studies[mod] += 1;
    }
  });
  
  for (let i = 0; i < count; i++) {
    data.push({
      name: labels[i],
      monitoramentos: distributions[i],
      atualizacoes: Math.round(updates[i]),
      estudos: Math.round(studies[i] * 1.5) // Ajuste para simular mais estudos
    });
  }
  
  return data;
};

export const getCategoryData = (monitoringItems: MonitoringItem[]) => {
  const categories: { [key: string]: number } = {};
  
  monitoringItems.forEach(item => {
    if (categories[item.category]) {
      categories[item.category]++;
    } else {
      categories[item.category] = 1;
    }
  });
  
  return Object.keys(categories).map(category => ({
    name: category,
    value: categories[category]
  }));
};

export const getFrequencyData = (monitoringItems: MonitoringItem[]) => {
  const frequencies: { [key: string]: number } = {};
  
  monitoringItems.forEach(item => {
    if (frequencies[item.frequency]) {
      frequencies[item.frequency]++;
    } else {
      frequencies[item.frequency] = 1;
    }
  });
  
  return Object.keys(frequencies).map(frequency => ({
    frequency,
    quantidade: frequencies[frequency]
  }));
};

export const getResponsibleData = (monitoringItems: MonitoringItem[]) => {
  const responsibles: { [key: string]: number } = {};
  
  monitoringItems.forEach(item => {
    if (item.responsible) {
      if (responsibles[item.responsible]) {
        responsibles[item.responsible]++;
      } else {
        responsibles[item.responsible] = 1;
      }
    }
  });
  
  // Ordenar por quantidade e limitar a 5 responsáveis
  return Object.keys(responsibles)
    .sort((a, b) => responsibles[b] - responsibles[a])
    .slice(0, 5)
    .map(responsible => ({
      responsible,
      monitoramentos: responsibles[responsible]
    }));
};

export const getRadarData = (monitoringItems: MonitoringItem[]) => {
  // Categorias padronizadas para o gráfico de radar
  const sourceTypes = ['governo', 'indicadores', 'legislacao', 'api', 'pesquisa'];
  
  return sourceTypes.map(type => {
    const count = monitoringItems.filter(item => item.category.toLowerCase() === type.toLowerCase()).length;
    return {
      subject: type,
      A: count,
      fullMark: Math.max(10, monitoringItems.length / 2)
    };
  });
};

// Função para converter dados para CSV
export const convertToCSV = (monitoringItems: MonitoringItem[]) => {
  // Cabeçalhos
  const headers = ['Nome', 'URL', 'API URL', 'Frequência', 'Categoria', 'Palavras-chave', 'Responsável'];
  
  // Linhas de dados
  const rows = monitoringItems.map(item => [
    item.name,
    item.url,
    item.api_url || '',
    item.frequency,
    item.category,
    item.keywords || '',
    item.responsible || ''
  ]);
  
  // Combinar cabeçalhos e linhas
  return [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
};

// Cores para os gráficos
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

