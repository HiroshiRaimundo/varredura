
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Defina os tipos para as tabelas
export type Tables = {
  monitoring_items: {
    Row: {
      id: string;
      name: string;
      url: string;
      api_url: string;
      keywords: string;
      category: string;
      frequency: string;
      responsible: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      url: string;
      api_url?: string;
      keywords: string;
      category: string;
      frequency: string;
      responsible: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      url?: string;
      api_url?: string;
      keywords?: string;
      category?: string;
      frequency?: string;
      responsible?: string;
      created_at?: string;
    };
    Relationships: [];
  };
  research_studies: {
    Row: {
      id: string;
      title: string;
      description: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      title: string;
      description: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      title?: string;
      description?: string;
      created_at?: string;
    };
    Relationships: [];
  };
};

export const supabase = createClient<Tables>(supabaseUrl, supabaseKey);
