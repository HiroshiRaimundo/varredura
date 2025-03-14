
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceType } from "@/hooks/useClientAuth";
import { Client } from "@/services/clientService";
import { toast } from "@/hooks/use-toast";

interface EditClientDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onClientChange: (field: string, value: string) => void;
  onSave: () => void;
}

const EditClientDialog: React.FC<EditClientDialogProps> = ({
  isOpen,
  onOpenChange,
  client,
  onClientChange,
  onSave
}) => {
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  // Reset errors when dialog opens or client changes
  useEffect(() => {
    if (isOpen && client) {
      setErrors({});
    }
  }, [isOpen, client]);

  const validateForm = (): boolean => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!client?.name?.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!client?.email?.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = "Email inválido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave();
    } else {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário",
        variant: "destructive"
      });
    }
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Edite as informações do cliente e clique em Salvar para confirmar as alterações.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
              Nome *
            </Label>
            <Input
              id="name"
              value={client.name}
              onChange={(e) => onClientChange("name", e.target.value)}
              placeholder="Nome completo do cliente"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={client.email}
              onChange={(e) => onClientChange("email", e.target.value)}
              placeholder="email@exemplo.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceType">Tipo de Serviço *</Label>
            <Select
              value={client.serviceType}
              onValueChange={(value) => onClientChange("serviceType", value)}
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ServiceType.OBSERVATORY}>Observatório</SelectItem>
                <SelectItem value={ServiceType.PRESS}>Assessoria de Imprensa</SelectItem>
                <SelectItem value={ServiceType.RESEARCHER}>Pesquisador</SelectItem>
                <SelectItem value={ServiceType.POLITICIAN}>Político</SelectItem>
                <SelectItem value={ServiceType.INSTITUTION}>Instituição</SelectItem>
                <SelectItem value={ServiceType.JOURNALIST}>Jornalista</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={client.status}
              onValueChange={(value) => onClientChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiresAt">Data de Expiração</Label>
            <Input
              id="expiresAt"
              type="date"
              value={client.expiresAt ? new Date(client.expiresAt).toISOString().split('T')[0] : ''}
              onChange={(e) => onClientChange("expiresAt", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Deixe em branco para acesso sem expiração.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientDialog;
