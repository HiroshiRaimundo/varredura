import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
}

interface MonitoringFormData {
  name: string;
  type: "url" | "api";
  urls?: string[];
  url?: string;
  apiEndpoint?: string;
  apiKey?: string;
  frequency: string;
  active: boolean;
  responsible: string;
  description: string;
  keywords: string[];
  categories: Category[];
  customCategories: string[];
  metrics?: string[];
  analysisTypes?: string[];
}

const metrics = [
  {
    id: "response_time",
    name: "Tempo de Resposta",
    description: "Monitora o tempo de resposta das requisições"
  },
  {
    id: "status_code",
    name: "Código de Status",
    description: "Verifica os códigos de status HTTP"
  },
  {
    id: "content_length",
    name: "Tamanho do Conteúdo",
    description: "Monitora alterações no tamanho"
  },
  {
    id: "html_structure",
    name: "Estrutura HTML",
    description: "Detecta mudanças na estrutura"
  },
  {
    id: "meta_tags",
    name: "Meta Tags",
    description: "Monitora alterações em meta tags"
  },
  {
    id: "links",
    name: "Links",
    description: "Verifica links quebrados e alterações"
  },
  {
    id: "images",
    name: "Imagens",
    description: "Monitora alterações em imagens"
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Detecta mudanças em scripts"
  },
  {
    id: "css",
    name: "CSS",
    description: "Monitora alterações no estilo"
  },
  {
    id: "headers",
    name: "Headers HTTP",
    description: "Monitora headers de resposta"
  },
  {
    id: "ssl_cert",
    name: "Certificado SSL",
    description: "Verifica validade do certificado"
  },
  {
    id: "redirect_chain",
    name: "Redirecionamentos",
    description: "Monitora cadeia de redirecionamentos"
  }
];

const analysisTypes = [
  {
    id: "content",
    name: "Análise de Conteúdo",
    description: "Análise detalhada do conteúdo e estrutura"
  },
  {
    id: "predictive",
    name: "Análise Preditiva",
    description: "Previsão de tendências e comportamentos"
  },
  {
    id: "sentiment",
    name: "Análise de Sentimento",
    description: "Análise do sentimento do conteúdo"
  },
  {
    id: "trends",
    name: "Análise de Tendências",
    description: "Identificação de padrões temporais"
  },
  {
    id: "frequency",
    name: "Análise de Frequência",
    description: "Análise de termos e elementos frequentes"
  },
  {
    id: "links",
    name: "Análise de Links",
    description: "Análise da estrutura de navegação"
  },
  {
    id: "performance",
    name: "Análise de Performance",
    description: "Análise do desempenho e disponibilidade"
  },
  {
    id: "availability",
    name: "Análise de Disponibilidade",
    description: "Monitoramento de uptime e resposta"
  },
  {
    id: "metadata",
    name: "Análise de Metadados",
    description: "Análise de meta informações"
  },
  {
    id: "structured_data",
    name: "Análise de Dados Estruturados",
    description: "Análise de dados em formatos específicos"
  }
];

