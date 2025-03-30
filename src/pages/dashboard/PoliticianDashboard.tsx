
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const PoliticianDashboard: React.FC = () => {
  const { user } = useAuth();
  const permissions = user?.permissions || { 
    canViewReports: false, 
    canManageAlerts: false, 
    canAccessAnalytics: false 
  };

  return (
    <DashboardLayout title="Dashboard do Político">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monitoramento de Mídia</h2>
          {permissions.canViewReports && (
            <p>Relatórios de mídia...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Alertas</h2>
          {permissions.canManageAlerts && (
            <p>Configuração de alertas de menções...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Análise de Impacto</h2>
          {permissions.canAccessAnalytics && (
            <p>Análise de impacto na mídia...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PoliticianDashboard;
