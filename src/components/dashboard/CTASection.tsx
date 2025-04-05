
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experimente a Varredura
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Oferecemos demonstração gratuita para que sua equipe visualize como a plataforma pode elevar 
              o desempenho da sua comunicação e monitoramento estratégico.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-lg">Antecipe crises com monitoramento proativo</h3>
                  <p className="text-blue-100">Detecte sinais precoces de problemas antes que se tornem crises</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-lg">Potencialize resultados com dados estratégicos</h3>
                  <p className="text-blue-100">Transforme dados em insights acionáveis para sua equipe</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-lg">Integre equipes em um ecossistema digital</h3>
                  <p className="text-blue-100">Colaboração eficiente em um único ambiente centralizado</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/example-client")}
                className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl"
              >
                Ver Demonstração <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate("/client-login")}
                variant="outline"
                className="border-white/30 hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-xl"
              >
                Acesso Imediato
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Cases de Sucesso</h3>
            
            <div className="space-y-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <h4 className="font-semibold text-xl mb-3">Assessoria Governamental</h4>
                <p className="text-blue-100 mb-4">
                  Uma assessoria de imprensa governamental reduziu o tempo de resposta a crises em 40% utilizando 
                  alertas preditivos e relatórios automatizados da Varredura.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm text-blue-200">Resultado:</span>
                    <span className="text-green-400 font-bold">Redução de 40% no tempo de resposta</span>
                  </div>
                  <div className="bg-green-400/20 px-3 py-1 rounded-full text-green-400 text-sm">
                    Verificado
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h4 className="font-semibold text-xl mb-3">Setor Privado</h4>
                <p className="text-blue-100 mb-4">
                  Empresa do setor privado aumentou sua visibilidade em 25% após identificar gaps na 
                  cobertura midiática via dashboards personalizados.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm text-blue-200">Resultado:</span>
                    <span className="text-green-400 font-bold">Aumento de 25% na visibilidade</span>
                  </div>
                  <div className="bg-green-400/20 px-3 py-1 rounded-full text-green-400 text-sm">
                    Verificado
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="italic text-blue-100 mb-2">
                "Varredura - Tudo o que sua Assessoria de Imprensa precisa está aqui."
              </p>
              <p className="font-medium">
                Comunicação inteligente. Decisão orientada por dados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
