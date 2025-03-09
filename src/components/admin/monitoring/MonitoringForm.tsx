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
  groupAnalysis?: {
    enabled: boolean;
    crossAnalysis: boolean;
    analysisTypes: string[];
  };
  analysisTypes?: string[];
}

const metrics = [
  // Análise de Conteúdo
  {
    id: "content_analysis",
    name: "Análise de Conteúdo",
    description: "Análise completa do conteúdo da página"
  },
  {
    id: "content_changes",
    name: "Mudanças de Conteúdo",
    description: "Detecta alterações no conteúdo"
  },
  {
    id: "keyword_presence",
    name: "Presença de Palavras-chave",
    description: "Monitora palavras-chave específicas"
  },
  {
    id: "text_extraction",
    name: "Extração de Texto",
    description: "Extrai e analisa texto relevante"
  },

  // Análise Preditiva
  {
    id: "predictive_analysis",
    name: "Análise Preditiva",
    description: "Previsão de tendências e comportamentos"
  },
  {
    id: "pattern_detection",
    name: "Detecção de Padrões",
    description: "Identifica padrões recorrentes"
  },
  {
    id: "anomaly_detection",
    name: "Detecção de Anomalias",
    description: "Identifica comportamentos anormais"
  },

  // Análise de Sentimento
  {
    id: "sentiment_analysis",
    name: "Análise de Sentimento",
    description: "Analisa o sentimento do conteúdo"
  },
  {
    id: "emotional_tone",
    name: "Tom Emocional",
    description: "Avalia o tom emocional do conteúdo"
  },
  {
    id: "opinion_mining",
    name: "Mineração de Opinião",
    description: "Extrai e analisa opiniões"
  },

  // Análise de Tendências
  {
    id: "trend_analysis",
    name: "Análise de Tendências",
    description: "Identifica tendências ao longo do tempo"
  },
  {
    id: "temporal_patterns",
    name: "Padrões Temporais",
    description: "Analisa padrões ao longo do tempo"
  },
  {
    id: "growth_analysis",
    name: "Análise de Crescimento",
    description: "Monitora taxas de crescimento"
  },

  // Análise de Frequência
  {
    id: "frequency_analysis",
    name: "Análise de Frequência",
    description: "Analisa frequência de termos/elementos"
  },
  {
    id: "term_frequency",
    name: "Frequência de Termos",
    description: "Monitora termos mais comuns"
  },

  // Análise de Links
  {
    id: "link_analysis",
    name: "Análise de Links",
    description: "Analisa estrutura de links"
  },
  {
    id: "broken_links",
    name: "Links Quebrados",
    description: "Detecta links quebrados"
  },
  {
    id: "link_structure",
    name: "Estrutura de Links",
    description: "Mapeia estrutura de navegação"
  },

  // Análise de Performance
  {
    id: "performance_analysis",
    name: "Análise de Performance",
    description: "Monitora desempenho geral"
  },
  {
    id: "load_time",
    name: "Tempo de Carregamento",
    description: "Monitora tempo de carregamento"
  },
  {
    id: "response_time",
    name: "Tempo de Resposta",
    description: "Monitora tempo de resposta"
  },

  // Análise de Disponibilidade
  {
    id: "availability_analysis",
    name: "Análise de Disponibilidade",
    description: "Monitora disponibilidade do site"
  },
  {
    id: "uptime_monitoring",
    name: "Monitoramento de Uptime",
    description: "Monitora tempo online"
  },

  // Análise de Metadados
  {
    id: "metadata_analysis",
    name: "Análise de Metadados",
    description: "Analisa metadados da página"
  },
  {
    id: "meta_tags",
    name: "Meta Tags",
    description: "Monitora meta tags"
  },
  {
    id: "headers",
    name: "Headers HTTP",
    description: "Analisa headers de resposta"
  },

  // Análise de Dados Estruturados
  {
    id: "structured_data",
    name: "Dados Estruturados",
    description: "Analisa dados estruturados"
  },
  {
    id: "json_ld",
    name: "JSON-LD",
    description: "Analisa marcação JSON-LD"
  },
  {
    id: "microdata",
    name: "Microdata",
    description: "Analisa marcação Microdata"
  }
];

