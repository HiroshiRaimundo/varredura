
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginCard from "@/components/client-login/LoginCard";
import { useClientLogin } from "@/components/client-login/useClientLogin";
import { ClientLoginFormValues } from "@/components/client-login/types";
import { useAuth } from "@/hooks/useAuth";

const ClientLogin: React.FC = () => {
  const { isLoggingIn, handleLogin } = useClientLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  
  // Get the redirect path from URL parameters or use a default
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/dashboard';
  
  const handleClientLogin = async (data: ClientLoginFormValues) => {
    try {
      // Simulando login com as credenciais de cliente para esta demo
      await auth.handleLogin({
        email: data.email,
        password: data.password
      });
      
      // Verifique se o login foi bem-sucedido antes de navegar
      if (auth.isAuthenticated) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => {}} 
          onLogoutClick={auth.handleLogout}
        />
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <LoginCard 
          onLogin={handleClientLogin}
          isLoggingIn={isLoggingIn || auth.isLoggingIn}
        />
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ClientLogin;
