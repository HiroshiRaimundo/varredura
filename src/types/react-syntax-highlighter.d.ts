
declare module 'react-syntax-highlighter' {
  import { ReactNode } from 'react';
  
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string | ReactNode;
    className?: string;
    showLineNumbers?: boolean;
    lineNumberStyle?: React.CSSProperties;
    customStyle?: React.CSSProperties;
    codeTagProps?: React.HTMLAttributes<HTMLElement>;
    useInlineStyles?: boolean;
    wrapLines?: boolean;
    lineProps?: LineTagPropsFunction | React.HTMLAttributes<HTMLElement>;
    renderer?: (props: RendererProps) => ReactNode;
    PreTag?: React.ComponentType<any>;
    CodeTag?: React.ComponentType<any>;
    startingLineNumber?: number;
  }

  export interface LineTagPropsFunction {
    (lineNumber: number): React.HTMLAttributes<HTMLElement>;
  }

  export interface RendererProps {
    rows: any[];
    stylesheet: any;
    useInlineStyles: boolean;
  }

  export default class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {}
  
  export const Prism: typeof SyntaxHighlighter;
  export const Light: typeof SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const vscDarkPlus: any;
  const dracula: any;
  const tomorrow: any;
  const vs: any;
  const xonokai: any;
  const okaidia: any;
  const duotoneLight: any;
  const duotoneDark: any;
  const dark: any;
  const coy: any;
  const atomDark: any;
  const a11yDark: any;
  const prism: any;
  const solarizedlight: any;
  const materialOceanic: any;
  const materialLight: any;
  
  export {
    vscDarkPlus,
    dracula,
    tomorrow,
    vs,
    xonokai,
    okaidia,
    duotoneLight,
    duotoneDark,
    dark,
    coy,
    atomDark,
    a11yDark,
    prism,
    solarizedlight,
    materialOceanic,
    materialLight
  };
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  const docco: any;
  const dark: any;
  const atomDark: any;
  const github: any;
  const monokai: any;
  const monoBlue: any;
  const vs: any;
  const xt256: any;
  
  export {
    docco,
    dark,
    atomDark,
    github,
    monokai,
    monoBlue,
    vs,
    xt256
  };
}
