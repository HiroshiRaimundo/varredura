import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/components/ui/use-toast';
import { ContentData } from '@/components/press/ContentCreator';

interface ContentModeratorProps {
  contents: ContentData[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected', feedback?: string) => void;
}

const ContentModerator: React.FC<ContentModeratorProps> = ({
  contents,
  onUpdateStatus
}) => {
  const [selectedContent, setSelectedContent] = useState<ContentData | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleApprove = () => {
    if (selectedContent) {
      onUpdateStatus(selectedContent.id, 'approved');
      toast({
        title: "Conteúdo aprovado",
        description: "O conteúdo foi aprovado e será publicado.",
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
      setShowDialog(false);
    } else {
      toast({
        title: "Feedback necessário",
        description: "Por favor, forneça um feedback para rejeitar o conteúdo.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
      draft: "bg-gray-500"
    };
    return <Badge className={statusStyles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contents.filter(c => c.status === 'pending').map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{content.title}</CardTitle>
                  <CardDescription>{content.subtitle}</CardDescription>
                </div>
                {getStatusBadge(content.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Tipo:</span> {content.type}
                </div>
                <div>
                  <span className="font-medium">Categoria:</span> {content.category}
                </div>
                <div>
                  <span className="font-medium">Tags:</span>{' '}
                  {content.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="mr-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedContent(content);
                      setShowDialog(true);
                    }}
                  >
                    Visualizar conteúdo
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedContent(content);
                  setShowDialog(true);
                }}
              >
                Rejeitar
              </Button>
              <Button
                onClick={() => {
                  setSelectedContent(content);
                  handleApprove();
                }}
              >
                Aprovar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedContent?.title}</DialogTitle>
            <DialogDescription>{selectedContent?.subtitle}</DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedContent?.content || '' }} />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Feedback para o autor</h4>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Digite seu feedback aqui..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Rejeitar
              </Button>
              <Button onClick={handleApprove}>
                Aprovar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentModerator;