export const MonitoringForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MonitoringFormData>({
    name: "",
    type: "url",
    urls: [],
    frequency: "30min",
    active: true,
    responsible: "",
    description: "",
    keywords: [],
    categories: [],
    customCategories: [],
    analysisTypes: [],
    groupAnalysis: {
      enabled: false,
      crossAnalysis: false,
      analysisTypes: []
    }
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [monitoringType, setMonitoringType] = useState<"url" | "api">("url");

  const frequencies = [
    { value: "30min", label: "30 minutos" },
    { value: "1h", label: "1 hora" },
    { value: "12h", label: "12 horas" },
    { value: "24h", label: "24 horas" },
    { value: "weekly", label: "Semanal" },
    { value: "monthly", label: "Mensal" }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name || !formData.responsible) {
      toast({
        title: "Erro de Validação",
        description: "Nome e Responsável são campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === "url" && (!formData.urls || formData.urls.length === 0)) {
      toast({
        title: "Erro de Validação",
        description: "Pelo menos uma URL é obrigatória para monitoramento de URL",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === "api" && (!formData.apiEndpoint || !formData.apiKey)) {
      toast({
        title: "Erro de Validação",
        description: "O endpoint e a chave da API são obrigatórios para monitoramento de API",
        variant: "destructive"
      });
      return;
    }

    // Aqui você faria a chamada para a API
    console.log("Dados do formulário:", formData);
    
    toast({
      title: "Sucesso",
      description: "Monitoramento criado com sucesso!"
    });

    navigate("/admin/monitoring");
  };

  const handleCancel = () => {
    navigate("/admin/monitoring");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Novo Monitoramento</h2>
        <p className="text-muted-foreground">
          Configure uma nova fonte de monitoramento
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="space-y-2">
              <Label>Tipo de Monitoramento</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={monitoringType === "url" ? "default" : "outline"}
                  onClick={() => {
                    setMonitoringType("url");
                    setFormData({
                      ...formData,
                      type: "url",
                      url: "",
                      urls: [],
                      apiEndpoint: ""
                    });
                  }}
                >
                  URL
                </Button>
                <Button
                  type="button"
                  variant={monitoringType === "api" ? "default" : "outline"}
                  onClick={() => {
                    setMonitoringType("api");
                    setFormData({
                      ...formData,
                      type: "api",
                      url: "",
                      urls: [],
                      apiEndpoint: ""
                    });
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
                      value={formData.url || ""}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://exemplo.com"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (!formData.url?.trim()) {
                            toast({
                              title: "Erro",
                              description: "Digite uma URL válida",
                              variant: "destructive"
                            });
                            return;
                          }
                          try {
                            new URL(formData.url);
                            const urls = formData.urls || [];
                            if (urls.includes(formData.url)) {
                              toast({
                                title: "Erro",
                                description: "Esta URL já foi adicionada",
                                variant: "destructive"
                              });
                              return;
                            }
                            setFormData({
                              ...formData,
                              urls: [...urls, formData.url],
                              url: ""
                            });
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
                        if (!formData.url?.trim()) {
                          toast({
                            title: "Erro",
                            description: "Digite uma URL válida",
                            variant: "destructive"
                          });
                          return;
                        }
                        try {
                          new URL(formData.url);
                          const urls = formData.urls || [];
                          if (urls.includes(formData.url)) {
                            toast({
                              title: "Erro",
                              description: "Esta URL já foi adicionada",
                              variant: "destructive"
                            });
                            return;
                          }
                          setFormData({
                            ...formData,
                            urls: [...urls, formData.url],
                            url: ""
                          });
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
                    <Label className="text-sm text-muted-foreground">URLs Adicionadas:</Label>
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

            {formData.type === "api" && (
              <div className="space-y-2">
                <Label>URL da API</Label>
                <Input
                  value={formData.apiEndpoint || ""}
                  onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                  placeholder="https://api.exemplo.com/endpoint"
                />
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

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Monitoramento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analysisContent"
                      checked={formData.analysisTypes?.includes("content")}
                      onCheckedChange={(checked) => {
                        const types = formData.analysisTypes || [];
                        setFormData({
                          ...formData,
                          analysisTypes: checked 
                            ? [...types, "content"]
                            : types.filter(t => t !== "content")
                        });
                      }}
                    />
                    <Label htmlFor="analysisContent">Análise de Conteúdo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analysisPredictive"
                      checked={formData.analysisTypes?.includes("predictive")}
                      onCheckedChange={(checked) => {
                        const types = formData.analysisTypes || [];
                        setFormData({
                          ...formData,
                          analysisTypes: checked 
                            ? [...types, "predictive"]
                            : types.filter(t => t !== "predictive")
                        });
                      }}
                    />
                    <Label htmlFor="analysisPredictive">Análise Preditiva</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analysisSentiment"
                      checked={formData.analysisTypes?.includes("sentiment")}
                      onCheckedChange={(checked) => {
                        const types = formData.analysisTypes || [];
                        setFormData({
                          ...formData,
                          analysisTypes: checked 
                            ? [...types, "sentiment"]
                            : types.filter(t => t !== "sentiment")
                        });
                      }}
                    />
                    <Label htmlFor="analysisSentiment">Análise de Sentimento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analysisTrend"
                      checked={formData.analysisTypes?.includes("trend")}
                      onCheckedChange={(checked) => {
                        const types = formData.analysisTypes || [];
                        setFormData({
                          ...formData,
                          analysisTypes: checked 
                            ? [...types, "trend"]
                            : types.filter(t => t !== "trend")
                        });
                      }}
                    />
                    <Label htmlFor="analysisTrend">Análise de Tendências</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Análise em Grupo</Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="groupAnalysis"
                    checked={formData.groupAnalysis?.enabled}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...formData,
                        groupAnalysis: {
                          enabled: checked,
                          crossAnalysis: formData.groupAnalysis?.crossAnalysis || false,
                          analysisTypes: formData.groupAnalysis?.analysisTypes || []
                        }
                      });
                    }}
                  />
                  <Label htmlFor="groupAnalysis">Habilitar Análise em Grupo</Label>
                </div>

                {formData.groupAnalysis?.enabled && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="crossAnalysis"
                        checked={formData.groupAnalysis.crossAnalysis}
                        onCheckedChange={(checked) => {
                          setFormData({
                            ...formData,
                            groupAnalysis: {
                              ...formData.groupAnalysis,
                              crossAnalysis: checked
                            }
                          });
                        }}
                      />
                      <Label htmlFor="crossAnalysis">Permitir Análises Cruzadas</Label>
                    </div>

                    <div className="pl-6 space-y-2">
                      <Label>Tipos de Análise em Grupo</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {(formData.analysisTypes || []).map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Switch
                              id={`groupAnalysis${type}`}
                              checked={formData.groupAnalysis?.analysisTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                const types = formData.groupAnalysis?.analysisTypes || [];
                                setFormData({
                                  ...formData,
                                  groupAnalysis: {
                                    ...formData.groupAnalysis!,
                                    analysisTypes: checked 
                                      ? [...types, type]
                                      : types.filter(t => t !== type)
                                  }
                                });
                              }}
                            />
                            <Label htmlFor={`groupAnalysis${type}`}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit">Criar Monitoramento</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
