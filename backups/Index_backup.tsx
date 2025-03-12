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
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Acesso Rápido</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/login">Área de Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin">Área Administrativa</Link>
            </Button>
          </div>
        </div>
        <FeaturesSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};
