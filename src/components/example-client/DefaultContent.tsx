
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { BarChart2, Leaf, ArrowRightCircle, FileText } from "lucide-react";

interface DefaultContentProps {
  activeTab: "dashboard" | "monitoring" | "analysis" | "releases";
  clientType: ClientType;
}

const DefaultContent: React.FC<DefaultContentProps> = ({ activeTab, clientType }) => {
  const colorClasses = getColorClasses(clientType);
  
  const getTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Dashboard de Visão Geral";
      case "monitoring": return "Monitoramento de Dados";
      case "analysis": return "Ferramentas de Análise";
      case "releases": return "Gestão de Releases";
    }
  };
  
  const getIcon = () => {
    switch (activeTab) {
      case "dashboard": return <BarChart2 className={`h-8 w-8 ${colorClasses.text}`} />;
      case "monitoring": return <Leaf className={`h-8 w-8 ${colorClasses.text}`} />;
      case "analysis": return <ArrowRightCircle className={`h-8 w-8 ${colorClasses.text}`} />;
      case "releases": return <FileText className={`h-8 w-8 ${colorClasses.text}`} />;
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className={colorClasses.text}>
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center bg-muted/10 rounded-lg">
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 ${colorClasses.light} rounded-full flex items-center justify-center mb-4`}>
            {getIcon()}
          </div>
          <h3 className="text-lg font-medium mb-2">Conteúdo simplificado</h3>
          <p className="text-muted-foreground max-w-md">
            Esta é uma visualização de demonstração. Em um ambiente real, você veria os dados relevantes para {clientTypeDetails[clientType].shortDescription}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultContent;
