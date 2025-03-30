
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const ResearcherDashboard: React.FC = () => {
  const { user } = useAuth();
  const permissions = user?.permissions || { 
    canViewReports: false, 
    canExportData: false, 
    canAccessAnalytics: false 
  };

  return (
    <DashboardLayout title="Dashboard do Pesquisador">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Dados de Pesquisa</h2>
          {permissions.canViewReports && (
            <p>Dados e estatísticas disponíveis...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Exportação</h2>
          {permissions.canExportData && (
            <p>Ferramentas de exportação...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Análises</h2>
          {permissions.canAccessAnalytics && (
            <p>Ferramentas de análise...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResearcherDashboard;
