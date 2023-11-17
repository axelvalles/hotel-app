import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () =>
  createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
