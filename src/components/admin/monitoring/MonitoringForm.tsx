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
}

export const MonitoringForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MonitoringFormData>({
    name: "",
    type: "url",
    url: "",
    frequency: "30min",
    active: true,
    responsible: "",
    description: "",
    keywords: [],
    categories: [],
    customCategories: []
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState("");

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

    if (formData.type === "url" && !formData.url) {
      toast({
        title: "Erro de Validação",
        description: "A URL é obrigatória para monitoramento de URL",
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
              <Select
                value={formData.type}
                onValueChange={(value: "url" | "api") => {
                  setFormData({
                    ...formData,
                    type: value,
                    url: value === "url" ? "" : undefined,
                    apiEndpoint: value === "api" ? "" : undefined,
                    apiKey: value === "api" ? "" : undefined
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type === "url" && (
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://exemplo.com"
                />
              </div>
            )}

            {formData.type === "api" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">Endpoint da API</Label>
                  <Input
                    id="apiEndpoint"
                    value={formData.apiEndpoint}
                    onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                    placeholder="https://api.exemplo.com/endpoint"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Chave da API</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    placeholder="Sua chave de API"
                  />
                </div>
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
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Criar Monitoramento</Button>
        </div>
      </form>
    </div>
  );
};
