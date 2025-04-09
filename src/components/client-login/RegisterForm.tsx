import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { RegistrationFormValues } from "./authTypes";

interface RegisterFormProps {
  onSubmit: (data: RegistrationFormValues) => void;
  isSubmitting: boolean;
  onLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isSubmitting, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<RegistrationFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: ""
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
                <FormLabel>Email *</FormLabel>
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
            rules={{ 
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Crie uma senha" 
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Seu nome" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>* Campos obrigatórios</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar e Acessar
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        <p>
          Já tem uma conta?{" "}
          <button 
            className="text-primary hover:underline"
            onClick={onLoginClick}
          >
            Faça login
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
