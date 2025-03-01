
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientDashboard from "@/components/client/ClientDashboard";
import ClientSelection from "@/components/client/ClientSelection";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Client: React.FC = () => {
  const { clientType } = useParams<{ clientType?: string }>();
  const navigate = useNavigate();
  const monitoring = useMonitoring();
  const auth = useAuth();
  const [timeRange, setTimeRange] = useState("mensal");
  const [showAlerts, setShowAlerts] = useState(false);

  const validClientTypes = ["observatory", "researcher", "politician", "institution", "journalist"];
  const isValidClientType = clientType && validClientTypes.includes(clientType);

  // Client types that should see legislation alerts
  const showLegislationAlerts = ["politician", "researcher", "observatory"].includes(clientType || "");

  useEffect(() => {
    if (clientType && !isValidClientType) {
      navigate("/client");
    }
  }, [clientType, isValidClientType, navigate]);

  useEffect(() => {
    monitoring.fetchMonitoringItems();
  }, []);

  const handleDatasetDownload = () => {
    toast({
      title: "Conjunto de dados pronto",
      description: "O dataset completo está sendo baixado."
    });
    
    // Simulate download preparation
    setTimeout(() => {
      const element = document.createElement("a");
      if (clientType === "researcher") {
        element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(
          convertToCSV(monitoring.allMonitoringItems)
        ));
        element.setAttribute("download", "dataset-pesquisa.csv");
      } else {
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(
          JSON.stringify(monitoring.allMonitoringItems, null, 2)
        ));
        element.setAttribute("download", "dataset-completo.json");
      }
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  const handleComparisonView = () => {
    toast({
      title: "Análise comparativa",
      description: "A visualização comparativa será disponibilizada em breve."
    });
  };

  // Helper function to convert data to CSV (moved from the handleExport function)
  const convertToCSV = (items: any[]) => {
    const headers = Object.keys(items[0] || {}).filter(key => key !== 'id');
    const rows = items.map(item => headers.map(key => item[key]));
    return [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => navigate("/login")} 
            onLogoutClick={auth.handleLogout} 
          />

          {isValidClientType ? (
            <div className="space-y-6">
              {showLegislationAlerts && (
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 relative"
                    onClick={() => setShowAlerts(!showAlerts)}
                  >
                    <Bell className="h-4 w-4" />
                    Alertas de Legislação
                    {monitoring.unreadAlertCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2">
                        {monitoring.unreadAlertCount}
                      </Badge>
                    )}
                  </Button>
                </div>
              )}

              {showAlerts && showLegislationAlerts && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Alertas de Legislação e Indicadores-Chave
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monitoring.legislationAlerts.map(alert => (
                        <div key={alert.id} className={`p-3 border rounded-md ${alert.isRead ? 'bg-gray-50' : 'bg-amber-50 border-amber-200'}`}>
                          <div className="flex justify-between">
                            <h3 className="font-medium">{alert.title}</h3>
                            {!alert.isRead && (
                              <Badge variant="outline" className="bg-amber-100">
                                Novo
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mt-1">{alert.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">Publicado em: {alert.date}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => monitoring.markAlertAsRead(alert.id)}
                            >
                              {alert.isRead ? 'Arquivar' : 'Marcar como lido'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(clientType === "researcher" || clientType === "observatory") && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ferramentas Avançadas de Análise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={handleDatasetDownload} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        {clientType === "researcher" ? "Dataset Limpo (CSV)" : "Dataset Completo"}
                      </Button>
                      <Button onClick={handleComparisonView} variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {clientType === "researcher" ? "Comparação Temporal" : "Análise Regional"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard">
                  <ClientDashboard 
                    clientType={clientType as "observatory" | "researcher" | "politician" | "institution" | "journalist"}
                    monitoringItems={monitoring.monitoringItems}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    handleExport={monitoring.handleExport}
                    isAuthenticated={auth.isAuthenticated}
                  />
                </TabsContent>
                
                <TabsContent value="monitoring">
                  <div className="space-y-6">
                    <MonitoringForm 
                      form={monitoring.form} 
                      onSubmit={monitoring.handleAddMonitoring}
                      clientType={clientType as "observatory" | "researcher" | "politician" | "institution" | "journalist"}
                    />
                    
                    <MonitoringList 
                      items={monitoring.monitoringItems} 
                      onDelete={monitoring.handleDeleteMonitoring}
                      isLoading={monitoring.isLoading}
                      uniqueResponsibles={monitoring.getUniqueResponsibles()}
                      responsibleFilter={monitoring.responsibleFilter}
                      onFilterChange={monitoring.setResponsibleFilter}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <ClientSelection />
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Client;
