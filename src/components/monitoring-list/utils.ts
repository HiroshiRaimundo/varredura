
import { MonitoringItem } from "./types";

/**
 * Extracts unique responsible names from monitoring items
 */
export const extractUniqueResponsibles = (items: MonitoringItem[]): string[] => {
  return Array.from(
    new Set(items.map(item => item.responsible).filter(Boolean))
  ) as string[];
};

/**
 * Formats a frequency value for display
 */
export const formatFrequency = (frequency: string): string => {
  const frequencyMap: Record<string, string> = {
    diario: "Diário",
    semanal: "Semanal",
    quinzenal: "Quinzenal",
    mensal: "Mensal"
  };

  return frequencyMap[frequency] || frequency;
};

/**
 * Safely truncates a string to a specified length
 */
export const truncate = (str: string | undefined, length: number): string => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};
