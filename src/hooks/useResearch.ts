
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { geocodeLocation } from "@/utils/geocoder";

interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  coAuthors: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "outro";
}

export const useResearch = () => {
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Omit<ResearchStudy, "id" | "coordinates">>();

  // Coordenadas aproximadas de diferentes municípios do Amapá
  const amapaCoordinates: Record<string, [number, number]> = {
    "macapá": [0.0356, -51.0705],
    "santana": [-0.0583, -51.1811],
    "laranjal do jari": [-0.8044, -52.4550],
    "oiapoque": [3.8417, -51.8331],
    "mazagão": [-0.1153, -51.2894],
    "porto grande": [0.7128, -51.4136],
    "tartarugalzinho": [1.5067, -50.9083],
    "pedra branca do amapari": [0.7767, -51.9503],
    "vitória do jari": [-0.9381, -52.4239],
    "calçoene": [2.5042, -50.9511],
    "amapá": [2.0525, -50.7961],
    "ferreira gomes": [0.8569, -51.1794],
    "cutias": [0.9708, -50.8008],
    "itaubal": [0.6022, -50.6992],
    "pracuúba": [1.7400, -50.7892],
    "serra do navio": [0.9014, -52.0036]
  };

  // Coordenadas padrão para o centro do Amapá
  const defaultCoordinates: [number, number] = [0.9028, -51.6536];

  const fetchResearchStudies = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('research_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Converter o formato do banco para o formato da aplicação
      const formattedStudies = data.map(study => ({
        id: study.id,
        title: study.title,
        author: study.author,
        coAuthors: study.co_authors,
        summary: study.summary,
        repositoryUrl: study.repository_url,
        location: study.location,
        coordinates: study.coordinates as [number, number],
        type: study.type as "artigo" | "dissertacao" | "tese" | "outro"
      }));
      
      setStudies(formattedStudies);
    } catch (error) {
      console.error('Erro ao buscar estudos:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os estudos de pesquisa.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudySubmit = async (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    setIsLoading(true);
    try {
      // Tenta geocodificar o local, mas se falhar, usa coordenadas do dicionário
      let coordinates;
      try {
        coordinates = await geocodeLocation(data.location);
      } catch (geoError) {
        console.log('Erro na geocodificação:', geoError);
        // Busca no dicionário de coordenadas do Amapá (ignorando maiúsculas/minúsculas)
        const locationLower = data.location.toLowerCase().trim();
        coordinates = Object.entries(amapaCoordinates).find(
          ([location]) => locationLower.includes(location)
        )?.[1] || defaultCoordinates;
        
        console.log(`Usando coordenadas alternativas para ${data.location}:`, coordinates);
      }
      
      // Inserir no Supabase
      const { data: newStudy, error } = await supabase
        .from('research_studies')
        .insert({
          title: data.title,
          author: data.author,
          co_authors: data.coAuthors,
          summary: data.summary,
          repository_url: data.repositoryUrl,
          location: data.location,
          coordinates: coordinates,
          type: data.type
        })
        .select()
        .single();
      
      if (error) {
        console.error('Erro detalhado ao inserir estudo:', error);
        throw error;
      }
      
      // Converter formato do banco para formato da aplicação
      const formattedStudy: ResearchStudy = {
        id: newStudy.id,
        title: newStudy.title,
        author: newStudy.author,
        coAuthors: newStudy.co_authors,
        summary: newStudy.summary,
        repositoryUrl: newStudy.repository_url,
        location: newStudy.location,
        coordinates: newStudy.coordinates as [number, number],
        type: newStudy.type as "artigo" | "dissertacao" | "tese" | "outro"
      };
      
      // Atualizar estado
      setStudies(prev => [formattedStudy, ...prev]);
      form.reset();
      
      toast({
        title: "Estudo adicionado",
        description: `"${data.title}" foi adicionado ao mapa.`
      });
    } catch (error) {
      console.error('Erro ao adicionar estudo:', error);
      toast({
        title: "Erro ao adicionar estudo",
        description: "Não foi possível adicionar o estudo ao banco de dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudy = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('research_studies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setStudies(prev => prev.filter(study => study.id !== id));
      
      toast({
        title: "Análise removida",
        description: "A análise foi removida com sucesso."
      });
    } catch (error) {
      console.error('Erro ao remover estudo:', error);
      toast({
        title: "Erro ao remover análise",
        description: "Não foi possível remover a análise.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    studies,
    form,
    isLoading,
    fetchResearchStudies,
    handleStudySubmit,
    handleDeleteStudy
  };
};

export type { ResearchStudy };
