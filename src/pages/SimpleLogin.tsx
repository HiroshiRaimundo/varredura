
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SimpleRegistration from "@/components/client-login/SimpleRegistration";
import { useAuth } from "@/hooks/useAuth";

const SimpleLogin: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from URL parameters or use a default path to example page
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/example-client';
  
  // If already authenticated, redirect to the target page
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(redirectPath);
    }
  }, [auth.isAuthenticated, navigate, redirectPath]);
  
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
