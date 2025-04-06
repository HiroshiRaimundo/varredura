
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, CheckCircle, Eye, Search, Shield, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleDemoClick = () => {
    if (!auth.isAuthenticated) {
      auth.setIsLoginDialogOpen(true);
    } else {
      navigate("/example-dashboard");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-green-500 rounded-full"></div>
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-purple-500 rounded-full"></div>
      </div>
      
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 text-white">
              <div className="inline-flex items-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full mr-3">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Plataforma Varredura</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Solução Integrada para <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">Assessoria de Imprensa</span> e Monitoramento Estratégico
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
                Combinando ferramentas avançadas de análise de dados e recursos personalizados para comunicação, 
                nossa solução adaptável centraliza informações, otimiza processos e oferece insights estratégicos em tempo real.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button 
                  onClick={handleDemoClick}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-6 h-auto text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  Ver Demonstração <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/client-login")}
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-6 h-auto text-lg rounded-xl hover:bg-white/20 transition-all"
                >
                  Área de Login <Eye className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Monitoramento em tempo real</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Dashboards personalizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Gestão de releases</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Análise de sentimento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Relatórios automáticos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Integração completa</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/5">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
                
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                        <Leaf className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Varredura Dashboard</h3>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Ao vivo</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <BarChart2 className="h-6 w-6 text-blue-400 mb-2" />
                      <h4 className="text-sm font-medium text-white">Monitoramento de Mídia</h4>
                      <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <Shield className="h-6 w-6 text-green-400 mb-2" />
                      <h4 className="text-sm font-medium text-white">Proteção de Marca</h4>
                      <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Últimas 24 horas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Menções</span>
                        <span className="text-xs text-white">127 <span className="text-green-400">↑</span></span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Sentimento Positivo</span>
                        <span className="text-xs text-white">68% <span className="text-green-400">↑</span></span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Publicações</span>
                        <span className="text-xs text-white">36 <span className="text-amber-400">→</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10 w-full"
                      onClick={handleDemoClick}
                    >
                      Conhecer PLATAFORMA
                    </Button>
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
