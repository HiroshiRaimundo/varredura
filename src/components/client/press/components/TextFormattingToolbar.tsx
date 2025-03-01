
import React from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, List } from "lucide-react";

interface TextFormattingToolbarProps {
  onFormatText: (format: string) => void;
}

const TextFormattingToolbar: React.FC<TextFormattingToolbarProps> = ({ onFormatText }) => {
  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onFormatText('negrito')}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onFormatText('itálico')}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onFormatText('alinhado à esquerda')}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onFormatText('centralizado')}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onFormatText('alinhado à direita')}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onFormatText('lista')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TextFormattingToolbar;
