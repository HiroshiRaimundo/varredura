import { useState, useEffect } from 'react';
import { MonitoredItem } from './monitoringService';
import { AnalysisService } from './analysisService';

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

interface MonitoringData {
  name: string;
  theme: string;
  metrics: string[];
}

interface ContentAnalysis {
  type: string;
  metrics: AnalysisService['calculateMetrics'][0][];
  keywords: AnalysisService['analyzeKeywords'][0][];
  trends: { date: string; value: number }[];
  alerts: {
    id: string;
    type: 'error' | 'warning' | 'info' | 'success';
    message: string;
    details: string;
    timestamp: string;
  }[];
}

export const useAnalysisService = () => {
  const [monitoringResults, setMonitoringResults] = useState<MonitoringData[]>([]);
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis | null>(null);

  const getAnalytics = async (results: MonitoringData[]) => {
    const analysis = await AnalysisService.analyzeMonitoring(results[0]);
    setContentAnalysis(analysis);
  };

  // Simula atualização periódica dos dados
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringResults(prev => [...prev, {
        name: 'Exemplo',
        theme: 'Tecnologia',
        metrics: ['Inovação', 'Sustentabilidade', 'Impacto Social']
      }]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    monitoringResults,
    contentAnalysis,
    getAnalytics
  };
};
