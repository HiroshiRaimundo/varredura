
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

const JournalistClient: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const clientType = "journalist";
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
                Gerencie os dados e configurações específicas para clientes do tipo Jornalista
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Jornalistas Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>53</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Total de jornalistas com acesso ativo</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Pautas Geradas</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>124</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Pautas geradas a partir dos dados este mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Visualizações</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>8.4k</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Visualizações de dados nos últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exemplo da Área do Cliente - Jornalista</CardTitle>
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
                <p className="mb-4">Nesta área você pode personalizar os recursos disponíveis para clientes do tipo Jornalista.</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Fontes de Dados
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Modelos de Visualização
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Ferramentas de Checagem
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Formatos de Exportação
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

export default JournalistClient;
