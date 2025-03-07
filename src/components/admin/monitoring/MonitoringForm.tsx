import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface MonitoringFormData {
  name: string;
  url: string;
  type: string;
  frequency: string;
  keywords: string;
  description: string;
  notifications: boolean;
  isApi: boolean;
  apiKey?: string;
  apiEndpoint?: string;
}

const initialFormData: MonitoringFormData = {
  name: "",
  url: "",
  type: "",
  frequency: "1h",
  keywords: "",
  description: "",
  notifications: true,
  isApi: false,
  apiKey: "",
  apiEndpoint: ""
};

export const MonitoringForm: React.FC = () => {
  const [formData, setFormData] = useState<MonitoringFormData>(initialFormData);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || (!formData.url && !formData.apiEndpoint)) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.isApi && !formData.apiKey) {
      toast({
        title: "Erro de Validação",
        description: "API Key é obrigatória para monitoramento de APIs.",
        variant: "destructive"
      });
      return;
    }

    // Aqui você adicionaria a lógica para salvar o monitoramento
    console.log("Dados do formulário:", formData);
    
    toast({
      title: "Sucesso",
      description: "Monitoramento criado com sucesso!"
    });

    // Limpa o formulário
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Monitoramento *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Portal da Transparência"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Monitoramento</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="governo">Governo</SelectItem>
              <SelectItem value="noticias">Notícias</SelectItem>
              <SelectItem value="licitacoes">Licitações</SelectItem>
              <SelectItem value="diario">Diário Oficial</SelectItem>
              <SelectItem value="api">API (IBGE, etc)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequência de Verificação</Label>
          <Select
            value={formData.frequency}
            onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a frequência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5min">5 minutos</SelectItem>
              <SelectItem value="15min">15 minutos</SelectItem>
              <SelectItem value="30min">30 minutos</SelectItem>
              <SelectItem value="1h">1 hora</SelectItem>
              <SelectItem value="6h">6 horas</SelectItem>
              <SelectItem value="12h">12 horas</SelectItem>
              <SelectItem value="24h">24 horas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tipo de Fonte</Label>
          <Select
            value={formData.isApi ? "api" : "url"}
            onValueChange={(value) => setFormData(prev => ({ ...prev, isApi: value === "api" }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="api">API</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.isApi ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">Endpoint da API *</Label>
              <Input
                id="apiEndpoint"
                value={formData.apiEndpoint}
                onChange={(e) => setFormData(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                placeholder="https://api.exemplo.com/v1/dados"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key *</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Sua chave de API"
              />
            </div>
          </>
        ) : (
          <div className="space-y-2 col-span-2">
            <Label htmlFor="url">URL para Monitorar *</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">Palavras-chave (separadas por vírgula)</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
          placeholder="termo1, termo2, termo3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Descreva o objetivo deste monitoramento..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={() => setFormData(initialFormData)}>
          Limpar
        </Button>
        <Button type="submit">
          Criar Monitoramento
        </Button>
      </div>
    </form>
  );
};
