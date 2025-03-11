import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface AnalysisSettings {
  detailedAnalysis: {
    enabled: boolean;
    structureAnalysis: boolean;
    contentDepth: number;
  };
  predictiveAnalysis: {
    enabled: boolean;
    predictionWindow: number;
    confidenceThreshold: number;
  };
  sentimentAnalysis: {
    enabled: boolean;
    language: string;
    includeEmotions: boolean;
  };
  trendAnalysis: {
    enabled: boolean;
    timeWindow: number;
    patternRecognition: boolean;
  };
  frequencyAnalysis: {
    enabled: boolean;
    minTermFrequency: number;
    maxTerms: number;
  };
  linkAnalysis: {
    enabled: boolean;
    maxDepth: number;
    checkBrokenLinks: boolean;
  };
  performanceAnalysis: {
    enabled: boolean;
    metricCollection: boolean;
    samplingRate: number;
  };
  availabilityAnalysis: {
    enabled: boolean;
    checkInterval: number;
    alertThreshold: number;
  };
}

const defaultSettings: AnalysisSettings = {
  detailedAnalysis: {
    enabled: true,
    structureAnalysis: true,
    contentDepth: 3,
  },
  predictiveAnalysis: {
    enabled: true,
    predictionWindow: 7,
    confidenceThreshold: 80,
  },
  sentimentAnalysis: {
    enabled: true,
    language: "pt-BR",
    includeEmotions: true,
  },
  trendAnalysis: {
    enabled: true,
    timeWindow: 30,
    patternRecognition: true,
  },
  frequencyAnalysis: {
    enabled: true,
    minTermFrequency: 5,
    maxTerms: 100,
  },
  linkAnalysis: {
    enabled: true,
    maxDepth: 3,
    checkBrokenLinks: true,
  },
  performanceAnalysis: {
    enabled: true,
    metricCollection: true,
    samplingRate: 60,
  },
  availabilityAnalysis: {
    enabled: true,
    checkInterval: 5,
    alertThreshold: 95,
  },
};

