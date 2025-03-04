import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BackToAdminButton from "@/components/admin/BackToAdminButton";
import RichTextEditor from "@/components/editor/RichTextEditor";

const ContentManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

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
            <TabsContent value="pages" className="pt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
