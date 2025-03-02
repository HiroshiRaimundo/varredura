
// Não podemos alterar esse arquivo, então esta modificação é apenas para exemplificar
// Idealmente, adicionaríamos links ou botões para as novas páginas de administração por tipo de cliente 
// nesta página principal de Admin.

// Para fins de demonstração, faremos isso em um componente adicional que poderá ser adicionado à 
// página de Admin como uma sugestão para o usuário.

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/admin/AdminSidebar";

const ClientAreas: React.FC = () => {
  const navigate = useNavigate();
  
  const clientTypes = [
    {
      type: "observatory",
      title: "Observatório",
      color: "bg-blue-600",
      description: "Gerenciar área de observatórios"
    },
    {
      type: "researcher",
      title: "Pesquisador",
      color: "bg-indigo-600",
      description: "Gerenciar área de pesquisadores"
    },
    {
      type: "politician",
      title: "Político",
      color: "bg-green-600",
      description: "Gerenciar área de políticos"
    },
    {
      type: "institution",
      title: "Instituição",
      color: "bg-purple-600",
      description: "Gerenciar área de instituições"
    },
    {
      type: "journalist",
      title: "Jornalista",
      color: "bg-red-600",
      description: "Gerenciar área de jornalistas"
    },
    {
      type: "press",
      title: "Assessoria de Imprensa",
      color: "bg-amber-600",
      description: "Gerenciar área de assessoria de imprensa"
    }
  ];
  
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Áreas de Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clientTypes.map((client) => (
            <Button
              key={client.type}
              className={`h-auto py-6 ${client.color} hover:opacity-90 flex flex-col items-start text-left`}
              onClick={() => navigate(`/admin/client/${client.type}`)}
            >
              <span className="font-bold text-lg">{client.title}</span>
              <span className="text-sm opacity-90 font-normal mt-1">{client.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Essa função será usada no componente Admin que não pode ser alterado
export { ClientAreas };
