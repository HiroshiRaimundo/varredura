import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleDemoClick = () => {
    // Always direct to simple login with redirect to example-dashboard
    navigate("/simple-login?from=/example-dashboard");
  };

  const handleClientAccess = () => {
    // Always direct to simple login with redirect to example-client
    navigate("/simple-login?from=/example-client");
  };

  return (
    <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Pronto para transformar sua estratégia de monitoramento e comunicação?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
          Nossa plataforma integrada oferece soluções personalizadas para 
          diferentes perfis, desde observatórios e instituições até 
          assessorias de imprensa.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-6 h-auto text-lg rounded-xl transition-all"
            onClick={handleDemoClick}
          >
            Ver Demonstração <Eye className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 h-auto text-lg rounded-xl transition-all"
            onClick={handleClientAccess}
          >
            Acesso Imediato <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <p className="text-sm text-blue-200 mt-6">
          Experimente sem compromisso, entre em contato para uma demonstração personalizada.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
