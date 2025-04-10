
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, Lightbulb } from "lucide-react";

const LoginOptions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Acesso ao Sistema</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <User className="h-6 w-6 text-blue-700" />
            </div>
            <CardTitle className="text-center text-blue-700">Cliente</CardTitle>
            <CardDescription className="text-center">
              Acesso à área do cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col items-center">
            <p className="text-sm text-center mb-4">
              Área dedicada para clientes da plataforma acessarem seus serviços contratados.
            </p>
            <Button 
              onClick={() => navigate("/cliente-login")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login de Cliente
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-center text-amber-600">Exemplo</CardTitle>
            <CardDescription className="text-center">
              Demonstração do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col items-center">
            <p className="text-sm text-center mb-4">
              Acesso a uma versão de demonstração da plataforma para conhecer as funcionalidades.
            </p>
            <Button 
              onClick={() => navigate("/exemplo-login")}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Acessar Exemplo
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-red-700" />
            </div>
            <CardTitle className="text-center text-red-700">Administração</CardTitle>
            <CardDescription className="text-center">
              Painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col items-center">
            <p className="text-sm text-center mb-4">
              Acesso restrito para administradores do sistema gerenciarem a plataforma.
            </p>
            <Button 
              onClick={() => navigate("/admin-login")}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Login Administrativo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginOptions;
