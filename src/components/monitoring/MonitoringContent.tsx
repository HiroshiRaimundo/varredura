import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, FileText, Database, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MonitoredSource {
  id: string;
  type: 'governo' | 'indicadores' | 'legislacao';
  name: string;
  url: string;
  frequency: string;
  lastUpdate: string;
  status: 'active' | 'paused';
  dataPoints: number;
}

const MonitoringContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'governo' | 'indicadores' | 'legislacao'>('governo');
  
  // Dados simulados - serão substituídos pela integração real
  const monitoredSources: MonitoredSource[] = [
    {
      id: '1',
      type: 'governo',
      name: 'Portal da Transparência',
      url: 'http://portaltransparencia.gov.br',
      frequency: 'Diária',
      lastUpdate: '2025-03-05T10:00:00',
      status: 'active',
      dataPoints: 1250
    },
    {
      id: '2',
      type: 'indicadores',
      name: 'IBGE - Indicadores Socioeconômicos',
      url: 'http://ibge.gov.br',
      frequency: 'Mensal',
      lastUpdate: '2025-03-01T08:30:00',
      status: 'active',
      dataPoints: 450
    },
    {
      id: '3',
      type: 'legislacao',
      name: 'Diário Oficial da União',
      url: 'http://in.gov.br',
      frequency: 'Diária',
      lastUpdate: '2025-03-05T09:15:00',
      status: 'active',
      dataPoints: 890
    }
  ];

  const getSourceIcon = (type: 'governo' | 'indicadores' | 'legislacao') => {
    switch (type) {
      case 'governo':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'indicadores':
        return <Database className="h-5 w-5 text-green-500" />;
      case 'legislacao':
        return <BookOpen className="h-5 w-5 text-purple-500" />;
    }
  };

  const filteredSources = monitoredSources.filter(source => source.type === activeTab);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Sistema de Monitoramento</h2>
        <p className="text-muted-foreground">
          Coleta automatizada e estruturada de dados de diversas fontes.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="governo" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sites Governamentais
          </TabsTrigger>
          <TabsTrigger value="indicadores" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Indicadores Socioeconômicos
          </TabsTrigger>
          <TabsTrigger value="legislacao" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Legislação
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fontes Monitoradas</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {filteredSources.map((source) => (
                      <div 
                        key={source.id}
                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          {getSourceIcon(source.type)}
                          <div>
                            <h4 className="font-medium">{source.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {source.url}
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                Frequência: {source.frequency}
                              </Badge>
                              <Badge variant="outline">
                                Dados coletados: {source.dataPoints}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Última atualização
                          </p>
                          <p className="font-medium">
                            {new Date(source.lastUpdate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Coletas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>• Dados são coletados automaticamente conforme a frequência configurada</p>
                  <p>• Transformação de dados não estruturados (HTML) em formatos estruturados (JSON, CSV)</p>
                  <p>• Limpeza e padronização automática dos dados coletados</p>
                  <p>• Versionamento para acompanhamento da evolução temporal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringContent;
