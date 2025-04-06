
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ClientLoginFormValues } from "./types";
import LoginTabs from "./LoginTabs";
import EmailLoginForm from "./EmailLoginForm";
import SSOLoginOptions from "./SSOLoginOptions";

interface LoginContainerProps {
  redirectPath: string;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ redirectPath }) => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<'email' | 'sso'>('email');
  
  const handleClientLogin = async (data: ClientLoginFormValues) => {
    try {
      // Simulando login com as credenciais de cliente para esta demo
      await auth.handleLogin({
        email: data.email,
        password: data.password
      });
      
      // Verifique se o login foi bem-sucedido antes de navegar
      if (auth.isAuthenticated) {
        auth.navigate(redirectPath);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleSSOLogin = (provider: string) => {
    console.log(`Iniciando login com provedor SSO: ${provider}`);
    // Aqui seria implementada a lógica de autenticação SSO
    // Por enquanto, apenas exibimos uma mensagem de log
  };
  
  return (
    <div className="bg-white p-8 md:w-1/2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Login do Cliente</h2>
        <p className="text-gray-600">Entre com suas credenciais para acessar seu workspace.</p>
      </div>
      
      <LoginTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'email' ? (
        <EmailLoginForm onSubmit={handleClientLogin} isLoggingIn={auth.isLoggingIn} />
      ) : (
        <SSOLoginOptions onSSOLogin={handleSSOLogin} />
      )}
      
      <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
        <p>Primeiro acesso? <a href="#" className="text-blue-600 hover:underline">Crie uma conta</a></p>
        <p>Precisa de ajuda? <a href="#" className="text-blue-600 hover:underline">Contate o suporte</a></p>
      </div>
    </div>
  );
};

export default LoginContainer;
