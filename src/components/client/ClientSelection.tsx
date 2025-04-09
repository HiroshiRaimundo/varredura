
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BarChart2, Building, Database, Globe, Landmark, Newspaper, Search, User, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ClientType, clientTypes } from "@/components/client/ClientTypes";

const ClientSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleClientSelect = (clientType: string) => {
    // Go to login page with redirect to example-client
    navigate(`/client-login?from=/example-client&type=${clientType}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            Área do Cliente
          </h2>
          <p className="text-muted-foreground">
            Selecione seu perfil para acessar funcionalidades específicas
          </p>
        </div>

        <Button 
          onClick={() => navigate("/client-login?from=/example-client")}
          className="mt-4 md:mt-0 w-full md:w-auto flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Acessar Área do Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientTypes.map((client) => (
          <Card 
            key={client.type}
            className="hover:shadow-md transition-shadow cursor-pointer border border-border"
            onClick={() => handleClientSelect(client.type)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  {client.type === "observatory" && <Database className="h-5 w-5 text-blue-500" />}
                  {client.type === "researcher" && <Search className="h-5 w-5 text-purple-500" />}
                  {client.type === "politician" && <Landmark className="h-5 w-5 text-green-500" />}
                  {client.type === "institution" && <Building className="h-5 w-5 text-amber-500" />}
                  {client.type === "journalist" && <Newspaper className="h-5 w-5 text-rose-500" />}
                  {client.type === "press" && <Megaphone className="h-5 w-5 text-indigo-500" />}
                  {client.label}
                </CardTitle>
                {client.alert && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {client.alert}
                  </Badge>
                )}
              </div>
              <CardDescription>{client.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-sm">
                {client.type === "observatory" && (
                  <>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Dashboards</Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Indicadores</Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Monitoramento</Badge>
                  </>
                )}
                {client.type === "researcher" && (
                  <>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Datasets</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Análises</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Publicações</Badge>
                  </>
                )}
                {client.type === "politician" && (
                  <>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Legislação</Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Alertas</Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Políticas</Badge>
                  </>
                )}
                {client.type === "institution" && (
                  <>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">Relatórios</Badge>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">Planejamento</Badge>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">Dados</Badge>
                  </>
                )}
                {client.type === "journalist" && (
                  <>
                    <Badge variant="secondary" className="bg-rose-100 text-rose-800 hover:bg-rose-200">Fontes</Badge>
                    <Badge variant="secondary" className="bg-rose-100 text-rose-800 hover:bg-rose-200">Estatísticas</Badge>
                    <Badge variant="secondary" className="bg-rose-100 text-rose-800 hover:bg-rose-200">Contatos</Badge>
                  </>
                )}
                {client.type === "press" && (
                  <>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Releases</Badge>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Distribuição</Badge>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Métricas</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ClientSelection;
