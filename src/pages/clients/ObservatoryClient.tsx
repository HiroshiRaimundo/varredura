
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

const ObservatoryClient: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const clientType = "observatory";
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
          />
          
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{details.title} - Área Administrativa</h1>
              <p className="text-muted-foreground">
                Gerencie os dados e configurações específicas para clientes do tipo Observatório
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Voltar para Admin
              </Button>
              <Button
                className={colorClasses.bg}
                onClick={() => navigate("/admin/client/observatory/new")}
              >
                Novo Cliente
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Observatórios Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>42</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de observatórios com contratos ativos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Dashboards</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>87</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de dashboards personalizados</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Integrações</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>15</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Fontes de dados integradas</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exemplo da Área do Cliente - Observatório</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border p-4 rounded-lg text-center">
                <p className="text-lg font-medium mb-2">Dashboard do Cliente</p>
                <p className="text-muted-foreground">Visualização simplificada do dashboard para cliente do tipo {details.title}</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades Específicas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Nesta área você pode personalizar os recursos disponíveis para clientes do tipo Observatório.</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Configurar Fontes de Dados
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Personalizar Dashboards
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Configurar Alertas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Gerenciar Usuários
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ObservatoryClient;
