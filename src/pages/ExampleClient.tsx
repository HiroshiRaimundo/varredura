
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientHeader from "@/components/example-client/ClientHeader";
import ClientTabs from "@/components/example-client/ClientTabs";
import ClientInfo from "@/components/example-client/ClientInfo";
import DefaultContent from "@/components/example-client/DefaultContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart2, FileText, Search, Leaf, FileBarChart, LogIn } from "lucide-react";
import { ClientType } from "@/components/client/ClientTypes";

const ExampleClient: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [clientType, setClientType] = useState<ClientType>("observatory");
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis" | "releases">("dashboard");

  // Utilizar useEffect para o redirecionamento
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/simple-login?from=/example-client");
    }
  }, [auth.isAuthenticated, navigate]);

  // Se não estiver autenticado, não renderizar o conteúdo
  if (!auth.isAuthenticated) {
    return null;
  }

  // Função para obter o ícone do tipo de cliente
  const getClientIcon = (type: ClientType) => {
    switch (type) {
      case "observatory":
        return <Search className="h-5 w-5 text-green-600" />;
      case "researcher":
        return <FileBarChart className="h-5 w-5 text-blue-600" />;
      case "politician":
        return <Users className="h-5 w-5 text-purple-600" />;
      case "institution":
        return <Leaf className="h-5 w-5 text-amber-600" />;
      case "journalist":
        return <FileText className="h-5 w-5 text-cyan-600" />;
      case "press":
        return <BarChart2 className="h-5 w-5 text-indigo-600" />;
      default:
        return <Search className="h-5 w-5 text-green-600" />;
    }
  };

  // Renderizar a guia de conteúdo de imprensa se for o tipo press
  const renderPressContent = () => {
    if (clientType === "press" && activeTab === "releases") {
      return <DefaultContent activeTab="releases" clientType={clientType} />;
    }
    return null;
  };
  
  const handleLogout = () => {
    auth.handleLogout();
    navigate("/simple-login?from=/example-client");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => {}} 
          onLogoutClick={auth.handleLogout}
        />
        
        <div className="my-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <ClientHeader 
              clientType={clientType}
              getClientIcon={getClientIcon}
            />
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleLogout}
            >
              <LogIn className="h-4 w-4" /> Já tenho conta
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="p-6 shadow-sm">
                <div className="space-y-6">
                  <ClientTabs 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    clientType={clientType}
                  />
                  
                  {activeTab === "dashboard" && (
                    <DefaultContent activeTab="dashboard" clientType={clientType} />
                  )}
                  
                  {activeTab === "monitoring" && (
                    <DefaultContent activeTab="monitoring" clientType={clientType} />
                  )}
                  
                  {activeTab === "analysis" && (
                    <DefaultContent activeTab="analysis" clientType={clientType} />
                  )}
                  
                  {renderPressContent()}
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <Card className="p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Tipo de Cliente</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["observatory", "researcher", "politician", "institution", "journalist", "press"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setClientType(type as ClientType)}
                        className={`flex items-center justify-center p-2 rounded-md text-sm ${
                          type === clientType 
                            ? "bg-primary text-white" 
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {getClientIcon(type as ClientType)}
                        <span className="ml-1 hidden sm:inline">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </Card>
                
                <ClientInfo clientType={clientType} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExampleClient;
