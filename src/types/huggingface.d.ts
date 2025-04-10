
declare module '@huggingface/transformers' {
  export interface SentimentAnalysisOutput {
    label: string;
    score: number;
  }

  export interface PipelineOptions {
    device?: string;
    quantized?: boolean;
    revision?: string;
    model?: any;
    tokenizer?: any;
    pipeline?: any;
    progress_callback?: (progress: any) => void;
  }

  export function pipeline(
    task: string, 
    model?: string | any, 
    options?: PipelineOptions
  ): Promise<any>;

  export const env: {
    useBrowserCache: boolean;
    backends: {
      onnx: {
        wasm: {
          numThreads: number;
        };
      };
    };
  };
}
