
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClientInfo } from "../types";
import ReportHeader from "./ReportHeader";
import { getCurrentMonth } from "../utils/reportUtils";

interface MentionsAnalysisPreviewProps {
  clientInfo: ClientInfo;
  isGenerating: boolean;
  onClose: () => void;
  onGenerate: () => void;
}

const MentionsAnalysisPreview: React.FC<MentionsAnalysisPreviewProps> = ({ 
  clientInfo, 
  isGenerating, 
  onClose, 
  onGenerate 
}) => {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Pré-visualização: Análise de Menções na Mídia</DialogTitle>
        <DialogDescription>
          Visualize como ficará sua análise antes de gerar
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 my-4">
        <ReportHeader clientInfo={clientInfo} />
        
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
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? "Gerando..." : "Gerar Relatório"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MentionsAnalysisPreview;
