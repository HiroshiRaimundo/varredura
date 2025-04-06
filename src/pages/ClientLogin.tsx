
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import LoginSidebar from "@/components/client-login/LoginSidebar";
import LoginContainer from "@/components/client-login/LoginContainer";

const ClientLogin: React.FC = () => {
  const location = useLocation();
  const auth = useAuth();
  
  // Get the redirect path from URL parameters or use a default
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/dashboard';

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
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
          <LoginSidebar />
          <LoginContainer redirectPath={redirectPath} />
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ClientLogin;
