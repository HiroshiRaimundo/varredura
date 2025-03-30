
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  form, 
  onSubmit 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitWithRemember = (data: LoginFormData) => {
    // Se o usuário marcou para lembrar a senha, salve no localStorage
    if (rememberPassword) {
      localStorage.setItem('savedEmail', data.email);
      localStorage.setItem('rememberPassword', 'true');
    } else {
      // Limpar dados salvos se o usuário desmarcou a opção
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('rememberPassword');
    }
    onSubmit(data);
  };

  // Verificar se há credenciais salvas ao montar o componente
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const hasRememberedPassword = localStorage.getItem('rememberPassword') === 'true';
    
    if (savedEmail && hasRememberedPassword) {
      form.setValue('email', savedEmail);
      setRememberPassword(true);
    }
  }, [form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Acesso ao Sistema</DialogTitle>
          <DialogDescription>
            Entre com suas credenciais para acessar funcionalidades de administração.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitWithRemember)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
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

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberPassword}
                onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembrar meu email
              </label>
            </div>

            <DialogFooter>
              <Button type="submit">Entrar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
