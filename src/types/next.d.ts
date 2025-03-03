declare module 'next/types' {
  import type { IncomingMessage, ServerResponse } from 'http';
  
  export interface NextApiRequest extends IncomingMessage {
    query: {
      [key: string]: string | string[];
    };
    cookies: {
      [key: string]: string;
    };
    body: any;
  }

  export interface NextApiResponse<T = any> extends ServerResponse {
    json(body: T): void;
    status(statusCode: number): NextApiResponse<T>;
    send(body: T): void;
    redirect(statusOrUrl: number | string, url?: string): NextApiResponse<T>;
  }
} 