
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Uma Plataforma Adaptável. Uma Experiência Unificada.
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Simplifique seus processos de monitoramento e comunicação com nossa solução integrada 
          que se ajusta automaticamente às necessidades do seu perfil profissional.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate("/client")}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Começar Agora
          </Button>
          <Button 
            onClick={() => navigate("/example-client")}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/20"
          >
            Demonstração
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
