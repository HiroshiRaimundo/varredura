
import React from "react";
import { BarChart2, Clock, Users } from "lucide-react";
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
    title: "Dados Confiáveis",
    description: "Informações atualizadas e verificadas para fundamentar suas análises e decisões."
  },
  {
    icon: <Clock className="h-8 w-8 text-green-600" />,
    title: "Atualizações em Tempo Real",
    description: "Monitore dados e indicadores com atualizações em tempo real e alertas personalizados."
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-purple-600" />,
    title: "Visualizações Avançadas",
    description: "Gráficos e visualizações interativas que facilitam a compreensão e apresentação dos dados."
  },
  {
    icon: <Users className="h-8 w-8 text-red-600" />,
    title: "Suporte Especializado",
    description: "Equipe de especialistas disponível para auxiliar na interpretação e uso das ferramentas."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Por que escolher nossos serviços?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma oferece soluções completas e personalizadas para diferentes perfis,
            garantindo acesso a dados confiáveis e análises precisas.
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
