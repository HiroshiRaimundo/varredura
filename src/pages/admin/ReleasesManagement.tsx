
import React from 'react';
import BackToAdminButton from '@/components/admin/BackToAdminButton';

const ReleasesManagement: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <BackToAdminButton />
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Releases</h1>
      
      {/* Conteúdo de gerenciamento de releases */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Lista de Releases</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Não há releases para exibir no momento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReleasesManagement;
