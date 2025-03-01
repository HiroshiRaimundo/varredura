
import React from "react";
import { Check } from "lucide-react";
import { ClientType } from "@/components/client/ClientTypes";

interface ServiceFeaturesProps {
  serviceId: ClientType;
  features: string[];
  colorClasses: {
    bg: string;
    light: string;
    text: string;
    border: string;
  };
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  features,
  colorClasses,
}) => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Recursos principais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`rounded-full w-12 h-12 ${colorClasses.light} flex items-center justify-center mb-4`}>
                <Check className={`h-6 w-6 ${colorClasses.text}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
