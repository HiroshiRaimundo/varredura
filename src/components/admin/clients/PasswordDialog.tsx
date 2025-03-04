
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PasswordDialogProps {
  password: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCopyPassword: (password: string) => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  password,
  isOpen,
  onOpenChange,
  onCopyPassword
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Senha Gerada</DialogTitle>
          <DialogDescription>
            Guarde esta senha em um local seguro. Ela será necessária para o primeiro acesso do cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg flex items-center justify-between">
            <code className="text-lg font-mono">{password}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyPassword(password)}
              title="Copiar senha"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Recomende ao cliente que altere esta senha no primeiro acesso.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
