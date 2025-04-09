
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Search, Landmark, Building, Newspaper, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clientTypes } from "@/components/client/ClientTypes";

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleKnowPlatform = () => {
    // Navigate to client login first, with a redirect parameter to example-client
    navigate("/client-login?from=/example-client");
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Uma Única Plataforma, Diversos Perfis
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            O Varredura adapta sua interface e funcionalidades automaticamente para atender às necessidades específicas 
            de cada tipo de usuário, mantendo a consistência e integração da plataforma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Dados Centralizados</CardTitle>
              <CardDescription>
                Acesso a todas as informações relevantes em um único ambiente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Nossa plataforma integra diversas fontes em um sistema unificado, permitindo visualização, 
                monitoramento e análise personalizada conforme seu perfil de usuário.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <Newspaper className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Fluxo de Comunicação</CardTitle>
              <CardDescription>
                Gestão completa do ciclo de comunicação em uma única ferramenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Da criação à distribuição de conteúdo, com monitoramento de resultados e métricas de desempenho,
                tudo integrado aos seus dados e objetivos organizacionais.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Análise Personalizada</CardTitle>
              <CardDescription>
                Visualizações e insights adaptados ao seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Dashboards, relatórios e ferramentas analíticas que se ajustam automaticamente às suas 
                necessidades específicas, priorizando as métricas mais relevantes para sua função.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Perfis Atendidos pela Plataforma</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Uma única plataforma que se adapta perfeitamente a diferentes perfis profissionais,
            oferecendo experiências personalizadas com todas as funcionalidades integradas.
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
            onClick={handleKnowPlatform}
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
