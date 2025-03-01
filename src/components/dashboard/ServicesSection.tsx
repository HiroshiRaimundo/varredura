
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  BarChart2, 
  FileText, 
  Users, 
  MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard, ServiceIconWrapper } from "@/components/ui/card";
import { ClientType } from "@/components/client/ClientTypes";

interface ServiceItemProps {
  id: ClientType;
  title: string;
  icon: React.ReactNode;
  color: "blue" | "indigo" | "green" | "purple" | "red" | "amber";
  description: string;
  onServiceClick: (serviceId: ClientType) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  id,
  title,
  icon,
  color,
  description,
  onServiceClick
}) => {
  const getButtonColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-600 hover:bg-blue-700",
      indigo: "bg-indigo-600 hover:bg-indigo-700",
      green: "bg-green-600 hover:bg-green-700",
      purple: "bg-purple-600 hover:bg-purple-700",
      red: "bg-red-600 hover:bg-red-700",
      amber: "bg-amber-600 hover:bg-amber-700"
    };
    return colorMap[color] || "bg-blue-600 hover:bg-blue-700";
  };

  return (
    <ServiceCard color={color}>
      <ServiceIconWrapper color={color}>
        {icon}
      </ServiceIconWrapper>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <Button 
        className={`mt-2 ${getButtonColorClass(color)} flex items-center`} 
        onClick={() => onServiceClick(id)}
      >
        Saiba mais
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
    </ServiceCard>
  );
};

export const clientTypes = [
  {
    id: "observatory" as ClientType,
    title: "Observatório",
    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
    color: "blue" as const,
    description: "Plataforma completa para observatórios de políticas públicas acompanharem indicadores, integrarem dados e gerarem relatórios automatizados com visualizações avançadas.",
  },
  {
    id: "researcher" as ClientType,
    title: "Pesquisador",
    icon: <BarChart2 className="h-8 w-8 text-indigo-600" />,
    color: "indigo" as const,
    description: "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.",
  },
  {
    id: "politician" as ClientType,
    title: "Político",
    icon: <FileText className="h-8 w-8 text-green-600" />,
    color: "green" as const,
    description: "Alertas sobre novas legislações, análise de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região.",
  },
  {
    id: "institution" as ClientType,
    title: "Instituição",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    color: "purple" as const,
    description: "Ferramentas para gestão de dados institucionais, monitoramento de programas, dashboards personalizados e relatórios de acompanhamento para instituições de diversos setores.",
  },
  {
    id: "journalist" as ClientType,
    title: "Jornalista",
    icon: <FileText className="h-8 w-8 text-red-600" />,
    color: "red" as const,
    description: "Acesso a indicadores atualizados, visualizações prontas para publicação, verificação de dados e comparativos históricos para embasar reportagens investigativas e especiais.",
  },
  {
    id: "press" as ClientType,
    title: "Assessoria de Imprensa",
    icon: <MessageSquare className="h-8 w-8 text-amber-600" />,
    color: "amber" as const,
    description: "Sistema completo para criação, aprovação e monitoramento de releases, acompanhamento de publicações, métricas de desempenho e gestão de contatos com veículos de comunicação.",
  }
];

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: ClientType) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clientTypes.map((client) => (
          <ServiceItem 
            key={client.id}
            id={client.id}
            title={client.title}
            icon={client.icon}
            color={client.color}
            description={client.description}
            onServiceClick={handleServiceClick}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
