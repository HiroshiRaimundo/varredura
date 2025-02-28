
import React from "react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeExample } from "./code-examples";

interface CodeExampleViewerProps {
  examples: Record<string, CodeExample>;
  activeExample: string;
  onExampleChange: (example: string) => void;
}

const CodeExampleViewer: React.FC<CodeExampleViewerProps> = ({ 
  examples, 
  activeExample, 
  onExampleChange 
}) => {
  const currentExample = examples[activeExample];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(examples).map(([key, example]) => (
          <Button 
            key={key}
            variant={activeExample === key ? "default" : "outline"}
            onClick={() => onExampleChange(key)}
          >
            {example.title}
          </Button>
        ))}
      </div>
      
      <div>
        <h3 className="text-lg font-medium">{currentExample.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{currentExample.description}</p>
        <p className="text-xs font-mono text-muted-foreground mb-3">{currentExample.path}</p>
        
        <div className="bg-muted rounded-md overflow-hidden">
          <SyntaxHighlighter 
            language={activeExample === "api" ? "javascript" : "python"} 
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: '0.375rem' }}
            showLineNumbers={true}
          >
            {currentExample.code.trim()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeExampleViewer;
