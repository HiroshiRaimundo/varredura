
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientLoginFormValues } from "./types";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface ClientLoginFormProps {
  onSubmit: (data: ClientLoginFormValues) => Promise<void>;
  isLoggingIn: boolean;
}

const ClientLoginForm: React.FC<ClientLoginFormProps> = ({ onSubmit, isLoggingIn }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<ClientLoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="cliente@empresa.com" {...field} />
              </FormControl>
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
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    {...field} 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="text-center text-sm">
          <Link to="/login" className="text-primary hover:underline">
            Acesso administrativo
          </Link>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
};

export default ClientLoginForm;
