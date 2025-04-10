
declare module '@supabase/supabase-js' {
  export interface User {
    id: string;
    email?: string;
    app_metadata: any;
    user_metadata: any;
    aud: string;
  }

  export interface Session {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: User;
  }

  export interface AuthResponse {
    data: {
      user: User | null;
      session: Session | null;
    };
    error: Error | null;
  }

  export interface SupabaseClient {
    auth: {
      signUp: (options: { email: string; password: string; options?: any }) => Promise<AuthResponse>;
      signIn: (options: { email: string; password: string; }) => Promise<AuthResponse>;
      signInWithPassword: (options: { email: string; password: string; }) => Promise<AuthResponse>; // Added this method
      signOut: () => Promise<{ error: Error | null }>;
      getSession: () => Promise<{ data: { session: Session | null }, error: Error | null }>;
    };
    from: (table: string) => any;
    storage: any;
  }

  export function createClient(url: string, key: string, options?: any): SupabaseClient;
}
