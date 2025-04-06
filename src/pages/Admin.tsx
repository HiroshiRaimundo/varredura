
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ContentModerator from "@/components/admin/ContentModerator";
import { AdminMonitoringDashboard } from "@/components/admin/monitoring/AdminMonitoringDashboard";
import { AuditLog } from "@/types/adminTypes";

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

// Mock audit logs for demonstration
const mockAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    userId: "user-1",
    userName: "Ana Silva",
    userRole: "admin",
    action: "approved_release",
    entityType: "release",
    entityId: "rel-123",
    details: { releaseTitle: "Novo programa de sustentabilidade" },
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-2",
    userId: "user-2",
    userName: "Carlos Oliveira",
    userRole: "moderator",
    action: "rejected_release",
    entityType: "release",
    entityId: "rel-124",
    details: { releaseTitle: "Resultados financeiros Q1", reason: "Dados incompletos" },
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log-3",
    userId: "user-1",
    userName: "Ana Silva",
    userRole: "admin",
    action: "created_client",
    entityType: "client",
    entityId: "client-56",
    details: { clientName: "Observatório Nacional", clientType: "observatory" },
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

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
  
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

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
      path: "/admin/releases"
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
    
    // Log the action to audit logs
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userId: "current-user", // In a real app, this would be the current user's ID
      userName: "Admin User", // In a real app, this would be the current user's name
      userRole: "admin", // In a real app, this would be the current user's role
      action: status === 'approved' ? "approved_release" : "rejected_release",
      entityType: "release",
      entityId: id,
      details: { 
        releaseTitle: contents.find(c => c.id === id)?.title || "Unknown content",
        feedback: feedback
      },
      ipAddress: "127.0.0.1", // In a real app, this would be the user's IP address
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    
    setAuditLogs([newLog, ...auditLogs]);
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
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
            <TabsTrigger value="audit">Logs de Auditoria</TabsTrigger>
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
            <ContentModerator
              onUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="monitoring">
            <AdminMonitoringDashboard />
          </TabsContent>
          
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Logs de Auditoria</CardTitle>
                <CardDescription>
                  Registro detalhado de todas as ações administrativas no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {log.action === 'approved_release' ? 'Release Aprovado' :
                             log.action === 'rejected_release' ? 'Release Rejeitado' :
                             log.action === 'created_client' ? 'Cliente Criado' :
                             'Ação no Sistema'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Por {log.userName} ({log.userRole}) • {new Date(log.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            log.action.includes('approve') ? 'bg-green-100 text-green-800' :
                            log.action.includes('reject') ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }
                        >
                          {log.entityType.charAt(0).toUpperCase() + log.entityType.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 bg-gray-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium">Detalhes da ação:</h4>
                        <div className="mt-1 text-sm">
                          {Object.entries(log.details).map(([key, value]) => (
                            <p key={key}>
                              <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: </span>
                              {value}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <span>IP: {log.ipAddress}</span>
                        <span className="mx-2">•</span>
                        <span className="truncate max-w-md">Navegador: {log.userAgent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
