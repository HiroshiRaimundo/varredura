
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceType } from "@/hooks/useClientAuth";

// Updated type definition to include serviceType
export interface NewClientData {
  name: string;
  email: string;
  status: "active" | "inactive";
  serviceType: ServiceType;
}

interface AddClientDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newClient: NewClientData;
  onNewClientChange: (client: NewClientData) => void;
  onAddClient: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({
  isOpen,
  onOpenChange,
  newClient,
  onNewClientChange,
  onAddClient
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente para criar seu acesso.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nome *</Label>
            <Input
              value={newClient.name}
              onChange={(e) => onNewClientChange({ ...newClient, name: e.target.value })}
              placeholder="Nome completo do cliente"
            />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={newClient.email}
              onChange={(e) => onNewClientChange({ ...newClient, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Serviço *</Label>
            <Select
              value={newClient.serviceType}
              onValueChange={(value) => onNewClientChange({ ...newClient, serviceType: value as ServiceType })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de serviço" />
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onAddClient}>
            Adicionar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
