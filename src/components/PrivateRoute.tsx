
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
    // If user is trying to access a protected route, redirect to simple login
    const redirectTo = `/simple-login?from=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has the required role (if specified)
  if (requiredRole && user?.role !== requiredRole) {
    // Track attempted access to restricted areas for administrative monitoring
    console.log(`User ${user?.email} attempted to access ${location.pathname} without required role ${requiredRole}`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
