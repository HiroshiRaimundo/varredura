
import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Search, Smile, BarChart, Database, Plug } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NewMonitoringFormProps {
  onSubmitSuccess: () => void;
}

interface FormValues {
  name: string;
  terms: string;
  sources: string[];
  frequency: string;
  alertThreshold: string;
  apiUrl?: string;
  apiKey?: string;
  analysisTypes: string[];
  crossAnalysis: boolean;
  customCategories?: string;
}

const sources = [
  { id: "news", label: "Portais de Notícias" },
  { id: "blogs", label: "Blogs" },
  { id: "social", label: "Redes Sociais" },
  { id: "press", label: "Releases de Imprensa" },
  { id: "videos", label: "Plataformas de Vídeo" },
  { id: "forums", label: "Fóruns de Discussão" },
  { id: "academic", label: "Publicações Acadêmicas" },
  { id: "legislative", label: "Documentos Legislativos" },
  { id: "government", label: "Sites Governamentais" },
];

const analysisTypes = [
  { id: "content", label: "Análise de Conteúdo", icon: <Search className="h-4 w-4 mr-2" /> },
  { id: "sentiment", label: "Análise de Sentimento", icon: <Smile className="h-4 w-4 mr-2" /> },
  { id: "predictive", label: "Análise Preditiva", icon: <TrendingUp className="h-4 w-4 mr-2" /> },
  { id: "trends", label: "Análise de Tendências", icon: <BarChart className="h-4 w-4 mr-2" /> },
];

const NewMonitoringForm: React.FC<NewMonitoringFormProps> = ({ onSubmitSuccess }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [showApiFields, setShowApiFields] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      terms: "",
      sources: ["news"],
      frequency: "daily",
      alertThreshold: "1",
      analysisTypes: ["content"],
      crossAnalysis: false,
      customCategories: "",
    },
  });

  const selectedAnalysisTypes = form.watch("analysisTypes");
  const showCrossAnalysis = selectedAnalysisTypes.length > 1;

  const onSubmit = async (data: FormValues) => {
    try {
      // Log de dados para debug
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="sources">Fontes</TabsTrigger>
            <TabsTrigger value="analysis">Tipos de Análise</TabsTrigger>
            <TabsTrigger value="advanced">Configurações Avançadas</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
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
                    <Textarea 
                      placeholder="Ex: sustentabilidade, ESG, meio ambiente" 
                      {...field}
                      className="min-h-[100px]"
                    />
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
                      <SelectItem value="hourly">Hora em Hora</SelectItem>
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
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <FormField
              control={form.control}
              name="sources"
              rules={{ required: "Selecione pelo menos uma fonte" }}
              render={() => (
                <FormItem>
                  <FormLabel>Fontes a Monitorar</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
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

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={showApiFields}
                  onCheckedChange={setShowApiFields}
                  id="api-toggle"
                />
                <Label htmlFor="api-toggle" className="flex items-center">
                  <Plug className="h-4 w-4 mr-2" />
                  Adicionar fonte via API
                </Label>
              </div>

              {showApiFields && (
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="apiUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL da API</FormLabel>
                          <FormControl>
                            <Input placeholder="https://api.exemplo.com/endpoint" {...field} />
                          </FormControl>
                          <FormDescription>
                            Endpoint da API para buscar dados
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chave da API (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="sua_chave_api" type="password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Chave para autenticação com a API
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <FormField
              control={form.control}
              name="analysisTypes"
              rules={{ required: "Selecione pelo menos um tipo de análise" }}
              render={() => (
                <FormItem>
                  <FormLabel>Tipos de Análise</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisTypes.map((analysisType) => (
                      <FormField
                        key={analysisType.id}
                        control={form.control}
                        name="analysisTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={analysisType.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(analysisType.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, analysisType.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== analysisType.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center">
                                {analysisType.icon}
                                {analysisType.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormDescription>
                    Selecione os tipos de análise que deseja realizar nos dados coletados.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showCrossAnalysis && (
              <FormField
                control={form.control}
                name="crossAnalysis"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Habilitar Análise Cruzada</FormLabel>
                    </div>
                    <FormDescription>
                      Permite correlacionar dados entre diferentes tipos de análise para resultados mais completos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
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

            <FormField
              control={form.control}
              name="customCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias Personalizadas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Categoria 1, Categoria 2, Categoria 3" 
                      {...field}
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Separe as categorias por vírgula. Estas categorias serão usadas para classificar os resultados do monitoramento.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Criando..." : "Criar Monitoramento"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <div className="text-sm font-medium" id={htmlFor}>
      {children}
    </div>
  );
}

export default NewMonitoringForm;
