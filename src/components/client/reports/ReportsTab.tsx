
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Report } from "./types";
import { mockReports, clientInfo } from "./utils/reportUtils";
import ReportList from "./components/ReportList";
import ReportButtons from "./components/ReportButtons";
import MonthlyReportPreview from "./components/MonthlyReportPreview";
import MentionsAnalysisPreview from "./components/MentionsAnalysisPreview";
import CustomReportForm from "./components/CustomReportForm";
import { getCurrentMonth } from "./utils/reportUtils";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>
          Acesse e baixe relatórios sobre seu monitoramento de mídia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={showCustomReport} onOpenChange={setShowCustomReport}>
          <ReportButtons 
            isGenerating={isGenerating}
            onMonthlyReport={handleMonthlyReport}
            onMentionsAnalysis={handleMentionsAnalysis}
          />

          <CustomReportForm 
            clientInfo={clientInfo}
            isGenerating={isGenerating}
            onClose={() => setShowCustomReport(false)}
            onGenerate={handleCreateCustomReport}
            customReportTitle={customReportTitle}
            setCustomReportTitle={setCustomReportTitle}
            customReportType={customReportType}
            setCustomReportType={setCustomReportType}
            customReportDateFrom={customReportDateFrom}
            setCustomReportDateFrom={setCustomReportDateFrom}
            customReportDateTo={customReportDateTo}
            setCustomReportDateTo={setCustomReportDateTo}
          />
        </Dialog>

        <Dialog open={showMonthlyPreview} onOpenChange={setShowMonthlyPreview}>
          <MonthlyReportPreview 
            clientInfo={clientInfo}
            isGenerating={isGenerating}
            onClose={() => setShowMonthlyPreview(false)}
            onGenerate={generateMonthlyReport}
          />
        </Dialog>

        <Dialog open={showMentionsPreview} onOpenChange={setShowMentionsPreview}>
          <MentionsAnalysisPreview 
            clientInfo={clientInfo}
            isGenerating={isGenerating}
            onClose={() => setShowMentionsPreview(false)}
            onGenerate={generateMentionsReport}
          />
        </Dialog>

        <ReportList reports={reports} />
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
