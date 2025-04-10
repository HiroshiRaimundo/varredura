
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

  // Verificar se o usuário está autenticado
  if (!isAuthenticated) {
    // Determinar para qual página de login redirecionar com base no caminho atual
    const currentPath = location.pathname;
    let redirectTo = '/login';
    
    if (currentPath.includes('example-')) {
      // Páginas de exemplo vão para login simplificado
      redirectTo = `/simple-login?from=${encodeURIComponent(currentPath)}`;
    } else if (currentPath.includes('admin')) {
      // Páginas de admin vão para login administrativo
      redirectTo = `/login?from=${encodeURIComponent(currentPath)}`;
    } else {
      // Outras páginas vão para client-login
      redirectTo = `/client-login?from=${encodeURIComponent(currentPath)}`;
    }
    
    console.log(`Redirecionando usuário não autenticado para ${redirectTo}`);
    return <Navigate to={redirectTo} replace />;
  }

  // Verificar permissão de acesso com base no papel do usuário
  if (requiredRole && user?.role !== requiredRole) {
    console.log(`User ${user?.email} attempted to access ${location.pathname} without required role ${requiredRole}`);
    
    // Se for uma página de exemplo, permitir acesso mais flexível
    if (location.pathname.includes('example-') && !location.pathname.includes('admin')) {
      return <>{children}</>;
    }
    
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
