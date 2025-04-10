
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthActions } from "./useAuthActions";

const SimpleRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Get the redirect path from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('from') || '/example-client';
  
  const { isSubmitting, handleLogin, handleRegister } = useAuthActions(redirectPath);
  
  return (
    <div className="container mx-auto max-w-md p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Acesso à Plataforma</CardTitle>
          <CardDescription className="text-center">
            Faça login ou cadastre-se para acessar nossa demonstração.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm 
                onSubmit={handleLogin} 
                isSubmitting={isSubmitting} 
                onRegisterClick={() => setActiveTab('register')} 
              />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm 
                onSubmit={handleRegister} 
                isSubmitting={isSubmitting} 
                onLoginClick={() => setActiveTab('login')} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar para página inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SimpleRegistration;
