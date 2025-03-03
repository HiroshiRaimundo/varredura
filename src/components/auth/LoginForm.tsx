import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, AlertCircle, KeyRound } from "lucide-react";
import { useRouter } from 'next/router';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError('O email é obrigatório');
      return false;
    }
    if (!password.trim()) {
      setError('A senha é obrigatória');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    console.log('Iniciando login...', { email });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        })
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      if (!data.user || !data.user.role) {
        throw new Error('Resposta inválida do servidor');
      }

      console.log('Login bem-sucedido, role:', data.user.role);

      // Redirecionar baseado no papel do usuário
      if (data.user.role === 'admin') {
        console.log('Redirecionando para área administrativa...');
        window.location.href = '/admin/dashboard';
      } else {
        console.log('Redirecionando para área de usuário...');
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('Erro durante o login:', error);
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1 bg-primary/5 rounded-t-lg p-6">
          <div className="flex items-center gap-2">
            <KeyRound className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">KOGA Monitoramento</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Sistema de Monitoramento e Análise
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
                className="w-full"
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full"
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⌛</span>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Entrar
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm; 