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
  analysisTypes?: string[];
}

interface AnalysisMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  status: 'success' | 'warning' | 'error' | 'info';
  description: string;
}

interface KeywordAnalysis {
  keyword: string;
  mentions: number;
  sentiment: number;
  relevance: number;
  trend: number;
  sources: { name: string; count: number }[];
}

interface PerformanceMetrics {
  responseTime: number;
  statusCode: number;
  uptime: number;
  lastCheck: string;
  sslStatus: {
    valid: boolean;
    expiryDate: string;
  };
}

interface ContentMetrics {
  totalSize: number;
  htmlChanges: number;
  cssChanges: number;
  jsChanges: number;
  imageChanges: number;
  brokenLinks: number;
}

interface SentimentAnalysis {
  overall: number;
  positive: number;
  negative: number;
  neutral: number;
  topics: {
    name: string;
    sentiment: number;
    count: number;
  }[];
}

interface PredictiveAnalysis {
  prediction: number;
  confidence: number;
  factors: {
    name: string;
    impact: number;
  }[];
  historicalData: {
    date: string;
    value: number;
  }[];
}

interface StructuredDataAnalysis {
  schema: string;
  coverage: number;
  quality: number;
  errors: {
    type: string;
    count: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

interface MetadataAnalysis {
  tags: {
    name: string;
    value: string;
    frequency: number;
  }[];
  headers: {
    name: string;
    value: string;
    status: 'ok' | 'warning' | 'error';
  }[];
}

interface ContentAnalysis {
  type: string;
  metrics: AnalysisMetric[];
  keywords: KeywordAnalysis[];
  trends: { date: string; value: number }[];
  alerts: {
    id: string;
    type: 'error' | 'warning' | 'info' | 'success';
    message: string;
    details: string;
    timestamp: string;
  }[];
  performance?: PerformanceMetrics;
  content?: ContentMetrics;
  sentiment?: SentimentAnalysis;
  predictive?: PredictiveAnalysis;
  structuredData?: StructuredDataAnalysis;
  metadata?: MetadataAnalysis;
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
        metrics: ['Inovação', 'Sustentabilidade', 'Impacto Social'],
        analysisTypes: ['performance', 'content', 'sentiment', 'predictive', 'structured_data', 'metadata']
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
