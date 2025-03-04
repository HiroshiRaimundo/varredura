import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ClientType } from '@/types/clientTypes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: ClientType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedTypes 
}) => {
  const { client, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!client) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedTypes && !allowedTypes.includes(client.type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
