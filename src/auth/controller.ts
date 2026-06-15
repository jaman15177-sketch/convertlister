import { supabase } from "./supabase";

/**
 * REGISTER USER
 */
export const register = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return res.json({
      success: true,
      user: data.user,
    });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

/**
 * LOGIN USER
 */
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return res.json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

/**
 * LOGOUT USER
 */
export const logout = async (_req: any, res: any) => {
  await supabase.auth.signOut();

  return res.json({
    success: true,
  });
};
