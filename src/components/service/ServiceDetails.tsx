
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClientType } from "@/components/client/ClientTypes";

interface ServiceDetailsProps {
  serviceId: ClientType;
  details: string;
  caseStudy?: {
    title: string;
    description: string;
  };
  colorClasses: {
    bg: string;
    light: string;
    text: string;
    border: string;
  };
  onContractServiceClick: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  details,
  caseStudy,
  colorClasses,
  onContractServiceClick,
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Sobre este serviço</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {details}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={onContractServiceClick}
                size="lg"
                className={`${colorClasses.bg} hover:opacity-90`}
              >
                Contratar serviço
              </Button>
              <Button 
                onClick={() => navigate('/help')}
                variant="outline" 
                size="lg"
                className="border-gray-300"
              >
                Saiba mais
              </Button>
            </div>
          </div>
          
          <div className={`${colorClasses.light} p-8 rounded-xl border ${colorClasses.border}`}>
            {caseStudy && (
              <div>
                <h3 className="text-xl font-bold mb-4">Caso de Sucesso</h3>
                <h4 className={`${colorClasses.text} font-semibold mb-2`}>
                  {caseStudy.title}
                </h4>
                <p className="text-gray-700">
                  {caseStudy.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
