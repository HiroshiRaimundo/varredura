
import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/dashboard/HeroSection";
import FeaturesSection from "@/components/dashboard/FeaturesSection";
import ServicesSection from "@/components/dashboard/ServicesSection";
import CTASection from "@/components/dashboard/CTASection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "@/components/LoginDialog";
import LoginOptions from "@/components/login/LoginOptions";

const Index: React.FC = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={auth.isAuthenticated} 
        onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
        onLogoutClick={auth.handleLogout} 
      />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LoginOptions />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      
      {/* Login Dialog (legado) */}
      {auth.isLoginDialogOpen && (
        <LoginDialog 
          isOpen={auth.isLoginDialogOpen}
          onOpenChange={auth.setIsLoginDialogOpen}
          form={auth.form}
          onSubmit={auth.handleLogin}
        />
      )}
    </div>
  );
};

export default Index;
