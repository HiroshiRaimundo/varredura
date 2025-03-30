
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClientLoginForm from "./ClientLoginForm";
import { ClientLoginFormValues } from "./types";
import { toast } from "@/hooks/use-toast";

interface LoginCardProps {
  onLogin: (data: ClientLoginFormValues) => Promise<void>;
  isLoggingIn: boolean;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin, isLoggingIn }) => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    toast({
      title: "Recuperação de senha",
      description: "Instruções para recuperar sua senha foram enviadas para o seu e-mail.",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Acesso ao Portal do Cliente</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar o portal do cliente e gerenciar suas interações de imprensa.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ClientLoginForm onSubmit={onLogin} isLoggingIn={isLoggingIn} />
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center w-full text-muted-foreground">
          <button 
            onClick={handleForgotPassword}
            className="text-primary hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </div>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
