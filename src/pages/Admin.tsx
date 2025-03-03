
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminSidebar from "@/components/admin/AdminSidebar";

const Admin: React.FC = () => {
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
    <div className="flex h-screen">
      <AdminSidebar />
      
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Card className="mb-6">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Painel de estatísticas gerais do sistema.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de atividades recentes no sistema.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
