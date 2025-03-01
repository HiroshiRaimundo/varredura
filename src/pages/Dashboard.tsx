
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import HeroSection from "@/components/dashboard/HeroSection";
import ServicesSection from "@/components/dashboard/ServicesSection";
import FeaturesSection from "@/components/dashboard/FeaturesSection";
import CTASection from "@/components/dashboard/CTASection";

const DashboardPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={auth.isAuthenticated}
        onLoginClick={() => navigate('/login')}
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
