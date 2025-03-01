
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Calendar, Lock, ArrowLeft } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface PaymentFormValues {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const handleSubmit = (data: PaymentFormValues) => {
    console.log("Payment form submitted:", data);
    
    // Simulate a successful payment process
    toast({
      title: "Pagamento processado com sucesso",
      description: "Você será redirecionado para a área do cliente."
    });
    
    // Redirect to client login after "payment"
    setTimeout(() => {
      navigate("/client-login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-7xl mx-auto w-full space-y-6 flex-1 p-6">
        <Header 
          isAuthenticated={auth.isAuthenticated}
          onLoginClick={() => navigate('/login')}
          onLogoutClick={auth.handleLogout}
        />

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>

        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-2xl">Pagamento</CardTitle>
              <CardDescription>
                Complete os dados de pagamento para finalizar sua compra
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome no cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: João da Silva" {...field} required />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do cartão</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="0000 0000 0000 0000" 
                              {...field} 
                              required 
                              className="pl-10"
                              maxLength={19}
                              onChange={(e) => {
                                // Format card number with spaces
                                const value = e.target.value.replace(/\s/g, "");
                                const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                                field.onChange(formatted);
                              }}
                            />
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de expiração</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="MM/AA" 
                                {...field} 
                                required 
                                className="pl-10"
                                maxLength={5}
                                onChange={(e) => {
                                  // Format expiry date with slash
                                  const value = e.target.value.replace(/\//g, "");
                                  if (value.length > 2) {
                                    field.onChange(`${value.slice(0, 2)}/${value.slice(2)}`);
                                  } else {
                                    field.onChange(value);
                                  }
                                }}
                              />
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="123" 
                                {...field} 
                                required 
                                className="pl-10"
                                maxLength={4}
                                type="password"
                              />
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-4">
                    <p className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-green-500" />
                      Seus dados estão seguros e criptografados
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Finalizar pagamento
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-gray-500">
                <span>Total: </span>
                <span className="font-bold text-lg text-gray-900">R$ 499,90</span>
              </div>
              <div className="text-sm text-gray-500">
                Pagamento único
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Payment;
