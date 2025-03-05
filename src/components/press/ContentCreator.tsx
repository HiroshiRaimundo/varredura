import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';

interface ContentCreatorProps {
  onSubmit: (content: ContentData) => void;
}

export interface ContentData {
  type: 'release' | 'reportagem';
  title: string;
  subtitle?: string;
  category: string;
  content: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  tags: string[];
}

const ContentCreator: React.FC<ContentCreatorProps> = ({ onSubmit }) => {
  const [contentType, setContentType] = useState<'release' | 'reportagem'>('release');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const categories = [
    'Política',
    'Economia',
    'Educação',
    'Saúde',
    'Tecnologia',
    'Meio Ambiente',
    'Cultura',
    'Esportes'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !content) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const contentData: ContentData = {
      type: contentType,
      title,
      subtitle,
      category,
      content,
      status: 'pending',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    onSubmit(contentData);

    // Limpar formulário
    setTitle('');
    setSubtitle('');
    setCategory('');
    setContent('');
    setTags('');

    toast({
      title: "Conteúdo enviado",
      description: "Seu conteúdo foi enviado para moderação.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <RadioGroup
          defaultValue={contentType}
          onValueChange={(value) => setContentType(value as 'release' | 'reportagem')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="release" id="release" />
            <Label htmlFor="release">Release</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reportagem" id="reportagem" />
            <Label htmlFor="reportagem">Reportagem</Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Digite o subtítulo (opcional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Conteúdo *</Label>
          <RichTextEditor
            initialContent={content}
            onContentChange={setContent}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Digite as tags separadas por vírgula"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Salvar como rascunho
        </Button>
        <Button type="submit">
          Enviar para aprovação
        </Button>
      </div>
    </form>
  );
};

export default ContentCreator;
