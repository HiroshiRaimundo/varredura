
import { OutletOption } from "../types/pressReleaseTypes";

// Mock list of media outlets for selection
export const availableOutlets: OutletOption[] = [
  { id: "1", name: "Folha de São Paulo", category: "Jornal", region: "Nacional" },
  { id: "2", name: "G1", category: "Portal", region: "Nacional" },
  { id: "3", name: "Estadão", category: "Jornal", region: "Nacional" },
  { id: "4", name: "Valor Econômico", category: "Jornal", region: "Economia" },
  { id: "5", name: "UOL", category: "Portal", region: "Nacional" },
  { id: "6", name: "R7", category: "Portal", region: "Nacional" },
  { id: "7", name: "BBC Brasil", category: "Portal", region: "Internacional" },
  { id: "8", name: "Veja", category: "Revista", region: "Nacional" },
  { id: "9", name: "Carta Capital", category: "Revista", region: "Nacional" },
  { id: "10", name: "Exame", category: "Revista", region: "Economia" }
];

export const formatText = (format: string, toast: any) => {
  // Aqui seria implementada a lógica para formatar o texto
  // Por exemplo, adicionar **texto** para negrito, *texto* para itálico, etc.
  toast({
    title: "Formatação aplicada",
    description: `Texto formatado com ${format}`
  });
};
