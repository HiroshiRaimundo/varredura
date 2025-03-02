
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { BarChart2, Leaf, ArrowRightCircle } from "lucide-react";

interface DefaultContentProps {
  activeTab: "dashboard" | "monitoring" | "analysis" | "releases";
  clientType: ClientType;
}

const DefaultContent: React.FC<DefaultContentProps> = ({ activeTab, clientType }) => {
  const colorClasses = getColorClasses(clientType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={colorClasses.text}>
          {activeTab === "dashboard" && "Dashboard de Visão Geral"}
          {activeTab === "monitoring" && "Monitoramento de Dados"}
          {activeTab === "analysis" && "Ferramentas de Análise"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 ${colorClasses.light} rounded-full flex items-center justify-center mb-4`}>
            {activeTab === "dashboard" && <BarChart2 className={`h-8 w-8 ${colorClasses.text}`} />}
            {activeTab === "monitoring" && <Leaf className={`h-8 w-8 ${colorClasses.text}`} />}
            {activeTab === "analysis" && <ArrowRightCircle className={`h-8 w-8 ${colorClasses.text}`} />}
          </div>
          <h3 className="text-lg font-semibold mb-2">Conteúdo do {clientTypeDetails[clientType].title}</h3>
          <p className="text-muted-foreground">
            Esta é uma visualização de demonstração da área do cliente. <br />
            Em um ambiente real, você veria os dados de {clientTypeDetails[clientType].shortDescription}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultContent;
