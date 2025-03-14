import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Acesso Não Autorizado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => navigate('/')}
            className="w-full"
          >
            Voltar para a Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
