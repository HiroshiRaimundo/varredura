
import { MonitoringItem } from "./types";

// Função para obter a cor adequada para cada frequência de monitoramento
export const getFrequencyColor = (frequency: string): string => {
  switch (frequency.toLowerCase()) {
    case 'diario':
    case 'diária':
      return 'text-red-600';
    case 'semanal':
      return 'text-amber-600';
    case 'quinzenal':
      return 'text-blue-600';
    case 'mensal':
      return 'text-green-600';
    default:
      return 'text-slate-600';
  }
};

// Função para obter a cor da borda com base na categoria
export const getCategoryBorderColor = (category: string): string => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('ambiente') || categoryLower.includes('ambiental')) {
    return '#4CAF50'; // verde
  }
  
  if (categoryLower.includes('legisla')) {
    return '#2196F3'; // azul
  }
  
  if (categoryLower.includes('economia') || categoryLower.includes('econômica')) {
    return '#FFC107'; // amarelo
  }
  
  if (categoryLower.includes('social') || categoryLower.includes('sociedade')) {
    return '#9C27B0'; // roxo
  }
  
  if (categoryLower.includes('governo') || categoryLower.includes('política')) {
    return '#F44336'; // vermelho
  }
  
  if (categoryLower.includes('tecnologia') || categoryLower.includes('inovação')) {
    return '#00BCD4'; // ciano
  }
  
  if (categoryLower.includes('cultura') || categoryLower.includes('arte')) {
    return '#FF9800'; // laranja
  }
  
  if (categoryLower.includes('saúde') || categoryLower.includes('medicina')) {
    return '#8BC34A'; // verde claro
  }
  
  if (categoryLower.includes('educação') || categoryLower.includes('ensino')) {
    return '#3F51B5'; // indigo
  }
  
  if (categoryLower.includes('ciência') || categoryLower.includes('pesquisa')) {
    return '#009688'; // teal
  }
  
  // Cor padrão para outras categorias
  return '#607D8B'; // cinza azulado
};
