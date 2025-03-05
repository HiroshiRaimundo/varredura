import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminSidebar from "@/components/admin/AdminSidebar";

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Gerenciar Clientes",
      description: "Adicionar, editar e remover clientes do sistema",
      path: "/admin/clients"
    },
    {
      title: "Contatos de Mídia",
      description: "Gerenciar contatos e relacionamentos com veículos de mídia",
      path: "/admin/contacts"
    },
    {
      title: "Releases e Reportagens",
      description: "Gerenciar conteúdo e publicações",
      path: "/admin/content"
    }
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {quickActions.map((action) => (
            <Card key={action.path} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => navigate(action.path)}
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Clientes</h3>
                  <p className="text-2xl font-bold">248</p>
                  <p className="text-sm text-muted-foreground">Total de clientes ativos</p>
                </div>
                <div>
                  <h3 className="font-medium">Monitoramentos</h3>
                  <p className="text-2xl font-bold">1,842</p>
                  <p className="text-sm text-muted-foreground">Monitoramentos ativos</p>
                </div>
                <div>
                  <h3 className="font-medium">Releases</h3>
                  <p className="text-2xl font-bold">324</p>
                  <p className="text-sm text-muted-foreground">Releases publicados este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <p className="font-medium">Novo Cliente Adicionado</p>
                    <p className="text-sm text-muted-foreground">Observatório de Políticas Públicas</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Há 2 horas</p>
                </div>
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <p className="font-medium">Release Publicado</p>
                    <p className="text-sm text-muted-foreground">Análise do Cenário Político 2025</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Há 4 horas</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">Monitoramento Atualizado</p>
                    <p className="text-sm text-muted-foreground">Cobertura de Mídia - Setor Educacional</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Há 6 horas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
