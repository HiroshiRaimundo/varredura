
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface NewMonitoringFormProps {
  onSubmitSuccess: () => void;
}

interface FormValues {
  name: string;
  terms: string;
  sources: string[];
  frequency: string;
  alertThreshold: string;
}

const sources = [
  { id: "news", label: "Portais de Notícias" },
  { id: "blogs", label: "Blogs" },
  { id: "social", label: "Redes Sociais" },
  { id: "press", label: "Releases de Imprensa" },
  { id: "videos", label: "Plataformas de Vídeo" },
];

const NewMonitoringForm: React.FC<NewMonitoringFormProps> = ({ onSubmitSuccess }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      terms: "",
      sources: ["news"],
      frequency: "daily",
      alertThreshold: "1",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Aqui seria feita a chamada para API
      console.log("Criando novo monitoramento:", data);
      
      // Simulação de delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Monitoramento criado com sucesso",
        description: "Seu monitoramento foi criado e começará a funcionar em breve.",
      });
      
      onSubmitSuccess();
    } catch (error) {
      toast({
        title: "Erro ao criar monitoramento",
        description: "Ocorreu um erro ao criar seu monitoramento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "O nome é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Monitoramento</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Sustentabilidade" {...field} />
              </FormControl>
              <FormDescription>
                Um nome para identificar este monitoramento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          rules={{ required: "Os termos são obrigatórios" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Termos a Monitorar</FormLabel>
              <FormControl>
                <Input placeholder="Ex: sustentabilidade, ESG, meio ambiente" {...field} />
              </FormControl>
              <FormDescription>
                Separe os termos por vírgula. Você pode usar aspas para termos exatos, ex: "energia renovável"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sources"
          rules={{ required: "Selecione pelo menos uma fonte" }}
          render={() => (
            <FormItem>
              <FormLabel>Fontes a Monitorar</FormLabel>
              <div className="space-y-2">
                {sources.map((source) => (
                  <FormField
                    key={source.id}
                    control={form.control}
                    name="sources"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={source.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(source.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, source.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== source.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {source.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          rules={{ required: "A frequência é obrigatória" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequência de Atualização</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma frequência" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="realtime">Tempo Real</SelectItem>
                  <SelectItem value="daily">Diária</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Com que frequência o sistema deve buscar novos resultados.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alertThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limite para Alertas</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um limite" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 menção</SelectItem>
                  <SelectItem value="5">5 menções</SelectItem>
                  <SelectItem value="10">10 menções</SelectItem>
                  <SelectItem value="20">20 menções</SelectItem>
                  <SelectItem value="0">Desativado</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Receba alertas quando os termos atingirem este número de menções.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Criando..." : "Criar Monitoramento"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewMonitoringForm;
