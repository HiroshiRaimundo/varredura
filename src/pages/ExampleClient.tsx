
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { Check, ArrowRightCircle, Users, BarChart2, Leaf, FileText, PenTool } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const ExampleClient: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "monitoring" | "analysis">("dashboard");
  const [clientType, setClientType] = useState<ClientType>("observatory");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

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

  const getColorClasses = (type: ClientType) => {
    const colorMap: Record<ClientType, { bg: string, light: string, text: string }> = {
      observatory: { bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600" },
      researcher: { bg: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600" },
      politician: { bg: "bg-green-600", light: "bg-green-50", text: "text-green-600" },
      institution: { bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-600" },
      journalist: { bg: "bg-red-600", light: "bg-red-50", text: "text-red-600" },
      press: { bg: "bg-amber-600", light: "bg-amber-50", text: "text-amber-600" }
    };
    return colorMap[type];
  };

  const colorClasses = getColorClasses(clientType);

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
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                    <p>Para este exemplo, você pode usar qualquer email e senha. Selecione o tipo de cliente desejado:</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={clientType === type ? "default" : "outline"}
                        className={clientType === type ? getColorClasses(type).bg : ""}
                        onClick={() => setClientType(type)}
                      >
                        {getClientIcon(type)}
                        <span className="ml-2">{clientTypeDetails[type].title}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="exemplo@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Sua senha" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className={`w-full ${colorClasses.bg}`}>
                        Entrar
                      </Button>
                    </form>
                  </Form>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${colorClasses.light}`}>
                    {getClientIcon(clientType)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Área do Cliente: {clientTypeDetails[clientType].title}</h1>
                    <p className="text-muted-foreground">Modelo de exemplo para demonstração</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/')} 
                  variant="outline"
                >
                  Voltar ao site
                </Button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "dashboard"
                      ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                      : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("monitoring")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "monitoring"
                      ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                      : "text-muted-foreground"
                  }`}
                >
                  Monitoramento
                </button>
                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "analysis"
                      ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
                      : "text-muted-foreground"
                  }`}
                >
                  Análise
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className={colorClasses.text}>
                      {activeTab === "dashboard" && "Dashboard de Visão Geral"}
                      {activeTab === "monitoring" && "Monitoramento de Dados"}
                      {activeTab === "analysis" && "Ferramentas de Análise"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <div className={`mx-auto w-16 h-16 ${colorClasses.light} rounded-full flex items-center justify-center mb-4`}>
                        {activeTab === "dashboard" && <BarChart2 className={`h-8 w-8 ${colorClasses.text}`} />}
                        {activeTab === "monitoring" && <Leaf className={`h-8 w-8 ${colorClasses.text}`} />}
                        {activeTab === "analysis" && <ArrowRightCircle className={`h-8 w-8 ${colorClasses.text}`} />}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Conteúdo do {clientTypeDetails[clientType].title}</h3>
                      <p className="text-muted-foreground">
                        Esta é uma visualização de demonstração da área do cliente. <br />
                        Em um ambiente real, você veria os dados de {clientTypeDetails[clientType].shortDescription}.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informações do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Plano:</span>
                          <span className="font-medium">{clientTypeDetails[clientType].title}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Próxima cobrança:</span>
                          <span className="font-medium">15/06/2024</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recursos Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {clientTypeDetails[clientType].features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className={`h-4 w-4 ${colorClasses.text} mt-1`} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
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
