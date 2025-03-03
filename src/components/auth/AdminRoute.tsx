import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuth = () => {
      try {
        const authData = localStorage.getItem('adminAuth');
        if (!authData) {
          setIsAuthorized(false);
          return;
        }

        const data = JSON.parse(authData);
        const now = Date.now();
        const authAge = now - data.timestamp;

        // Verifica se a autenticação expirou (8 horas)
        if (authAge >= 8 * 3600 * 1000) {
          localStorage.clear();
          sessionStorage.clear();
          setIsAuthorized(false);
          return;
        }

        // Verifica se tem as informações necessárias
        if (!data.token || !data.user || data.user.role !== 'admin') {
          localStorage.clear();
          sessionStorage.clear();
          setIsAuthorized(false);
          return;
        }

        // Atualiza o timestamp para manter a sessão ativa
        localStorage.setItem('adminAuth', JSON.stringify({
          ...data,
          timestamp: now
        }));

        setIsAuthorized(true);
      } catch (error) {
        console.error('Erro na verificação de autenticação:', error);
        localStorage.clear();
        sessionStorage.clear();
        setIsAuthorized(false);
      }
    };

    verifyAuth();

    // Verifica a autenticação a cada 5 minutos
    const interval = setInterval(verifyAuth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Mostra loading enquanto verifica
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Redireciona para login se não estiver autorizado
  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  // Renderiza o conteúdo protegido
  return <>{children}</>;
};

export default AdminRoute; 