
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginCard from "@/components/client-login/LoginCard";
import { useClientLogin } from "@/components/client-login/useClientLogin";

const ClientLogin: React.FC = () => {
  const { isLoggingIn, handleLogin } = useClientLogin();

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={false}
          onLoginClick={() => {}}
          onLogoutClick={() => {}}
        />

        <div className="flex items-center justify-center py-12">
          <LoginCard 
            onLogin={handleLogin} 
            isLoggingIn={isLoggingIn} 
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientLogin;
