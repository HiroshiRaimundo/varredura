
import React from "react";
import { BarChart2, Clock, Users, Database } from "lucide-react";
import { FeatureCard } from "@/components/ui/card";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <FeatureCard>
      <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">
        {description}
      </p>
    </FeatureCard>
  );
};

const features = [
  {
    icon: <BarChart2 className="h-8 w-8 text-blue-600" />,
    title: "Plataforma Unificada",
    description: "Uma única solução que integra monitoramento, comunicação e análise de dados para todos os tipos de usuários."
  },
  {
    icon: <Clock className="h-8 w-8 text-green-600" />,
    title: "Monitoramento em Tempo Real",
    description: "Acompanhe dados, notícias e indicadores em tempo real com alertas personalizados para qualquer setor."
  },
  {
    icon: <Database className="h-8 w-8 text-purple-600" />,
    title: "Gestão de Comunicação",
    description: "Ferramentas integradas para gerenciar releases, contatos com a imprensa e monitorar cobertura de mídia."
  },
  {
    icon: <Users className="h-8 w-8 text-red-600" />,
    title: "Adaptável a Qualquer Perfil",
    description: "Interface personalizável que se adapta às necessidades específicas de diferentes tipos de usuários e setores."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Uma Solução para Todos os Perfis</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma integrada oferece recursos completos de monitoramento e comunicação, 
            adaptáveis para diferentes necessidades em um único sistema.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
