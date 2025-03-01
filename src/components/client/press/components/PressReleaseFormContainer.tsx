
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { FormValues, PressReleaseFormProps } from "../types/pressReleaseTypes";
import { formatText } from "../utils/pressReleaseUtils";
import PressReleaseFormFields from "./PressReleaseFormFields";
import MediaLinksSection from "./MediaLinksSection";

const PressReleaseFormContainer: React.FC<PressReleaseFormProps> = ({ clientType }) => {
  const [mediaLinks, setMediaLinks] = useState<string[]>([]);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      author: "",
      content: "",
      targetOutlet: "",
      mediaLinks: []
    }
  });

  const onSubmit = (data: FormValues) => {
    data.mediaLinks = mediaLinks;
    
    toast({
      title: "Release enviado",
      description: "Seu release foi enviado e aguarda aprovação. Você receberá uma notificação quando for analisado."
    });
    
    console.log("Release data:", data);
    
    // Aqui seria feita a integração com o backend para salvar o release
    
    // Resetar formulário
    form.reset();
    setMediaLinks([]);
  };

  const handleFormatText = (format: string) => {
    formatText(format, toast);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PressReleaseFormFields 
          form={form} 
          onFormatText={handleFormatText} 
        />

        <MediaLinksSection 
          mediaLinks={mediaLinks} 
          setMediaLinks={setMediaLinks} 
        />

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Enviar Release
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PressReleaseFormContainer;
