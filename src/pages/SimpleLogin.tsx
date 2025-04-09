
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SimpleRegistration from "@/components/client-login/SimpleRegistration";
import { useAuth } from "@/hooks/useAuth";

const SimpleLogin: React.FC = () => {
  const auth = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => {}} 
          onLogoutClick={auth.handleLogout}
        />
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <SimpleRegistration />
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SimpleLogin;
