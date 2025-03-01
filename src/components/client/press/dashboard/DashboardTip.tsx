
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const DashboardTip: React.FC = () => {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-700">Dica de Monitoramento</AlertTitle>
      <AlertDescription className="text-blue-600">
        Utilize o sistema de monitoramento para acompanhar publicações dos seus releases em tempo real. 
        Adicione os veículos-alvo para receber alertas quando seu conteúdo for publicado.
      </AlertDescription>
    </Alert>
  );
};

export default DashboardTip;
