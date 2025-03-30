
import { MonitoringItem } from "./types";
import { convertToCSV } from "@/components/dashboard/DashboardUtils";

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
