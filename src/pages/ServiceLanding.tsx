import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceDetails from "@/components/service/ServiceDetails";
import ServiceFeatures from "@/components/service/ServiceFeatures";
import ServiceBenefits from "@/components/service/ServiceBenefits";
import ServiceCTA from "@/components/service/ServiceCTA";
import { getColorClasses } from "@/components/service/utils/colorUtils";

const ServiceLanding: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const auth = useAuth();

  // Ensure serviceId is a valid ClientType
  const validServiceId = (serviceId as ClientType) || "observatory";
  
  // Get service details based on the URL parameter
  const serviceDetails = clientTypeDetails[validServiceId];

  if (!serviceDetails) {
    return <div>Serviço não encontrado</div>;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  const handleContractServiceClick = () => {
    // Navigate to service landing page
    navigate(`/serviceld`);
  };

  const handleExampleClientClick = () => {
    // Navigate to the example client page
    navigate("/example-client");
  };

  // Get color classes based on service type
  const colorClasses = getColorClasses(validServiceId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={auth.isAuthenticated}
        onLoginClick={() => navigate('/login')}
        onLogoutClick={auth.handleLogout}
      />

      <ServiceHero 
        serviceId={validServiceId}
        title={serviceDetails.title}
        description={serviceDetails.description}
        colorClasses={colorClasses}
        onBackClick={handleBackClick}
        onContractServiceClick={handleContractServiceClick}
        onExampleClientClick={handleExampleClientClick}
      />

      <main className="flex-grow">
        <ServiceDetails 
          serviceId={validServiceId}
          details={serviceDetails.details}
          caseStudy={serviceDetails.caseStudy}
          colorClasses={colorClasses}
          onContractServiceClick={handleContractServiceClick}
        />

        <ServiceFeatures 
          serviceId={validServiceId}
          features={serviceDetails.features}
          colorClasses={colorClasses}
        />

        <ServiceBenefits 
          serviceId={validServiceId}
          benefits={serviceDetails.benefits}
          colorClasses={colorClasses}
        />

        <ServiceCTA 
          serviceId={validServiceId}
          colorClasses={colorClasses}
          onContractServiceClick={handleContractServiceClick}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ServiceLanding;
