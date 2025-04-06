
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { PlusCircle, X, FileText, Plus, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface PressReleaseFormProps {
  clientType: string;
}

interface FormValues {
  title: string;
  subtitle: string;
  author: string;
  content: string;
  category: string;
  customCategory?: string;
  mediaLinks: string[];
  targetOutlet: string;
}

// Lista inicial de categorias
const initialCategories = [
  { id: "business", label: "Negócios" },
  { id: "environment", label: "Meio Ambiente" },
  { id: "technology", label: "Tecnologia" },
  { id: "social", label: "Responsabilidade Social" },
  { id: "event", label: "Eventos" },
  { id: "awards", label: "Prêmios e Reconhecimentos" },
  { id: "other", label: "Outros" }
];

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({ clientType }) => {
  const [mediaLinks, setMediaLinks] = useState<string[]>([]);
  const [newMediaLink, setNewMediaLink] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      author: "",
      content: "",
      category: "",
      customCategory: "",
      mediaLinks: [],
      targetOutlet: "",
    }
  });

  const addMediaLink = () => {
    if (newMediaLink) {
      try {
        new URL(newMediaLink);
        setMediaLinks([...mediaLinks, newMediaLink]);
        setNewMediaLink("");
      } catch (e) {
        toast({
          title: "Link inválido",
          description: "Por favor, insira um link válido iniciando com http:// ou https://",
          variant: "destructive"
        });
      }
    }
  };

  const removeMediaLink = (linkToRemove: string) => {
    setMediaLinks(mediaLinks.filter(link => link !== linkToRemove));
  };

  const handleCategoryChange = (value: string) => {
    form.setValue("category", value);
    setIsOtherCategory(value === "other");
    
    if (value !== "other") {
      form.setValue("customCategory", "");
    }
  };

  const addNewCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Nome da categoria obrigatório",
        description: "Por favor, insira um nome para a categoria",
        variant: "destructive"
      });
      return;
    }
    
    // Gerar um ID a partir do nome (se o ID personalizado não for fornecido)
    const categoryId = newCategoryId.trim() || newCategoryName.toLowerCase().replace(/\s+/g, '_');
    
    // Verificar se já existe uma categoria com este ID
    if (categories.some(cat => cat.id === categoryId)) {
      toast({
        title: "Categoria já existe",
        description: "Uma categoria com este ID já existe. Por favor, use outro nome.",
        variant: "destructive"
      });
      return;
    }
    
    // Adicionar a nova categoria
    const newCategory = {
      id: categoryId,
      label: newCategoryName
    };
    
    setCategories([...categories, newCategory]);
    
    // Limpar campos do formulário
    setNewCategoryName("");
    setNewCategoryId("");
    
    // Fechar o diálogo
    setIsCategoryDialogOpen(false);
    
    // Selecionar a nova categoria no formulário
    form.setValue("category", categoryId);
    setIsOtherCategory(false);
    
    toast({
      title: "Categoria adicionada",
      description: `A categoria "${newCategoryName}" foi adicionada com sucesso.`
    });
  };

  const onSubmit = (data: FormValues) => {
    // Incorporar os links de mídia no formulário
    const formData = {
      ...data,
      mediaLinks: mediaLinks,
      // Se categoria for "Outros", usar a categoria personalizada
      category: data.category === "other" ? data.customCategory : data.category
    };
    
    console.log("Dados do release:", formData);
    
    toast({
      title: "Release enviado",
      description: "Seu release foi enviado e aguarda aprovação. Você receberá uma notificação quando for analisado."
    });
    
    // Resetar formulário
    form.reset();
    setMediaLinks([]);
    setIsOtherCategory(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Criar novo Release</h2>
      <p className="mb-6">Preencha o formulário abaixo para criar um novo release para o tipo de cliente: {clientType}</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="media">Mídia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
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
                rules={{ required: "O autor é obrigatório" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do autor ou departamento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: "A categoria é obrigatória" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <div className="flex gap-2">
                        <Select onValueChange={handleCategoryChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" type="button">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Adicionar nova categoria</DialogTitle>
                              <DialogDescription>
                                Crie uma nova categoria para seus releases
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <FormLabel htmlFor="name" className="col-span-4">
                                  Nome da categoria
                                </FormLabel>
                                <Input
                                  id="name"
                                  value={newCategoryName}
                                  onChange={(e) => setNewCategoryName(e.target.value)}
                                  placeholder="Ex: Marketing Digital"
                                  className="col-span-4"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <FormLabel htmlFor="id" className="col-span-4">
                                  ID (opcional)
                                </FormLabel>
                                <Input
                                  id="id"
                                  value={newCategoryId}
                                  onChange={(e) => setNewCategoryId(e.target.value)}
                                  placeholder="Ex: marketing_digital"
                                  className="col-span-4"
                                />
                                <p className="text-sm text-muted-foreground col-span-4">
                                  Deixe em branco para gerar automaticamente a partir do nome
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="button" onClick={addNewCategory}>
                                <Tag className="mr-2 h-4 w-4" />
                                Adicionar categoria
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {isOtherCategory && (
                <FormField
                  control={form.control}
                  name="customCategory"
                  rules={{ required: "A categoria personalizada é obrigatória" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria Personalizada</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite a categoria personalizada" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                rules={{ required: "O conteúdo é obrigatório" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo do Release</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Digite o conteúdo do release" 
                        className="min-h-[250px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Escreva o conteúdo completo do release. Formatação básica é suportada.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4">
              <FormField
                control={form.control}
                name="targetOutlet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veículo de Mídia Alvo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o veículo alvo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="todos">Todos os Veículos</SelectItem>
                        <SelectItem value="jornais">Jornais</SelectItem>
                        <SelectItem value="revistas">Revistas</SelectItem>
                        <SelectItem value="blogs">Blogs</SelectItem>
                        <SelectItem value="digitais">Veículos Digitais</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecione o tipo de veículo para o qual este release é destinado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormLabel>Links de Mídia</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://exemplo.com/imagem.jpg" 
                    value={newMediaLink}
                    onChange={(e) => setNewMediaLink(e.target.value)}
                  />
                  <Button type="button" onClick={addMediaLink}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                <FormDescription>
                  Adicione links para imagens, vídeos ou documentos relacionados ao release
                </FormDescription>
                
                {mediaLinks.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="text-sm font-medium mb-3">Links adicionados</h4>
                      <div className="space-y-2">
                        {mediaLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 truncate max-w-[300px] hover:underline">
                              {link}
                            </a>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeMediaLink(link)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Enviar Release
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PressReleaseForm;
