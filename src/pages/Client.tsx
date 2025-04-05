
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ServicePricing: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleServiceContract = (planType: string) => {
    if (!auth.isAuthenticated) {
      auth.setIsLoginDialogOpen(true);
      return;
    }
    
    // Navigate to payment with plan type
    navigate("/payment", { state: { planType } });
  };

  const handleClientDashboardClick = () => {
    navigate("/dashboard");
  };

  const pricingPlans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 980",
      period: "por mês",
      popular: false,
      color: "blue",
      features: [
        "Monitoramento de dados",
        "Dashboards básicos",
        "2 usuários incluídos",
        "Alertas personalizados",
        "Suporte por email"
      ]
    },
    {
      id: "standard",
      name: "Padrão",
      price: "R$ 2.500",
      period: "por mês",
      popular: true,
      color: "green",
      features: [
        "Criação de 4 reportagens",
        "Assessoria de imprensa especializada",
        "Plano de comunicação",
        "Dashboards avançados",
        "5 usuários incluídos",
        "Monitoramento em tempo real",
        "Suporte prioritário"
      ]
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "Personalizado",
      period: "",
      popular: false,
      color: "purple",
      features: [
        "Proposta personalizada",
        "Número ilimitado de usuários",
        "Integração com sistemas",
        "API exclusiva",
        "Consultoria dedicada",
        "Suporte 24/7"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, light: string, text: string, border: string }> = {
      blue: { bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-600", light: "bg-green-50", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" }
    };
    
    return colorMap[color] || colorMap.blue;
  };

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
            <h1 className="text-4xl font-bold mb-3">Nossos Planos</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o plano ideal para suas necessidades e comece a utilizar nossa plataforma integrada.
            </p>
            <div className="mt-4">
              <Button 
                onClick={handleClientDashboardClick}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Acessar dashboard do cliente
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const colors = getColorClasses(plan.color);
              
              return (
                <Card 
                  key={plan.id} 
                  className={`${plan.popular ? 'border-primary shadow-lg' : 'border-border'} relative transition-all hover:shadow-md`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-white text-sm rounded-full">
                      Mais Popular
                    </div>
                  )}
                  
                  <CardHeader className={plan.popular ? 'pt-8' : ''}>
                    <CardTitle className="flex items-center gap-2">
                      <span className={colors.text}>{plan.name}</span>
                    </CardTitle>
                    <CardDescription>
                      {plan.id === "enterprise" ? "Plano personalizado para grandes empresas" : 
                       plan.id === "standard" ? "Plano completo para equipes" : 
                       "Ideal para iniciantes"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-3xl font-bold">{plan.price}</p>
                      <p className="text-muted-foreground">{plan.period}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`rounded-full p-1 ${colors.light} mr-3 mt-1 flex-shrink-0`}>
                            <Check className={`h-4 w-4 ${colors.text}`} />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full ${colors.bg} hover:opacity-90`}
                      onClick={() => handleServiceContract(plan.id)}
                    >
                      {plan.id === "enterprise" ? "Receba uma proposta" : "Contratar plano"}
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
