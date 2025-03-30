
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="pt-24 pb-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="inline-block relative">
              Varredura
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500 rounded-full"></span>
            </span>
            <span className="block text-2xl md:text-3xl mt-4 text-gray-700">Gestão de Comunicação & Monitoramento Inteligente</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plataforma integrada que automatiza rotinas de comunicação, monitora indicadores relevantes e transforma dados em insights valiosos para sua estratégia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-lg">
              <Link to={isAuthenticated ? "/admin" : "/login"}>
                {isAuthenticated ? "Acessar Dashboard" : "Começar Agora"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-400 text-purple-600 hover:text-purple-700 px-6 py-6 text-lg">
              <Link to="/example-client">
                <Eye className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
