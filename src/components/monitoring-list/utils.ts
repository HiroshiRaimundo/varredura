
/**
 * Determines the appropriate color for a frequency value
 */
export const getFrequencyColor = (frequency: string) => {
  switch (frequency) {
    case "diario":
      return "text-red-500";
    case "semanal":
      return "text-orange-500";
    case "quinzenal":
      return "text-yellow-500";
    case "mensal":
      return "text-green-500";
    default:
      return "text-muted-foreground";
  }
};

/**
 * Get border color based on category
 */
export const getCategoryBorderColor = (category: string) => {
  switch (category) {
    case 'governo':
      return '#0088FE';
    case 'indicadores':
      return '#00C49F';
    case 'legislacao':
      return '#FFBB28';
    case 'api':
      return '#FF8042';
    default:
      return '#8884d8';
  }
};
