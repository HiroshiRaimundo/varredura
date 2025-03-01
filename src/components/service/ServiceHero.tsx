
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientType } from "@/components/client/ClientTypes";
import { useNavigate } from "react-router-dom";

interface ServiceHeroProps {
  serviceId: ClientType;
  title: string;
  description: string;
  colorClasses: {
    bg: string;
    light: string;
    text: string;
    border: string;
  };
  onBackClick: () => void;
  onContractServiceClick: () => void;
  onExampleClientClick: () => void;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  colorClasses,
  onBackClick,
  onContractServiceClick,
  onExampleClientClick,
}) => {
  return (
    <header className={`py-12 px-6 ${colorClasses.light} relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={onBackClick}
          className="flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para página inicial
        </button>
        
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${colorClasses.text}`}>
          {title}
        </h1>
        
        <p className="text-xl max-w-3xl text-gray-700 mb-8">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onContractServiceClick}
            size="lg"
            className={`${colorClasses.bg} hover:opacity-90 shadow-lg`}
          >
            Contratar agora
          </Button>
          
          <Button 
            onClick={onExampleClientClick}
            variant="outline"
            size="lg"
            className="border-gray-300"
          >
            Ver exemplo da área do cliente
          </Button>
        </div>
      </div>
      
      {/* Background abstract shape */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <div className={`${colorClasses.bg} transform rotate-45 scale-150 absolute -right-24 -top-24 w-96 h-96 rounded-full`}></div>
      </div>
    </header>
  );
};

export default ServiceHero;
