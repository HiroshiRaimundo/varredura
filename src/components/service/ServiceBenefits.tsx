
import React from "react";
import { Check, BarChart2, Users, Zap } from "lucide-react";
import { ClientType } from "@/components/client/ClientTypes";

interface ServiceBenefitsProps {
  serviceId: ClientType;
  benefits: string[];
  colorClasses: {
    bg: string;
    light: string;
    text: string;
    border: string;
  };
}

const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({
  serviceId,
  benefits,
  colorClasses,
}) => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Benefícios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`${colorClasses.light} p-8 rounded-xl border ${colorClasses.border} flex items-center justify-center`}>
            <div className={`rounded-full w-32 h-32 ${colorClasses.bg} flex items-center justify-center`}>
              {serviceId === "observatory" && <BarChart2 className="h-16 w-16 text-white" />}
              {serviceId === "researcher" && <BarChart2 className="h-16 w-16 text-white" />}
              {serviceId === "politician" && <BarChart2 className="h-16 w-16 text-white" />}
              {serviceId === "institution" && <Users className="h-16 w-16 text-white" />}
              {serviceId === "journalist" && <BarChart2 className="h-16 w-16 text-white" />}
              {serviceId === "press" && <Zap className="h-16 w-16 text-white" />}
            </div>
          </div>
          
          <div>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className={`rounded-full p-1 ${colorClasses.light} mr-3 mt-1`}>
                    <Check className={`h-4 w-4 ${colorClasses.text}`} />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
