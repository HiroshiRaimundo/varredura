
declare module 'react-syntax-highlighter' {
  import { ReactNode } from 'react';
  
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: object;
    children: string;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    lineProps?: any;
    customStyle?: React.CSSProperties;
    codeTagProps?: React.HTMLAttributes<HTMLElement>;
    useInlineStyles?: boolean;
    [key: string]: any;
  }
  
  export const Prism: React.FC<SyntaxHighlighterProps>;
  export const Light: React.FC<SyntaxHighlighterProps>;
  
  const SyntaxHighlighter: React.FC<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const vscDarkPlus: object;
  const atomDark: object;
  const dracula: object;
  const duotoneDark: object;
  const okaidia: object;
  const solarizedlight: object;
  
  export { vscDarkPlus, atomDark, dracula, duotoneDark, okaidia, solarizedlight };
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  const agate: object;
  const androidstudio: object;
  const atomOneLight: object;
  const github: object;
  const monokai: object;
  const vs: object;
  const xcode: object;
  
  export { agate, androidstudio, atomOneLight, github, monokai, vs, xcode };
}
