export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      abac_policies: {
        Row: {
          action: string
          condition: Json
          created_at: string | null
          enabled: boolean | null
          id: string
          name: string
          resource: string
        }
        Insert: {
          action: string
          condition: Json
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          name: string
          resource: string
        }
        Update: {
          action?: string
          condition?: Json
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
          resource?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          created_at: string | null
          frequency: number | null
          id: string
          job_id: string | null
          level: string | null
          message: string
          severity: number | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          frequency?: number | null
          id?: string
          job_id?: string | null
          level?: string | null
          message: string
          severity?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          frequency?: number | null
          id?: string
          job_id?: string | null
          level?: string | null
          message?: string
          severity?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      alerts_v2: {
        Row: {
          created_at: string | null
          frequency: number | null
          id: string | null
          job_id: string | null
          level: string | null
          message: string | null
          severity: number | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          frequency?: number | null
          id?: string | null
          job_id?: string | null
          level?: string | null
          message?: string | null
          severity?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          frequency?: number | null
          id?: string | null
          job_id?: string | null
          level?: string | null
          message?: string | null
          severity?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          ad_spend: number | null
          clicks: number | null
          conversions: number | null
          created_at: string | null
          creative_variant_id: string | null
          event_type: string
          id: string
          impressions: number | null
          platform: string | null
          project_id: string | null
          revenue: number | null
        }
        Insert: {
          ad_spend?: number | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          creative_variant_id?: string | null
          event_type: string
          id?: string
          impressions?: number | null
          platform?: string | null
          project_id?: string | null
          revenue?: number | null
        }
        Update: {
          ad_spend?: number | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          creative_variant_id?: string | null
          event_type?: string
          id?: string
          impressions?: number | null
          platform?: string | null
          project_id?: string | null
          revenue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_creative_variant_id_fkey"
            columns: ["creative_variant_id"]
            isOneToOne: false
            referencedRelation: "creative_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          organization_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          organization_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          organization_id?: string | null
        }
        Relationships: []
      }
      bonuses: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          reason: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bonuses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      creative_variants: {
        Row: {
          created_at: string | null
          creative_id: string | null
          cta: string | null
          description: string | null
          hook: string | null
          id: string
          performance_score: number | null
          variant_name: string | null
        }
        Insert: {
          created_at?: string | null
          creative_id?: string | null
          cta?: string | null
          description?: string | null
          hook?: string | null
          id?: string
          performance_score?: number | null
          variant_name?: string | null
        }
        Update: {
          created_at?: string | null
          creative_id?: string | null
          cta?: string | null
          description?: string | null
          hook?: string | null
          id?: string
          performance_score?: number | null
          variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creative_variants_creative_id_fkey"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "creatives"
            referencedColumns: ["id"]
          },
        ]
      }
      creatives: {
        Row: {
          created_at: string | null
          id: string
          platform: string | null
          project_id: string | null
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          platform?: string | null
          project_id?: string | null
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          platform?: string | null
          project_id?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          created_at: string | null
          credits: number
          description: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits: number
          description?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits?: number
          description?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          meta: Json | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          meta?: Json | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          meta?: Json | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      experiments: {
        Row: {
          created_at: string | null
          experiment_name: string
          id: string
          project_id: string | null
          status: string | null
          variant_a: string | null
          variant_b: string | null
          winner_variant: string | null
        }
        Insert: {
          created_at?: string | null
          experiment_name: string
          id?: string
          project_id?: string | null
          status?: string | null
          variant_a?: string | null
          variant_b?: string | null
          winner_variant?: string | null
        }
        Update: {
          created_at?: string | null
          experiment_name?: string
          id?: string
          project_id?: string | null
          status?: string | null
          variant_a?: string | null
          variant_b?: string | null
          winner_variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiments_variant_a_fkey"
            columns: ["variant_a"]
            isOneToOne: false
            referencedRelation: "creative_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiments_variant_b_fkey"
            columns: ["variant_b"]
            isOneToOne: false
            referencedRelation: "creative_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiments_winner_variant_fkey"
            columns: ["winner_variant"]
            isOneToOne: false
            referencedRelation: "creative_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_logs: {
        Row: {
          created_at: string | null
          id: string
          meta: Json | null
          reason: string | null
          risk_level: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meta?: Json | null
          reason?: string | null
          risk_level?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meta?: Json | null
          reason?: string | null
          risk_level?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      health_snapshots: {
        Row: {
          created_at: string | null
          env: string | null
          id: string
          latency: number
          services: Json
          status: string
          version: string | null
        }
        Insert: {
          created_at?: string | null
          env?: string | null
          id?: string
          latency: number
          services: Json
          status: string
          version?: string | null
        }
        Update: {
          created_at?: string | null
          env?: string | null
          id?: string
          latency?: number
          services?: Json
          status?: string
          version?: string | null
        }
        Relationships: []
      }
      inventory_states: {
        Row: {
          id: string
          inventory_count: number | null
          platform: string | null
          project_id: string | null
          reserved_count: number | null
          sku: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          inventory_count?: number | null
          platform?: string | null
          project_id?: string | null
          reserved_count?: number | null
          sku: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          inventory_count?: number | null
          platform?: string | null
          project_id?: string | null
          reserved_count?: number | null
          sku?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string | null
          id: string
          job_id: string
          retry_count: number | null
          status: string | null
          updated_at: string | null
          url: string
          url_hash: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id: string
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
          url: string
          url_hash: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
          url?: string
          url_hash?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_entries: {
        Row: {
          amount: number
          balance_after: number
          balance_before: number
          created_at: string | null
          id: string
          payment_id: string
          type: string
        }
        Insert: {
          amount: number
          balance_after: number
          balance_before: number
          created_at?: string | null
          id?: string
          payment_id: string
          type: string
        }
        Update: {
          amount?: number
          balance_after?: number
          balance_before?: number
          created_at?: string | null
          id?: string
          payment_id?: string
          type?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          level: string | null
          message: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          level?: string | null
          message?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          level?: string | null
          message?: string | null
        }
        Relationships: []
      }
      metrics: {
        Row: {
          created_at: string | null
          failed_jobs: number | null
          id: string
          retry_jobs: number | null
          success_jobs: number | null
          total_jobs: number | null
        }
        Insert: {
          created_at?: string | null
          failed_jobs?: number | null
          id?: string
          retry_jobs?: number | null
          success_jobs?: number | null
          total_jobs?: number | null
        }
        Update: {
          created_at?: string | null
          failed_jobs?: number | null
          id?: string
          retry_jobs?: number | null
          success_jobs?: number | null
          total_jobs?: number | null
        }
        Relationships: []
      }
      onboarding_state: {
        Row: {
          completed: boolean | null
          step: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          step?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          step?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_state_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      organization_roles: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
        }
        Relationships: []
      }
      payment_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json | null
          payment_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload?: Json | null
          payment_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json | null
          payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_events_payment"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_ledger: {
        Row: {
          amount: number
          created_at: string | null
          credits: number
          currency: string | null
          id: string
          provider: string
          provider_event_id: string
          raw_payload: Json | null
          status: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          credits: number
          currency?: string | null
          id?: string
          provider: string
          provider_event_id: string
          raw_payload?: Json | null
          status?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          credits?: number
          currency?: string | null
          id?: string
          provider?: string
          provider_event_id?: string
          raw_payload?: Json | null
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_requests: {
        Row: {
          amount: number
          created_at: string | null
          credits: number
          id: string
          sender_number: string | null
          status: string | null
          tenant_id: string | null
          trx_id: string
          user_id: string
          verification_note: string | null
          verified: boolean | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          credits: number
          id?: string
          sender_number?: string | null
          status?: string | null
          tenant_id?: string | null
          trx_id: string
          user_id: string
          verification_note?: string | null
          verified?: boolean | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          credits?: number
          id?: string
          sender_number?: string | null
          status?: string | null
          tenant_id?: string | null
          trx_id?: string
          user_id?: string
          verification_note?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          organization_id: string
          provider: string
          status: string
          transaction_ref: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          organization_id: string
          provider?: string
          status?: string
          transaction_ref?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          organization_id?: string
          provider?: string
          status?: string
          transaction_ref?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      pricing_rules: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          margin_target: number | null
          max_price: number | null
          min_price: number | null
          project_id: string | null
          rule_name: string
          strategy: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          margin_target?: number | null
          max_price?: number | null
          min_price?: number | null
          project_id?: string | null
          rule_name: string
          strategy?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          margin_target?: number | null
          max_price?: number | null
          min_price?: number | null
          project_id?: string | null
          rule_name?: string
          strategy?: string | null
        }
        Relationships: []
      }
      product_metrics: {
        Row: {
          conversion_hint: number | null
          created_at: string | null
          id: string
          job_id: string | null
          price: number | null
          processing_score: number | null
          rating: number | null
          reviews_count: number | null
          title: string | null
          url: string | null
          winning_score: number | null
        }
        Insert: {
          conversion_hint?: number | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          price?: number | null
          processing_score?: number | null
          rating?: number | null
          reviews_count?: number | null
          title?: string | null
          url?: string | null
          winning_score?: number | null
        }
        Update: {
          conversion_hint?: number | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          price?: number | null
          processing_score?: number | null
          rating?: number | null
          reviews_count?: number | null
          title?: string | null
          url?: string | null
          winning_score?: number | null
        }
        Relationships: []
      }
      products: {
        Row: {
          compare_price: number | null
          created_at: string | null
          currency: string
          description: string | null
          external_id: string | null
          id: string
          images: Json | null
          name: string
          organization_id: string
          price: number
          slug: string | null
          source: string | null
          status: string
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          compare_price?: number | null
          created_at?: string | null
          currency?: string
          description?: string | null
          external_id?: string | null
          id?: string
          images?: Json | null
          name: string
          organization_id: string
          price: number
          slug?: string | null
          source?: string | null
          status?: string
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          compare_price?: number | null
          created_at?: string | null
          currency?: string
          description?: string | null
          external_id?: string | null
          id?: string
          images?: Json | null
          name?: string
          organization_id?: string
          price?: number
          slug?: string | null
          source?: string | null
          status?: string
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          organization_id: string | null
          status: string
          tenant_id: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          organization_id?: string | null
          status?: string
          tenant_id?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          status?: string
          tenant_id?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      publish_jobs: {
        Row: {
          created_at: string | null
          id: string
          payload: Json | null
          platform: string
          project_id: string | null
          published_at: string | null
          retry_count: number | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload?: Json | null
          platform: string
          project_id?: string | null
          published_at?: string | null
          retry_count?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: Json | null
          platform?: string
          project_id?: string | null
          published_at?: string | null
          retry_count?: number | null
          status?: string | null
        }
        Relationships: []
      }
      resource_attributes: {
        Row: {
          created_at: string | null
          id: string
          key: string
          resource_id: string
          resource_type: string
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          resource_id: string
          resource_type: string
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          resource_id?: string
          resource_type?: string
          value?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      runs: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          input: Json | null
          organization_id: string | null
          output: Json | null
          status: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          input?: Json | null
          organization_id?: string | null
          output?: Json | null
          status?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          input?: Json | null
          organization_id?: string | null
          output?: Json | null
          status?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "runs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "runs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "runs_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      salaries: {
        Row: {
          base_salary: number | null
          created_at: string | null
          id: string
          month: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          base_salary?: number | null
          created_at?: string | null
          id?: string
          month?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          base_salary?: number | null
          created_at?: string | null
          id?: string
          month?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_events: {
        Row: {
          created_at: string | null
          event_name: string
          id: string
          payload: Json | null
          severity: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          event_name: string
          id?: string
          payload?: Json | null
          severity?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          event_name?: string
          id?: string
          payload?: Json | null
          severity?: string | null
          source?: string | null
        }
        Relationships: []
      }
      tenant_members: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          meta: Json | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trends: {
        Row: {
          created_at: string | null
          id: number
          intent: number | null
          keyword: string
          label: string | null
          percentile: number | null
          score: number | null
          source: string | null
          velocity: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          intent?: number | null
          keyword: string
          label?: string | null
          percentile?: number | null
          score?: number | null
          source?: string | null
          velocity?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          intent?: number | null
          keyword?: string
          label?: string | null
          percentile?: number | null
          score?: number | null
          source?: string | null
          velocity?: number | null
        }
        Relationships: []
      }
      user_attributes: {
        Row: {
          created_at: string | null
          id: string
          key: string
          user_id: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          user_id?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          user_id?: string | null
          value?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_security: {
        Row: {
          banned_until: string | null
          created_at: string | null
          fraud_strikes: number | null
          id: string
          is_banned: boolean | null
          user_id: string | null
        }
        Insert: {
          banned_until?: string | null
          created_at?: string | null
          fraud_strikes?: number | null
          id?: string
          is_banned?: boolean | null
          user_id?: string | null
        }
        Update: {
          banned_until?: string | null
          created_at?: string | null
          fraud_strikes?: number | null
          id?: string
          is_banned?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          balance: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      wallet_balance: {
        Row: {
          balance: number
          org_id: string
          updated_at: string | null
        }
        Insert: {
          balance?: number
          org_id: string
          updated_at?: string | null
        }
        Update: {
          balance?: number
          org_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      wallet_ledger: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          org_id: string
          reason: string | null
          request_id: string | null
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id: string
          org_id: string
          reason?: string | null
          request_id?: string | null
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          org_id?: string
          reason?: string | null
          request_id?: string | null
          type?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string | null
          id: string
          last_daily_claim: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: string
          last_daily_claim?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: string
          last_daily_claim?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      worker_logs: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          level: string | null
          message: string | null
          metadata: Json | null
          worker_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          level?: string | null
          message?: string | null
          metadata?: Json | null
          worker_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          level?: string | null
          message?: string | null
          metadata?: Json | null
          worker_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_logs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "publish_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_roles: {
        Row: {
          created_at: string | null
          id: string
          role_id: string | null
          user_id: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_roles_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string | null
          id: string
          name: string
          organization_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          organization_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          organization_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      abac_allow: {
        Args: {
          p_action: string
          p_resource: string
          p_resource_id?: string
          p_user: string
        }
        Returns: boolean
      }
      has_permission: {
        Args: {
          p_action: string
          p_org: string
          p_resource: string
          p_user: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
