
import { MonitoringItem } from "./types";
import { convertToCSV } from "@/components/dashboard/DashboardUtils";
import { toast } from "@/hooks/use-toast";

// Export monitoring items as JSON or CSV
export const exportMonitoringItems = (monitoringItems: MonitoringItem[]) => {
  const exportFormat = window.confirm(
    "Clique em OK para exportar como JSON ou Cancelar para exportar como CSV"
  ) ? "json" : "csv";
  
  if (exportFormat === "json") {
    const dataStr = JSON.stringify(monitoringItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    downloadFile(dataUri, 'monitoramento-dados.json');
  } else {
    const csvData = convertToCSV(monitoringItems);
    const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvData);
    downloadFile(dataUri, 'monitoramento-dados.csv');
  }
  
  toast({
    title: "Dados exportados",
    description: `Seus dados foram exportados com sucesso no formato ${exportFormat.toUpperCase()}.`
  });
};

// Helper function to download files
const downloadFile = (dataUri: string, fileName: string) => {
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
};

// Extract unique responsible persons from monitoring items
export const getUniqueResponsibles = (monitoringItems: MonitoringItem[]) => {
  const responsibles = monitoringItems
    .map(item => item.responsible)
    .filter(responsible => responsible !== undefined && responsible !== null) as string[];
  
  return [...new Set(responsibles)];
};

// Filter monitoring items by responsible person
export const filterMonitoringItemsByResponsible = (
  monitoringItems: MonitoringItem[], 
  responsibleFilter: string
) => {
  return responsibleFilter
    ? monitoringItems.filter(item => item.responsible === responsibleFilter)
    : monitoringItems;
};
