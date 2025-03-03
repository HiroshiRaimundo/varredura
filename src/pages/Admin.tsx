import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Limpa o cache de autenticação
        const clearCache = () => {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
          localStorage.removeItem("admin_token");
          document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        };

        const isAuth = localStorage.getItem("isAuthenticated") === "true";
        const userData = localStorage.getItem("user");
        const userObj = userData ? JSON.parse(userData) : null;
        const adminToken = localStorage.getItem("admin_token");

        if (!isAuth || !userObj || userObj.role !== 'admin' || !adminToken) {
          clearCache();
          window.location.href = '/admin/login';
          return;
        }

        // Verifica a validade do token no servidor
        const response = await fetch('/api/admin/verify-token', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });

        if (!response.ok) {
          clearCache();
          window.location.href = '/admin/login';
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Erro na verificação de autenticação:', error);
        window.location.href = '/admin/login';
      }
    };

    checkAuth();
  }, []);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  // Renderiza nada se não estiver autenticado
  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

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
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientTypes.map((client) => (
            <Card key={client.type} className="hover:shadow-lg transition-shadow">
              <CardHeader className={`${client.color} text-white rounded-t-lg`}>
                <CardTitle>{client.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4">{client.description}</p>
                <Button
                  onClick={() => navigate(`/admin/client/${client.type}`)}
                  className="w-full"
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Admin;