export const AnalysisSettings: React.FC = () => {
  const [settings, setSettings] = useState<AnalysisSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState("detailed");

  const handleSave = () => {
    console.log("Configurações salvas:", settings);
    // Implementar lógica de salvamento
  };

  const updateSettings = (category: keyof AnalysisSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configuração da Análise</h3>
        <p className="text-sm text-muted-foreground">
          Configure os parâmetros para cada tipo de análise do sistema
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="sentiment">Análise de Sentimento</TabsTrigger>
          <TabsTrigger value="trends">Análise de Tendências</TabsTrigger>
          <TabsTrigger value="frequency">Análise de Frequência</TabsTrigger>
          <TabsTrigger value="links">Análise de Links</TabsTrigger>
          <TabsTrigger value="performance">Análise de Performance</TabsTrigger>
          <TabsTrigger value="availability">Análise de Disponibilidade</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada do Conteúdo e Estrutura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise Detalhada</Label>
                  <p className="text-sm text-muted-foreground">
                    Realizar análise profunda do conteúdo e estrutura
                  </p>
                </div>
                <Switch
                  checked={settings.detailedAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('detailedAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Análise Estrutural</Label>
                  <p className="text-sm text-muted-foreground">
                    Analisar a estrutura do conteúdo
                  </p>
                </div>
                <Switch
                  checked={settings.detailedAnalysis.structureAnalysis}
                  onCheckedChange={(checked) => updateSettings('detailedAnalysis', 'structureAnalysis', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Profundidade da Análise</Label>
                <Input
                  type="number"
                  value={settings.detailedAnalysis.contentDepth}
                  onChange={(e) => updateSettings('detailedAnalysis', 'contentDepth', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive">
          <Card>
            <CardHeader>
              <CardTitle>Previsão de Tendências e Comportamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise Preditiva</Label>
                  <p className="text-sm text-muted-foreground">
                    Realizar previsões baseadas em dados históricos
                  </p>
                </div>
                <Switch
                  checked={settings.predictiveAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('predictiveAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Janela de Previsão (dias)</Label>
                <Input
                  type="number"
                  value={settings.predictiveAnalysis.predictionWindow}
                  onChange={(e) => updateSettings('predictiveAnalysis', 'predictionWindow', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Limite de Confiança (%)</Label>
                <Input
                  type="number"
                  value={settings.predictiveAnalysis.confidenceThreshold}
                  onChange={(e) => updateSettings('predictiveAnalysis', 'confidenceThreshold', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Análise do Sentimento do Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise de Sentimento</Label>
                  <p className="text-sm text-muted-foreground">
                    Analisar o sentimento do conteúdo
                  </p>
                </div>
                <Switch
                  checked={settings.sentimentAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('sentimentAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select
                  value={settings.sentimentAnalysis.language}
                  onValueChange={(value) => updateSettings('sentimentAnalysis', 'language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en">Inglês</SelectItem>
                    <SelectItem value="es">Espanhol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Incluir Análise de Emoções</Label>
                  <p className="text-sm text-muted-foreground">
                    Detectar emoções específicas no conteúdo
                  </p>
                </div>
                <Switch
                  checked={settings.sentimentAnalysis.includeEmotions}
                  onCheckedChange={(checked) => updateSettings('sentimentAnalysis', 'includeEmotions', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Identificação de Padrões Temporais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise de Tendências</Label>
                  <p className="text-sm text-muted-foreground">
                    Identificar padrões e tendências temporais
                  </p>
                </div>
                <Switch
                  checked={settings.trendAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('trendAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Janela de Tempo (dias)</Label>
                <Input
                  type="number"
                  value={settings.trendAnalysis.timeWindow}
                  onChange={(e) => updateSettings('trendAnalysis', 'timeWindow', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reconhecimento de Padrões</Label>
                  <p className="text-sm text-muted-foreground">
                    Identificar padrões recorrentes
                  </p>
                </div>
                <Switch
                  checked={settings.trendAnalysis.patternRecognition}
                  onCheckedChange={(checked) => updateSettings('trendAnalysis', 'patternRecognition', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Termos e Elementos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise de Frequência</Label>
                  <p className="text-sm text-muted-foreground">
                    Analisar frequência de termos e elementos
                  </p>
                </div>
                <Switch
                  checked={settings.frequencyAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('frequencyAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Frequência Mínima</Label>
                <Input
                  type="number"
                  value={settings.frequencyAnalysis.minTermFrequency}
                  onChange={(e) => updateSettings('frequencyAnalysis', 'minTermFrequency', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Máximo de Termos</Label>
                <Input
                  type="number"
                  value={settings.frequencyAnalysis.maxTerms}
                  onChange={(e) => updateSettings('frequencyAnalysis', 'maxTerms', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Análise da Estrutura de Navegação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise de Links</Label>
                  <p className="text-sm text-muted-foreground">
                    Analisar estrutura de links e navegação
                  </p>
                </div>
                <Switch
                  checked={settings.linkAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('linkAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Profundidade Máxima</Label>
                <Input
                  type="number"
                  value={settings.linkAnalysis.maxDepth}
                  onChange={(e) => updateSettings('linkAnalysis', 'maxDepth', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verificar Links Quebrados</Label>
                  <p className="text-sm text-muted-foreground">
                    Identificar links inacessíveis
                  </p>
                </div>
                <Switch
                  checked={settings.linkAnalysis.checkBrokenLinks}
                  onCheckedChange={(checked) => updateSettings('linkAnalysis', 'checkBrokenLinks', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho e Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise de Performance</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitorar métricas de desempenho
                  </p>
                </div>
                <Switch
                  checked={settings.performanceAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('performanceAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Coletar Métricas</Label>
                  <p className="text-sm text-muted-foreground">
                    Coletar métricas detalhadas de performance
                  </p>
                </div>
                <Switch
                  checked={settings.performanceAnalysis.metricCollection}
                  onCheckedChange={(checked) => updateSettings('performanceAnalysis', 'metricCollection', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Taxa de Amostragem (segundos)</Label>
                <Input
                  type="number"
                  value={settings.performanceAnalysis.samplingRate}
                  onChange={(e) => updateSettings('performanceAnalysis', 'samplingRate', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Tempo de Atividade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Análise de Disponibilidade</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitorar tempo de atividade e resposta
                  </p>
                </div>
                <Switch
                  checked={settings.availabilityAnalysis.enabled}
                  onCheckedChange={(checked) => updateSettings('availabilityAnalysis', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Intervalo de Verificação (minutos)</Label>
                <Input
                  type="number"
                  value={settings.availabilityAnalysis.checkInterval}
                  onChange={(e) => updateSettings('availabilityAnalysis', 'checkInterval', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Limite de Alerta (%)</Label>
                <Input
                  type="number"
                  value={settings.availabilityAnalysis.alertThreshold}
                  onChange={(e) => updateSettings('availabilityAnalysis', 'alertThreshold', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
