
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, BarChart, Calendar } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

interface ReportButtonsProps {
  isGenerating: boolean;
  onMonthlyReport: () => void;
  onMentionsAnalysis: () => void;
}

const ReportButtons: React.FC<ReportButtonsProps> = ({ 
  isGenerating, 
  onMonthlyReport, 
  onMentionsAnalysis 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Button 
        className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
        onClick={onMonthlyReport}
        disabled={isGenerating}
      >
        <FileText className="h-8 w-8 mb-2" />
        <span>Gerar Relatório Mensal</span>
      </Button>
      
      <Button 
        className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
        onClick={onMentionsAnalysis}
        disabled={isGenerating}
      >
        <BarChart className="h-8 w-8 mb-2" />
        <span>Análise de Menções</span>
      </Button>
      
      <DialogTrigger asChild>
        <Button 
          className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
          disabled={isGenerating}
        >
          <Calendar className="h-8 w-8 mb-2" />
          <span>Relatório Personalizado</span>
        </Button>
      </DialogTrigger>
    </div>
  );
};

export default ReportButtons;
