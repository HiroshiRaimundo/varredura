
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ClientInfo } from "../types";
import ReportHeader from "./ReportHeader";
import { formatDate } from "../utils/reportUtils";
import { toast } from "@/hooks/use-toast";

interface CustomReportFormProps {
  clientInfo: ClientInfo;
  isGenerating: boolean;
  onClose: () => void;
  onGenerate: () => void;
  customReportTitle: string;
  setCustomReportTitle: (value: string) => void;
  customReportType: "pdf" | "excel";
  setCustomReportType: (value: "pdf" | "excel") => void;
  customReportDateFrom: string;
  setCustomReportDateFrom: (value: string) => void;
  customReportDateTo: string;
  setCustomReportDateTo: (value: string) => void;
}

const CustomReportForm: React.FC<CustomReportFormProps> = ({
  clientInfo,
  isGenerating,
  onClose,
  onGenerate,
  customReportTitle,
  setCustomReportTitle,
  customReportType,
  setCustomReportType,
  customReportDateFrom,
  setCustomReportDateFrom,
  customReportDateTo,
  setCustomReportDateTo
}) => {
  const handleCreateCustomReport = () => {
    if (!customReportTitle || !customReportDateFrom || !customReportDateTo) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    onGenerate();
  };

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Criar Relatório Personalizado</DialogTitle>
        <DialogDescription>
          Configure os parâmetros para gerar um relatório customizado
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <ReportHeader clientInfo={clientInfo} />
        
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
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleCreateCustomReport} disabled={isGenerating}>
          {isGenerating ? "Gerando..." : "Gerar Relatório"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CustomReportForm;
