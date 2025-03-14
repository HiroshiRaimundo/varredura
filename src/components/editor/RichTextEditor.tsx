import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link2, 
  Image, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface RichTextEditorProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
}

interface EditorCommand {
  icon: React.ReactNode;
  command: string;
  title: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  onContentChange
}) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const editorRef = React.useRef<HTMLDivElement>(null);

  const commands: EditorCommand[] = [
    { icon: <Bold className="h-4 w-4" />, command: 'bold', title: 'Negrito' },
    { icon: <Italic className="h-4 w-4" />, command: 'italic', title: 'Itálico' },
    { icon: <Underline className="h-4 w-4" />, command: 'underline', title: 'Sublinhado' },
    { icon: <Heading1 className="h-4 w-4" />, command: 'formatBlock', title: 'Título 1' },
    { icon: <Heading2 className="h-4 w-4" />, command: 'formatBlock', title: 'Título 2' },
    { icon: <List className="h-4 w-4" />, command: 'insertUnorderedList', title: 'Lista' },
    { icon: <ListOrdered className="h-4 w-4" />, command: 'insertOrderedList', title: 'Lista Numerada' },
    { icon: <Quote className="h-4 w-4" />, command: 'formatBlock', title: 'Citação' },
    { icon: <AlignLeft className="h-4 w-4" />, command: 'justifyLeft', title: 'Alinhar à Esquerda' },
    { icon: <AlignCenter className="h-4 w-4" />, command: 'justifyCenter', title: 'Centralizar' },
    { icon: <AlignRight className="h-4 w-4" />, command: 'justifyRight', title: 'Alinhar à Direita' },
  ];

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleInsertLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      execCommand('insertImage', imageUrl);
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/20">
        {commands.map((cmd) => (
          <Button
            key={cmd.command}
            variant="ghost"
            size="sm"
            title={cmd.title}
            onClick={() => execCommand(cmd.command, cmd.command === 'formatBlock' ? `<${cmd.title.toLowerCase()}>` : undefined)}
          >
            {cmd.icon}
          </Button>
        ))}

        <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Inserir Link">
              <Link2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inserir Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="https://exemplo.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Button onClick={handleInsertLink} className="w-full">
                Inserir
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Inserir Imagem">
              <Image className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inserir Imagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="URL da imagem"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button onClick={handleInsertImage} className="w-full">
                Inserir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div
        ref={editorRef}
        className="min-h-[400px] p-4 focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: initialContent }}
        onInput={(e) => onContentChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
};

export default RichTextEditor;
