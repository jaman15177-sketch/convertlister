import { supabase } from "@/core/ssot/db/supabase.client";
import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];

export class OrganizationDB {
  async findMany<T extends keyof Tables & string>(
    table: T,
    organizationId: string
  ) {
    const { data, error } = await (supabase as any)
      .from(table)
      .select("*")
      .eq("organization_id", organizationId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOne<T extends keyof Tables & string>(
    table: T,
    id: string,
    organizationId: string
  ) {
    const { data, error } = await (supabase as any)
      .from(table)
      .select("*")
      .eq("id", id)
      .eq("organization_id", organizationId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  async insert<T extends keyof Tables & string>(
    table: T,
    payload: Record<string, unknown>,
    organizationId: string
  ) {
    const { data, error } = await (supabase as any)
      .from(table)
      .insert({
        ...payload,
        organization_id: organizationId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async update<T extends keyof Tables & string>(
    table: T,
    id: string,
    payload: Record<string, unknown>,
    organizationId: string
  ) {
    const { data, error } = await (supabase as any)
      .from(table)
      .update(payload)
      .eq("id", id)
      .eq("organization_id", organizationId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async delete<T extends keyof Tables & string>(
    table: T,
    id: string,
    organizationId: string
  ) {
    const { error } = await (supabase as any)
      .from(table)
      .delete()
      .eq("id", id)
      .eq("organization_id", organizationId);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}

export const organizationDB = new OrganizationDB();
