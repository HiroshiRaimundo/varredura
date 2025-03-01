
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

interface AnalysisToolsCardProps {
  clientType?: string;
  onDatasetDownload: () => void;
  onComparisonView: () => void;
}

const AnalysisToolsCard: React.FC<AnalysisToolsCardProps> = ({ 
  clientType,
  onDatasetDownload,
  onComparisonView
}) => {
  if (clientType !== "researcher" && clientType !== "observatory") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ferramentas Avançadas de Análise</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button onClick={onDatasetDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {clientType === "researcher" ? "Dataset Limpo (CSV)" : "Dataset Completo"}
          </Button>
          <Button onClick={onComparisonView} variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {clientType === "researcher" ? "Comparação Temporal" : "Análise Regional"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisToolsCard;
