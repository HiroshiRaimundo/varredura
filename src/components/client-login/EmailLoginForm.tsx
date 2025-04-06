
import React, { useState } from "react";
import { ClientLoginFormValues } from "./types";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface EmailLoginFormProps {
  onSubmit: (data: ClientLoginFormValues) => Promise<void>;
  isLoggingIn: boolean;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onSubmit, isLoggingIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const form = useForm<ClientLoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      clientType: ""
    }
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email corporativo</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="seu.email@empresa.com" 
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
                    placeholder="••••••••"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none text-gray-500"
            >
              Lembrar-me
            </label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
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
  );
};

export default EmailLoginForm;
