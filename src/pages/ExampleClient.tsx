
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Check, ArrowRightCircle, Users, BarChart2, Leaf, FileText, PenTool,
  Bell, BarChart, PieChart
} from "lucide-react";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import LoginForm, { LoginFormValues } from "@/components/example-client/LoginForm";
import ClientTabs from "@/components/example-client/ClientTabs";
import ClientHeader from "@/components/example-client/ClientHeader";
import ClientInfo from "@/components/example-client/ClientInfo";
import DefaultContent from "@/components/example-client/DefaultContent";
import PressContent from "@/components/example-client/press/PressContent";
import generateMockData from "@/components/example-client/utils/mockDataGenerator";
import { toast } from "@/hooks/use-toast";

const ExampleClient: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis" | "releases">("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const location = window.location;
  const params = new URLSearchParams(location.search);
  const typeParam = params.get('type') as ClientType | null;
  const [clientType, setClientType] = useState<ClientType>(
    typeParam && Object.keys(clientTypeDetails).includes(typeParam) 
      ? typeParam 
      : "observatory"
  );

  const handleLoginSubmit = (data: LoginFormValues) => {
    // For demonstration, any login works
    console.log("Login attempt with:", data);
    
    toast({
      title: "Login bem-sucedido",
      description: `Bem-vindo à área do cliente de exemplo (${clientTypeDetails[clientType].title})`,
    });
    
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu da área do cliente de exemplo."
    });
  };

  const getClientIcon = (type: ClientType) => {
    switch(type) {
      case "observatory": return <BarChart2 className="h-5 w-5" />;
      case "researcher": return <PenTool className="h-5 w-5" />;
      case "politician": return <FileText className="h-5 w-5" />;
      case "institution": return <Users className="h-5 w-5" />;
      case "journalist": return <FileText className="h-5 w-5" />;
      case "press": return <PenTool className="h-5 w-5" />;
      default: return <BarChart2 className="h-5 w-5" />;
    }
  };

  // Generate mock data for charts
  const mockData = generateMockData();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isAuthenticated={isLoggedIn}
        onLoginClick={() => {}}
        onLogoutClick={handleLogout}
      />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {!isLoggedIn ? (
            <div className="flex justify-center my-12">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Acesso à Área do Cliente (Exemplo)</CardTitle>
                  <CardDescription>
                    Este é um modelo de acesso para demonstração.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <LoginForm 
                    clientType={clientType}
                    onSubmit={handleLoginSubmit}
                    onClientTypeChange={setClientType}
                    getClientIcon={getClientIcon}
                  />
                </CardContent>
                
                <CardFooter className="flex flex-col">
                  <div className="text-sm text-center w-full text-muted-foreground">
                    <a href="#" className="text-primary hover:underline">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <ClientHeader 
                clientType={clientType} 
                getClientIcon={getClientIcon} 
              />
              
              {/* Tabs */}
              <ClientTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                clientType={clientType}
              />
              
              {/* Tab Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  {clientType === "press" ? (
                    // Render press office content
                    <PressContent 
                      activeTab={activeTab} 
                      clientType={clientType} 
                      mockData={mockData} 
                    />
                  ) : (
                    // Render default content for other client types
                    <DefaultContent 
                      activeTab={activeTab} 
                      clientType={clientType} 
                    />
                  )}
                </div>
                
                <div>
                  <ClientInfo clientType={clientType} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExampleClient;
