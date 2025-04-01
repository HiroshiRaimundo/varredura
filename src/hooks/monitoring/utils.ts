
import { MonitoringItem } from "./types";

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

export const exportMonitoringData = (items: MonitoringItem[], format: 'csv' | 'json' = 'csv'): string => {
  if (format === 'json') {
    return JSON.stringify(items, null, 2);
  }
  
  return convertToCSV(items);
};

export const downloadFile = (data: string, filename: string, mimeType: string): void => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const exportMonitoringToFile = (items: MonitoringItem[], format: 'csv' | 'json' = 'csv'): void => {
  const data = exportMonitoringData(items, format);
  const mimeType = format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json';
  const filename = `monitoramentos.${format}`;
  
  downloadFile(data, filename, mimeType);
};
