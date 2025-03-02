
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

// Include this press client type in the ClientType type definition
const clientType = "press" as ClientType;

const PressClient: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
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
            clientName="Assessoria Exemplo"
            clientType={clientType}
          />
          
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{details.title} - Área Administrativa</h1>
              <p className="text-muted-foreground">
                Gerencie os dados e configurações específicas para clientes do tipo Assessoria de Imprensa
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Assessorias Ativas</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>24</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de assessorias com contratos ativos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Releases Publicados</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>136</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de releases publicados este mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Taxa de Conversão</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>42%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Média de aproveitamento dos releases</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exemplo da Área do Cliente - Assessoria de Imprensa</CardTitle>
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
                <p className="mb-4">Nesta área você pode personalizar os recursos disponíveis para clientes do tipo Assessoria de Imprensa.</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Modelos de Releases
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Gerenciar Contatos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Configurar Notificações
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Relatórios de Desempenho
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

export default PressClient;
