
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { FormValues } from "../types/pressReleaseTypes";
import { formatText } from "../utils/pressReleaseUtils";

export const usePressReleaseForm = () => {
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

  return {
    form,
    mediaLinks,
    setMediaLinks,
    onSubmit,
    handleFormatText
  };
};
