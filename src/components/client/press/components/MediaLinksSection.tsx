
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Youtube, Link } from "lucide-react";

interface MediaLinksSectionProps {
  mediaLinks: string[];
  setMediaLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const MediaLinksSection: React.FC<MediaLinksSectionProps> = ({ mediaLinks, setMediaLinks }) => {
  const [newMediaLink, setNewMediaLink] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'youtube' | 'repository'>('image');

  const addMediaLink = () => {
    if (newMediaLink.trim()) {
      setMediaLinks([...mediaLinks, `${mediaType}:${newMediaLink.trim()}`]);
      setNewMediaLink('');
    }
  };

  const removeMediaLink = (index: number) => {
    const updatedLinks = [...mediaLinks];
    updatedLinks.splice(index, 1);
    setMediaLinks(updatedLinks);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-2">Mídia</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Button
            type="button"
            variant={mediaType === 'image' ? 'default' : 'outline'}
            className="flex items-center gap-2"
            onClick={() => setMediaType('image')}
          >
            <Image className="h-4 w-4" />
            Imagem
          </Button>
          
          <Button
            type="button"
            variant={mediaType === 'youtube' ? 'default' : 'outline'}
            className="flex items-center gap-2"
            onClick={() => setMediaType('youtube')}
          >
            <Youtube className="h-4 w-4" />
            YouTube
          </Button>
          
          <Button
            type="button"
            variant={mediaType === 'repository' ? 'default' : 'outline'}
            className="flex items-center gap-2"
            onClick={() => setMediaType('repository')}
          >
            <Link className="h-4 w-4" />
            Repositório
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Input 
            placeholder={
              mediaType === 'image' 
                ? "Cole o link da imagem" 
                : mediaType === 'youtube' 
                  ? "Cole o link do vídeo do YouTube" 
                  : "Cole o link do repositório de vídeo"
            }
            value={newMediaLink}
            onChange={(e) => setNewMediaLink(e.target.value)}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={addMediaLink}
          >
            Adicionar
          </Button>
        </div>
        
        {mediaLinks.length > 0 && (
          <div className="border rounded-md p-2">
            <h4 className="text-sm font-medium mb-2">Mídias adicionadas:</h4>
            <ul className="space-y-2">
              {mediaLinks.map((link, index) => {
                const [type, url] = link.split(':');
                return (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {type === 'image' && <Image className="h-4 w-4" />}
                      {type === 'youtube' && <Youtube className="h-4 w-4" />}
                      {type === 'repository' && <Link className="h-4 w-4" />}
                      <span className="truncate max-w-[300px]">{url}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMediaLink(index)}
                    >
                      Remover
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaLinksSection;
