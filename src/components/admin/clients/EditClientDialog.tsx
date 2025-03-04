
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceType } from "@/hooks/useClientAuth";
import { Client } from "@/services/clientService";

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
  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Edite as informações do cliente e clique em Salvar para confirmar as alterações.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nome *</Label>
            <Input
              value={client.name}
              onChange={(e) => onClientChange("name", e.target.value)}
              placeholder="Nome completo do cliente"
            />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={client.email}
              onChange={(e) => onClientChange("email", e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Serviço *</Label>
            <Select
              value={client.serviceType}
              onValueChange={(value) => onClientChange("serviceType", value)}
            >
              <SelectTrigger>
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
            <Label>Data de Expiração</Label>
            <Input
              type="date"
              value={client.expiresAt ? new Date(client.expiresAt).toISOString().split('T')[0] : ''}
              onChange={(e) => onClientChange("expiresAt", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientDialog;
