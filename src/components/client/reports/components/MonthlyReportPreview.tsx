
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ClientInfo } from "../types";
import ReportHeader from "./ReportHeader";
import { getCurrentMonth } from "../utils/reportUtils";

interface MonthlyReportPreviewProps {
  clientInfo: ClientInfo;
  isGenerating: boolean;
  onClose: () => void;
  onGenerate: () => void;
}

const MonthlyReportPreview: React.FC<MonthlyReportPreviewProps> = ({ 
  clientInfo, 
  isGenerating, 
  onClose, 
  onGenerate 
}) => {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Pré-visualização: Relatório Mensal de Monitoramento</DialogTitle>
        <DialogDescription>
          Visualize como ficará seu relatório antes de gerar
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 my-4">
        <ReportHeader clientInfo={clientInfo} />
        
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
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? "Gerando..." : "Gerar Relatório"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MonthlyReportPreview;
