import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Download, Filter, Search } from "lucide-react";
import BackToAdminButton from "@/components/admin/BackToAdminButton";

interface MediaContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  outlet: string;
  position: string;
  segments: string[];
  socialMedia: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  preferredContactTime: "manhã" | "tarde" | "noite";
  notes: string;
}

interface Outlet {
  id: string;
  name: string;
  type: "jornal" | "revista" | "portal" | "tv" | "rádio" | "blog";
  coverage: "nacional" | "regional" | "local";
  segments: string[];
  website: string;
  address: string;
}

const MediaContactsManagement: React.FC = () => {
  const [contacts, setContacts] = useState<MediaContact[]>([]);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [isNewOutletOpen, setIsNewOutletOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "outlets">("contacts");

  const segmentos = [
    "Política",
    "Economia",
    "Tecnologia",
    "Saúde",
    "Educação",
    "Meio Ambiente",
    "Cultura",
    "Esportes",
    "Negócios",
    "Ciência"
  ];

  const handleAddContact = (data: Partial<MediaContact>) => {
    const newContact: MediaContact = {
      id: Date.now().toString(),
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      outlet: data.outlet || "",
      position: data.position || "",
      segments: data.segments || [],
      socialMedia: data.socialMedia || {},
      preferredContactTime: data.preferredContactTime || "manhã",
      notes: data.notes || ""
    };

    setContacts([...contacts, newContact]);
    setIsNewContactOpen(false);
    toast({
      title: "Contato adicionado",
      description: "O contato foi adicionado com sucesso."
    });
  };

  const handleAddOutlet = (data: Partial<Outlet>) => {
    const newOutlet: Outlet = {
      id: Date.now().toString(),
      name: data.name || "",
      type: data.type || "portal",
      coverage: data.coverage || "nacional",
      segments: data.segments || [],
      website: data.website || "",
      address: data.address || ""
    };

    setOutlets([...outlets, newOutlet]);
    setIsNewOutletOpen(false);
    toast({
      title: "Veículo adicionado",
      description: "O veículo foi adicionado com sucesso."
    });
  };

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Contatos de Mídia</CardTitle>
          <CardDescription>
            Gerencie contatos e veículos de comunicação para distribuição de releases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <Button
                variant={activeTab === "contacts" ? "default" : "outline"}
                onClick={() => setActiveTab("contacts")}
              >
                Contatos
              </Button>
              <Button
                variant={activeTab === "outlets" ? "default" : "outline"}
                onClick={() => setActiveTab("outlets")}
              >
                Veículos
              </Button>
            </div>

            {activeTab === "contacts" && (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Input placeholder="Buscar contatos..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        {segmentos.map((seg) => (
                          <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                    <Dialog open={isNewContactOpen} onOpenChange={setIsNewContactOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Contato
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Contato</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input placeholder="Nome do contato" />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="email@exemplo.com" />
                          </div>
                          <div className="space-y-2">
                            <Label>Telefone</Label>
                            <Input placeholder="(00) 00000-0000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Veículo</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o veículo" />
                              </SelectTrigger>
                              <SelectContent>
                                {outlets.map((outlet) => (
                                  <SelectItem key={outlet.id} value={outlet.id}>
                                    {outlet.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Cargo</Label>
                            <Input placeholder="Cargo/Função" />
                          </div>
                          <div className="space-y-2">
                            <Label>Segmentos</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione os segmentos" />
                              </SelectTrigger>
                              <SelectContent>
                                {segmentos.map((seg) => (
                                  <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2 space-y-2">
                            <Label>Observações</Label>
                            <Textarea placeholder="Observações sobre o contato" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNewContactOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={() => handleAddContact({})}>
                            Adicionar Contato
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Veículo</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Segmentos</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.outlet}</TableCell>
                        <TableCell>{contact.position}</TableCell>
                        <TableCell>{contact.segments.join(", ")}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            {activeTab === "outlets" && (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Input placeholder="Buscar veículos..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jornal">Jornal</SelectItem>
                        <SelectItem value="revista">Revista</SelectItem>
                        <SelectItem value="portal">Portal</SelectItem>
                        <SelectItem value="tv">TV</SelectItem>
                        <SelectItem value="radio">Rádio</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Dialog open={isNewOutletOpen} onOpenChange={setIsNewOutletOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Veículo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome</Label>
                          <Input placeholder="Nome do veículo" />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Tipo de veículo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jornal">Jornal</SelectItem>
                              <SelectItem value="revista">Revista</SelectItem>
                              <SelectItem value="portal">Portal</SelectItem>
                              <SelectItem value="tv">TV</SelectItem>
                              <SelectItem value="radio">Rádio</SelectItem>
                              <SelectItem value="blog">Blog</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Website</Label>
                          <Input placeholder="https://" />
                        </div>
                        <div className="space-y-2">
                          <Label>Cobertura</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Área de cobertura" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nacional">Nacional</SelectItem>
                              <SelectItem value="regional">Regional</SelectItem>
                              <SelectItem value="local">Local</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Endereço</Label>
                          <Input placeholder="Endereço completo" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewOutletOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => handleAddOutlet({})}>
                          Adicionar Veículo
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Cobertura</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outlets.map((outlet) => (
                      <TableRow key={outlet.id}>
                        <TableCell>{outlet.name}</TableCell>
                        <TableCell>{outlet.type}</TableCell>
                        <TableCell>{outlet.coverage}</TableCell>
                        <TableCell>{outlet.website}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaContactsManagement; 