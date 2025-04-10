
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Se o usuário estiver tentando acessar a página de exemplo, redirecionamos para o login simplificado
    const currentPath = location.pathname;
    const isExamplePage = currentPath.includes('example-');
    const redirectTo = `/simple-login?from=${encodeURIComponent(currentPath)}`;
    
    console.log(`Redirecionando usuário não autenticado para ${redirectTo}`);
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has the required role (if specified)
  // Para o modo de demonstração, vamos fazer essa verificação ser menos restritiva
  if (requiredRole && user?.role !== requiredRole) {
    // Para a visualização da página de exemplo, permitimos acesso mais flexível
    if (requiredRole !== 'admin' || location.pathname.startsWith('/admin')) {
      console.log(`User ${user?.email} attempted to access ${location.pathname} without required role ${requiredRole}`);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
