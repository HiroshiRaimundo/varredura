
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { Eye, Edit, Settings } from "lucide-react";

const ClientAreaPreview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClientType, setSelectedClientType] = useState<ClientType>("observatory");

  // Get color classes for the selected client type
  const colorClasses = getColorClasses(selectedClientType);

  // Navigate to the client example area for preview
  const handlePreviewClientArea = (clientType: ClientType) => {
    navigate(`/example-client?type=${clientType}`);
  };

  // Simulated edit function - in a real app this would open an editor
  const handleEditClientArea = (clientType: ClientType) => {
    // This would typically open a form or modal to edit the client area
    console.log(`Editing client area for: ${clientType}`);
    alert(`Simulando edição da área de cliente: ${clientTypeDetails[clientType].title}`);
  };

  // Navigate to settings for this client type
  const handleClientSettings = (clientType: ClientType) => {
    console.log(`Accessing settings for: ${clientType}`);
    alert(`Simulando acesso às configurações para: ${clientTypeDetails[clientType].title}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Áreas de Clientes</CardTitle>
          <CardDescription>
            Visualize, edite e gerencie as áreas restritas de cada tipo de cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="observatory" 
            value={selectedClientType}
            onValueChange={(value) => setSelectedClientType(value as ClientType)}
            className="w-full"
          >
            <TabsList className="mb-4 flex w-full flex-wrap">
              {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
                <TabsTrigger key={type} value={type} className="flex-grow">
                  {clientTypeDetails[type].title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Tabs content for each client type */}
            {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
              <TabsContent key={type} value={type}>
                <ClientTypePreview 
                  clientType={type} 
                  onPreview={handlePreviewClientArea}
                  onEdit={handleEditClientArea}
                  onSettings={handleClientSettings}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Component to display preview and actions for a specific client type
interface ClientTypePreviewProps {
  clientType: ClientType;
  onPreview: (clientType: ClientType) => void;
  onEdit: (clientType: ClientType) => void;
  onSettings: (clientType: ClientType) => void;
}

const ClientTypePreview: React.FC<ClientTypePreviewProps> = ({ 
  clientType, 
  onPreview,
  onEdit,
  onSettings
}) => {
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];

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
                Visualizar Área
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

export default ClientAreaPreview;
