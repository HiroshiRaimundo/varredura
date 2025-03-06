import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "@/components/charts";

interface NetworkMetrics {
  centrality: Record<string, number>;
  pageRank: Record<string, number>;
  hubScore: Record<string, number>;
}

interface ContentMetrics {
  sentiment: {
    polarity: number;
    subjectivity: number;
  };
  keyPhrases: string[];
  wordFrequency: Record<string, number>;
}

interface AnomalyMetrics {
  totalAnomalies: number;
  anomalyPercentage: number;
  timeAnomalies: boolean[];
  contentAnomalies: boolean[];
}

interface Report {
  summary: {
    totalInsights: number;
    timestamp: string;
  };
  insights: Array<{
    type: string;
    title: string;
    description: string;
    data: any;
  }>;
  recommendations: Array<{
    category: string;
    action: string;
  }>;
}

interface MonitoringReportProps {
  data: {
    network: NetworkMetrics;
    content: ContentMetrics;
    anomalies: AnomalyMetrics;
    report: Report;
  };
}

export const MonitoringReports: React.FC<MonitoringReportProps> = ({ data }) => {
  const { network, content, anomalies, report } = data;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatório de Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="network">Análise de Rede</TabsTrigger>
              <TabsTrigger value="content">Análise de Conteúdo</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalias</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Total de Insights: {report.summary.totalInsights}</p>
                    <p>Última Atualização: {new Date(report.summary.timestamp).toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recomendações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4">
                      {report.recommendations.map((rec, index) => (
                        <li key={index}>
                          <strong>{rec.category}:</strong> {rec.action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="network">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Rede</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={Object.entries(network.centrality).map(([url, value]) => ({
                          url: url.split('/').pop() || url,
                          centrality: value
                        }))}
                        xField="url"
                        yField="centrality"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hub Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart
                        data={Object.entries(network.hubScore).map(([url, value]) => ({
                          name: url.split('/').pop() || url,
                          value
                        }))}
                        nameField="name"
                        valueField="value"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Sentimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Polaridade</h4>
                        <p className="text-2xl">{content.sentiment.polarity.toFixed(2)}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Subjetividade</h4>
                        <p className="text-2xl">{content.sentiment.subjectivity.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Frequência de Palavras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={Object.entries(content.wordFrequency).map(([word, count]) => ({
                          word,
                          count
                        }))}
                        xField="word"
                        yField="count"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Frases-Chave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4">
                      {content.keyPhrases.map((phrase, index) => (
                        <li key={index}>{phrase}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="anomalies">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detecção de Anomalias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Total de Anomalias</h4>
                        <p className="text-2xl">{anomalies.totalAnomalies}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Percentual de Anomalias</h4>
                        <p className="text-2xl">{anomalies.anomalyPercentage.toFixed(2)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Anomalias Temporais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <LineChart
                        data={anomalies.timeAnomalies.map((isAnomaly, index) => ({
                          index,
                          value: isAnomaly ? 1 : 0
                        }))}
                        xField="index"
                        yFields={["value"]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
