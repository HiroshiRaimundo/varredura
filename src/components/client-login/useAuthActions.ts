import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { LoginFormValues, RegistrationFormValues } from "./authTypes";

export const useAuthActions = (redirectPath: string) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Implementação simplificada - em demonstração, qualquer credencial funciona
      // Simulamos autenticação sem verificar senha
      localStorage.setItem('isAuthenticated', 'true');
      const userData = {
        name: data.email.split('@')[0],
        email: data.email,
        role: 'client'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para a página de exemplo.",
      });
      
      // Redirecionamos o usuário para a página de exemplo
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
    } catch (error) {
      console.error("Erro no login:", error);
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegister = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulando registro - em produção, isso seria uma chamada API
      localStorage.setItem('isAuthenticated', 'true');
      const userData = {
        name: data.name || data.email.split('@')[0],
        email: data.email,
        role: 'client',
        phone: data.phone || ""
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à plataforma.",
      });
      
      // Redirecionar para a página de exemplo após um pequeno delay para dar tempo da toast aparecer
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível completar seu cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    handleLogin,
    handleRegister
  };
};
