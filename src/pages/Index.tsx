
import React from "react";
import HeroSection from "@/components/dashboard/HeroSection";
import FeaturesSection from "@/components/dashboard/FeaturesSection";
import ServicesSection from "@/components/dashboard/ServicesSection";
import CTASection from "@/components/dashboard/CTASection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
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
