import { supabase } from "@/core/ssot/db/supabase.client";
import type { Database } from "@/types/database";

type Organization = Database["public"]["Tables"]["organizations"]["Row"];

export class Client {
  /**
   * Get single organization (tenant replacement)
   */
  async getOrganization(id: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getOrganization error:", error.message);
      return null;
    }

    return data;
  }

  /**
   * Get all organizations for a user (if owner-based model)
   */
  async getUserOrganizations(userId: string): Promise<Organization[]> {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("owner_id", userId);

    if (error || !data) {
      console.error("getUserOrganizations error:", error?.message);
      return [];
    }

    return data;
  }

  /**
   * Create organization
   */
  async createOrganization(
    name: string,
    ownerId: string
  ): Promise<Organization | null> {
    const { data, error } = await supabase
      .from("organizations")
      .insert({
        name,
        owner_id: ownerId,
      })
      .select()
      .single();

    if (error) {
      console.error("createOrganization error:", error.message);
      return null;
    }

    return data;
  }

  /**
   * Update organization
   */
  async updateOrganization(
    id: string,
    payload: Partial<Organization>
  ): Promise<Organization | null> {
    const { data, error } = await supabase
      .from("organizations")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("updateOrganization error:", error.message);
      return null;
    }

    return data;
  }

  /**
   * Delete organization
   */
  async deleteOrganization(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("deleteOrganization error:", error.message);
      return false;
    }

    return true;
  }
}

export const client = new Client();
