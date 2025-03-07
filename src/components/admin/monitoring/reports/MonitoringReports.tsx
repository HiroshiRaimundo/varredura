import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MonitoringSource {
  id: string;
  name: string;
  type: string;
}

export const MonitoringReports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sources, setSources] = useState<MonitoringSource[]>([]);
  const [reportType, setReportType] = useState<string>("daily");

  // Buscar fontes de monitoramento ativas
  useEffect(() => {
    // Aqui você faria uma chamada à API para buscar as fontes
    // Por enquanto, vamos simular com dados mockados
    const fetchSources = async () => {
      try {
        // Simular chamada à API
        const response = await fetch('/api/monitoring/sources');
        const data = await response.json();
        setSources(data);
      } catch (error) {
        console.error('Erro ao buscar fontes:', error);
        // Em caso de erro, usar dados mockados
        setSources([]);
      }
    };

    fetchSources();
  }, []);

  const handleGenerateReport = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Erro",
        description: "Selecione um período para o relatório",
        variant: "destructive"
      });
      return;
    }

    if (selectedSources.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma fonte de monitoramento",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Aqui você faria a chamada real para gerar o relatório
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulando delay

      // Simular download do relatório
      const blob = new Blob(['Relatório simulado'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_${reportType}_${new Date().toISOString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Sucesso",
        description: "Relatório gerado com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao gerar relatório. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
        <p className="text-muted-foreground">
          Gere relatórios personalizados do seu monitoramento
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Relatório</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período do Relatório</label>
              <DatePickerWithRange
                date={dateRange}
                setDate={setDateRange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fontes de Monitoramento</label>
              <Select
                value={selectedSources.length > 0 ? selectedSources[0] : undefined}
                onValueChange={(value) => setSelectedSources([value])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione as fontes" />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((source) => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.name} ({source.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleGenerateReport}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Gerando Relatório..." : "Gerar Relatório"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
