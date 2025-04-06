
import React from 'react';
import AdvancedAnalysisPanel from './AdvancedAnalysisPanel';
import IntelligentAlertSystem from '../alerts/IntelligentAlertSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, LineChart, BellRing, BookOpen } from "lucide-react";

const AdvancedAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Análise Avançada de Mídia</h1>
        <p className="text-muted-foreground mt-1">
          Insights inteligentes, análise de sentimento e previsões para sua presença na mídia
        </p>
      </div>
      
      <Card className="bg-muted/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 text-purple-800 rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Análise de Sentimento</h3>
                <p className="text-sm text-muted-foreground">Entenda a percepção do público</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
                <LineChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Predição de Tendências</h3>
                <p className="text-sm text-muted-foreground">Antecipe-se às menções futuras</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
                <BellRing className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Alertas Inteligentes</h3>
                <p className="text-sm text-muted-foreground">Seja notificado no momento certo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Dashboard de Insights
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Sistema de Alertas
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Guia de Uso
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="pt-6">
          <AdvancedAnalysisPanel />
        </TabsContent>
        
        <TabsContent value="alerts" className="pt-6">
          <IntelligentAlertSystem />
        </TabsContent>
        
        <TabsContent value="guide" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guia de Análise Avançada</CardTitle>
              <CardDescription>
                Aprenda a utilizar as ferramentas de análise avançada para maximizar seus resultados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Análise de Sentimento</h3>
                  <p>
                    Nossa ferramenta utiliza algoritmos avançados de processamento de linguagem natural
                    para determinar o sentimento expresso em textos. É útil para:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Avaliar a percepção do público sobre sua marca ou releases</li>
                    <li>Identificar crises potenciais através de sentimentos negativos</li>
                    <li>Medir o impacto emocional de suas comunicações</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Mapa de Calor</h3>
                  <p>
                    O mapa de calor mostra os horários e dias da semana em que há maior volume de menções,
                    permitindo:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Identificar os melhores momentos para divulgar releases</li>
                    <li>Entender padrões de consumo de mídia do seu público</li>
                    <li>Otimizar seus horários de publicação e monitoramento</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Nuvem de Palavras</h3>
                  <p>
                    Visualize as palavras mais frequentes encontradas em releases e menções para:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Identificar termos que geram maior engajamento</li>
                    <li>Entender os assuntos mais relevantes associados à sua marca</li>
                    <li>Ajustar sua estratégia de conteúdo para incluir termos populares</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Análise Preditiva</h3>
                  <p>
                    Nossos modelos preditivos analisam dados históricos para prever tendências futuras:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Antecipe variações no volume de menções</li>
                    <li>Planeje sua estratégia de comunicação com base em projeções</li>
                    <li>Identifique antecipadamente possíveis quedas de visibilidade</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Sistema de Alertas</h3>
                  <p>
                    Configure alertas personalizados baseados em regras inteligentes para:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ser notificado sobre picos de menções negativas</li>
                    <li>Monitorar o que concorrentes estão fazendo</li>
                    <li>Acompanhar palavras-chave estratégicas</li>
                    <li>Receber sugestões para novos releases quando necessário</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalysis;
