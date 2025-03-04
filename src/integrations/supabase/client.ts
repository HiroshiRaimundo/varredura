
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase credentials - in production, these should be handled securely
const SUPABASE_URL = "https://jiywqroiovphdultgaet.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppeXdxcm9pb3ZwaGR1bHRnYWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NzgwNTgsImV4cCI6MjA1NjI1NDA1OH0._auAk9bzk85D7BDy4OTEelHBHh68Z3xQ3Kn-BNoaE3I";

// Create and export the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Helper function to check if Supabase connection is available
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('health_check').select('*').limit(1);
    return !error;
  } catch {
    return false;
  }
};

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return supabase.auth.getUser();
};

export const resetPassword = async (email: string) => {
  return supabase.auth.resetPasswordForEmail(email);
};
