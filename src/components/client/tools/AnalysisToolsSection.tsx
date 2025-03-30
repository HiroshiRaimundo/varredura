import React from "react";
import { ClientType } from "@/components/client/ClientTypes";

export interface AnalysisToolsSectionProps {
  clientType: ClientType;
  onDatasetDownload?: () => void;
  onComparisonView?: () => void;
}

const AnalysisToolsSection: React.FC<AnalysisToolsSectionProps> = ({ 
  clientType, 
  onDatasetDownload = () => {}, 
  onComparisonView = () => {} 
}) => {
  // Renderer for press-specific tools
  const renderPressTools = () => {
    const handlePressRelease = () => {
      toast({
        title: "Criação de Release",
        description: "Redirecionando para o editor de releases."
      });
    };

    const handleMediaMonitoring = () => {
      toast({
        title: "Monitoramento de Mídia",
        description: "Iniciando análise de presença na mídia."
      });
    };

    const handleJournalistContact = () => {
      toast({
        title: "Contatos da Imprensa",
        description: "Acessando banco de dados de jornalistas."
      });
    };

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ferramentas de Assessoria de Imprensa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 px-2 flex flex-col items-center justify-center" onClick={handlePressRelease}>
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Criação de Release</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-2 flex flex-col items-center justify-center" onClick={handleMediaMonitoring}>
              <Newspaper className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Monitoramento de Mídia</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-2 flex flex-col items-center justify-center" onClick={handleJournalistContact}>
              <Mic className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Contatos da Imprensa</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-2 flex flex-col items-center justify-center" onClick={onComparisonView}>
              <BarChart2 className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Análise de Impacto</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // For press client type, render press-specific tools, otherwise use the default AnalysisToolsCard
  if (clientType === "press") {
    return renderPressTools();
  }

  // For other client types, use the standard analysis tools
  return (
    <AnalysisToolsCard 
      clientType={clientType} 
      onDatasetDownload={onDatasetDownload} 
      onComparisonView={onComparisonView} 
    />
  );
};

export default AnalysisToolsSection;
