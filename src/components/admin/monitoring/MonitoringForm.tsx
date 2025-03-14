import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMonitoring } from "@/contexts/MonitoringContext";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

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

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const theme = formData.description.toLowerCase().split(' ').slice(0, 3).join(' ');
    const newMonitoring = {
      id: generateId(),
      name: formData.name,
      responsible: formData.responsible,
      description: formData.description,
      frequency: formData.frequency,
      urls: formData.urls,
      metrics: formData.metrics,
      analysisTypes: formData.analysisTypes,
      status: "active",
      createdAt: new Date().toISOString(),
      theme
    };

    addMonitoring(newMonitoring);

    // Limpar formulário
    setFormData(initialFormState);
    setUrlInput('');
    setNewKeyword('');
    setNewCategory('');
    setErrors({});

    // Alerta de sucesso personalizado
    toast.custom((t) => (
      <div className={cn(
        "pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5",
        "dark:bg-gray-800 dark:ring-white dark:ring-opacity-10",
        "p-6 transition-all duration-300 ease-in-out",
        t.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}>
        <div className="w-full">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Monitoramento criado com sucesso!
              </p>
              <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Nome:</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{newMonitoring.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Tema:</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{theme}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">URLs:</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{newMonitoring.urls?.length || 0} endereços</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Métricas:</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{newMonitoring.metrics?.length || 0} configuradas</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-blue-600 dark:text-blue-400">
                  Disponível em Visão Geral nos monitoramentos ativos
                </p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                onClick={() => toast.dismiss(t.id)}
              >
                <span className="sr-only">Fechar</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 6000,
      position: "top-right",
    });

    // Redirecionar para a visão geral
    navigate("/admin/monitoring");
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

  const handleToggleAnalysisType = (typeId: string) => {
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
    if (errors.analysisTypes) {
      setErrors(prev => ({ ...prev, analysisTypes: false }));
    }
  };

  const handleToggleMetric = (metricId: string) => {
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
    if (errors.metrics) {
      setErrors(prev => ({ ...prev, metrics: false }));
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
    <form onSubmit={handleSubmit} className="space-y-8">
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

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div
                  key={metric.id}
                  className={cn(
                    "flex items-start space-x-4 p-3 rounded-lg",
                    formData.metrics?.includes(metric.id) ? "bg-secondary/20" : "bg-background",
                    errors.metrics && "border border-red-500"
                  )}
                >
                  <Switch
                    checked={formData.metrics?.includes(metric.id)}
                    onCheckedChange={() => handleToggleMetric(metric.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{metric.name}</div>
                    <div className="text-sm text-muted-foreground">{metric.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Análise</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisTypes.map((type) => (
                <div
                  key={type.id}
                  className={cn(
                    "flex items-start space-x-4 p-3 rounded-lg",
                    formData.analysisTypes?.includes(type.id) ? "bg-secondary/20" : "bg-background",
                    errors.analysisTypes && "border border-red-500"
                  )}
                >
                  <Switch
                    checked={formData.analysisTypes?.includes(type.id)}
                    onCheckedChange={() => handleToggleAnalysisType(type.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{type.name}</div>
                    <div className="text-sm text-muted-foreground">{type.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequência de Monitoramento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full max-w-[240px]">
                <div className="relative">
                  <select
                    value={formData.frequency}
                    onChange={(e) => {
                      e.preventDefault();
                      setFormData(prev => ({ ...prev, frequency: e.target.value }));
                    }}
                    className={cn(
                      "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                  >
                    <option value="">Selecione a frequência</option>
                    {frequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </div>
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
                    onClick={() => setFormData(prev => ({ ...prev, type: "url" }))}
                  >
                    URL
                  </Button>
                  <Button
                    type="button"
                    variant={formData.type === "api" ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, type: "api" }))}
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
                <Label>Ativar monitoramento imediatamente</Label>
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
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
        </CardContent>
      </Card>
    </form>
  );
};
