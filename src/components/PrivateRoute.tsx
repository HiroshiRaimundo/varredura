
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
    // Determinar para qual página de login redirecionar com base na rota solicitada
    const currentPath = location.pathname;
    let redirectTo = '/login'; // Padrão
    
    if (currentPath.includes('area-exemplo')) {
      redirectTo = `/exemplo-login?from=${encodeURIComponent(currentPath)}`;
    } else if (currentPath.includes('area-cliente')) {
      redirectTo = `/cliente-login?from=${encodeURIComponent(currentPath)}`;
    } else if (currentPath.includes('admin')) {
      redirectTo = `/admin-login?from=${encodeURIComponent(currentPath)}`;
    } else if (currentPath.includes('example-')) {
      redirectTo = `/simple-login?from=${encodeURIComponent(currentPath)}`;
    } else {
      redirectTo = `/login?from=${encodeURIComponent(currentPath)}`;
    }
    
    console.log(`Redirecionando usuário não autenticado para ${redirectTo}`);
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has the required role (if specified)
  if (requiredRole && user?.role !== requiredRole) {
    console.log(`User ${user?.email} attempted to access ${location.pathname} without required role ${requiredRole}`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
