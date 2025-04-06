
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, DownloadCloud, BarChart2, LineChart, Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import HeatmapCard from './HeatmapCard';
import WordCloudCard from './WordCloudCard';
import PredictiveAnalysisCard from './PredictiveAnalysisCard';
import SentimentAnalysisCard from './SentimentAnalysisCard';

interface AdvancedAnalysisPanelProps {
  clientId?: string;
  showTabs?: boolean;
}

const AdvancedAnalysisPanel: React.FC<AdvancedAnalysisPanelProps> = ({
  clientId = 'default',
  showTabs = true
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [mediaType, setMediaType] = useState('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  const handleDownloadReport = () => {
    setIsGeneratingReport(true);
    
    // Simulação de geração de relatório
    setTimeout(() => {
      setIsGeneratingReport(false);
      toast({
        title: "Relatório gerado com sucesso",
        description: "O relatório foi baixado para seu computador.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Análise Avançada</h2>
          <p className="text-muted-foreground">
            Visualize insights detalhados sobre suas menções e releases
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="year">1 ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={mediaType} onValueChange={setMediaType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tipo de Mídia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as mídias</SelectItem>
              <SelectItem value="news">Notícias</SelectItem>
              <SelectItem value="social">Redes Sociais</SelectItem>
              <SelectItem value="blogs">Blogs</SelectItem>
              <SelectItem value="official">Documentos Oficiais</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleDownloadReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <DownloadCloud className="mr-2 h-4 w-4" />
                Exportar Relatório
              </>
            )}
          </Button>
        </div>
      </div>
      
      {showTabs ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
            <TabsTrigger value="topics">Tópicos</TabsTrigger>
            <TabsTrigger value="predictions">Predições</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <HeatmapCard />
              <WordCloudCard />
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment" className="pt-4">
            <SentimentAnalysisCard description="Analise o sentimento de textos e descubra a percepção do público" />
          </TabsContent>
          
          <TabsContent value="topics" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Tópicos</CardTitle>
                <CardDescription>
                  Principais temas identificados em suas menções de mídia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Política Ambiental</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        48% das menções
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tópico relacionado a novas legislações, acordos e políticas para proteção ambiental. 
                      Termos associados: preservação, florestas, biodiversidade, sustentabilidade.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Tecnologia Verde</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        32% das menções
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tópico relacionado a inovações tecnológicas para sustentabilidade.
                      Termos associados: energia renovável, eficiência energética, tecnologia limpa.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Educação Ambiental</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        20% das menções
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tópico relacionado a programas educacionais e conscientização.
                      Termos associados: escolas, universidades, treinamento, conscientização.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <p>Esta análise é baseada em modelos de processamento de linguagem natural e pode conter imprecisões.</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="predictions" className="pt-4">
            <PredictiveAnalysisCard />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <SentimentAnalysisCard />
          <WordCloudCard />
          <HeatmapCard />
          <PredictiveAnalysisCard />
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalysisPanel;
