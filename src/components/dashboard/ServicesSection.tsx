
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Search, Landmark, Building, Newspaper, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clientTypes } from "@/components/client/ClientTypes";

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Uma Plataforma, Múltiplas Aplicações
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nossa solução integrada se adapta às necessidades de diferentes perfis de usuários, mantendo uma experiência 
            consistente e todas as funcionalidades em um único local.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Gestão de Dados Centralizada</CardTitle>
              <CardDescription>
                Centralize seus dados e monitore informações em um único painel personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Nossa plataforma integra fontes diversas em um único sistema, permitindo monitoramento
                e análise em tempo real de dados relevantes para qualquer setor.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <Newspaper className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Comunicação Integrada</CardTitle>
              <CardDescription>
                Gerencie toda sua comunicação de forma eficiente e mensurável
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Do desenvolvimento à distribuição de conteúdo, nossa plataforma oferece ferramentas completas 
                para gerenciar todo o ciclo de comunicação.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Análise Avançada</CardTitle>
              <CardDescription>
                Transforme dados em insights acionáveis com ferramentas analíticas poderosas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Visualizações personalizadas, relatórios automatizados e dashboards intuitivos que se adaptam 
                às necessidades específicas de cada usuário.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Adaptável a Diferentes Perfis de Usuários</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            A mesma plataforma integrada se adapta para atender as necessidades específicas de cada tipo de usuário, 
            mantendo uma experiência consistente e todas as funcionalidades em um único ambiente.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {clientTypes.map((type) => (
              <div 
                key={type.type}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/service/${type.type}`)}
              >
                {type.type === "observatory" && <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />}
                {type.type === "researcher" && <Search className="h-8 w-8 text-purple-500 mx-auto mb-2" />}
                {type.type === "politician" && <Landmark className="h-8 w-8 text-green-500 mx-auto mb-2" />}
                {type.type === "institution" && <Building className="h-8 w-8 text-amber-500 mx-auto mb-2" />}
                {type.type === "journalist" && <Newspaper className="h-8 w-8 text-rose-500 mx-auto mb-2" />}
                {type.type === "press" && <Megaphone className="h-8 w-8 text-indigo-500 mx-auto mb-2" />}
                <p className="font-medium">{type.label}</p>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={() => navigate("/client")}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Conhecer a Plataforma
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
