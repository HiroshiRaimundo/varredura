
import React from "react";
import { Button } from "@/components/ui/button";
import { ClientType } from "@/components/client/ClientTypes";

interface ServiceCTAProps {
  serviceId: ClientType;
  colorClasses: {
    bg: string;
    light: string;
    text: string;
    border: string;
  };
  onContractServiceClick: () => void;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  colorClasses,
  onContractServiceClick,
}) => {
  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Contrate hoje mesmo e descubra como podemos ajudar sua organização com soluções de dados eficientes.
        </p>
        <Button 
          onClick={onContractServiceClick}
          size="lg"
          className={`${colorClasses.bg} hover:opacity-90 shadow-lg px-8`}
        >
          Contratar agora
        </Button>
      </div>
    </section>
  );
};

export default ServiceCTA;
