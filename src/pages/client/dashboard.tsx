import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface ClientData {
  name: string;
  email: string;
  profileType: string;
  planStatus: string;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/client/verify');
        const data = await res.json();

        if (!res.ok) {
          router.push('/client-login');
          return;
        }

        setClientData(data.user);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.push('/client-login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!clientData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - {clientData.name}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo(a), {clientData.name}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {clientData.profileType}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Plano {clientData.planStatus}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Status do Deploy */}
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Status do Sistema
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Deploy Status</span>
                  <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    Ativo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Última Atualização</span>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Versão do Sistema</span>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    v0.1.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card de Teste */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Teste de Funcionamento
                </h3>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-gray-500">
                      Sistema funcionando corretamente
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 