import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { MonitoringList } from "./MonitoringList";
import { MonitoringForm } from "./MonitoringForm";
import { MonitoringStats } from "./MonitoringStats";
import { MonitoringSettings } from "./MonitoringSettings";
import { MonitoringAnalytics } from "./MonitoringAnalytics";
import { MonitoringReports } from "./MonitoringReports";

// Dados mockados para exemplo
const mockReportData = {
  network: {
    centrality: {
      "http://example.com/page1": 0.8,
      "http://example.com/page2": 0.6,
      "http://example.com/page3": 0.4,
    },
    pageRank: {
      "http://example.com/page1": 0.5,
      "http://example.com/page2": 0.3,
      "http://example.com/page3": 0.2,
    },
    hubScore: {
      "http://example.com/page1": 0.7,
      "http://example.com/page2": 0.2,
      "http://example.com/page3": 0.1,
    }
  },
  content: {
    sentiment: {
      polarity: 0.2,
      subjectivity: 0.5
    },
    keyPhrases: [
      "Importante atualização do sistema",
      "Novas funcionalidades implementadas",
      "Melhorias de desempenho",
      "Correções de bugs",
      "Atualizações de segurança"
    ],
    wordFrequency: {
      "sistema": 10,
      "atualização": 8,
      "segurança": 6,
      "melhorias": 5,
      "desempenho": 4
    }
  },
  anomalies: {
    totalAnomalies: 5,
    anomalyPercentage: 12.5,
    timeAnomalies: [false, true, false, false, true, false, false, false],
    contentAnomalies: [false, false, true, false, false, true, false, false]
  },
  report: {
    summary: {
      totalInsights: 8,
      timestamp: new Date().toISOString()
    },
    insights: [
      {
        type: "network",
        title: "Alta Centralidade",
        description: "Páginas com maior conectividade",
        data: { value: 0.8 }
      },
      {
        type: "content",
        title: "Sentimento Positivo",
        description: "Conteúdo com tendência positiva",
        data: { value: 0.2 }
      }
    ],
    recommendations: [
      {
        category: "Rede",
        action: "Monitorar páginas centrais para mudanças"
      },
      {
        category: "Conteúdo",
        action: "Manter análise de sentimento do conteúdo"
      }
    ]
  }
};

export const AdminMonitoringDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/").pop() || "overview";
  const [activeTab, setActiveTab] = useState(path);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin/monitoring/${value === "overview" ? "" : value}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Central de Monitoramento</h2>
        <p className="text-muted-foreground">
          Gerencie todos os monitoramentos do sistema
        </p>
      </div>

      <MonitoringStats />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="add">Novo Monitoramento</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramentos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <MonitoringAnalytics />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <MonitoringReports data={mockReportData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
