
import React from "react";
import { useForm } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserCircle, Mail, Phone, Globe, AtSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { JournalistContact, JournalistFormValues } from "../types/releaseTypes";

interface JournalistManagementProps {
  journalists: JournalistContact[];
  setJournalists: React.Dispatch<React.SetStateAction<JournalistContact[]>>;
}

const JournalistManagement: React.FC<JournalistManagementProps> = ({ journalists, setJournalists }) => {
  const [showJournalistForm, setShowJournalistForm] = React.useState(false);
  
  const journalistForm = useForm<JournalistFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      socialMedia: ''
    }
  });

  const handleAddJournalist = (data: JournalistFormValues) => {
    const newJournalist: JournalistContact = {
      id: Date.now().toString(),
      ...data
    };
    
    setJournalists([...journalists, newJournalist]);
    journalistForm.reset();
    setShowJournalistForm(false);
    
    toast({
      title: "Jornalista adicionado",
      description: "Contato adicionado com sucesso ao banco de dados."
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Banco de Contatos de Jornalistas</h3>
        
        <Dialog open={showJournalistForm} onOpenChange={setShowJournalistForm}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserCircle className="h-4 w-4" />
              Adicionar Jornalista
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Contato de Jornalista</DialogTitle>
              <DialogDescription>
                Cadastre informações de contato de jornalistas para envio de releases
              </DialogDescription>
            </DialogHeader>
            
            <Form {...journalistForm}>
              <form onSubmit={journalistForm.handleSubmit(handleAddJournalist)} className="space-y-4">
                <FormField
                  control={journalistForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do jornalista" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={journalistForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={journalistForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={journalistForm.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site/Veículo</FormLabel>
                      <FormControl>
                        <Input placeholder="exemplo.com.br" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={journalistForm.control}
                  name="socialMedia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Redes Sociais</FormLabel>
                      <FormControl>
                        <Input placeholder="@usuario" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Salvar Contato</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {journalists.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Site/Veículo</TableHead>
                <TableHead>Redes Sociais</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalists.map((journalist) => (
                <TableRow key={journalist.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      {journalist.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {journalist.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {journalist.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {journalist.website}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AtSign className="h-4 w-4 text-muted-foreground" />
                      {journalist.socialMedia}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-muted-foreground">Nenhum contato de jornalista cadastrado.</p>
        </div>
      )}
    </div>
  );
};

export default JournalistManagement;
