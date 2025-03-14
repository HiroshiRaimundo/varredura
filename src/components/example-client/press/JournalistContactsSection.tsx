
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Building } from "lucide-react";
import { ContactFormValues, Contact, ContactsState } from "./types/contactTypes";
import { mockJournalists, mockCompanies } from "./data/mockContacts";
import ContactsList from "./components/ContactsList";
import ContactDialog from "./components/ContactDialog";

const JournalistContactsSection: React.FC = () => {
  const [contacts, setContacts] = useState<ContactsState>({
    journalists: mockJournalists,
    companies: mockCompanies
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  const openNewContactForm = () => {
    setEditingContact(null);
    setIsOpen(true);
  };

  const openEditContactForm = (contact: Contact) => {
    setEditingContact(contact);
    setIsOpen(true);
  };

  const handleFormSubmit = (data: ContactFormValues) => {
    if (editingContact) {
      // Editar contato existente
      if (data.type === "journalist") {
        const updatedContact = {
          id: editingContact.id,
          name: data.name,
          type: "journalist" as const,
          email: data.email,
          phone: data.phone,
          socialMedia: data.socialMedia,
          company: data.company || "Não informado",
          position: data.position || "Não informado",
          notes: data.notes
        };

        setContacts({
          ...contacts,
          journalists: contacts.journalists.map(j => 
            j.id === editingContact.id ? updatedContact : j
          )
        });
      } else {
        const updatedContact = {
          id: editingContact.id,
          name: data.name,
          type: "company" as const,
          email: data.email,
          phone: data.phone,
          socialMedia: data.socialMedia,
          notes: data.notes
        };

        setContacts({
          ...contacts,
          companies: contacts.companies.map(c => 
            c.id === editingContact.id ? updatedContact : c
          )
        });
      }
      
      toast({
        title: "Contato atualizado",
        description: `O contato "${data.name}" foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo contato
      const newId = Date.now().toString();
      
      if (data.type === "journalist") {
        const newContact = {
          id: newId,
          name: data.name,
          type: "journalist" as const,
          email: data.email,
          phone: data.phone,
          socialMedia: data.socialMedia,
          company: data.company || "Não informado",
          position: data.position || "Não informado",
          notes: data.notes
        };

        setContacts({
          ...contacts,
          journalists: [...contacts.journalists, newContact]
        });
      } else {
        const newContact = {
          id: newId,
          name: data.name,
          type: "company" as const,
          email: data.email,
          phone: data.phone,
          socialMedia: data.socialMedia,
          notes: data.notes
        };

        setContacts({
          ...contacts,
          companies: [...contacts.companies, newContact]
        });
      }
      
      toast({
        title: "Contato adicionado",
        description: `O contato "${data.name}" foi adicionado com sucesso.`,
      });
    }
    
    setIsOpen(false);
  };

  const handleDelete = (id: string, type: "journalist" | "company") => {
    if (type === "journalist") {
      setContacts({
        ...contacts,
        journalists: contacts.journalists.filter(j => j.id !== id)
      });
    } else {
      setContacts({
        ...contacts,
        companies: contacts.companies.filter(c => c.id !== id)
      });
    }
    
    toast({
      title: "Contato removido",
      description: "O contato foi removido com sucesso.",
      variant: "destructive"
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Contatos de Imprensa</CardTitle>
        <ContactDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={handleFormSubmit}
          editingContact={editingContact}
          onAddNewClick={openNewContactForm}
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="journalists" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="journalists" className="flex gap-2">
              <User className="h-4 w-4" />
              Jornalistas ({contacts.journalists.length})
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex gap-2">
              <Building className="h-4 w-4" />
              Empresas/Veículos ({contacts.companies.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="journalists">
            <ContactsList
              contacts={contacts.journalists}
              onEdit={openEditContactForm}
              onDelete={handleDelete}
              type="journalists"
            />
          </TabsContent>
          
          <TabsContent value="companies">
            <ContactsList
              contacts={contacts.companies}
              onEdit={openEditContactForm}
              onDelete={handleDelete}
              type="companies"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JournalistContactsSection;
