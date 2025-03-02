
import React from "react";
import { ClientType, clientTypeDetails } from "@/components/client/ClientTypes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { getColorClasses } from "@/components/service/utils/colorUtils";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  clientType: ClientType;
  onSubmit: (data: LoginFormValues) => void;
  onClientTypeChange: (type: ClientType) => void;
  getClientIcon: (type: ClientType) => React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  clientType, 
  onSubmit, 
  onClientTypeChange, 
  getClientIcon 
}) => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const colorClasses = getColorClasses(clientType);

  return (
    <div>
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
        <p>Para este exemplo, você pode usar qualquer email e senha. Selecione o tipo de cliente desejado:</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {(Object.keys(clientTypeDetails) as ClientType[]).map((type) => (
          <Button
            key={type}
            type="button"
            variant={clientType === type ? "default" : "outline"}
            className={clientType === type ? colorClasses.bg : ""}
            onClick={() => onClientTypeChange(type)}
          >
            {getClientIcon(type)}
            <span className="ml-2">{clientTypeDetails[type].title}</span>
          </Button>
        ))}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@email.com" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input type="password" placeholder="Sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className={`w-full ${colorClasses.bg}`}>
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
