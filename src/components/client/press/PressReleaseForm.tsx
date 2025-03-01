import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { FileText, Image, Youtube, Link, Bold, Italic, AlignLeft, AlignCenter, AlignRight, List } from "lucide-react";

interface PressReleaseFormProps {
  clientType: string;
}

interface FormValues {
  title: string;
  subtitle: string;
  author: string;
  content: string;
  mediaLinks: string[];
}

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({ clientType }) => {
  const [mediaLinks, setMediaLinks] = useState<string[]>([]);
  const [newMediaLink, setNewMediaLink] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'youtube' | 'repository'>('image');

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      author: "",
      content: "",
      mediaLinks: []
    }
  });

  const onSubmit = (data: FormValues) => {
    data.mediaLinks = mediaLinks;
    
    toast({
      title: "Release enviado",
      description: "Seu release foi enviado e aguarda aprovação."
    });
    
    console.log("Release data:", data);
    
    // Aqui seria feita a integração com o backend para salvar o release
    
    // Resetar formulário
    form.reset();
    setMediaLinks([]);
  };

  const addMediaLink = () => {
    if (newMediaLink.trim()) {
      setMediaLinks([...mediaLinks, `${mediaType}:${newMediaLink.trim()}`]);
      setNewMediaLink('');
    }
  };

  const removeMediaLink = (index: number) => {
    const updatedLinks = [...mediaLinks];
    updatedLinks.splice(index, 1);
    setMediaLinks(updatedLinks);
  };

  const formatText = (format: string) => {
    // Aqui seria implementada a lógica para formatar o texto
    // Por exemplo, adicionar **texto** para negrito, *texto* para itálico, etc.
    toast({
      title: "Formatação aplicada",
      description: `Texto formatado com ${format}`
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex gap-2 mb-2 flex-wrap">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => formatText('negrito')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => formatText('itálico')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => formatText('alinhado à esquerda')}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => formatText('centralizado')}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => formatText('alinhado à direita')}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => formatText('lista')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

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

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Mídia</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Button
                type="button"
                variant={mediaType === 'image' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setMediaType('image')}
              >
                <Image className="h-4 w-4" />
                Imagem
              </Button>
              
              <Button
                type="button"
                variant={mediaType === 'youtube' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setMediaType('youtube')}
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </Button>
              
              <Button
                type="button"
                variant={mediaType === 'repository' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setMediaType('repository')}
              >
                <Link className="h-4 w-4" />
                Repositório
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Input 
                placeholder={
                  mediaType === 'image' 
                    ? "Cole o link da imagem" 
                    : mediaType === 'youtube' 
                      ? "Cole o link do vídeo do YouTube" 
                      : "Cole o link do repositório de vídeo"
                }
                value={newMediaLink}
                onChange={(e) => setNewMediaLink(e.target.value)}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={addMediaLink}
              >
                Adicionar
              </Button>
            </div>
            
            {mediaLinks.length > 0 && (
              <div className="border rounded-md p-2">
                <h4 className="text-sm font-medium mb-2">Mídias adicionadas:</h4>
                <ul className="space-y-2">
                  {mediaLinks.map((link, index) => {
                    const [type, url] = link.split(':');
                    return (
                      <li key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {type === 'image' && <Image className="h-4 w-4" />}
                          {type === 'youtube' && <Youtube className="h-4 w-4" />}
                          {type === 'repository' && <Link className="h-4 w-4" />}
                          <span className="truncate max-w-[300px]">{url}</span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeMediaLink(index)}
                        >
                          Remover
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Enviar Release
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PressReleaseForm;
