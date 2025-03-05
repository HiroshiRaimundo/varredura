import { useState, useEffect } from 'react';
import { MonitoredItem } from './monitoringService';

interface SourceDistribution {
  name: string;
  value: number;
}

interface MentionsOverTime {
  date: string;
  mentions: number;
}

interface QualitativeAnalysis {
  title: string;
  content: string;
  keywords?: string[];
}

interface Analytics {
  sourceDistribution: SourceDistribution[];
  mentionsOverTime: MentionsOverTime[];
  qualitativeAnalysis: QualitativeAnalysis[];
}

export const useAnalysisService = () => {
  const [monitoringResults, setMonitoringResults] = useState<any[]>([]);

  const getAnalytics = (results: any[]): Analytics => {
    // Simulação de dados de análise
    return {
      sourceDistribution: [
        { name: 'Portais de Notícias', value: 45 },
        { name: 'Blogs', value: 25 },
        { name: 'Redes Sociais', value: 20 },
        { name: 'Outros', value: 10 }
      ],
      mentionsOverTime: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toLocaleDateString(),
          mentions: Math.floor(Math.random() * 50) + 10
        };
      }).reverse(),
      qualitativeAnalysis: [
        {
          title: 'Principais Temas',
          content: 'Os temas mais discutidos incluem inovação tecnológica, sustentabilidade e impacto social.',
          keywords: ['inovação', 'tecnologia', 'sustentabilidade', 'impacto social']
        },
        {
          title: 'Sentimento Geral',
          content: 'A maioria das menções apresenta um sentimento positivo, com foco em resultados e benefícios.',
          keywords: ['positivo', 'resultados', 'benefícios']
        },
        {
          title: 'Alcance e Engajamento',
          content: 'Alto engajamento em portais de notícias especializados e redes profissionais.',
          keywords: ['engajamento', 'alcance', 'especializado']
        }
      ]
    };
  };

  // Simula atualização periódica dos dados
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringResults(prev => [...prev, {}]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    monitoringResults,
    getAnalytics
  };
};
