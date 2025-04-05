
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2, Clock, Users, Database, AlertCircle, FileText, LineChart, Shield } from "lucide-react";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
    <CardHeader className="pb-2">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-gray-600">
        {description}
      </CardDescription>
    </CardContent>
  </Card>
);

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Destaques para a Assessoria de Imprensa</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Nossa plataforma combina monitoramento inteligente e gestão comunicacional em um único ambiente,
            oferecendo ferramentas exclusivas para elevar o desempenho da sua equipe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<BarChart2 className="h-6 w-6 text-blue-600" />}
            title="Monitoramento Personalizado"
            description="Acompanhe menções à marca, notícias e tendências em tempo real, com dashboards adaptativos focados em métricas-chave para comunicação."
          />
          
          <FeatureCard 
            icon={<FileText className="h-6 w-6 text-green-600" />}
            title="Gestão Integrada"
            description="Desenvolva, distribua e mensure conteúdos diretamente na plataforma, com relatórios automáticos de desempenho e clipping digital organizado."
          />
          
          <FeatureCard 
            icon={<Database className="h-6 w-6 text-purple-600" />}
            title="Centralização de Dados"
            description="Todos os dados críticos em um único ambiente, com filtros por perfil, veículo ou palavra-chave e área administrativa unificada."
          />
          
          <FeatureCard 
            icon={<Users className="h-6 w-6 text-indigo-600" />}
            title="Interface Adaptativa"
            description="A plataforma ajusta automaticamente ferramentas e visualizações conforme as necessidades da sua assessoria de imprensa."
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Funcionalidades Exclusivas da Varredura</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Varredura de Mídia 360°</h4>
              <p className="text-gray-600">
                Rastreie menções em mais de 10.000 fontes (impressas, digitais, redes sociais) e identifique oportunidades ou riscos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="rounded-full w-12 h-12 bg-green-100 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Painéis Personalizáveis</h4>
              <p className="text-gray-600">
                Crie visualizações específicas para métricas de imprensa, como share of voice comparativo ou histórico de cobertura midiática.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="rounded-full w-12 h-12 bg-purple-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Automação de Workflows</h4>
              <p className="text-gray-600">
                Agende publicações, envie alertas para a equipe e gere clippings automáticos por e-mail sem intervenção manual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
