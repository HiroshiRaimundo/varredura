
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, Users, GraduationCap, Building2, Landmark } from "lucide-react";

const ClientSelection: React.FC = () => {
  const navigate = useNavigate();

  const clientTypes = [
    {
      id: "observatory",
      title: "Observatório",
      description: "Dashboards com foco em análise de indicadores e tendências de dados.",
      icon: Eye,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "researcher",
      title: "Pesquisador",
      description: "Dashboards com foco em dados detalhados e análises avançadas.",
      icon: GraduationCap,
      color: "bg-green-100 text-green-700"
    },
    {
      id: "politician",
      title: "Político",
      description: "Dashboards com foco em tendências e resumos estratégicos.",
      icon: Landmark,
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "institution",
      title: "Instituição",
      description: "Dashboards com foco em métricas e distribuição de responsabilidades.",
      icon: Building2,
      color: "bg-amber-100 text-amber-700"
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Área do Cliente</h1>
        <p className="text-muted-foreground">
          Selecione o tipo de dashboard que melhor atende às suas necessidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientTypes.map((type) => (
          <Card key={type.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center mb-2`}>
                <type.icon className="h-6 w-6" />
              </div>
              <CardTitle>{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Visualizações personalizadas
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Dados relevantes para {type.title.toLowerCase()}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Exportação de relatórios
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate(`/client/${type.id}`)}
              >
                Acessar Dashboard
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientSelection;
