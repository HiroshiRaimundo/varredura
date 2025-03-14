import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/components/ui/use-toast';
import ContentDistributor from '../press/ContentDistributor';
import { pressMonitoringService } from '@/services/pressMonitoring';

interface Content {
  id: string;
  type: 'release' | 'reportagem';
  title: string;
  subtitle: string;
  category: string;
  content: string;
  status: 'pending' | 'approved' | 'distributed' | 'published' | 'rejected';
  tags: string[];
}

interface ContentModeratorProps {
  contents: Content[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected', feedback?: string) => void;
}

const ContentModerator: React.FC<ContentModeratorProps> = ({
  contents,
  onUpdateStatus
}) => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleApprove = () => {
    if (selectedContent) {
      onUpdateStatus(selectedContent.id, 'approved');
      toast({
        title: "Conteúdo aprovado",
        description: "O conteúdo foi aprovado e está pronto para distribuição.",
      });
      setSelectedContent(null);
    }
  };

  const handleReject = () => {
    if (selectedContent && feedback) {
      onUpdateStatus(selectedContent.id, 'rejected', feedback);
      toast({
        title: "Conteúdo rejeitado",
        description: "O feedback foi enviado ao autor.",
      });
      setSelectedContent(null);
      setFeedback('');
    } else {
      toast({
        title: "Feedback necessário",
        description: "Por favor, forneça um feedback para rejeitar o conteúdo.",
        variant: "destructive"
      });
    }
  };

  const handleDistribute = (contentId: string, selectedContacts: string[]) => {
    if (selectedContent) {
      // Inicia o monitoramento em background
      pressMonitoringService.startMonitoring(
        contentId,
        selectedContent.title,
        selectedContacts
      );

      toast({
        title: "Conteúdo distribuído",
        description: "O conteúdo foi enviado e o monitoramento foi iniciado.",
      });
    }
    setSelectedContent(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contents
              .filter(content => content.status === 'pending')
              .map((content) => (
                <div
                  key={content.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{content.title}</h3>
                      <p className="text-sm text-muted-foreground">{content.subtitle}</p>
                    </div>
                    <Badge>{content.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {content.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contents
              .filter(content => content.status === 'approved')
              .map((content) => (
                <div
                  key={content.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{content.title}</h3>
                      <p className="text-sm text-muted-foreground">{content.subtitle}</p>
                    </div>
                    <Badge>{content.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {content.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedContent && (
        <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedContent.title}</DialogTitle>
              <DialogDescription>{selectedContent.subtitle}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>{selectedContent.type}</Badge>
                <Badge variant="outline">{selectedContent.category}</Badge>
              </div>

              <ScrollArea className="h-[400px] border rounded-md p-4">
                <div dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
              </ScrollArea>

              {selectedContent.status === 'pending' && (
                <>
                  <Textarea
                    placeholder="Feedback para o autor (obrigatório em caso de rejeição)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setSelectedContent(null)}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleReject}>
                      Rejeitar
                    </Button>
                    <Button onClick={handleApprove}>
                      Aprovar
                    </Button>
                  </div>
                </>
              )}

              {selectedContent.status === 'approved' && (
                <ContentDistributor
                  contentId={selectedContent.id}
                  contentTitle={selectedContent.title}
                  onDistribute={handleDistribute}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContentModerator;
