import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const JournalistDashboard: React.FC = () => {
  const { client } = useAuth();

  return (
    <DashboardLayout title="Dashboard do Jornalista">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monitoramento de Notícias</h2>
          {client?.permissions.canViewReports && (
            <p>Feed de notícias e alertas...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Alertas Personalizados</h2>
          {client?.permissions.canManageAlerts && (
            <p>Configuração de alertas...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pesquisa</h2>
          <p>Ferramentas de pesquisa...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JournalistDashboard;
