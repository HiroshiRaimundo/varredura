
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ThumbsUp, ThumbsDown, Gauge } from "lucide-react";
import { SentimentAnalyzer, sentimentToColor, sentimentToEmoji, sentimentToText } from '@/utils/sentimentAnalysis';

interface SentimentAnalysisCardProps {
  title?: string;
  description?: string;
}

const SentimentAnalysisCard: React.FC<SentimentAnalysisCardProps> = ({
  title = "Análise de Sentimento",
  description = "Analise o sentimento de textos para entender a percepção"
}) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // Inicializar o analisador de sentimento quando o componente montar
  useEffect(() => {
    const initAnalyzer = async () => {
      try {
        setIsInitializing(true);
        await SentimentAnalyzer.getInstance().initialize();
      } catch (error) {
        console.error("Erro ao inicializar analisador:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initAnalyzer();
  }, []);

  const handleAnalyze = async () => {
    if (!text.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const analyzer = SentimentAnalyzer.getInstance();
      const sentimentResult = await analyzer.analyzeSentiment(text);
      setResult(sentimentResult);
    } catch (error) {
      console.error("Erro na análise:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const colorClass = sentimentToColor(result.label);
    const emoji = sentimentToEmoji(result.label);
    const sentiment = sentimentToText(result.label);
    const confidencePercent = Math.round(result.score * 100);

    return (
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Resultado da Análise</h3>
            <p className="text-sm text-muted-foreground">
              Sentimento detectado com {confidencePercent}% de confiança
            </p>
          </div>
          <Badge className={`px-3 py-1 text-base ${colorClass}`}>
            {emoji} {sentiment}
          </Badge>
        </div>

        <div className="relative pt-4">
          <div className="flex justify-between mb-1 text-xs">
            <span>Negativo</span>
            <span>Neutro</span>
            <span>Positivo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                result.label === 'positive' ? 'bg-green-500' : 
                result.label === 'negative' ? 'bg-red-500' : 'bg-blue-500'
              }`} 
              style={{ width: `${confidencePercent}%`, marginLeft: result.label === 'negative' ? '0' : result.label === 'neutral' ? '33%' : '67%' }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Digite ou cole um texto para analisar o sentimento..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
            disabled={isAnalyzing || isInitializing}
          />
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!text.trim() || isAnalyzing || isInitializing}
            className="w-full"
          >
            {isInitializing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inicializando modelo...
              </>
            ) : isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Analisar Sentimento
              </>
            )}
          </Button>
          
          {renderResult()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysisCard;
