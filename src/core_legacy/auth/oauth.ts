import { createClient } from "@supabase/supabase-js";

export class OAuthService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
  }

  async signInWithProvider(provider: "google" | "github") {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) throw error;
    return data;
  }

  async getUser(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error) throw error;
    return data.user;
  }
}

export const oauthService = new OAuthService();
