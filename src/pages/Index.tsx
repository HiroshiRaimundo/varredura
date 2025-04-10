
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import LoginOptions from '@/components/login/LoginOptions';

const Index = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
          onLogoutClick={auth.handleLogout} 
        />
      </div>
      
      <main className="flex-grow py-12">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold mb-4">Bem-vindo à Plataforma</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Aqui você encontra todas as opções de acesso para diferentes perfis de usuário.
            </p>
          </div>
          
          <LoginOptions />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
