
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ContactForm from "./ContactForm";
import { Contact, ContactFormValues } from "../types/contactTypes";

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ContactFormValues) => void;
  editingContact: Contact | null;
  onAddNewClick: () => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  editingContact,
  onAddNewClick
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" onClick={onAddNewClick}>
          <PlusCircle className="h-4 w-4" />
          Novo Contato
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{editingContact ? "Editar Contato" : "Adicionar Novo Contato"}</DialogTitle>
          <DialogDescription>
            {editingContact 
              ? "Edite as informações do contato abaixo." 
              : "Preencha os dados do contato que deseja adicionar."}
          </DialogDescription>
        </DialogHeader>
        
        <ContactForm onSubmit={onSubmit} initialContact={editingContact} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
