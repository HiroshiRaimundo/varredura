
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

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLoginClick={() => {}} 
        onLogoutClick={() => {}} 
      />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
