
import { MonitoringItem } from "@/hooks/monitoring/types";

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
    case "diária":
      return "daily";
    case "semanal":
    case "semanal":
      return "weekly";
    case "mensal":
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

// Função auxiliar para comparar nomes de categorias
export const compareCategoryNames = (a: string, b: string): number => {
  return a.localeCompare(b, 'pt-BR');
};

// Agrupar itens por categoria
export const groupByCategory = (items: MonitoringItem[]): Record<string, MonitoringItem[]> => {
  const grouped: Record<string, MonitoringItem[]> = {};
  
  items.forEach(item => {
    const category = item.category || "Sem categoria";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
  });
  
  return grouped;
};

// Construir URL para API a partir do URL base
export const buildApiUrl = (item: MonitoringItem): string => {
  if (!item.url) return "";
  
  try {
    // Aqui vamos adaptar para usar propriedades disponíveis no tipo MonitoringItem
    // Assumindo que o item.url contém a URL base
    return item.url;
  } catch (err) {
    console.error("Erro ao construir URL da API:", err);
    return "";
  }
};

// Gerar data de próxima atualização
export const getNextUpdateDate = (item: MonitoringItem): Date => {
  if (!item.lastUpdate) return new Date();
  
  const lastUpdate = new Date(item.lastUpdate);
  const nextUpdate = new Date(lastUpdate);
  
  switch (item.frequency) {
    case "hourly":
      nextUpdate.setHours(nextUpdate.getHours() + 1);
      break;
    case "daily":
      nextUpdate.setDate(nextUpdate.getDate() + 1);
      break;
    case "weekly":
      nextUpdate.setDate(nextUpdate.getDate() + 7);
      break;
    case "monthly":
      nextUpdate.setMonth(nextUpdate.getMonth() + 1);
      break;
    default:
      nextUpdate.setDate(nextUpdate.getDate() + 1);
  }
  
  return nextUpdate;
};

// Verificar se o monitoramento precisa ser atualizado
export const needsUpdate = (item: MonitoringItem): boolean => {
  const nextUpdateDate = getNextUpdateDate(item);
  const now = new Date();
  return now > nextUpdateDate;
};
