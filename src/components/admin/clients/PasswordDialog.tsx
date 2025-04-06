
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PasswordDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onResetPassword: (password: string) => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  isOpen,
  onOpenChange,
  onResetPassword
}) => {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(result);
    setGeneratedPassword(result);
    return result;
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(newPassword || generatedPassword);
    toast({
      title: "Senha copiada",
      description: "A senha foi copiada para a área de transferência.",
    });
  };

  const handleResetPassword = () => {
    const passwordToUse = newPassword || generateRandomPassword();
    onResetPassword(passwordToUse);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redefinir Senha</DialogTitle>
          <DialogDescription>
            Defina uma nova senha para o cliente ou utilize uma senha gerada automaticamente.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nova senha</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite uma nova senha"
              />
              <Button variant="outline" type="button" onClick={handleCopyPassword} className="flex-shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={generateRandomPassword}
            className="w-full"
          >
            Gerar Senha Aleatória
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleResetPassword}>
            Redefinir Senha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
