
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMonitoring } from "@/hooks/useMonitoring";

interface NewMonitoringFormProps {
  onSubmitSuccess: () => void;
  editingId?: string | null;
}

const NewMonitoringForm: React.FC<NewMonitoringFormProps> = ({ 
  onSubmitSuccess,
  editingId = null
}) => {
  const { monitoringItems, addMonitoring } = useMonitoring();
  
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    frequency: "diario",
    category: "noticias",
    keywords: "",
    notes: ""
  });
  
  // Load editing data if an ID is provided
  useEffect(() => {
    if (editingId) {
      const monitoringToEdit = monitoringItems.find(item => item.id === editingId);
      if (monitoringToEdit) {
        setFormData({
          name: monitoringToEdit.name,
          url: monitoringToEdit.url,
          frequency: monitoringToEdit.frequency,
          category: monitoringToEdit.category,
          keywords: monitoringToEdit.keywords || "",
          notes: monitoringToEdit.notes || ""
        });
      }
    }
  }, [editingId, monitoringItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addMonitoring({
        ...formData,
        id: editingId || undefined,
        status: "active"
      });
      
      // Reset form
      setFormData({
        name: "",
        url: "",
        frequency: "diario",
        category: "noticias",
        keywords: "",
        notes: ""
      });
      
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao salvar monitoramento:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Monitoramento</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Portal G1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL a Monitorar</Label>
            <Input 
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://exemplo.com.br"
              type="url"
              required
            />
            <p className="text-xs text-muted-foreground">
              Insira a URL completa da fonte a ser monitorada
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência de Monitoramento</Label>
            <Select 
              value={formData.frequency} 
              onValueChange={(value) => handleSelectChange("frequency", value)}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diario">Diário</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="quinzenal">Quinzenal</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noticias">Notícias</SelectItem>
                <SelectItem value="legislacao">Legislação</SelectItem>
                <SelectItem value="documentos">Documentos</SelectItem>
                <SelectItem value="releases">Releases</SelectItem>
                <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keywords">Termos para Monitorar</Label>
          <Textarea 
            id="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            placeholder="Digite os termos separados por vírgula. Ex: sustentabilidade, meio ambiente, energia renovável"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Estes termos serão utilizados para identificar menções relevantes nas fontes monitoradas
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea 
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Observações adicionais sobre este monitoramento"
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onSubmitSuccess}
        >
          Cancelar
        </Button>
        <Button type="submit">
          {editingId ? "Atualizar Monitoramento" : "Criar Monitoramento"}
        </Button>
      </div>
    </form>
  );
};

export default NewMonitoringForm;
