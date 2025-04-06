
import { pipeline, env } from '@huggingface/transformers';

// Configurar para usar apenas WASM (WebAssembly)
env.useBrowserCache = false;
env.backends.onnx.wasm.numThreads = 1;

// Interface para o resultado da análise de sentimento
export interface SentimentResult {
  label: 'positive' | 'negative' | 'neutral';
  score: number;
  text: string;
}

// Modelo mais leve para análise de sentimento
const MODEL_NAME = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

// Classe singleton para gerenciar o pipeline de análise
export class SentimentAnalyzer {
  private static instance: SentimentAnalyzer;
  private analyzerPromise: Promise<any> | null = null;
  private isInitializing: boolean = false;

  private constructor() {}

  public static getInstance(): SentimentAnalyzer {
    if (!SentimentAnalyzer.instance) {
      SentimentAnalyzer.instance = new SentimentAnalyzer();
    }
    return SentimentAnalyzer.instance;
  }

  // Inicializa o pipeline de análise sob demanda
  public async initialize(): Promise<void> {
    if (this.analyzerPromise || this.isInitializing) {
      return;
    }

    try {
      this.isInitializing = true;
      console.log('Inicializando análise de sentimento...');
      this.analyzerPromise = pipeline('sentiment-analysis', MODEL_NAME);
      await this.analyzerPromise;
      console.log('Análise de sentimento pronta para uso!');
    } catch (error) {
      console.error('Erro ao inicializar análise de sentimento:', error);
      this.analyzerPromise = null;
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  // Analisa o sentimento de um texto
  public async analyzeSentiment(text: string): Promise<SentimentResult> {
    if (!this.analyzerPromise) {
      await this.initialize();
    }

    try {
      const analyzer = await this.analyzerPromise;
      const result = await analyzer(text);
      
      // Mapear resultado para nosso formato
      let label: 'positive' | 'negative' | 'neutral';
      if (result[0].label === 'POSITIVE') {
        label = 'positive';
      } else if (result[0].label === 'NEGATIVE') {
        label = 'negative';
      } else {
        label = 'neutral';
      }

      return {
        label,
        score: result[0].score,
        text
      };
    } catch (error) {
      console.error('Erro na análise de sentimento:', error);
      return {
        label: 'neutral',
        score: 0.5,
        text
      };
    }
  }

  // Analisa o sentimento de múltiplos textos em lote
  public async analyzeBatch(texts: string[]): Promise<SentimentResult[]> {
    return Promise.all(texts.map(text => this.analyzeSentiment(text)));
  }
}

// Funções utilitárias para conversão de sentimento
export const sentimentToColor = (label: 'positive' | 'negative' | 'neutral'): string => {
  switch (label) {
    case 'positive':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'negative':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'neutral':
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

export const sentimentToEmoji = (label: 'positive' | 'negative' | 'neutral'): string => {
  switch (label) {
    case 'positive':
      return '😊';
    case 'negative':
      return '😞';
    case 'neutral':
      return '😐';
  }
};

export const sentimentToText = (label: 'positive' | 'negative' | 'neutral'): string => {
  switch (label) {
    case 'positive':
      return 'Positivo';
    case 'negative':
      return 'Negativo';
    case 'neutral':
      return 'Neutro';
  }
};
