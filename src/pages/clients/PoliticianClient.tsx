
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { clientTypeDetails } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Define the MonitoringItem interface to match what the component expects
interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
  notes?: string;
}

const PoliticianClient: React.FC = () => {
  const { toast } = useToast();
  const auth = useAuth();
  const clientType = "politician";
  const colorClasses = getColorClasses(clientType);
  const details = clientTypeDetails[clientType];
  
  // Updated form to match the MonitoringItem interface
  const form = useForm<MonitoringItem>({
    defaultValues: {
      name: "",
      url: "",
      api_url: "",
      frequency: "diario",
      category: "",
      keywords: "",
      responsible: "",
      institution: "",
      notes: ""
    }
  });

  const handleAddMonitoring = (data: MonitoringItem) => {
    console.log("Adding monitoring item:", data);
    // Here would be the logic to save the monitoring data
    toast({
      title: "Monitoramento adicionado",
      description: `O monitoramento "${data.name}" foi adicionado com sucesso.`
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <Header 
            isAuthenticated={auth.isAuthenticated} 
            onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
            onLogoutClick={auth.handleLogout}
            clientName="Usuário Político"
            clientType={clientType}
          />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{details.title}</h1>
            <p className="text-muted-foreground">
              {details.shortDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Monitoramentos Ativos</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>12</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Monitoramentos de legislação ativos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Alertas</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>8</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Alertas de legislação este mês</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className={`${colorClasses.light} rounded-t-lg`}>
                <CardTitle className="flex justify-between items-center">
                  <span>Regiões</span>
                  <span className={`${colorClasses.text} font-bold text-2xl`}>5</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Regiões monitoradas ativamente</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Adicionar Novo Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoringForm 
                form={form} 
                onSubmit={handleAddMonitoring} 
                clientType={clientType} 
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades Disponíveis</CardTitle>
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
                <CardTitle>Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{details.description}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {details.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PoliticianClient;
