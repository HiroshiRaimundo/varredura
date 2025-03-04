
import React from 'react';

export interface RichTextEditorProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  onContentChange
}) => {
  return (
    <div className="min-h-[200px] border rounded-md p-4">
      <textarea
        className="w-full h-full min-h-[200px] focus:outline-none"
        value={initialContent}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default RichTextEditor;
