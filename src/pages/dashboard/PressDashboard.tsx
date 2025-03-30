
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const PressDashboard: React.FC = () => {
  const { user } = useAuth();
  const permissions = user?.permissions || { 
    canViewReports: false,
    canInviteUsers: false,
    canAccessAnalytics: false
  };

  return (
    <DashboardLayout title="Dashboard da Assessoria de Imprensa">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gestão de Mídia</h2>
          {permissions.canViewReports && (
            <p>Relatórios de mídia e cobertura...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Equipe</h2>
          {permissions.canInviteUsers && (
            <p>Gestão de equipe...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Análise de Impacto</h2>
          {permissions.canAccessAnalytics && (
            <p>Métricas e análises...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PressDashboard;
