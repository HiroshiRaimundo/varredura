
import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, BarChart2, Users, FileText, MessageSquare, CheckCircle, Monitor, Shield, Smile } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, ServiceCard, ServiceIconWrapper, FeatureCard } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const clientTypes = [
  {
    id: "observatory",
    title: "Observatório",
    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
    color: "blue" as const,
    description: "Plataforma completa para observatórios de políticas públicas acompanharem indicadores, integrarem dados e gerarem relatórios automatizados com visualizações avançadas.",
  },
  {
    id: "researcher",
    title: "Pesquisador",
    icon: <BarChart2 className="h-8 w-8 text-indigo-600" />,
    color: "indigo" as const,
    description: "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.",
  },
  {
    id: "politician",
    title: "Político",
    icon: <FileText className="h-8 w-8 text-green-600" />,
    color: "green" as const,
    description: "Alertas sobre novas legislações, análise de impacto de políticas públicas, resumos executivos de dados governamentais e comparativos de indicadores por região.",
  },
  {
    id: "institution",
    title: "Instituição",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    color: "purple" as const,
    description: "Ferramentas para gestão de dados institucionais, monitoramento de programas, dashboards personalizados e relatórios de acompanhamento para instituições de diversos setores.",
  },
  {
    id: "journalist",
    title: "Jornalista",
    icon: <FileText className="h-8 w-8 text-red-600" />,
    color: "red" as const,
    description: "Acesso a indicadores atualizados, visualizações prontas para publicação, verificação de dados e comparativos históricos para embasar reportagens investigativas e especiais.",
  },
  {
    id: "press",
    title: "Assessoria de Imprensa",
    icon: <MessageSquare className="h-8 w-8 text-amber-600" />,
    color: "amber" as const,
    description: "Sistema completo para criação, aprovação e monitoramento de releases, acompanhamento de publicações, métricas de desempenho e gestão de contatos com veículos de comunicação.",
  }
];

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

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/client/${serviceId}`);
  };

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
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={auth.isAuthenticated}
        onLoginClick={() => navigate('/login')}
        onLogoutClick={auth.handleLogout}
      />

      {/* Hero Section */}
      <header className="py-8 px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Serviços Especializados em Dados</h1>
          <p className="text-xl max-w-3xl">
            Oferecemos uma variedade de serviços especializados para diferentes públicos. Confira abaixo
            um resumo de cada serviço disponível.
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções Personalizadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientTypes.map((client) => (
            <ServiceCard key={client.id} color={client.color}>
              <ServiceIconWrapper color={client.color}>
                {client.icon}
              </ServiceIconWrapper>
              <h3 className="text-xl font-bold mb-3">{client.title}</h3>
              <p className="text-gray-600 mb-4">
                {client.description}
              </p>
              <Button 
                className={`mt-2 ${getButtonColorClass(client.color)} flex items-center`} 
                onClick={() => handleServiceClick(client.id)}
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
          ))}
        </div>
      </section>

      {/* Features Section */}
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
              <FeatureCard key={index}>
                <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
                <p className="text-gray-600 mb-6">
                  Solicite uma demonstração personalizada para conhecer como nossas soluções podem
                  atender às suas necessidades específicas.
                </p>
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                  onClick={() => navigate('/client-login')}
                >
                  Solicitar demonstração
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* CTA Feature Cards */}
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold">Fácil integração</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    APIs e ferramentas para integração com seus sistemas existentes.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <Monitor className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="font-semibold">Multiplataforma</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Acesse seus dados de qualquer dispositivo, em qualquer lugar.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <Shield className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="font-semibold">Segurança</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Dados protegidos com os mais altos padrões de segurança.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <Smile className="h-6 w-6 text-amber-600 mr-2" />
                    <h3 className="font-semibold">Experiência</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Interface intuitiva e amigável para facilitar sua experiência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DashboardPage;
