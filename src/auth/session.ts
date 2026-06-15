import { supabase } from "./supabase";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) return null;

  return data.session;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}
