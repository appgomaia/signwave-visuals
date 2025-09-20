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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          password_hash: string | null
          permissions: Json | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          password_hash?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          password_hash?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          company: string | null
          company_name: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          password_hash: string | null
          phone: string | null
          phone_number: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          company_name?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          password_hash?: string | null
          phone?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          password_hash?: string | null
          phone?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      orcamentos: {
        Row: {
          created_at: string | null
          descricao: string
          email: string
          empresa: string | null
          id: string
          nome: string
          observacoes_admin: string | null
          orcamento_estimado: number | null
          prioridade: string | null
          servico: string
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao: string
          email: string
          empresa?: string | null
          id?: string
          nome: string
          observacoes_admin?: string | null
          orcamento_estimado?: number | null
          prioridade?: string | null
          servico: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string
          email?: string
          empresa?: string | null
          id?: string
          nome?: string
          observacoes_admin?: string | null
          orcamento_estimado?: number | null
          prioridade?: string | null
          servico?: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_id: string
          price: number
          quantity: number
          total: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_id: string
          price?: number
          quantity?: number
          total?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_id?: string
          price?: number
          quantity?: number
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_with_items"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          invoice_generated_at: string | null
          invoice_number: string | null
          notes: string | null
          payment_method: string | null
          shipping_address: Json | null
          status: string | null
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          invoice_generated_at?: string | null
          invoice_number?: string | null
          notes?: string | null
          payment_method?: string | null
          shipping_address?: Json | null
          status?: string | null
          total?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          invoice_generated_at?: string | null
          invoice_number?: string | null
          notes?: string | null
          payment_method?: string | null
          shipping_address?: Json | null
          status?: string | null
          total?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          additional_images: string[] | null
          category: string | null
          category_id: string | null
          color: string | null
          created_at: string | null
          description: string | null
          detailed_description: string | null
          dimensions: string | null
          id: string
          image_url: string | null
          installation_info: string | null
          lead_time_days: number | null
          material: string | null
          max_quantity: number | null
          min_quantity: number | null
          name: string
          price: number
          size: string | null
          specifications: Json | null
          subcategory_id: string | null
          tags: string[] | null
          unit: string | null
          updated_at: string | null
          warranty_info: string | null
        }
        Insert: {
          additional_images?: string[] | null
          category?: string | null
          category_id?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          detailed_description?: string | null
          dimensions?: string | null
          id?: string
          image_url?: string | null
          installation_info?: string | null
          lead_time_days?: number | null
          material?: string | null
          max_quantity?: number | null
          min_quantity?: number | null
          name: string
          price: number
          size?: string | null
          specifications?: Json | null
          subcategory_id?: string | null
          tags?: string[] | null
          unit?: string | null
          updated_at?: string | null
          warranty_info?: string | null
        }
        Update: {
          additional_images?: string[] | null
          category?: string | null
          category_id?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          detailed_description?: string | null
          dimensions?: string | null
          id?: string
          image_url?: string | null
          installation_info?: string | null
          lead_time_days?: number | null
          material?: string | null
          max_quantity?: number | null
          min_quantity?: number | null
          name?: string
          price?: number
          size?: string | null
          specifications?: Json | null
          subcategory_id?: string | null
          tags?: string[] | null
          unit?: string | null
          updated_at?: string | null
          warranty_info?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      orders_with_items: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string | null
          invoice_generated_at: string | null
          invoice_number: string | null
          items: Json | null
          notes: string | null
          payment_method: string | null
          shipping_address: Json | null
          status: string | null
          total: number | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
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
