import React from "react";
import { Button } from "@/components/ui/button";
import { Search, BarChart2, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-6 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-3 rounded-lg mr-3 flex items-center">
                <Search className="h-8 w-8 mr-2" />
                <Leaf className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Varredura
              </h1>
            </div>
            
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Análise Inteligente de Dados
              </h1>
              <p className="text-xl text-muted-foreground">
                Transformando dados em soluções sustentáveis para pesquisadores, instituições e gestores públicos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/help")}
              >
                Saiba Mais
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-400 rounded-full opacity-20"></div>
              <div className="bg-white p-4 rounded-xl shadow-xl relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-800">Análise de Dados</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Search className="h-6 w-6 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-gray-800">Análise de Dados</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-800">Sustentabilidade</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">Análise</p>
                      <p className="text-xs text-gray-600">Dados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
