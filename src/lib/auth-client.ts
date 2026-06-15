import { supabase } from "./supabase";

/**
 * Always get session safely
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Get current user
 */
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

/**
 * Auto logout
 */
export async function logout() {
  await supabase.auth.signOut();
}
