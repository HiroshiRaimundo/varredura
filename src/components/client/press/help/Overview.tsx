
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, Info, FileText, CheckCircle, ExternalLink, BarChart2 } from "lucide-react";

const Overview: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          Sobre a Assessoria de Imprensa
        </h2>
        
        <p className="text-muted-foreground">
          Nosso sistema de assessoria de imprensa foi desenvolvido para simplificar o processo de 
          criação, aprovação e monitoramento de releases para nossos clientes.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Criação de Releases
            </h3>
            <p className="text-sm text-muted-foreground">
              Escreva e formate releases profissionais com nossa ferramenta intuitiva. 
              Inclua links para arquivos de mídia, fotos e documentos relevantes.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Processo de Aprovação
            </h3>
            <p className="text-sm text-muted-foreground">
              Cada release passa por um processo de aprovação por nossa equipe de especialistas
              antes de ser enviado aos jornalistas cadastrados.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <ExternalLink className="h-4 w-4 text-purple-500" />
              Distribuição
            </h3>
            <p className="text-sm text-muted-foreground">
              Após aprovação, os releases são distribuídos para veículos e jornalistas 
              relevantes ao seu setor, maximizando as chances de publicação.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <BarChart2 className="h-4 w-4 text-orange-500" />
              Monitoramento
            </h3>
            <p className="text-sm text-muted-foreground">
              Acompanhe o desempenho dos seus releases e veja onde foram publicados 
              com nosso sistema de monitoramento automático.
            </p>
          </div>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 mt-6">
        <HelpCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-700">Precisa de ajuda adicional?</AlertTitle>
        <AlertDescription className="text-blue-600">
          Nossa equipe está disponível para auxiliar com dúvidas específicas sobre o processo.
          Entre em contato pelo e-mail: suporte@assessoria.com
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Overview;
