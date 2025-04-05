
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "@/hooks/use-toast";

interface ReleaseFormProps {
  onSubmitSuccess: () => void;
}

interface FormValues {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  attachments: FileList | null;
}

const categories = [
  { value: "corporate", label: "Comunicado Corporativo" },
  { value: "product", label: "Lançamento de Produto" },
  { value: "event", label: "Evento" },
  { value: "report", label: "Relatório" },
  { value: "institutional", label: "Institucional" },
];

const ReleaseForm: React.FC<ReleaseFormProps> = ({ onSubmitSuccess }) => {
  const form = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // Simulação de envio para API
    try {
      // Aqui seria feita a chamada para API
      console.log("Enviando release:", data);
      
      // Simulação de delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Release enviado com sucesso",
        description: "Seu release foi enviado e está aguardando aprovação.",
      });
      
      onSubmitSuccess();
    } catch (error) {
      toast({
        title: "Erro ao enviar release",
        description: "Ocorreu um erro ao enviar seu release. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "O título é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do release" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          rules={{ required: "O subtítulo é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtítulo</FormLabel>
              <FormControl>
                <Input placeholder="Digite o subtítulo do release" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          rules={{ required: "A categoria é obrigatória" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          rules={{ required: "O conteúdo é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conteúdo</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite o conteúdo do release"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachments"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Anexos</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Você pode adicionar imagens, PDFs e outros documentos. Tamanho máximo: 10MB por arquivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Enviando..." : "Enviar Release"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReleaseForm;
