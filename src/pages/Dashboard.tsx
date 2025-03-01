
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import HeroSection from "@/components/dashboard/HeroSection";
import ServicesSection from "@/components/dashboard/ServicesSection";
import FeaturesSection from "@/components/dashboard/FeaturesSection";
import CTASection from "@/components/dashboard/CTASection";

const DashboardPage: React.FC = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={auth.isAuthenticated}
        onLoginClick={() => auth.navigate('/login')}
        onLogoutClick={auth.handleLogout}
      />

      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />

      <Footer />
    </div>
  );
};

export default DashboardPage;
