import { supabase } from "@/core/ssot/db/supabase.client";

export const UserDAO = {
  async create(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
    });
  },

  async login(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
};
