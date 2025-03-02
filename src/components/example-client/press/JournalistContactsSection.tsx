
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PlusCircle, Trash2, User, Mail, Phone, AtSign, Building, Edit } from "lucide-react";

// Tipos
interface ContactFormValues {
  name: string;
  type: "journalist" | "company";
  email: string;
  phone: string;
  socialMedia: string;
  company?: string;
  position?: string;
  notes: string;
}

// Dados mockados
const mockJournalists = [
  {
    id: "1",
    name: "Maria Silva",
    type: "journalist",
    email: "maria.silva@jornal.com",
    phone: "(11) 98765-4321",
    socialMedia: "@mariasilva",
    company: "Jornal Nacional",
    position: "Editora de Economia",
    notes: "Interesse em pautas de economia e negócios."
  },
  {
    id: "2",
    name: "João Pereira",
    type: "journalist",
    email: "joao.pereira@noticias.com",
    phone: "(21) 99876-5432",
    socialMedia: "@joaopereira",
    company: "Portal de Notícias G1",
    position: "Repórter de Tecnologia",
    notes: "Especializado em coberturas de tecnologia e inovação."
  }
];

const mockCompanies = [
  {
    id: "3",
    name: "Grupo Folha",
    type: "company",
    email: "contato@folha.com.br",
    phone: "(11) 3333-4444",
    socialMedia: "@grupofolha",
    notes: "Maior grupo de mídia impressa do país."
  },
  {
    id: "4",
    name: "Rede Globo",
    type: "company",
    email: "imprensa@globo.com",
    phone: "(21) 2555-7777",
    socialMedia: "@redeglobo",
    notes: "Principal rede de televisão."
  }
];

const JournalistContactsSection: React.FC = () => {
  const [contacts, setContacts] = useState({
    journalists: mockJournalists,
    companies: mockCompanies
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      type: "journalist",
      email: "",
      phone: "",
      socialMedia: "",
      company: "",
      position: "",
      notes: ""
    }
  });

  const openNewContactForm = () => {
    form.reset({
      name: "",
      type: "journalist",
      email: "",
      phone: "",
      socialMedia: "",
      company: "",
      position: "",
      notes: ""
    });
    setEditingContact(null);
    setIsOpen(true);
  };

  const openEditContactForm = (contact: any) => {
    form.reset({
      name: contact.name,
      type: contact.type,
      email: contact.email,
      phone: contact.phone,
      socialMedia: contact.socialMedia,
      company: contact.company || "",
      position: contact.position || "",
      notes: contact.notes
    });
    setEditingContact(contact);
    setIsOpen(true);
  };

  const onSubmit = (data: ContactFormValues) => {
    if (editingContact) {
      // Editar contato existente
      if (data.type === "journalist") {
        setContacts({
          ...contacts,
          journalists: contacts.journalists.map(j => 
            j.id === editingContact.id ? { ...data, id: editingContact.id } : j
          )
        });
      } else {
        setContacts({
          ...contacts,
          companies: contacts.companies.map(c => 
            c.id === editingContact.id ? { ...data, id: editingContact.id } : c
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
        setContacts({
          ...contacts,
          journalists: [...contacts.journalists, { ...data, id: newId }]
        });
      } else {
        setContacts({
          ...contacts,
          companies: [...contacts.companies, { ...data, id: newId }]
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1" onClick={openNewContactForm}>
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="journalist">Jornalista</SelectItem>
                          <SelectItem value="company">Empresa/Veículo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="socialMedia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Redes Sociais</FormLabel>
                      <FormControl>
                        <Input placeholder="@usuario (Twitter, Instagram, etc)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("type") === "journalist" && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa/Veículo</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo</FormLabel>
                          <FormControl>
                            <Input placeholder="Cargo na empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Informações adicionais sobre o contato"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">
                    {editingContact ? "Salvar alterações" : "Adicionar contato"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
          
          <TabsContent value="journalists" className="space-y-4">
            {contacts.journalists.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum jornalista cadastrado.</p>
              </div>
            ) : (
              contacts.journalists.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{contact.name}</h3>
                      <p className="text-sm">{contact.position} - {contact.company}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {contact.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {contact.phone}
                        </div>
                        {contact.socialMedia && (
                          <div className="flex items-center">
                            <AtSign className="h-4 w-4 mr-1" />
                            {contact.socialMedia}
                          </div>
                        )}
                      </div>
                      {contact.notes && (
                        <p className="mt-2 text-sm italic">{contact.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditContactForm(contact)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(contact.id, "journalist")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="companies" className="space-y-4">
            {contacts.companies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma empresa cadastrada.</p>
              </div>
            ) : (
              contacts.companies.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{contact.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {contact.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {contact.phone}
                        </div>
                        {contact.socialMedia && (
                          <div className="flex items-center">
                            <AtSign className="h-4 w-4 mr-1" />
                            {contact.socialMedia}
                          </div>
                        )}
                      </div>
                      {contact.notes && (
                        <p className="mt-2 text-sm italic">{contact.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditContactForm(contact)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(contact.id, "company")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JournalistContactsSection;
