
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Eye, Edit, Settings, BarChart, FileText, Users, Link, ExternalLink } from "lucide-react";

interface ClientTypePreviewProps {
  clientType: ClientType;
  onPreview: (clientType: ClientType) => void;
  onAccess: (clientType: ClientType) => void;
  onEdit: (clientType: ClientType) => void;
  onSettings: (clientType: ClientType) => void;
}

const ClientTypePreview: React.FC<ClientTypePreviewProps> = ({ 
  clientType, 
  onPreview,
  onAccess,
  onEdit,
  onSettings
}) => {
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];

  const getClientTypeIcon = () => {
    switch(clientType) {
      case "observatory": return <BarChart className="h-10 w-10 mb-2" />;
      case "researcher": return <FileText className="h-10 w-10 mb-2" />;
      case "politician": return <Users className="h-10 w-10 mb-2" />;
      case "institution": return <Users className="h-10 w-10 mb-2" />;
      case "journalist": return <FileText className="h-10 w-10 mb-2" />;
      case "press": return <Link className="h-10 w-10 mb-2" />;
      default: return <BarChart className="h-10 w-10 mb-2" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader className={`${colorClasses.light}`}>
              <CardTitle className={colorClasses.text}>
                {details.title}
              </CardTitle>
              <CardDescription>
                {details.shortDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className={`${colorClasses.light} p-4 rounded-full`}>
                    {getClientTypeIcon()}
                  </div>
                  <h3 className="font-medium mt-2 text-lg">{details.title}</h3>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    {details.description}
                  </p>
                </div>

                <h3 className="font-medium">Recursos Disponíveis:</h3>
                <ul className="space-y-2">
                  {details.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className={`rounded-full p-1 ${colorClasses.light} mt-1`}>
                        <div className={`h-2 w-2 rounded-full ${colorClasses.bg}`}></div>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onPreview(clientType)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Visualizar Exemplo
              </Button>
              <Button 
                variant="default"
                className={`w-full justify-start ${colorClasses.bg}`}
                onClick={() => onAccess(clientType)}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Acessar Área Real
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onEdit(clientType)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar Conteúdo
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onSettings(clientType)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Clientes ativos:</span>
                  <span className="font-medium">{Math.floor(Math.random() * 20) + 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Última atualização:</span>
                  <span className="font-medium">
                    {new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000)
                      .toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-md border">
        <p className="text-sm text-muted-foreground">
          Este painel permite gerenciar o conteúdo da área restrita para clientes do tipo
          <span className="font-medium"> {details.title}</span>. 
          Você pode visualizar como os clientes veem a interface, editar o conteúdo e configurar 
          opções específicas para este tipo de cliente.
        </p>
      </div>
    </div>
  );
};

export default ClientTypePreview;
