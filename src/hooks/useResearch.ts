
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
  const form = useForm<Omit<ResearchStudy, "id" | "coordinates">>();

  const fetchResearchStudies = async () => {
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
    }
  };

  const handleStudySubmit = async (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    try {
      // Geocodificar a localização para obter as coordenadas
      const coordinates = geocodeLocation(data.location);
      
      // Usar coordenadas fixas para o Amapá como fallback
      // Coordenadas aproximadas de Macapá: [0.0356, -51.0705]
      const fallbackCoordinates: [number, number] = [0.0356, -51.0705];
      
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
          coordinates: coordinates || fallbackCoordinates,
          type: data.type
        })
        .select()
        .single();
      
      if (error) {
        console.error('Erro detalhado:', error);
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
        description: "Não foi possível adicionar o estudo ao banco de dados. Verifique os logs para mais detalhes.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteStudy = async (id: string) => {
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
    }
  };

  return {
    studies,
    form,
    fetchResearchStudies,
    handleStudySubmit,
    handleDeleteStudy
  };
};

export type { ResearchStudy };
