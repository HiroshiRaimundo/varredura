import React, { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { useMonitoring } from "@/contexts/MonitoringContext";

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
  const { addMonitoring } = useMonitoring();

  const initialFormState: MonitoringFormData = {
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
    analysisTypes: [],
    apiEndpoint: ""
  };

  const [formData, setFormData] = useState<MonitoringFormData>(initialFormState);
  const [urlInput, setUrlInput] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = true;
    }
    
    if (!formData.responsible?.trim()) {
      newErrors.responsible = true;
    }
    
    if (formData.type === "url" && (!formData.urls || formData.urls.length === 0)) {
      newErrors.urls = true;
    }
    
    if (formData.type === "api" && !formData.apiEndpoint?.trim()) {
      newErrors.apiEndpoint = true;
    }
    
    if (!formData.analysisTypes || formData.analysisTypes.length === 0) {
      newErrors.analysisTypes = true;
    }
    
    if (!formData.metrics || formData.metrics.length === 0) {
      newErrors.metrics = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios destacados em vermelho.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Adiciona o monitoramento ao contexto global
      addMonitoring({
        ...formData,
        active: true,
      });
      
      toast({
        title: "Monitoramento Criado",
        description: formData.urls && formData.urls.length > 1 
          ? "Grupo de monitoramento criado com sucesso!"
          : "Monitoramento criado com sucesso!",
        variant: "default"
      });

      // Limpa o formulário
      setFormData(initialFormState);
      setUrlInput("");
      setNewKeyword("");
      setNewCategory("");
      setErrors({});
      
      // Redireciona para a visão geral
      navigate("/admin/monitoring", { replace: true });
      
    } catch (error) {
      console.error("Erro ao criar monitoramento:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar monitoramento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleAddUrl = () => {
    if (!urlInput?.trim()) {
      toast({
        title: "Erro",
        description: "Digite um endereço válido",
        variant: "destructive"
      });
      return;
    }

    if (formData.urls?.includes(urlInput)) {
      toast({
        title: "Erro",
        description: "Este endereço já foi adicionado",
        variant: "destructive"
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      urls: [...(prev.urls || []), urlInput]
    }));
    setUrlInput("");
    toast({
      title: "Sucesso",
      description: "Endereço adicionado à lista",
    });
  };

  const handleRemoveUrl = (index: number) => {
    setFormData(prev => {
      const urls = [...(prev.urls || [])];
      urls.splice(index, 1);
      return {
        ...prev,
        urls
      };
    });
    toast({
      title: "URL removida",
      description: "URL removida da lista",
    });
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

  const handleToggleAnalysisType = (typeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFormData(prev => {
      const currentTypes = prev.analysisTypes || [];
      const newTypes = currentTypes.includes(typeId)
        ? currentTypes.filter(id => id !== typeId)
        : [...currentTypes, typeId];
      return {
        ...prev,
        analysisTypes: newTypes
      };
    });
  };

  const handleToggleMetric = (metricId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFormData(prev => {
      const currentMetrics = prev.metrics || [];
      const newMetrics = currentMetrics.includes(metricId)
        ? currentMetrics.filter(id => id !== metricId)
        : [...currentMetrics, metricId];
      return {
        ...prev,
        metrics: newMetrics
      };
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const frequencies = [
    { value: "30min", label: "30 minutos" },
    { value: "1h", label: "1 hora" },
    { value: "3h", label: "3 horas" },
    { value: "6h", label: "6 horas" },
    { value: "12h", label: "12 horas" },
    { value: "24h", label: "24 horas" }
  ];

  return (
    <form id="monitoring-form" onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Monitoramento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Monitoramento</Label>
            <Input
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) {
                  setErrors(prev => ({ ...prev, name: false }));
                }
              }}
              className={cn(errors.name && "border-red-500")}
              placeholder="Digite o nome do monitoramento"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                Nome é obrigatório
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Responsável</Label>
            <Input
              value={formData.responsible}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, responsible: e.target.value }));
                if (errors.responsible) {
                  setErrors(prev => ({ ...prev, responsible: false }));
                }
              }}
              className={cn(errors.responsible && "border-red-500")}
              placeholder="Digite o nome do responsável"
            />
            {errors.responsible && (
              <span className="text-sm text-red-500">
                Responsável é obrigatório
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
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
            <div className={cn(
              "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
              errors.analysisTypes && "border border-red-500 rounded-lg p-2"
            )}>
              {analysisTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className={cn(
                    "cursor-pointer transition-colors",
                    formData.analysisTypes?.includes(type.id) 
                      ? "bg-primary/10 hover:bg-primary/20" 
                      : "hover:bg-secondary/10"
                  )}
                  onClick={(e) => handleToggleAnalysisType(type.id, e)}
                >
                  <CardContent 
                    className="flex items-center gap-2 p-4"
                    onClick={handleCardClick}
                  >
                    <Switch
                      checked={formData.analysisTypes?.includes(type.id)}
                      onCheckedChange={() => handleToggleAnalysisType(type.id)}
                      onClick={handleCardClick}
                    />
                    <div onClick={handleCardClick}>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {errors.analysisTypes && (
              <span className="text-sm text-red-500">
                Selecione pelo menos um tipo de análise
              </span>
            )}
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
                onClick={(e) => {
                  e.preventDefault();
                  setFormData(prev => ({
                    ...prev,
                    type: "url",
                  }));
                }}
              >
                URL
              </Button>
              <Button
                type="button"
                variant={formData.type === "api" ? "default" : "outline"}
                onClick={(e) => {
                  e.preventDefault();
                  setFormData(prev => ({
                    ...prev,
                    type: "api",
                  }));
                }}
              >
                API
              </Button>
            </div>
          </div>

          {formData.type === "url" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Endereços para Monitoramento</Label>
                <div className="flex gap-2">
                  <Input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="exemplo.com"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddUrl();
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddUrl();
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
              
              {formData.urls && formData.urls.length > 0 && (
                <div className="border rounded-lg p-4 bg-card">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    {formData.urls.length === 1 ? "Endereço Adicionado:" : "Endereços Adicionados:"}
                  </Label>
                  <div className="space-y-2">
                    {formData.urls.map((url, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 bg-secondary/20 p-2 rounded-md"
                      >
                        <span className="flex-1 text-sm font-medium break-all">{url}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveUrl(index);
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

          {formData.type === "api" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>URL da API</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.apiEndpoint || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      apiEndpoint: e.target.value
                    }))}
                    placeholder="api.exemplo.com/endpoint"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && formData.apiEndpoint?.trim()) {
                        e.preventDefault();
                        toast({
                          title: "API Configurada",
                          description: "Endpoint da API foi configurado com sucesso!"
                        });
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (formData.apiEndpoint?.trim()) {
                        toast({
                          title: "API Configurada",
                          description: "Endpoint da API foi configurado com sucesso!"
                        });
                      }
                    }}
                  >
                    Configurar
                  </Button>
                </div>
              </div>

              {formData.apiEndpoint && (
                <div className="border rounded-lg p-4 bg-card">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    API Configurada:
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-secondary/20 p-2 rounded-md">
                      <span className="flex-1 text-sm font-medium break-all">
                        {formData.apiEndpoint}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData(prev => ({ ...prev, apiEndpoint: "" }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label>Métricas de Monitoramento</Label>
            <div className={cn(
              "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
              errors.metrics && "border border-red-500 rounded-lg p-2"
            )}>
              {metrics.map((metric) => (
                <Card 
                  key={metric.id} 
                  className={cn(
                    "cursor-pointer transition-colors",
                    formData.metrics?.includes(metric.id) 
                      ? "bg-primary/10 hover:bg-primary/20" 
                      : "hover:bg-secondary/10"
                  )}
                  onClick={(e) => handleToggleMetric(metric.id, e)}
                >
                  <CardContent 
                    className="flex items-center gap-2 p-4"
                    onClick={handleCardClick}
                  >
                    <Switch
                      checked={formData.metrics?.includes(metric.id)}
                      onCheckedChange={() => handleToggleMetric(metric.id)}
                      onClick={handleCardClick}
                    />
                    <div onClick={handleCardClick}>
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {metric.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {errors.metrics && (
              <span className="text-sm text-red-500">
                Selecione pelo menos uma métrica
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência de Monitoramento</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, frequency: value }));
              }}
            >
              <SelectTrigger 
                id="frequency" 
                className="w-[200px]"
                onClick={handleCardClick}
              >
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
                {frequencies.map((freq) => (
                  <SelectItem 
                    key={freq.value} 
                    value={freq.value}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          type="button"
          className="w-[150px]"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin/monitoring", { replace: true });
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" className="w-[150px]">
          Criar Monitoramento
        </Button>
      </div>
    </form>
  );
};
