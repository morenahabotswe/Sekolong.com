import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL; const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url,key) : null;
export const isSupabaseConfigured=Boolean(supabase);
export async function signIn(email:string,password:string){ if(!supabase) return null; return supabase.auth.signInWithPassword({email,password}); }
export async function signUp(email:string,password:string,metadata:Record<string,unknown>){ if(!supabase) return null; return supabase.auth.signUp({email,password,options:{data:metadata}}); }