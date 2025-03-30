import React from "react";
import { ClientType } from "@/types/clientTypes";
import { ColorClasses } from "./utils/colorUtils";

export interface ServiceDetailsProps {
  serviceId: ClientType;
  details: any;
  caseStudy: {
    title: string;
    description: string;
  };
  colorClasses: ColorClasses;
  onContractServiceClick?: () => void; // Made optional with default behavior
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ 
  serviceId,
  details,
  caseStudy,
  colorClasses,
  onContractServiceClick = () => {} // Default empty function
}) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${colorClasses.text}`}>
              Detalhes do Serviço
            </h2>
            <div className="space-y-4">
              {details.map((detail: any, index: number) => (
                <div key={index} className="flex gap-3">
                  <div className={`mt-1 p-1 rounded-full ${colorClasses.light} flex-shrink-0`}>
                    <div className={`w-4 h-4 rounded-full ${colorClasses.main}`}></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{detail.title}</h3>
                    <p className="text-muted-foreground">{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button
                onClick={onContractServiceClick}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${colorClasses.main} text-white hover:opacity-90`}
              >
                Contratar este serviço
              </button>
            </div>
          </div>
          
          <div className={`p-8 rounded-xl ${colorClasses.light} border ${colorClasses.border}`}>
            <h3 className={`text-2xl font-bold mb-4 ${colorClasses.text}`}>
              Caso de Estudo
            </h3>
            <h4 className="text-xl font-medium mb-2">{caseStudy.title}</h4>
            <p className="text-muted-foreground">{caseStudy.description}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold">+45%</div>
                <div className="text-sm text-muted-foreground">Eficiência</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold">-30%</div>
                <div className="text-sm text-muted-foreground">Tempo</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold">+120</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
