import React, { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Image, Video, Link, Send } from "lucide-react";
import BackToAdminButton from "@/components/admin/BackToAdminButton";

// Importação lazy do editor
const RichTextEditor = lazy(() => import("@/components/editor/RichTextEditor"));

interface Content {
  id: string;
  title: string;
  content: string;
  type: "release" | "reportagem";
  status: "rascunho" | "revisão" | "aprovado" | "publicado";
  segment: string;
  targetOutlets: string[];
  mediaFiles: {
    type: "image" | "video";
    url: string;
    caption: string;
  }[];
  createdAt: Date;
  publishedAt?: Date;
}

const ContentManagement: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [isNewContentOpen, setIsNewContentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"releases" | "reportagens">("releases");
  const [editorContent, setEditorContent] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);

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

  const handleAddContent = (data: Partial<Content>) => {
    const newContent: Content = {
      id: Date.now().toString(),
      title: data.title || "",
      content: editorContent,
      type: activeTab === "releases" ? "release" : "reportagem",
      status: "rascunho",
      segment: selectedSegment,
      targetOutlets: selectedOutlets,
      mediaFiles: [],
      createdAt: new Date()
    };

    setContents([...contents, newContent]);
    setIsNewContentOpen(false);
    setEditorContent("");
    setSelectedSegment("");
    setSelectedOutlets([]);

    toast({
      title: `${activeTab === "releases" ? "Release" : "Reportagem"} criado`,
      description: "O conteúdo foi salvo como rascunho."
    });
  };

  const handleStatusChange = (contentId: string, newStatus: Content["status"]) => {
    setContents(contents.map(content => 
      content.id === contentId 
        ? { 
            ...content, 
            status: newStatus,
            publishedAt: newStatus === "publicado" ? new Date() : content.publishedAt 
          }
        : content
    ));

    toast({
      title: "Status atualizado",
      description: `O conteúdo foi marcado como "${newStatus}".`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Conteúdo</CardTitle>
          <CardDescription>
            Crie e gerencie releases e reportagens para distribuição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value: "releases" | "reportagens") => setActiveTab(value)}>
            <TabsList>
              <TabsTrigger value="releases">Releases</TabsTrigger>
              <TabsTrigger value="reportagens">Reportagens</TabsTrigger>
            </TabsList>

            <TabsContent value="releases">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Input placeholder="Buscar releases..." className="w-64" />
                    <Select value={selectedSegment} onValueChange={setSelectedSegment}>
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
                  <Dialog open={isNewContentOpen} onOpenChange={setIsNewContentOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Release
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Criar Novo Release</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 overflow-y-auto pr-4">
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input placeholder="Título do release" />
                        </div>
                        <div className="space-y-2">
                          <Label>Segmento</Label>
                          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o segmento" />
                            </SelectTrigger>
                            <SelectContent>
                              {segmentos.map((seg) => (
                                <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Conteúdo</Label>
                          <Suspense fallback={<div>Carregando editor...</div>}>
                            <RichTextEditor 
                              value={editorContent}
                              onChange={setEditorContent}
                              placeholder="Digite o conteúdo do release..."
                            />
                          </Suspense>
                        </div>
                        <div className="space-y-2">
                          <Label>Mídia</Label>
                          <div className="flex space-x-2">
                            <Button variant="outline" className="w-full">
                              <Image className="w-4 h-4 mr-2" />
                              Adicionar Imagem
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Video className="w-4 h-4 mr-2" />
                              Adicionar Vídeo
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Link className="w-4 h-4 mr-2" />
                              Adicionar Link
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsNewContentOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => handleAddContent({})}>
                          Salvar como Rascunho
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Publicado em</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contents
                      .filter(content => content.type === "release")
                      .map((content) => (
                        <TableRow key={content.id}>
                          <TableCell>{content.title}</TableCell>
                          <TableCell>{content.segment}</TableCell>
                          <TableCell>
                            <Select
                              value={content.status}
                              onValueChange={(value: Content["status"]) => 
                                handleStatusChange(content.id, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rascunho">Rascunho</SelectItem>
                                <SelectItem value="revisão">Em Revisão</SelectItem>
                                <SelectItem value="aprovado">Aprovado</SelectItem>
                                <SelectItem value="publicado">Publicado</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {content.createdAt.toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {content.publishedAt?.toLocaleDateString() || "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Send className="h-4 w-4" />
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
              </div>
            </TabsContent>

            <TabsContent value="reportagens">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Input placeholder="Buscar reportagens..." className="w-64" />
                    <Select value={selectedSegment} onValueChange={setSelectedSegment}>
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
                  <Dialog open={isNewContentOpen} onOpenChange={setIsNewContentOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Reportagem
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Criar Nova Reportagem</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 overflow-y-auto pr-4">
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input placeholder="Título da reportagem" />
                        </div>
                        <div className="space-y-2">
                          <Label>Segmento</Label>
                          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o segmento" />
                            </SelectTrigger>
                            <SelectContent>
                              {segmentos.map((seg) => (
                                <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Conteúdo</Label>
                          <Suspense fallback={<div>Carregando editor...</div>}>
                            <RichTextEditor 
                              value={editorContent}
                              onChange={setEditorContent}
                              placeholder="Digite o conteúdo da reportagem..."
                            />
                          </Suspense>
                        </div>
                        <div className="space-y-2">
                          <Label>Mídia</Label>
                          <div className="flex space-x-2">
                            <Button variant="outline" className="w-full">
                              <Image className="w-4 h-4 mr-2" />
                              Adicionar Imagem
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Video className="w-4 h-4 mr-2" />
                              Adicionar Vídeo
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Link className="w-4 h-4 mr-2" />
                              Adicionar Link
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsNewContentOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => handleAddContent({})}>
                          Salvar como Rascunho
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Publicado em</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contents
                      .filter(content => content.type === "reportagem")
                      .map((content) => (
                        <TableRow key={content.id}>
                          <TableCell>{content.title}</TableCell>
                          <TableCell>{content.segment}</TableCell>
                          <TableCell>
                            <Select
                              value={content.status}
                              onValueChange={(value: Content["status"]) => 
                                handleStatusChange(content.id, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rascunho">Rascunho</SelectItem>
                                <SelectItem value="revisão">Em Revisão</SelectItem>
                                <SelectItem value="aprovado">Aprovado</SelectItem>
                                <SelectItem value="publicado">Publicado</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {content.createdAt.toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {content.publishedAt?.toLocaleDateString() || "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Send className="h-4 h-4" />
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement; 