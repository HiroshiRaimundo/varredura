
import { mockFrom, mockData } from "@/utils/mockSupabase";

export interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  co_authors: string;
  summary: string;
  repository_url: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro";
}

export const getResearchStudies = async (): Promise<ResearchStudy[]> => {
  try {
    // Versão mockada para evitar erros de tipagem
    /* const { data, error } = await supabase
      .from("research_studies")
      .select(); */
    
    // Utilizando mock
    return mockData.studies.map(study => ({
      id: study.id,
      title: study.title,
      author: study.author,
      co_authors: study.co_authors,
      summary: study.summary,
      repository_url: study.repository_url,
      location: study.location,
      coordinates: study.coordinates as [number, number],
      type: study.type as any
    }));
  } catch (error) {
    console.error("Erro ao carregar estudos:", error);
    return [];
  }
};

export const createResearchStudy = async (
  studyData: Omit<ResearchStudy, "id">
): Promise<ResearchStudy | null> => {
  try {
    /* const { data, error } = await supabase
      .from("research_studies")
      .insert({
        title: studyData.title,
        author: studyData.author,
        co_authors: studyData.co_authors,
        summary: studyData.summary,
        repository_url: studyData.repository_url,
        location: studyData.location,
        coordinates: studyData.coordinates,
        type: studyData.type
      }); */
    
    // Utilizando mock
    const newStudy = {
      id: `study-${Date.now()}`,
      ...studyData
    };
    
    if (newStudy) {
      return {
        id: newStudy.id,
        title: newStudy.title,
        author: newStudy.author,
        co_authors: newStudy.co_authors,
        summary: newStudy.summary,
        repository_url: newStudy.repository_url,
        location: newStudy.location,
        coordinates: newStudy.coordinates,
        type: newStudy.type
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao criar estudo:", error);
    return null;
  }
};

export const deleteResearchStudy = async (id: string): Promise<boolean> => {
  try {
    /* const { error } = await supabase
      .from("research_studies")
      .delete()
      .eq("id", id); */
    
    // Utilizando mock
    console.log(`Simulating deletion of study with ID: ${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir estudo:", error);
    return false;
  }
};
