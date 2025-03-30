
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceFeatures from "@/components/service/ServiceFeatures";
import ServiceBenefits from "@/components/service/ServiceBenefits";
import ServiceDetails from "@/components/service/ServiceDetails";
import ServiceCTA from "@/components/service/ServiceCTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClientType } from "@/types/clientTypes";
import { clientTypeDetails } from "@/data/clientDetails";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { useAuth } from "@/hooks/useAuth";

const ServiceLanding: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validar se o serviço existe
    if (serviceId && Object.prototype.hasOwnProperty.call(clientTypeDetails, serviceId)) {
      setServiceDetails(clientTypeDetails[serviceId as ClientType]);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [serviceId, navigate]);

  if (loading || !serviceDetails) {
    return <div>Carregando...</div>;
  }

  const colorClasses = getColorClasses(serviceId as ClientType);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleContractServiceClick = () => {
    navigate("/payment");
  };

  const handleExampleClientClick = () => {
    navigate("/example-client", { state: { clientType: serviceId } });
  };

  // Criando um objeto caseStudy a partir das propriedades do serviceDetails
  // para compatibilidade com a interface esperada
  const caseStudy = {
    title: serviceDetails.title || "Caso de estudo",
    description: serviceDetails.description || "Descrição do caso de estudo"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLoginClick={() => navigate("/login")} 
        onLogoutClick={() => {}} 
      />
      
      <main className="flex-grow">
        <ServiceHero 
          serviceId={serviceId as ClientType}
          title={serviceDetails.title}
          description={serviceDetails.shortDescription}
          colorClasses={colorClasses}
          onBackClick={handleBackClick}
          onContractServiceClick={handleContractServiceClick}
          onExampleClientClick={handleExampleClientClick}
        />

        <ServiceFeatures
          serviceId={serviceId as ClientType}
          features={serviceDetails.features}
          colorClasses={colorClasses}
        />

        <ServiceBenefits 
          serviceId={serviceId as ClientType}
          benefits={serviceDetails.benefits}
          colorClasses={colorClasses}
        />

        <ServiceDetails
          serviceId={serviceId as ClientType}
          details={serviceDetails.details}
          caseStudy={caseStudy}
          colorClasses={colorClasses}
        />

        <ServiceCTA 
          serviceId={serviceId as ClientType}
          colorClasses={colorClasses}
          onContractServiceClick={handleContractServiceClick}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceLanding;
