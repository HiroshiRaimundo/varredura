import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { CalendarIcon, Download, FileText, Settings, AlertTriangle, Brain, Search, BarChart as BarChartIcon, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface ReportConfig {
  type: string;
  format: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  sources: string[];
  metrics: string[];
  groupBy: string;
}

interface MonitoringGroup {
  id: string;
  name: string;
  type: string;
}

const MonitoringGroups: React.FC<{
  sources: MonitoringGroup[];
  selectedSources: string[];
  onSourceSelect: (sources: string[]) => void;
}> = ({ sources, selectedSources, onSourceSelect }) => {
  const handleSourceSelect = (sourceId: string) => {
    if (selectedSources.includes(sourceId)) {
      onSourceSelect(selectedSources.filter((id) => id !== sourceId));
    } else {
      onSourceSelect([...selectedSources, sourceId]);
    }
  };

  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <div key={source.id} className="flex items-center space-x-2">
          <Switch
            checked={selectedSources.includes(source.id)}
            onCheckedChange={() => handleSourceSelect(source.id)}
          />
          <Label>{source.name}</Label>
        </div>
      ))}
    </div>
  );
};

export const MonitoringReports: React.FC = () => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    type: "performance",
    format: "pdf",
    dateRange: {
      from: null,
      to: null
    },
    sources: [],
    metrics: ["updates", "alerts", "successRate", "avgTime"],
    groupBy: "none"
  });

  const handleExport = async () => {
    if (!reportConfig.dateRange.from || !reportConfig.dateRange.to) {
      toast({
        title: "Erro na Exportação",
        description: "Por favor, selecione um período para o relatório.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Prepara os dados para exportação
      const reportData = {
        title: "Relatório de Monitoramento",
        period: {
          from: format(reportConfig.dateRange.from, "dd/MM/yyyy"),
          to: format(reportConfig.dateRange.to, "dd/MM/yyyy")
        },
        sources: reportConfig.sources,
        metrics: reportConfig.metrics,
        groupBy: reportConfig.groupBy,
        content: {
          // Adicione os dados de conteúdo aqui
        }
      };

      // Simula a geração do PDF
      toast({
        title: "Gerando Relatório",
        description: "Aguarde enquanto preparamos seu relatório..."
      });

      // Em produção, aqui você chamaria sua API de geração de PDF
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simula o download
      const mockDownload = new Blob([JSON.stringify(reportData, null, 2)], {
        type: "application/json"
      });
      const url = window.URL.createObjectURL(mockDownload);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-monitoramento-${format(new Date(), "dd-MM-yyyy")}.${reportConfig.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Relatório Exportado",
        description: `Relatório gerado com sucesso no formato ${reportConfig.format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Erro na Exportação",
        description: "Ocorreu um erro ao gerar o relatório. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
          <p className="text-muted-foreground">
            Gere relatórios personalizados do seu monitoramento
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Relatório</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select
                value={reportConfig.type}
                onValueChange={(value) =>
                  setReportConfig((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="alerts">Alertas</SelectItem>
                  <SelectItem value="content">Conteúdo</SelectItem>
                  <SelectItem value="predictive">Análise Preditiva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formato</Label>
              <Select
                value={reportConfig.format}
                onValueChange={(value) =>
                  setReportConfig((prev) => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Agrupar Por</Label>
              <Select
                value={reportConfig.groupBy}
                onValueChange={(value) =>
                  setReportConfig((prev) => ({ ...prev, groupBy: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o agrupamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem Agrupamento</SelectItem>
                  <SelectItem value="source">Por Fonte</SelectItem>
                  <SelectItem value="type">Por Tipo</SelectItem>
                  <SelectItem value="group">Por Grupo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !reportConfig.dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reportConfig.dateRange.from ? (
                        format(reportConfig.dateRange.from, "PPP", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Data Inicial</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={reportConfig.dateRange.from || undefined}
                      onSelect={(date) =>
                        setReportConfig((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, from: date },
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !reportConfig.dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reportConfig.dateRange.to ? (
                        format(reportConfig.dateRange.to, "PPP", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Data Final</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={reportConfig.dateRange.to || undefined}
                      onSelect={(date) =>
                        setReportConfig((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, to: date },
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Seleção de Fontes</CardTitle>
          </CardHeader>
          <CardContent>
            <MonitoringGroups
              sources={[
                { id: "1", name: "Portal Gov", type: "governo" },
                { id: "2", name: "G1", type: "noticias" },
                // Adicione mais fontes conforme necessário
              ]}
              selectedSources={reportConfig.sources}
              onSourceSelect={(sources) =>
                setReportConfig((prev) => ({ ...prev, sources }))
              }
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>
    </div>
  );
};
