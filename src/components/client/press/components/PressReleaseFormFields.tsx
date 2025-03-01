
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TextFormattingToolbar from "./TextFormattingToolbar";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types/pressReleaseTypes";
import { availableOutlets } from "../utils/pressReleaseUtils";

interface PressReleaseFormFieldsProps {
  form: UseFormReturn<FormValues>;
  onFormatText: (format: string) => void;
}

const PressReleaseFormFields: React.FC<PressReleaseFormFieldsProps> = ({ form, onFormatText }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
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
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Autor</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome do autor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/20 p-2 rounded-md">
        <TextFormattingToolbar onFormatText={onFormatText} />

        <FormField
          control={form.control}
          name="content"
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
              <FormDescription>
                Use as ferramentas acima para formatar o texto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="targetOutlet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Veículo de Destino</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo para envio" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableOutlets.map((outlet) => (
                  <SelectItem key={outlet.id} value={outlet.name}>
                    {outlet.name} ({outlet.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              O veículo selecionado será automaticamente monitorado após a aprovação do release
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PressReleaseFormFields;
