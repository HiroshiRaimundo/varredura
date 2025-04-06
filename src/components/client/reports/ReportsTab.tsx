
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart, Download, Calendar, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Report {
  id: string;
  title: string;
  type: "pdf" | "excel";
  date: string;
  size: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Relatório Mensal de Monitoramento - Abril 2025",
    type: "pdf",
    date: "2025-04-01",
    size: "2.4 MB"
  },
  {
    id: "2",
    title: "Análise de Menções na Mídia - Q1 2025",
    type: "excel",
    date: "2025-03-31",
    size: "1.8 MB"
  },
  {
    id: "3",
    title: "Resultados de Campanhas de Comunicação",
    type: "pdf",
    date: "2025-03-15",
    size: "3.2 MB"
  }
];

const ReportsTab: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomReport, setShowCustomReport] = useState(false);
  const [customReportTitle, setCustomReportTitle] = useState("");
  const [customReportType, setCustomReportType] = useState<"pdf" | "excel">("pdf");
  const [customReportDateFrom, setCustomReportDateFrom] = useState("");
  const [customReportDateTo, setCustomReportDateTo] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleMonthlyReport = () => {
    setIsGenerating(true);
    
    // Simulação de geração de relatório
    setTimeout(() => {
      const newReport: Report = {
        id: `new-${Date.now()}`,
        title: `Relatório Mensal de Monitoramento - ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
        type: "pdf",
        date: new Date().toISOString().split('T')[0],
        size: "3.1 MB"
      };
      
      setReports([newReport, ...reports]);
      setIsGenerating(false);
      
      toast({
        title: "Relatório gerado com sucesso",
        description: "O relatório mensal foi gerado e já está disponível para download.",
      });
    }, 2000);
  };

  const handleMentionsAnalysis = () => {
    setIsGenerating(true);
    
    // Simulação de geração de relatório
    setTimeout(() => {
      const newReport: Report = {
        id: `new-${Date.now()}`,
        title: `Análise de Menções na Mídia - ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
        type: "excel",
        date: new Date().toISOString().split('T')[0],
        size: "2.5 MB"
      };
      
      setReports([newReport, ...reports]);
      setIsGenerating(false);
      
      toast({
        title: "Análise gerada com sucesso",
        description: "A análise de menções foi gerada e já está disponível para download.",
      });
    }, 2500);
  };

  const handleCreateCustomReport = () => {
    if (!customReportTitle || !customReportDateFrom || !customReportDateTo) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulação de geração de relatório personalizado
    setTimeout(() => {
      const newReport: Report = {
        id: `new-${Date.now()}`,
        title: customReportTitle,
        type: customReportType,
        date: new Date().toISOString().split('T')[0],
        size: "2.8 MB"
      };
      
      setReports([newReport, ...reports]);
      setIsGenerating(false);
      setShowCustomReport(false);
      
      // Limpar campos
      setCustomReportTitle("");
      setCustomReportDateFrom("");
      setCustomReportDateTo("");
      
      toast({
        title: "Relatório personalizado gerado",
        description: "Seu relatório personalizado está pronto para download.",
      });
    }, 3000);
  };

  const handleDownload = (report: Report) => {
    toast({
      title: "Download iniciado",
      description: `O download de "${report.title}" foi iniciado.`,
    });
    
    // Aqui seria implementada a lógica real de download
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>
          Acesse e baixe relatórios sobre seu monitoramento de mídia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button 
            className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
            onClick={handleMonthlyReport}
            disabled={isGenerating}
          >
            <FileText className="h-8 w-8 mb-2" />
            <span>Gerar Relatório Mensal</span>
          </Button>
          <Button 
            className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
            onClick={handleMentionsAnalysis}
            disabled={isGenerating}
          >
            <BarChart className="h-8 w-8 mb-2" />
            <span>Análise de Menções</span>
          </Button>
          
          <Dialog open={showCustomReport} onOpenChange={setShowCustomReport}>
            <DialogTrigger asChild>
              <Button 
                className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
                disabled={isGenerating}
              >
                <Calendar className="h-8 w-8 mb-2" />
                <span>Relatório Personalizado</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Relatório Personalizado</DialogTitle>
                <DialogDescription>
                  Configure os parâmetros para gerar um relatório customizado
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="report-title">Título do Relatório</Label>
                  <Input 
                    id="report-title" 
                    placeholder="Ex: Análise de Campanha XYZ" 
                    value={customReportTitle}
                    onChange={(e) => setCustomReportTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-type">Formato</Label>
                  <Select 
                    value={customReportType} 
                    onValueChange={(value: "pdf" | "excel") => setCustomReportType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-from">Data Inicial</Label>
                    <Input 
                      id="date-from" 
                      type="date" 
                      value={customReportDateFrom}
                      onChange={(e) => setCustomReportDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-to">Data Final</Label>
                    <Input 
                      id="date-to" 
                      type="date" 
                      value={customReportDateTo}
                      onChange={(e) => setCustomReportDateTo(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Inclua no Relatório</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="include-mentions" defaultChecked />
                      <label htmlFor="include-mentions">Menções</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="include-sentiment" defaultChecked />
                      <label htmlFor="include-sentiment">Análise de Sentimento</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="include-sources" defaultChecked />
                      <label htmlFor="include-sources">Fontes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="include-trends" defaultChecked />
                      <label htmlFor="include-trends">Tendências</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCustomReport(false)}>Cancelar</Button>
                <Button onClick={handleCreateCustomReport} disabled={isGenerating}>
                  {isGenerating ? "Gerando..." : "Gerar Relatório"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Relatórios Disponíveis</h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell className="uppercase">{report.type}</TableCell>
                  <TableCell>{formatDate(report.date)}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>Baixar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