export const MonitoringForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MonitoringFormData>({
    name: "",
    type: "url",
    urls: [],
    frequency: "1h",
    active: true,
    responsible: "",
    description: "",
    keywords: [],
    categories: [],
    customCategories: [],
    metrics: [],
    analysisTypes: []
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const frequencies = [
    { value: "30min", label: "30 minutos" },
    { value: "1h", label: "1 hora" },
    { value: "3h", label: "3 horas" },
    { value: "6h", label: "6 horas" },
    { value: "12h", label: "12 horas" },
    { value: "24h", label: "24 horas" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.type === "url" && (!formData.urls || formData.urls.length === 0)) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos uma URL para monitorar",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === "api" && !formData.apiEndpoint) {
      toast({
        title: "Erro",
        description: "Informe a URL da API",
        variant: "destructive"
      });
      return;
    }

    try {
      // Aqui vai a lógica de salvar
      console.log("Dados do formulário:", formData);
      
      toast({
        title: "Sucesso",
        description: formData.urls && formData.urls.length > 1 
          ? "Grupo de monitoramento criado com sucesso!"
          : "Monitoramento criado com sucesso!"
      });
      
      navigate("/admin/monitoring");
    } catch (error) {
      console.error("Erro ao criar monitoramento:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar monitoramento",
        variant: "destructive"
      });
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, newKeyword.trim()]
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== keyword)
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setFormData({
        ...formData,
        customCategories: [...formData.customCategories, newCategory.trim()]
      });
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData({
      ...formData,
      customCategories: formData.customCategories.filter(c => c !== category)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Monitoramento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Monitoramento</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome do monitoramento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible">Responsável</Label>
            <Input
              id="responsible"
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              placeholder="Nome do responsável"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o propósito deste monitoramento"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Palavras-chave</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                  {keyword}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Adicionar palavra-chave"
                onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categorias Personalizadas</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.customCategories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveCategory(category)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Adicionar categoria"
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddCategory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipos de Análise</Label>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {analysisTypes.map((type) => (
                <Card key={type.id} className="cursor-pointer">
                  <CardContent
                    className="flex items-center gap-2 p-4"
                    onClick={() => {
                      const currentTypes = formData.analysisTypes || [];
                      const newTypes = currentTypes.includes(type.id)
                        ? currentTypes.filter(id => id !== type.id)
                        : [...currentTypes, type.id];
                      setFormData({
                        ...formData,
                        analysisTypes: newTypes
                      });
                    }}
                  >
                    <Switch
                      checked={formData.analysisTypes?.includes(type.id)}
                      onCheckedChange={() => {
                        const currentTypes = formData.analysisTypes || [];
                        const newTypes = currentTypes.includes(type.id)
                          ? currentTypes.filter(id => id !== type.id)
                          : [...currentTypes, type.id];
                        setFormData({
                          ...formData,
                          analysisTypes: newTypes
                        });
                      }}
                    />
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuração do Monitoramento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Tipo de Monitoramento</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={formData.type === "url" ? "default" : "outline"}
                onClick={() => {
                  setFormData({
                    ...formData,
                    type: "url",
                    urls: [],
                    apiEndpoint: ""
                  });
                  setUrlInput("");
                }}
              >
                URL
              </Button>
              <Button
                type="button"
                variant={formData.type === "api" ? "default" : "outline"}
                onClick={() => {
                  setFormData({
                    ...formData,
                    type: "api",
                    urls: [],
                    apiEndpoint: ""
                  });
                  setUrlInput("");
                }}
              >
                API
              </Button>
            </div>
          </div>

          {formData.type === "url" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>URLs para Monitoramento</Label>
                <div className="flex gap-2">
                  <Input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://exemplo.com"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (!urlInput?.trim()) {
                          toast({
                            title: "Erro",
                            description: "Digite uma URL válida",
                            variant: "destructive"
                          });
                          return;
                        }
                        try {
                          new URL(urlInput);
                          if (formData.urls?.includes(urlInput)) {
                            toast({
                              title: "Erro",
                              description: "Esta URL já foi adicionada",
                              variant: "destructive"
                            });
                            return;
                          }
                          setFormData({
                            ...formData,
                            urls: [...(formData.urls || []), urlInput]
                          });
                          setUrlInput("");
                          toast({
                            title: "Sucesso",
                            description: "URL adicionada à lista",
                          });
                        } catch (e) {
                          toast({
                            title: "Erro",
                            description: "URL inválida",
                            variant: "destructive"
                          });
                        }
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    onClick={() => {
                      if (!urlInput?.trim()) {
                        toast({
                          title: "Erro",
                          description: "Digite uma URL válida",
                          variant: "destructive"
                        });
                        return;
                      }
                      try {
                        new URL(urlInput);
                        if (formData.urls?.includes(urlInput)) {
                          toast({
                            title: "Erro",
                            description: "Esta URL já foi adicionada",
                            variant: "destructive"
                          });
                          return;
                        }
                        setFormData({
                          ...formData,
                          urls: [...(formData.urls || []), urlInput]
                        });
                        setUrlInput("");
                        toast({
                          title: "Sucesso",
                          description: "URL adicionada à lista",
                        });
                      } catch (e) {
                        toast({
                          title: "Erro",
                          description: "URL inválida",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
              {formData.urls && formData.urls.length > 0 && (
                <div className="space-y-2 border rounded-lg p-4">
                  <Label className="text-sm text-muted-foreground">
                    {formData.urls.length === 1 ? "URL Adicionada:" : "URLs Adicionadas:"}
                  </Label>
                  <div className="space-y-2">
                    {formData.urls.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 bg-secondary/20 p-2 rounded-md hover:bg-secondary/30">
                        <span className="flex-1 text-sm truncate">{url}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const urls = [...(formData.urls || [])];
                            urls.splice(index, 1);
                            setFormData({
                              ...formData,
                              urls
                            });
                            toast({
                              title: "URL removida",
                              description: "URL removida da lista",
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência de Monitoramento</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => setFormData({ ...formData, frequency: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Métricas de Monitoramento</Label>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric) => (
                <Card key={metric.id} className="cursor-pointer">
                  <CardContent
                    className="flex items-center gap-2 p-4"
                    onClick={() => {
                      const currentMetrics = formData.metrics || [];
                      const newMetrics = currentMetrics.includes(metric.id)
                        ? currentMetrics.filter(id => id !== metric.id)
                        : [...currentMetrics, metric.id];
                      setFormData({
                        ...formData,
                        metrics: newMetrics
                      });
                    }}
                  >
                    <Switch
                      checked={formData.metrics?.includes(metric.id)}
                      onCheckedChange={() => {
                        const currentMetrics = formData.metrics || [];
                        const newMetrics = currentMetrics.includes(metric.id)
                          ? currentMetrics.filter(id => id !== metric.id)
                          : [...currentMetrics, metric.id];
                        setFormData({
                          ...formData,
                          metrics: newMetrics
                        });
                      }}
                    />
                    <div>
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {metric.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Ativar monitoramento imediatamente</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/admin/monitoring")}>
          Cancelar
        </Button>
        <Button type="submit">Criar Monitoramento</Button>
      </div>
    </form>
  );
};
