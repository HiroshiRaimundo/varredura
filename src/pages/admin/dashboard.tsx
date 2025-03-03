import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-spin text-2xl">⌛</span>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Você não tem permissão para acessar esta área.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <p className="text-gray-600">Bem-vindo(a), {user.name}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estatísticas Gerais */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total de Usuários</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monitoramentos Ativos</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relatórios Gerados</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atividades Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Nenhuma atividade recente</p>
            </CardContent>
          </Card>

          {/* Status do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>API</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Banco de Dados</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cache</span>
                  <span className="text-green-500">Online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 