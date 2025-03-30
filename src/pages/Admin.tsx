
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ContentModerator from "@/components/admin/ContentModerator";

interface Content {
  id: string;
  type: 'release' | 'reportagem';
  title: string;
  subtitle: string;
  category: string;
  content: string;
  status: 'pending' | 'approved' | 'distributed' | 'published' | 'rejected';
  tags: string[];
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      type: 'release',
      title: 'Nova Política de Sustentabilidade',
      subtitle: 'Empresa anuncia metas ambiciosas para 2026',
      category: 'sustentabilidade',
      content: '<h1>Nova Política de Sustentabilidade</h1><p>A empresa anunciou hoje suas novas metas...</p>',
      status: 'pending',
      tags: ['sustentabilidade', 'meio ambiente', 'ESG']
    },
    {
      id: '2',
      type: 'reportagem',
      title: 'Impacto da IA no Mercado de Trabalho',
      subtitle: 'Como a inteligência artificial está mudando as profissões',
      category: 'tecnologia',
      content: '<h1>Impacto da IA no Mercado de Trabalho</h1><p>A inteligência artificial está transformando...</p>',
      status: 'pending',
      tags: ['tecnologia', 'ia', 'mercado de trabalho']
    }
  ]);

  const quickActions = [
    {
      title: "Central de Monitoramento",
      description: "Gerencie todos os monitoramentos do sistema",
      path: "/admin/monitoring"
    },
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

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected', feedback?: string) => {
    setContents(prevContents => 
      prevContents.map(content => 
        content.id === id 
          ? { ...content, status } 
          : content
      )
    );
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="moderation">Moderação</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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
          </TabsContent>

          <TabsContent value="moderation">
            <Card>
              <CardHeader>
                <CardTitle>Moderação de Conteúdo</CardTitle>
              </CardHeader>
              <CardContent>
                <ContentModerator
                  onUpdateStatus={handleUpdateStatus}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
