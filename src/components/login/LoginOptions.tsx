
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserCog, Users, BookOpen } from 'lucide-react';

const LoginOptions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Opções de Login</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="bg-blue-50">
            <UserCog className="h-10 w-10 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-center">Login Administrativo</CardTitle>
            <CardDescription className="text-center">
              Acesso para administradores e equipe de gerenciamento
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-sm">
              <strong>Credenciais:</strong><br />
              Email: admin@koga.com<br />
              Senha: admin123<br />
              <span className="text-gray-500">ou simplesmente</span><br />
              Email: admin<br />
              Senha: admin
            </p>
            <Button 
              variant="default" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={() => navigate('/login')}
            >
              Acessar Área Administrativa
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="bg-amber-50">
            <Users className="h-10 w-10 text-amber-600 mx-auto mb-2" />
            <CardTitle className="text-center">Login de Clientes</CardTitle>
            <CardDescription className="text-center">
              Acesso para clientes registrados da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-sm">
              <strong>Credenciais:</strong><br />
              Email: client@exemplo.com<br />
              Senha: cliente123<br />
              <span className="text-gray-500">Ou cadastre-se na plataforma</span>
            </p>
            <Button 
              variant="default" 
              className="w-full bg-amber-600 hover:bg-amber-700" 
              onClick={() => navigate('/client-login')}
            >
              Acessar Área do Cliente
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="bg-green-50">
            <BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-center">Páginas de Exemplo</CardTitle>
            <CardDescription className="text-center">
              Acesso para demonstração simplificada
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-sm">
              <strong>Credenciais:</strong><br />
              Qualquer email e senha<br />
              <span className="text-gray-500">Demonstração sem verificação</span><br />
              <span className="text-gray-500">rigorosa de credenciais</span>
            </p>
            <Button 
              variant="default" 
              className="w-full bg-green-600 hover:bg-green-700" 
              onClick={() => navigate('/simple-login')}
            >
              Acessar Demonstração
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Navegação Rápida</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => navigate('/example-client')}>
            Página Cliente Exemplo
          </Button>
          <Button variant="outline" onClick={() => navigate('/example-dashboard')}>
            Dashboard Exemplo
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Painel Administrativo
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Dashboard do Cliente
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
