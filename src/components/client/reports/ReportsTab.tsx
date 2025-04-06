import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart, Download, Calendar, Plus, ArrowRight, FileCheck, X } from "lucide-react";
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

interface ClientInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
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

const clientInfo: ClientInfo = {
  name: "João da Silva",
  company: "Empresa XYZ Ltda.",
  email: "joao.silva@empresaxyz.com.br",
  phone: "(11) 98765-4321",
  address: "Av. Paulista, 1234 - São Paulo/SP"
};

const ReportsTab: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomReport, setShowCustomReport] = useState(false);
  const [customReportTitle, setCustomReportTitle] = useState("");
  const [customReportType, setCustomReportType] = useState<"pdf" | "excel">("pdf");
  const [customReportDateFrom, setCustomReportDateFrom] = useState("");
  const [customReportDateTo, setCustomReportDateTo] = useState("");
  
  const [showMonthlyPreview, setShowMonthlyPreview] = useState(false);
  const [showMentionsPreview, setShowMentionsPreview] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getCurrentMonth = () => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const now = new Date();
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  const handleMonthlyReport = () => {
    setShowMonthlyPreview(true);
  };

  const generateMonthlyReport = () => {
    setIsGenerating(true);
    setShowMonthlyPreview(false);
    
    setTimeout(() => {
      const newReport: Report = {
        id: `new-${Date.now()}`,
        title: `Relatório Mensal de Monitoramento - ${getCurrentMonth()}`,
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
    setShowMentionsPreview(true);
  };

  const generateMentionsReport = () => {
    setIsGenerating(true);
    setShowMentionsPreview(false);
    
    setTimeout(() => {
      const newReport: Report = {
        id: `new-${Date.now()}`,
        title: `Análise de Menções na Mídia - ${getCurrentMonth()}`,
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
    
    setTimeout(() => {
      toast({
        title: "Download concluído",
        description: `O download de "${report.title}" foi concluído.`,
      });
    }, 2000);
  };

  const ReportHeader = () => (
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{clientInfo.company}</h3>
          <p className="text-sm text-muted-foreground">{clientInfo.address}</p>
          <p className="text-sm text-muted-foreground">{clientInfo.email} | {clientInfo.phone}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Data de geração:</p>
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );

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
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Criar Relatório Personalizado</DialogTitle>
                <DialogDescription>
                  Configure os parâmetros para gerar um relatório customizado
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <ReportHeader />
                
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
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="include-content" defaultChecked />
                      <label htmlFor="include-content">Análise de Conteúdo</label>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Pré-visualização</h4>
                  <div className="bg-muted p-4 rounded-md space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold">{customReportTitle || "Título do Relatório"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {customReportDateFrom && customReportDateTo 
                          ? `Período: ${formatDate(customReportDateFrom)} a ${formatDate(customReportDateTo)}`
                          : "Período: DD/MM/AAAA a DD/MM/AAAA"}
                      </p>
                    </div>
                    <div className="h-32 border border-dashed border-muted-foreground rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Visualização do conteúdo do relatório</p>
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

        <Dialog open={showMonthlyPreview} onOpenChange={setShowMonthlyPreview}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Pré-visualização: Relatório Mensal de Monitoramento</DialogTitle>
              <DialogDescription>
                Visualize como ficará seu relatório antes de gerar
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 my-4">
              <ReportHeader />
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Relatório Mensal de Monitoramento - {getCurrentMonth()}</h3>
                
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Resumo Executivo</h4>
                    <p className="text-sm text-muted-foreground">
                      Este relatório apresenta a análise das menções monitoradas durante o mês de {getCurrentMonth()}, 
                      com foco nos principais termos definidos para acompanhamento.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Menções por Plataforma</h4>
                      <div className="h-40 bg-muted flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Análise de Sentimento</h4>
                      <div className="h-40 bg-muted flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Principais Termos Mencionados</h4>
                    <div className="h-32 bg-muted flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Top 5 Menções Relevantes</h4>
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="bg-muted p-2 rounded-md">
                          <p className="text-sm font-medium">Título da menção {i+1}</p>
                          <p className="text-xs text-muted-foreground">Fonte: Exemplo.com | Data: 05/04/2025</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMonthlyPreview(false)}>Cancelar</Button>
              <Button onClick={generateMonthlyReport} disabled={isGenerating}>
                {isGenerating ? "Gerando..." : "Gerar Relatório"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showMentionsPreview} onOpenChange={setShowMentionsPreview}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Pré-visualização: Análise de Menções na Mídia</DialogTitle>
              <DialogDescription>
                Visualize como ficará sua análise antes de gerar
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 my-4">
              <ReportHeader />
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Análise de Menções na Mídia - {getCurrentMonth()}</h3>
                
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Resumo da Análise</h4>
                    <p className="text-sm text-muted-foreground">
                      Esta análise apresenta um panorama detalhado das menções relacionadas aos termos monitorados 
                      durante o período em análise, com gráficos e tabelas exportáveis.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Evolução Temporal das Menções</h4>
                    <div className="h-40 bg-muted flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Menções Positivas</h4>
                      <div className="text-center my-4">
                        <span className="text-3xl font-bold text-green-500">65%</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Menções Neutras</h4>
                      <div className="text-center my-4">
                        <span className="text-3xl font-bold text-gray-500">25%</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Menções Negativas</h4>
                      <div className="text-center my-4">
                        <span className="text-3xl font-bold text-red-500">10%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Tabela de Menções</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Fonte</TableHead>
                          <TableHead>Título</TableHead>
                          <TableHead>Sentimento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell>05/04/2025</TableCell>
                            <TableCell>Portal de Notícias</TableCell>
                            <TableCell>Título da menção {i+1}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                i % 3 === 0 ? "bg-green-100 text-green-800" : 
                                i % 3 === 1 ? "bg-gray-100 text-gray-800" : 
                                "bg-red-100 text-red-800"
                              }`}>
                                {i % 3 === 0 ? "Positivo" : i % 3 === 1 ? "Neutro" : "Negativo"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMentionsPreview(false)}>Cancelar</Button>
              <Button onClick={generateMentionsReport} disabled={isGenerating}>
                {isGenerating ? "Gerando..." : "Gerar Relatório"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
