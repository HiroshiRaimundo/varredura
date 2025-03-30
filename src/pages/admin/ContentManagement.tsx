<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
>>>>>>> 54be6b730f411e573541269183579cf9f15b17b5
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import RichTextEditor from "@/components/editor/RichTextEditor";

<<<<<<< HEAD
// Importação lazy do editor
const RichTextEditor = lazy(() => import("@/components/editor/RichTextEditor"));
=======
const ContentManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
>>>>>>> 54be6b730f411e573541269183579cf9f15b17b5

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContent("<p>Conteúdo de exemplo para edição.</p>");
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSaveContent = async () => {
    try {
      setIsLoading(true);
      console.log("Saving content:", content);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Conteúdo salvo com sucesso!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Erro ao salvar conteúdo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <BackToAdminButton />
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Conteúdo</CardTitle>
          <CardDescription>
            Gerencie os conteúdos exibidos na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages">
            <TabsList>
              <TabsTrigger value="pages">Páginas</TabsTrigger>
              <TabsTrigger value="articles">Artigos</TabsTrigger>
              <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
            </TabsList>
<<<<<<< HEAD

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
=======
            <TabsContent value="pages" className="pt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
>>>>>>> 54be6b730f411e573541269183579cf9f15b17b5
                </div>
              ) : (
                <React.Suspense fallback={<div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>}>
                  <RichTextEditor
                    initialContent={content}
                    onContentChange={setContent}
                  />
                </React.Suspense>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveContent} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>
              </div>
            </TabsContent>
<<<<<<< HEAD

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
=======
            <TabsContent value="articles" className="pt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">
                  Gerenciamento de artigos em desenvolvimento.
                </p>
                <Button variant="outline" className="mt-4">
                  Adicionar Novo Artigo
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="pt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">
                  Gerenciamento de perguntas frequentes em desenvolvimento.
                </p>
                <Button variant="outline" className="mt-4">
                  Adicionar Nova Pergunta
                </Button>
>>>>>>> 54be6b730f411e573541269183579cf9f15b17b5
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
