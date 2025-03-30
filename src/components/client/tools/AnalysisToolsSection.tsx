
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Newspaper, BarChart2, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AnalysisToolsSectionProps {
  clientType: string;
  onDatasetDownload: () => void;
  onComparisonView: () => void;
}

const AnalysisToolsSection: React.FC<AnalysisToolsSectionProps> = ({ 
  clientType, 
  onDatasetDownload, 
  onComparisonView 
}) => {
  const handleDocumentAnalysis = () => {
    toast({
      title: "Análise de Documentos",
      description: "A funcionalidade de análise de documentos será disponibilizada em breve."
    });
  };
  
  const handleNewsAnalysis = () => {
    toast({
      title: "Análise de Notícias",
      description: "A análise de notícias está sendo preparada e estará disponível na próxima atualização."
    });
  };
  
  const handleMediaAnalysis = () => {
    toast({
      title: "Análise de Mídia",
      description: "O módulo de análise de mídia está em desenvolvimento."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ferramentas de Análise</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={handleDocumentAnalysis} variant="outline" className="justify-start h-auto py-4">
            <FileText className="h-5 w-5 mr-2" />
            <div className="text-left">
              <span className="font-medium block">Análise de Documentos</span>
              <span className="text-xs text-muted-foreground">Extraia insights de documentos</span>
            </div>
          </Button>
          <Button onClick={handleNewsAnalysis} variant="outline" className="justify-start h-auto py-4">
            <Newspaper className="h-5 w-5 mr-2" />
            <div className="text-left">
              <span className="font-medium block">Análise de Notícias</span>
              <span className="text-xs text-muted-foreground">Identifique tendências em notícias</span>
            </div>
          </Button>
          <Button onClick={handleMediaAnalysis} variant="outline" className="justify-start h-auto py-4">
            <Mic className="h-5 w-5 mr-2" />
            <div className="text-left">
              <span className="font-medium block">Análise de Mídia</span>
              <span className="text-xs text-muted-foreground">Analise menções em podcasts e vídeos</span>
            </div>
          </Button>
          <Button onClick={onDatasetDownload} variant="outline" className="justify-start h-auto py-4">
            <BarChart2 className="h-5 w-5 mr-2" />
            <div className="text-left">
              <span className="font-medium block">Exportar Dados</span>
              <span className="text-xs text-muted-foreground">Baixe dados para análise própria</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisToolsSection;
