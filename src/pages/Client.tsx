import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ClientType } from "@/components/monitoring/utils/clientTypeUtils";
import { clientTypeDetails } from "@/components/client/ClientTypes";

const ServicePricing: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleServiceContract = (serviceId: ClientType) => {
    if (!auth.isAuthenticated) {
      auth.setIsLoginDialogOpen(true);
      return;
    }
    
    navigate("/payment");
  };

  const servicePricing = [
    {
      id: "observatory" as ClientType,
      price: "R$ 3.500",
      period: "por mês",
      popular: true
    },
    {
      id: "researcher" as ClientType,
      price: "R$ 1.200",
      period: "por mês",
      popular: false
    },
    {
      id: "politician" as ClientType,
      price: "R$ 2.800",
      period: "por mês",
      popular: false
    },
    {
      id: "institution" as ClientType,
      price: "R$ 4.200",
      period: "por mês",
      popular: false
    },
    {
      id: "journalist" as ClientType,
      price: "R$ 980",
      period: "por mês",
      popular: false
    },
    {
      id: "press" as ClientType,
      price: "R$ 1.850",
      period: "por mês",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
          />
          
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3">Nossos Planos e Serviços</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o plano ideal para suas necessidades e comece a utilizar nossos serviços especializados de dados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicePricing.map((service) => {
              const details = clientTypeDetails[service.id];
              const colorMap: Record<ClientType, { bg: string, light: string, text: string, border: string }> = {
                observatory: { bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
                researcher: { bg: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
                politician: { bg: "bg-green-600", light: "bg-green-50", text: "text-green-600", border: "border-green-200" },
                institution: { bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
                journalist: { bg: "bg-red-600", light: "bg-red-50", text: "text-red-600", border: "border-red-200" },
                press: { bg: "bg-amber-600", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" }
              };
              
              const colors = colorMap[service.id];
              
              return (
                <Card 
                  key={service.id} 
                  className={`${service.popular ? 'border-primary shadow-lg' : 'border-border'} relative`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-white text-sm rounded-full">
                      Mais Popular
                    </div>
                  )}
                  
                  <CardHeader className={service.popular ? 'pt-8' : ''}>
                    <CardTitle className="flex items-center gap-2">
                      <span className={colors.text}>{details.title}</span>
                    </CardTitle>
                    <CardDescription>{details.shortDescription}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-3xl font-bold">{service.price}</p>
                      <p className="text-muted-foreground">{service.period}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {details.benefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`rounded-full p-1 ${colors.light} mr-3 mt-1`}>
                            <Check className={`h-4 w-4 ${colors.text}`} />
                          </div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full ${colors.bg} hover:opacity-90`}
                      onClick={() => handleServiceContract(service.id)}
                    >
                      Contratar Serviço
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Precisa de um plano personalizado para sua organização?
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate("/help")}
            >
              Entre em contato
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ServicePricing;
