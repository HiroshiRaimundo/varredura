
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Users, BarChart2, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";

const ServiceLanding: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const auth = useAuth();

  // Ensure serviceId is a valid ClientType
  const validServiceId = (serviceId as ClientType) || "observatory";
  
  // Get service details based on the URL parameter
  const serviceDetails = clientTypeDetails[validServiceId];

  if (!serviceDetails) {
    return <div>Serviço não encontrado</div>;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  const handleContractServiceClick = () => {
    navigate(`/client`);
  };

  // Get color classes based on service type
  const getColorClasses = (type: ClientType) => {
    const colorMap: Record<ClientType, { bg: string, light: string, text: string, border: string }> = {
      observatory: { bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      researcher: { bg: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
      politician: { bg: "bg-green-600", light: "bg-green-50", text: "text-green-600", border: "border-green-200" },
      institution: { bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      journalist: { bg: "bg-red-600", light: "bg-red-50", text: "text-red-600", border: "border-red-200" },
      press: { bg: "bg-amber-600", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" }
    };
    return colorMap[type];
  };

  const colorClasses = getColorClasses(validServiceId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={auth.isAuthenticated}
        onLoginClick={() => navigate('/login')}
        onLogoutClick={auth.handleLogout}
      />

      {/* Hero Section */}
      <header className={`py-12 px-6 ${colorClasses.light} relative overflow-hidden`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <button 
            onClick={handleBackClick}
            className="flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para página inicial
          </button>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${colorClasses.text}`}>
            {serviceDetails.title}
          </h1>
          
          <p className="text-xl max-w-3xl text-gray-700 mb-8">
            {serviceDetails.description}
          </p>
          
          <Button 
            onClick={handleContractServiceClick}
            size="lg"
            className={`${colorClasses.bg} hover:opacity-90 shadow-lg`}
          >
            Contratar agora
          </Button>
        </div>
        
        {/* Background abstract shape */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <div className={`${colorClasses.bg} transform rotate-45 scale-150 absolute -right-24 -top-24 w-96 h-96 rounded-full`}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Description Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Sobre este serviço</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {serviceDetails.details}
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button 
                    onClick={handleContractServiceClick}
                    size="lg"
                    className={`${colorClasses.bg} hover:opacity-90`}
                  >
                    Contratar serviço
                  </Button>
                  <Button 
                    onClick={() => navigate('/help')}
                    variant="outline" 
                    size="lg"
                    className="border-gray-300"
                  >
                    Saiba mais
                  </Button>
                </div>
              </div>
              
              <div className={`${colorClasses.light} p-8 rounded-xl border ${colorClasses.border}`}>
                {serviceDetails.caseStudy && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Caso de Sucesso</h3>
                    <h4 className={`${colorClasses.text} font-semibold mb-2`}>
                      {serviceDetails.caseStudy.title}
                    </h4>
                    <p className="text-gray-700">
                      {serviceDetails.caseStudy.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Recursos principais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceDetails.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className={`rounded-full w-12 h-12 ${colorClasses.light} flex items-center justify-center mb-4`}>
                    <Check className={`h-6 w-6 ${colorClasses.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Benefícios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`${colorClasses.light} p-8 rounded-xl border ${colorClasses.border} flex items-center justify-center`}>
                <div className={`rounded-full w-32 h-32 ${colorClasses.bg} flex items-center justify-center`}>
                  {validServiceId === "observatory" && <BarChart2 className="h-16 w-16 text-white" />}
                  {validServiceId === "researcher" && <BarChart2 className="h-16 w-16 text-white" />}
                  {validServiceId === "politician" && <BarChart2 className="h-16 w-16 text-white" />}
                  {validServiceId === "institution" && <Users className="h-16 w-16 text-white" />}
                  {validServiceId === "journalist" && <BarChart2 className="h-16 w-16 text-white" />}
                  {validServiceId === "press" && <Zap className="h-16 w-16 text-white" />}
                </div>
              </div>
              
              <div>
                <ul className="space-y-4">
                  {serviceDetails.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`rounded-full p-1 ${colorClasses.light} mr-3 mt-1`}>
                        <Check className={`h-4 w-4 ${colorClasses.text}`} />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contrate hoje mesmo e descubra como podemos ajudar sua organização com soluções de dados eficientes.
            </p>
            <Button 
              onClick={handleContractServiceClick}
              size="lg"
              className={`${colorClasses.bg} hover:opacity-90 shadow-lg px-8`}
            >
              Contratar serviço
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceLanding;
