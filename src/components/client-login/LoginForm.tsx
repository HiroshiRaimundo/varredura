import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { LoginFormValues } from "./authTypes";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isSubmitting: boolean;
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting, onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="seu.email@exemplo.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Senha é obrigatória" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Sua senha" 
                      {...field} 
                    />
                    <div 
                      className="absolute right-0 top-0 h-full flex items-center pr-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 
                        <EyeOff size={18} className="text-muted-foreground" /> : 
                        <Eye size={18} className="text-muted-foreground" />
                      }
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        <p>
          Ainda não tem uma conta?{" "}
          <button 
            className="text-primary hover:underline"
            onClick={onRegisterClick}
          >
            Cadastre-se agora
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
