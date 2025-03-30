
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const ObservatoryDashboard: React.FC = () => {
  const { user } = useAuth();
  // Usamos user em vez de client
  const permissions = user?.permissions || { 
    canViewReports: false, 
    canManageAlerts: false, 
    canAccessAnalytics: false 
  };

  return (
    <DashboardLayout title="Dashboard do Observatório">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Relatórios</h2>
          {permissions.canViewReports && (
            <p>Lista de relatórios disponíveis...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Análise de Dados</h2>
          {permissions.canAccessAnalytics && (
            <p>Gráficos e análises...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Alertas</h2>
          {permissions.canManageAlerts && (
            <p>Configuração de alertas...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObservatoryDashboard;
