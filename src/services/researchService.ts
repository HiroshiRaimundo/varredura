
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";

// Mock de dados - substituir pela implementação real que usa Supabase
const mockStudies: ResearchStudy[] = [
  {
    id: '1',
    title: 'Impacto de Agrotóxicos em Recursos Hídricos',
    author: 'Maria Silva',
    co_authors: 'João Santos, Pedro Oliveira',
    summary: 'Estudo sobre os efeitos de longo prazo de agrotóxicos em lençóis freáticos',
    repository_url: 'https://repositorio.exemplo.com/estudo1',
    location: 'Região Sul',
    coordinates: [-25.4284, -49.2733],
    type: 'artigo',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Análise de Políticas Públicas para Conservação da Mata Atlântica',
    author: 'Carlos Mendes',
    co_authors: 'Ana Sousa',
    summary: 'Avaliação da efetividade das políticas de conservação da Mata Atlântica nos últimos 10 anos',
    repository_url: 'https://repositorio.exemplo.com/estudo2',
    location: 'Sudeste e Nordeste',
    coordinates: [-22.9068, -43.1729],
    type: 'dissertacao',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Renomeando para getResearchStudies para corresponder à importação em useResearch.ts
export const getResearchStudies = async (): Promise<ResearchStudy[]> => {
  // Simulando uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockStudies];
};

// Renomeando para createResearchStudy para corresponder à importação em useResearch.ts
export const createResearchStudy = async (data: ResearchStudyFormData): Promise<ResearchStudy> => {
  // Simulando uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newStudy: ResearchStudy = {
    id: `study-${Date.now()}`,
    title: data.title,
    author: data.author,
    co_authors: data.co_authors || '',
    summary: data.summary,
    repository_url: data.repository_url || '',
    location: data.location,
    coordinates: data.coordinates,
    type: data.type,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  return newStudy;
};

export const deleteResearchStudy = async (id: string): Promise<boolean> => {
  // Simulando uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

// Exportando o tipo para retrocompatibilidade
export type { ResearchStudy };
