
import React from 'react';
import PasswordRecoveryAdmin from '@/components/admin/PasswordRecoveryAdmin';
import BackToAdminButton from '@/components/admin/BackToAdminButton';

const MediaContactsManagement: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <BackToAdminButton />
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Contatos de Mídia</h1>
      
      <PasswordRecoveryAdmin />
    </div>
  );
};

export default MediaContactsManagement;
